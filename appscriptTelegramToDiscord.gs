function doPost(e) {
  try {
    Logger.log(JSON.stringify(e, null, 2)); // log chi tiết để debug

    const data = JSON.parse(e.postData.contents);

    let text = null;

    // Lấy tin nhắn từ group hoặc private chat
    if (data.message) {
      if (data.message.text) {
        text = data.message.text;
      } else if (data.message.caption) {
        text = "[Media] " + data.message.caption;
      }
    }

    // Lấy tin nhắn từ channel
    if (data.channel_post) {
      if (data.channel_post.text) {
        text = data.channel_post.text;
      } else if (data.channel_post.caption) {
        text = "[Media] " + data.channel_post.caption;
      }
    }

    if (text) {
      const discordWebhookUrl = "https://discord.com/api/webhooks/1379104838209503334/KrjT0e6McFmx45IfS8QY5nXsXFz1PMoAvXNQSbNM1InCEcu-Y7EPeHo_250xghnmy_z7"; // Thay bằng webhook của bạn

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
    Logger.log("Lỗi: " + err.toString());
  }
}
