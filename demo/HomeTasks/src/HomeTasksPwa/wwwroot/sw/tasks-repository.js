"use strict";

var tasksRepository = (function (db) {
    var me = {};

    var generateGuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    me.addOrUpdate = function (task) {
        if (task.id == null) {
            task.id = generateGuid();
        }

        var promise = db
            .getItem(task.id)
            .then(localItem => {
                if (localItem == null) {
                    return db.setItem(task.id, task);

                } else {
                    var localItemDate = new Date(localItem.lastModification);
                    var remoteItemDate = new Date(task.lastModification);

                    if (localItemDate < remoteItemDate) {
                        return db.setItem(task.id, task);

                    } else if (localItemDate > remoteItemDate) {
                        localItem.syncRequired = true;
                        return db.setItem(task.id, localItem);

                    } else {
                        return db.setItem(task.id, task);

                    }
                }
            });

        return promise;
    }

    me.getAllToDoTasks = function() {
        var promise = db
            .keys()
            .then((keys) => {
                return Promise.all(keys.map(key => {
                    return db.getItem(key);
                }));
            });

        return promise;
    }

    me.getTasksToSync = function () {
        var promise = me.getAllToDoTasks()
            .then(tasks => {
                var tasksToSync = [];
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].syncRequired === true) {
                        tasksToSync.push(tasks[i]);
                    }    
                }

                return tasksToSync;
            });

        return promise;
    }

    me.removeLeftovers = function(freshData) {
        var promise = me.getAllToDoTasks()
            .then(tasks => {
                var elementsToRemove = tasks.filter((task) => {
                    var isNotInDataFromServer = freshData.findIndex(f => f.id === task.id) === -1;
                    var isNotMarkedToSync = task.syncRequired != true;

                    return isNotInDataFromServer && isNotMarkedToSync;
                });

                elementsToRemove.forEach((task) => {
                    db.removeItem(task.id);
                });
            });

        return promise;
    }

    return me;
})(localforage);

this.tasksRepository = tasksRepository;
