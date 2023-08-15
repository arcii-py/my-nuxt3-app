<template>
    <div>
      <button @click="sendNotification">Send Test Notification</button>
      <button v-if="showPermissionButton" @click="requestPermission">Enable Notifications</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showPermissionButton: true,
      vapidPublicKey: 'BPYO4dcoUvaZYotMYejO6eo9VjY0NUWPAsNTLtbAkd-asDtSGni9qgswuZN3Q3bJjCAJDxgvk0d61vZkVagnP3I' // Replace with your actual VAPID public key
    };
  },
  mounted() {
    if (!("Notification" in window) || Notification.permission === 'granted') {
      this.showPermissionButton = false;
    }
  },
  methods: {
    sendNotification() {
      fetch("/.netlify/functions/trigger-push-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: "Test Notification", body: "This is a test push notification." }),
      });
    },
    async requestPermission() {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        console.error('Permission not granted for Notification');
        return;
      }

      this.showPermissionButton = false;

      const subscription = await navigator.serviceWorker.ready.then(reg => 
        reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.vapidPublicKey
        })
      );

      // Send subscription to application server (in this case, a Netlify function)
      await fetch("/.netlify/functions/save-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });
    }
  }
}
</script>
