def format_results(data):
    """
    Format result to match the shape of the root account file
    Return results as Python object
    """
    results = dict()

    for entry in data:
        account_number = entry['account_number']
        balance = entry['balance']
        balance_lock = entry['balance_lock']

        if balance == 0:
            continue

        results[account_number] = {
            'balance': balance,
            'balance_lock': balance_lock
        }

    return results
