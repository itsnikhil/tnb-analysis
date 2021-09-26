import json
import os

import requests


url = 'http://bank.tnbexplorer.com/stats/api/'


def send(data):
    payload = json.dumps({
        'shift': data['Shift'],
        'total': data['Total'],
        'accounts': data['Accounts'],
        'max_balance': data['Max balance'],
        'richest': data['Richest'],
        'top_5_wealth': data['Top 5% wealth'],
        'top_5_ownership': data['Top 5% ownership'],
        'top_5_accounts': data['Top 5% accounts'],
        'top_10_wealth': data['Top 10% wealth'],
        'top_10_ownership': data['Top 10% ownership'],
        'top_10_accounts': data['Top 10% accounts'],
        'top_25_wealth': data['Top 25% wealth'],
        'top_25_ownership': data['Top 25% ownership'],
        'top_25_accounts': data['Top 25% accounts'],
        'top_50_wealth': data['Top 50% wealth'],
        'top_50_ownership': data['Top 50% ownership'],
        'top_50_accounts': data['Top 50% accounts']
    })

    headers = {
            'Authorization': 'token ' + os.getenv('STATS_API_TOKEN'),
            'Content-Type': 'application/json'
    }

    requests.request('POST', url, headers=headers, data=payload)
