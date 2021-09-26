import os
from datetime import datetime

from thenewboston.constants.network import MAX_POINT_VALUE
from thenewboston.utils.network import fetch

from utils.files import write_json
from utils.format_results import format_results

PRIMARY_VALIDATOR_IP = '54.219.234.129'


def fetch_account_data():
    """
    Fetch all account data from primary validator
    Return list of accounts
    """

    results = []

    next_url = f'http://{PRIMARY_VALIDATOR_IP}/accounts'

    while next_url:
        print(next_url)
        data = fetch(url=next_url, headers={})
        accounts = data['results']
        results += accounts
        next_url = data['next']

    return results


def run():
    """
    Run main application
    """

    now = datetime.utcnow()
    date_time = now.strftime('%Y-%m-%d-%H_%M_%S')
    data = format_results(fetch_account_data())
    verify_results(data=data)

    write_json(
        file=f'./account_backups/{date_time}.json',
        data=data
    )


def verify_results(*, data):
    """
    Ensure total coins is equal to
    """

    total = sum(v['balance'] for k, v in data.items())

    if total == MAX_POINT_VALUE:
        print('\nValid')
    else:
        print('\nInvalid')


if __name__ == '__main__':
    run()
