import requests
import os
import json
def send(data):
    url = os.getenv("DISCORD_WEBHOOK_URL")

    payload={
        "username": "TNB Analysis",
        "avatar_url": "https://itsnikhil.github.io/tnb-analysis/web/assets/maskable_icon.png",
        "embeds": [
            {
                "title": "TNB Analysis summary " + data["Date"],
                "url": "https://itsnikhil.github.io/tnb-analysis",
                "description": "Daily dose of insights about thenewboston digital crypto currency network analysis like total coins distributed, richest account, wealth distribution, etc.",
                "fields": [
                    {
                        "name": "Total coins distributed",
                        "value":  "{:,}".format(int(data["Total"]))
                    },
                    {
                        "name": "Total accounts",
                        "value": str(data["Accounts"])
                    },
                    {
                        "name": "Coins released past 24hr",
                        "value": "{:,}".format(int(data["Shift"]))
                    },
                    {
                        "name": "Richest account balance",
                        "value": "{:,}".format(int(data["Max balance"]))
                    }
                ],
                "image": {
                    "url": "https://itsnikhil.github.io/tnb-analysis/screenshots/Daily-change-in-coins.png"
                },
                "footer": {
                    "text": "visit website for further information like charts and rich list"
                }
            }
        ]
    }
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=json.dumps(payload))
    if response.status_code != 204:
        raise Exception(response.text)