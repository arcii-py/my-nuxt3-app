<template>
  <div>
    <button @click="sendNotification">Send Test Notification</button>
  </div>
</template>

<script>
export default {
methods: {
  sendNotification() {
    fetch("/.netlify/functions/trigger-push-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "Test Notification", body: "This is a test push notification." }),
    });
  }
}
}
</script>
