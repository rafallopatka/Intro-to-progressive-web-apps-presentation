if ('serviceWorker' in navigator) {
    navigator
        .serviceWorker
        .ready
        .then((registration) => {
            console.log("#Service Worker registered: ", registration);

            if ('sync' in registration) {
                console.log("#background sync registration");

                return registration
                    .sync
                    .register("todo-sync")
                    .then(() => {
                        console.log("#todo-sync registered");
                    })
                    .catch((e) => {
                        console.error("#sync registration", e);
                    });
            } else
            {
                console.warn("#background sync switching to online sync");

                window.addEventListener('online', () => {
                    navigator.serviceWorker.controller.postMessage("todo-sync");
                });

                return Promise.resolve();
            }
        });
}

document.addEventListener('DOMContentLoaded', function () {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission((result) => {
            if (result !== 'granted')
                console.warn("notification permission not granted");

            return Promise.resolve();
        }).catch(() => {
            console.warn("cannot obtain perrmissions for notification");
        });
    }
});