import json
import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()

# Thay bằng webhook Discord của bạn
DISCORD_WEBHOOK_URL = os.getenv('DISCORD_WEBHOOK_URL')
# Đường dẫn tới file JSON chat Telegram
TELEGRAM_JSON_FILE = os.getenv('TELEGRAM_JSON_FILE')

print(DISCORD_WEBHOOK_URL)
print(TELEGRAM_JSON_FILE)

# Format một message để đẩy lên Discord
def format_message(message):
    sender = message.get("from", "Unknown")
    text = message.get("text", "")
    date = message.get("date", "")
    
    if isinstance(text, list):
        # Nếu text là list (đôi khi Telegram export theo dạng phức tạp)
        text = ''.join(part if isinstance(part, str) else part.get('text', '') for part in text)
    
    return f"**{sender}** ({date}):\n{text}"

def send_to_discord(content):
    payload = {
        "content": content
    }
    response = requests.post(DISCORD_WEBHOOK_URL, json=payload)
    if response.status_code != 204:
        print(f"❌ Failed to send message: {response.status_code}, {response.text}")

def main():
    with open(TELEGRAM_JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Assuming messages are stored under a 'messages' key in the JSON
    messages_list = data.get("messages", [])

    for msg in messages_list:
        if 'text' not in msg or not msg['text']: # also check for empty text
            continue  # Bỏ qua message không có text hoặc text rỗng
        content = format_message(msg)
        send_to_discord(content)
        time.sleep(1)  # Delay để tránh spam rate limit của Discord

    print("✅ All messages sent to Discord!")

if __name__ == "__main__":
    main()
