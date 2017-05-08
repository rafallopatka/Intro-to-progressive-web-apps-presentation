if ('serviceWorker' in navigator) {
    navigator
        .serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
            console.log("service worker registered", registration);
        })
        .catch((error) => {
            console.error("#Service Worker registration error: ", error);
        });
}


