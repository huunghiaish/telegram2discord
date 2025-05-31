function doPost(e) {
  try {
    Logger.log(JSON.stringify(e)); // log toàn bộ request để debug

    const data = JSON.parse(e.postData.contents);
    
    if (data.message && data.message.text) {
      const text = data.message.text;

      const discordWebhookUrl = "YOUR_DISCORD_WEBHOOK";

      const payload = {
        content: text
      };

      const options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload)
      };

      UrlFetchApp.fetch(discordWebhookUrl, options);
    }
  } catch (err) {
    Logger.log("Lỗi: " + err);
  }
}
