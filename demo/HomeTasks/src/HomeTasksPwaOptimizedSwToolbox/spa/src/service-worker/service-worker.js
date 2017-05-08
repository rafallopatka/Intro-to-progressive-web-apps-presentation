"use strict";

importScripts("/cache-keys.js");
importScripts("/node_modules/localforage/dist/localforage.min.js");
importScripts('/node_modules/sw-toolbox/sw-toolbox.js'); 
importScripts("/tasks-repository.js");

var getAllTodoTaskResponse = function() {
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
      console.warn("[ServiceWorker] Todo request to repository failed ", error);

      return Promise.reject(error);
    });

  return fetchPromise;
}

var fetchAndCacheToDo = function(request) {
  return fetch(request)
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
      console.warn("[ServiceWorker] Todo request failed, fetching from repository ", request, reason);

      return getAllTodoTaskResponse();
    });
}

function addOrUpdateTaskRequest(request) {
  var requestPromise = fetch(request.clone())
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
      var promise = request
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
          console.error("[ServiceWorker] addOrUpdateTask failed", error);
        });

      return promise;
    });

  return requestPromise;
}

var syncDb = function() {
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



toolbox.precache(cacheKeys);

toolbox.router.get('/(.*)', (req, vals, opts) => {
  return toolbox.cacheFirst(req, vals, opts);
}, { origin: 'https://fonts.gstatic.com', cache: { name: "fonts-cache" }  });

toolbox.router.get('/(.*)', (req, vals, opts) => {
  return toolbox.cacheFirst(req, vals, opts);
}, { origin: 'https://fonts.googleapis.com' });

toolbox.router.get('/api/tasks/done/', (req, vals, opts) => {
  return toolbox.networkFirst(req, vals, opts);
}, {cache: { name: "api-cache" }});

toolbox.router.get('/api/categories/', (req, vals, opts) => {
  return toolbox.networkFirst(req, vals, opts);
}, {cache: { name: "api-cache" }});

toolbox.router.get('/api/users/', (req, vals, opts) => {
  return toolbox.networkFirst(req, vals, opts);
}, {cache: { name: "api-cache" }});

toolbox.router.get('/(.*)', (req, vals, opts) => {
  return toolbox.cacheFirst(req, vals, opts);
});

toolbox.router.get('/api/tasks/todo/', (req, vals, opts) => {
  debugger;
  
  return fetchAndCacheToDo(req);
}, {cache: { name: "api-cache" }});

toolbox.router.post('/api/tasks/', (req, vals, opts) => {
  debugger;
  return addOrUpdateTaskRequest(req);
}, {cache: { name: "api-cache" }});

toolbox.router.put('/api/tasks/', (req, vals, opts) => {
  debugger;
  
  return addOrUpdateTaskRequest(req);
}, {cache: { name: "api-cache" }});



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

