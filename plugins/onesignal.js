export default ({ app }) => {
    if (process.client) {
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      window.OneSignalDeferred.push(function(OneSignal) {
        OneSignal.init({
          appId: "cf0c077f-a156-4403-8230-c4fbf05e64cf",
        });
      });
  
      const script = document.createElement('script');
      script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }
  