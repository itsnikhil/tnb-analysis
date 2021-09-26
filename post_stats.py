import json
import os

import requests


url = 'http://bank.tnbexplorer.com/stats/api/'


def send(data):
    payload = json.dumps({
        'shift': int(data['Shift']),
        'total': int(data['Total']),
        'accounts': int(data['Accounts']),
        'max_balance': int(data['Max balance']),
        'richest': data['Richest'],
        'top_5_wealth': int(data['Top 5% wealth']),
        'top_5_ownership': float(data['Top 5% ownership']),
        'top_5_accounts': int(data['Top 5% accounts']),
        'top_10_wealth': int(data['Top 10% wealth']),
        'top_10_ownership': float(data['Top 10% ownership']),
        'top_10_accounts': int(data['Top 10% accounts']),
        'top_25_wealth': int(data['Top 25% wealth']),
        'top_25_ownership': float(data['Top 25% ownership']),
        'top_25_accounts': int(data['Top 25% accounts']),
        'top_50_wealth': int(data['Top 50% wealth']),
        'top_50_ownership': float(data['Top 50% ownership']),
        'top_50_accounts': int(data['Top 50% accounts'])
    })

    headers = {
            'Authorization': 'token ' + os.getenv('STATS_API_TOKEN'),
            'Content-Type': 'application/json'
    }

    response = requests.request('POST', url, headers=headers, data=payload)
    if response.status_code != 200:
        raise Exception(response.text)
