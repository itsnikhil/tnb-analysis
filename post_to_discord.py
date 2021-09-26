import requests
import os
import json


def send(data):
    # url = os.getenv("DISCORD_WEBHOOK_URL")
    url = "https://discord.com/api/webhooks/889603302159966271/z7HOWFAiescqt4IjxZ8dhbHa6L8lvtE6DT3pUnoTSSHcXsX-rxlJsPHg6slQRo-C4dI_"

    payload = {
        "content": "Mason is looking for new arena partners. What classes do you play?",
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 3,
                    "custom_id": "class_select_1",
                    "options":[
                        {
                            "label": "Rogue",
                            "value": "rogue",
                            "description": "Sneak n stab",
                            "emoji": {
                                "name": "rogue",
                                "id": "625891304148303894"
                            }
                        },
                        {
                            "label": "Mage",
                            "value": "mage",
                            "description": "Turn 'em into a sheep",
                            "emoji": {
                                "name": "mage",
                                "id": "625891304081063986"
                            }
                        },
                        {
                            "label": "Priest",
                            "value": "priest",
                            "description": "You get heals when I'm done doing damage",
                            "emoji": {
                                "name": "priest",
                                "id": "625891303795982337"
                            }
                        }
                    ],
                    "placeholder": "Choose a class",
                    "min_values": 1,
                    "max_values": 3
                }
            ]
        }
    ]
        # "username": "TNB Analysis",
        # "avatar_url": "https://itsnikhil.github.io/tnb-analysis/web/assets/maskable_icon.png",
        # "components": [
        #     {
        #         "type": 1,
        #         "components": [
        #             {
        #                 "style": 5,
        #                 "label": "Checkout the stats",
        #                 "url": "https://tnbexplorer.com/tnb/stats",
        #                 "type": 2
        #             }
        #         ],
        #         "options": [{
                            
        #                 }],
        #     }
        # ],
        # "embeds": [
        #     {
        #         "title": "TNB Analysis - " + data["Date"],
        #         "url": "https://tnbexplorer.com/tnb/stats",
        #         "color": 0xfff700,
        #         "description": "Daily dose of insights about thenewboston digital crypto currency network analysis like total coins distributed, richest account, wealth distribution, etc.",
        #         "fields": [
        #             {
        #                 "name": "Total coins distributed",
        #                 "value":  "{:,}".format(int(data["Total"]))
        #             },
        #             {
        #                 "name": "Total accounts",
        #                 "value": str(data["Accounts"])
        #             },
        #             {
        #                 "name": "Coins released past 24hr",
        #                 "value": "{:,}".format(int(data["Shift"]))
        #             },
        #             {
        #                 "name": "Richest account balance",
        #                 "value": "{:,}".format(int(data["Max balance"]))
        #             }
        #         ],
        #         "footer": {
        #             "text": "Powered by TNB Explorer"
        #         }
        #     }
        # ]
    }
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request(
        "POST", url, headers=headers, data=json.dumps(payload))
    if response.status_code != 204:
        raise Exception(response.text)

data = {
    "Date": "2020-11-29",
    "Shift": 10000,
    "Total": 4528692,
    "Accounts": 340,
    "Max balance": 194342,
    "Richest": "a2d73cf3b37a62276ade44a96860495510d0e7d7c468950d4e49ac8a62b3d31d",
    "Top 5% wealth": 2030853,
    "Top 5% ownership": 0.44844140427302187,
    "Top 5% accounts": 17,
    "Top 10% wealth": 3055552,
    "Top 10% ownership": 0.6747096071006816,
    "Top 10% accounts": 34,
    "Top 25% wealth": 4345800,
    "Top 25% ownership": 0.9596148291824659,
    "Top 25% accounts": 85,
    "Top 50% wealth": 4473095,
    "Top 50% ownership": 0.9877233867968941,
    "Top 50% accounts": 170
}

send(data)