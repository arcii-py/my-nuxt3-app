const webPush = require('web-push');

webPush.setVapidDetails(
  'mailto:6620300@gmail.com',  // Replace with your email
  'BPYO4dcoUvaZYotMYejO6eo9VjY0NUWPAsNTLtbAkd-asDtSGni9qgswuZN3Q3bJjCAJDxgvk0d61vZkVagnP3I',          // Replace with your VAPID public key
  'y_ktPauRHQcLhncVpv9AaqW-5on6T0EZuL7wEE04Q8U'          // Replace with your VAPID private key
);

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const payload = JSON.parse(event.body);

  // You'll need to fetch all subscriptions from FaunaDB and send a push notification to each
  // For demonstration purposes, we'll assume you have a function `getAllSubscriptions` that does this

  const subscriptions = await getAllSubscriptions();

  for (const subscription of subscriptions) {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Notification sent!" }),
  };
};

async function getAllSubscriptions() {
  // Fetch all subscriptions from FaunaDB
  // This is a placeholder function. You'll need to implement the logic to fetch subscriptions from FaunaDB.
  return [];
}
