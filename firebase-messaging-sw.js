// 
// Author: Nikhil Taneja (taneja.nikhil03@gmail.com)
// pwabuilder-sw.js (c) 2020
// Desc: Service worker
// Created:  Thu Dec 10 2020 10:57:48 GMT+0530 (India Standard Time)
// Modified: Wed Dec 16 2020 17:53:08 GMT+0530 (India Standard Time)
// 

const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

workbox.loadModule('workbox-cacheable-response');
workbox.loadModule('workbox-range-requests');


var firebaseConfig = {
  apiKey: "AIzaSyB49k9ZKPAT5cJLxgUgu5MHNi6Inh8gp1g",
  projectId: "notify-e1c0c",
  messagingSenderId: "932775037797",
  appId: "1:932775037797:web:67dff66e9ec3bb55efef8c"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/tnb-analysis/web/assets/maskable_icon.png',
    data: { url:payload.data.click_action },
    actions: [{action: "open_url", title: "View report"}]
  };

  self.registration.showNotification(payload.notification.title,
    notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  let url = 'https://itsnikhil.github.io/tnb-analysis/';
  event.notification.close(); // Android needs explicit close.
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});




// if (Notification.permission === "granted") {

// } else if (Notification.permission === "blocked" || Notification.permission === "denied") {
//   /* the user has previously denied push. Can't reprompt. */
// } else {
//   console.log(Notification.permission);
//   Notification.requestPermission(function (status) {
//     console.log('Notification permission status:', status);
//   });
// }

// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('notificationclose', function (e) {
//   var notification = e.notification;
//   var primaryKey = notification.data.primaryKey;

//   console.log('Closed notification: ' + primaryKey);
// });

// self.addEventListener('notificationclick', function (e) {
//   var notification = e.notification;
//   var primaryKey = notification.data.primaryKey;
//   var action = e.action;

//   if (action === 'close') {
//     notification.close();
//   } else {
//     clients.openWindow('https://itsnikhil.github.io/tnb-analysis');
//     notification.close();
//   }
// });