// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// application.js (c) 2020
// Desc: Daily otification
// Created:  Thu Dec 10 2020 12:29:10 GMT+0530 (India Standard Time)
// Modified: Thu Dec 10 2020 17:45:05 GMT+0530 (India Standard Time)
// 

// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
        console.log("[PWA Builder] active service worker found, no need to register");
    } else {
        // Register the service worker
        navigator.serviceWorker
            .register("firebase-messaging-sw.js", {
                scope: "./"
            })
            .then(function (reg) {
                console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
                reg.pushManager.getSubscription().then(function (sub) {
                    if (sub === null) {
                        // Update UI to ask user to register for Push
                        console.log('Not subscribed to push service!');
                        subscribeUser();
                    } else {
                        // We have a subscription, update the database
                    }
                });
            });
    }
}

function calculateNotificationDelay(){
    let d = new Date();
    if (d.getUTCHours() >= 11) {
        return (Date.UTC(
            d.getUTCFullYear(), d.getUTCMonth(),
            d.getUTCDate()+1, 11, 0) - Date.UTC(
            d.getUTCFullYear(), d.getUTCMonth(),
            d.getUTCDate(), d.getUTCHours(),
            d.getUTCMinutes())
        )
    } else {
        return (Date.UTC(
            d.getUTCFullYear(), d.getUTCMonth(),
            d.getUTCDate(), 11, 0) - Date.UTC(
            d.getUTCFullYear(), d.getUTCMonth(),
            d.getUTCDate(), d.getUTCHours(),
            d.getUTCMinutes())
        )
    }
}

function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            let options = {
                body: "Daily dose of insights about thenewboston",
                icon: '/web/assets/maskable_icon.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                    { action: 'open', title: 'Open' },
                    { action: 'close', title: 'Dismiss' },
                ]
            };
            reg.showNotification('TNB Analysis updated!', options);
        });
    }
}

function subscribeUser() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (reg) {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BEUj33xSWtYl8Bu8xsuLvPghTxQG_AadU_9GhvvfBUaH56PnJBL4aeFjgRnQ0kq0348ftkfiOXhbRtLCb-uY8rY'
            }).then(function (sub) {
                // console.log('Endpoint found! URL: ', sub.endpoint);
            }).catch(function (e) {
                if (Notification.permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                } else {
                    console.error('Unable to subscribe to push', e);
                }
            });
        })
    }
}

// displayNotification();