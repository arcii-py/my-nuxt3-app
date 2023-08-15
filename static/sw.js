// Listen for the 'install' event, which is fired once when the service worker is being installed.
self.addEventListener('install', function(event) {
  // Using `self.skipWaiting()` to ensure that updates to the underlying service worker take effect immediately for both the current client and all other active clients.
  event.waitUntil(self.skipWaiting());
});

// Listen for the 'activate' event, which is fired once when the service worker is being activated.
self.addEventListener('activate', function(event) {
  // Using `self.clients.claim()` to ensure that the service worker takes control of the page as soon as it's activated.
  event.waitUntil(self.clients.claim());
});

// Listen for 'push' events from the server. These are sent via the push API.
self.addEventListener('push', function(event) {
  // Extract the notification payload from the `event.data` object.
  const payload = event.data.json();

  // Define the notification options.
  const options = {
    //  body: payload.body,
    //  icon: 'path_to_your_icon.png', // You can specify an icon here. Make sure to have this icon in your static directory.
    //  badge: 'path_to_your_badge.png', // Similarly, you can specify a badge. Make sure to have this badge in your static directory.
    //  tag: 'notification-tag', // Optional tag for notification
      renotify: true, // Optional
      actions: [ // Optional actions to be shown with the notification
          {
              action: 'view',
              title: 'View'
          },
          {
              action: 'dismiss',
              title: 'Dismiss'
          }
      ]
  };

  // Display the notification.
  event.waitUntil(
      self.registration.showNotification(payload.title, options)
  );
});

// Listen for notification click events.
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Close the notification when clicked.

  // Handle different actions based on what the user clicked.
  switch (event.action) {
      case 'view':
          // Open a specific URL in a new window/tab.
          clients.openWindow('https://yourwebsite.com');
          break;
      case 'dismiss':
          // Do something specific when the 'Dismiss' action is clicked.
          break;
      default:
          // This will handle cases where the user clicked on the notification itself, rather than one of the actions.
          clients.openWindow('https://yourwebsite.com');
          break;
  }
});
