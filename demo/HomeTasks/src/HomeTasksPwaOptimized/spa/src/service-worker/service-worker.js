"use strict";

importScripts("/node_modules/localforage/dist/localforage.min.js");
importScripts("/tasks-repository.js");

var shellCacheName = "app-shell-cache-v1.0";
var fontCacheName = "font-cache-v1.0";
var apiCacheName = "api-cache-v1.0";

self.addEventListener("install", (event) => {
  console.log('[ServiceWorker] Install');

  var installPromise = caches
    .open(shellCacheName)
    .then((cache) => {
      return fetch('/cache-keys.json')
        .then((response) => {
          return response.json();
        }).then((files) => {
          console.log('[[ServiceWorker]] Adding files from JSON file: ', files);
          return cache.addAll(files);
        })
        .catch((error) => {
          console.error("[ServiceWorker] install app shell files failed", error);
        });
    });

  event.waitUntil(installPromise);
});

self.addEventListener("activate", (event) => {
  console.log('[ServiceWorker] Activate');

  var activatePromise = caches
    .keys()
    .then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== shellCacheName && key !== fontCacheName && key !== apiCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    });

  event.waitUntil(activatePromise);
  return self.clients.claim();
});


function fetchFromNetworkThenCacheStaticFiles(event) {
  var responsePromise = fetch(event.request)
    .then((response) => {
      caches
        .open(fontCacheName)
        .then((cache) => {
          cache.put(event.request, response.clone());
        })
        .catch(error => {
          console.error("[ServiceWorker] static files caching failed", error);
        });

      return response.clone();
    })
    .catch((error) => {
      console.warn("[ServiceWorker] response failed", error);
      return Promise.reject("[ServiceWorker] fetchFromNetworkThenCacheStaticFiles", error);
    });

  return responsePromise;
}


function cacheStaticFiles(event) {
  var hasQuery = event.request.url.indexOf('?') !== -1;

  return caches
    .match(event.request, {
      ignoreSearch: hasQuery,
      ignoreMethod: true,
      ignoreVary: true
    })
    .then((cacheMatch) => {
      if (cacheMatch) {
        return cacheMatch;
      } else {
        console.error("Not cached static file " + event.request.url);

        return fetch(event.request);
      }
    })
    .catch((error) => {
      console.warn("[ServiceWorker] cache static files failed ", error);
    });
}

function cacheApiResponses(event) {
  return fetch(event.request)
    .then((response) => {
      return caches
        .open(apiCacheName)
        .then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
    })
    .catch((reason) => {
      console.warn("[ServiceWorker] Api request failed, fetching from cache ", event.request, reason);

      var hasQuery = event.request.url.indexOf('?') !== -1;

      return caches
        .match(event.request, {
          ignoreSearch: hasQuery,
          ignoreMethod: true
        })
        .then((cacheMatch) => {
          if (cacheMatch) {
            return cacheMatch;
          } else {
            console.warn("[ServiceWorker] Api cache request failed", event.request);
            return Promise.reject();
          }
        });
    });
}

function directFetch(event) {
  return fetch(event.request)
    .catch(error => {
      console.warn("[ServiceWorker] direct fetch failed", error, event);
    });
}

function getAllTodoTaskResponse() {
  var fetchPromise = tasksRepository
    .getAllToDoTasks()
    .then(tasks => {
      var tasksString = JSON.stringify(tasks);
      var blob = new Blob([tasksString], {
        type: "application/json"
      });
      var response = new Response(blob, {
        "status": 200
      });

      return response;
    })
    .catch((error) => {
      console.warn("[ServiceWorker] Todo request to repository failed ", event.request, error);

      return Promise.reject();
    });

  return fetchPromise;
}

function fetchAndCacheToDo(event) {
  return fetch(event.request)
    .then((response) => {
      var itemToCache = response.clone();

      var cachePromise = itemToCache
        .json()
        .then((jsonRepponse) => {
          return Promise.all(jsonRepponse.map((task) => {
            return tasksRepository.addOrUpdate(task);
          })).then(() => {
            return tasksRepository.removeLeftovers(jsonRepponse);
          });
        })
        .then(() => {
          return getAllTodoTaskResponse();
        })
        .catch((error) => {
          console.error("[ServiceWorker] save in indexeddb failed", error);
        });

      return cachePromise;
    })
    .catch((reason) => {
      console.warn("[ServiceWorker] Todo request failed, fetching from repository ", event.request, reason);

      return getAllTodoTaskResponse();
    });
}

function addOrUpdateTaskRequest(event) {

  var requestPromise = fetch(event.request.clone())
    .then((response) => {
      response
        .clone()
        .json()
        .then(task => {
          return tasksRepository.addOrUpdate(task);
        });

      return response;
    })
    .catch((error) => {
      console.warn("[ServiceWorker] addOrUpdateTask offline request", error);
      var promise = event
        .request
        .clone()
        .json()
        .then((task) => {
          task.syncRequired = true;
          return tasksRepository.addOrUpdate(task);
        })
        .then(task => {
          var taskString = JSON.stringify(task);
          var blob = new Blob([taskString], {
            type: "application/json"
          });
          var response = new Response(blob, {
            "status": 200
          });

          return response;
        })
        .catch(error => {
          console.warn("[ServiceWorker] addOrUpdateTask failed", error);
        });

      return promise;
    });

  return requestPromise;
}

var cacheFonts = function (event) {

  var hasQuery = event.request.url.indexOf('?') !== -1;

  return caches.open(fontCacheName)
    .then((cache) => {
      var responsePromise = cache.match(event.request, {
          ignoreSearch: hasQuery,
          ignoreMethod: true,
          ignoreVary: true
        })
        .then((cacheMatch) => {
          if (cacheMatch) {
            return cacheMatch;
          } else {
            console.warn("fetching font to cache" + event.request.url);

            var fetchPromise = fetch(event.request)
              .then((response) => {
                cache.put(event.request.url, response.clone())
                .catch((error) => {
                  console.error("cache font failed");
                });

                return response.clone();
              });

            return fetchPromise;
          }
        });

        return responsePromise;
    });
}

self.addEventListener('fetch', (event) => {
  console.info('[ServiceWorker] Fetch', event.request.url);
  var responsePromise = null;

  if (/api\/categories/.test(event.request.url) || /api\/users/.test(event.request.url || /api\/tasks\/done/.test(event.request.url))) {
    responsePromise = cacheApiResponses(event);

  } else if (/api\/tasks\/todo/.test(event.request.url)) {
    responsePromise = fetchAndCacheToDo(event);

  } else if (/api\/tasks/.test(event.request.url) && event.request.method !== "GET") {
    responsePromise = addOrUpdateTaskRequest(event);

  } else if (/swagger/.test(event.request.url)) {
    responsePromise = directFetch(event);

  } else if (/fonts.gstatic.com/.test(event.request.url)) {
    responsePromise = cacheFonts(event);

  } else {
    responsePromise = cacheStaticFiles(event);
  }

  event.respondWith(responsePromise);
});


self.addEventListener('sync', (event) => {
  console.log("[ServiceWorker] sync fired");
  if (event.tag === 'todo-sync') {
    event.waitUntil(syncDb());
  }
});

self.addEventListener('message', (event) => {
  console.log("[ServiceWorker] message");
  if (event.data === 'todo-sync') {
    event.waitUntil(syncDb());
  }
});

function syncDb() {
  tasksRepository
    .getTasksToSync()
    .then((tasks) => {
      var responsePromise = tasks.map((task) => {
        var requestPromise = fetch('/api/tasks/' + task.id, {
          method: 'PUT',
          mode: 'cors',
          redirect: 'follow',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(task)
        });

        return requestPromise;
      });

      return Promise.all(responsePromise);
    })
    .then(responses => {
      return Promise.all(responses.map(response => {
        return response
          .json()
          .then(task => {
            return tasksRepository.addOrUpdate(task);
          });
      }));
    })
    .then(() => {

      if (Notification.permission === "granted") {
        self.registration.showNotification("Home Tasks!", {
          body: "Database synced!",
          icon: "/assets/images/icons/favicon-194x194.png"
        });
      }
    })
    .catch(error => {
      console.error("[ServiceWorker] sync failed", error);
    });
}
