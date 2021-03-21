# %%
# from IPython import get_ipython


# %%
from datetime import datetime
import json
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt


# %%
pd.options.display.float_format = '{:.3f}'.format
# pd.reset_option('^display.', silent=True)
plt.style.use('default')

# %%


def custom_date_parser(x): return datetime.strptime(x, '%Y-%m-%d-%H_%M_%S')


# %%
data = pd.read_csv('out.csv', index_col="Date",
                   parse_dates=True, date_parser=custom_date_parser)

# %%
data[['Top 5% ownership', 'Top 10% ownership', 'Top 25% ownership', 'Top 50% ownership']] = data[
    ['Top 5% ownership', 'Top 10% ownership', 'Top 25% ownership', 'Top 50% ownership']].multiply(100, axis='index')


# %%
data.sort_values(by=['Date'], inplace=True)

# %%
fig, axes = plt.subplots(2, 1)
fig.tight_layout(h_pad=2)
# axes[0].set_title('Total coins distributed over time')
axes[0].ticklabel_format(style='plain')
axes[0].set_ylabel('Coins')
# axes[1].set_title('Total backup accounts over time')
axes[1].set_ylabel('Accounts')
data['Total'].plot(ax=axes[0], figsize=(12, 12), style='.-')
data['Accounts'].plot(ax=axes[1], figsize=(12, 12), style='.-')
extent1 = axes[0].get_window_extent().transformed(
    fig.dpi_scale_trans.inverted()).expanded(1.2, 1.4)
extent1.y0 -= extent1.y1/80
extent1.y1 -= extent1.y1/20
extent1.x1 -= extent1.x1/15
plt.savefig('./screenshots/Total-coins-distributed-over-time.png',
            dpi=100, bbox_inches=extent1)
extent2 = axes[1].get_window_extent().transformed(
    fig.dpi_scale_trans.inverted()).expanded(1.1, 1.4)
extent2.y0 -= extent2.y1/50
extent2.y1 -= extent2.y1/12
extent2.x0 -= extent2.x1/50
extent2.x1 -= extent2.x1/40
plt.savefig('./screenshots/Total-backup-accounts-over-time.png',
            dpi=100, bbox_inches=extent2)

# %%
data['Shift'] = data['Total'] - data['Total'].shift(1)

# %%
fig, ax = plt.subplots()
data['Shift'].plot(ax=ax, figsize=(16, 4), style='.-', grid=True)
# ax.set_title('Daily change in coins')
ax.set_ylabel('Coins')
ax.get_yaxis().set_major_formatter(
    matplotlib.ticker.FuncFormatter(lambda x, p: format(int(x), ',')))
plt.savefig('./screenshots/Daily-change-in-coins.png',
            dpi=100, bbox_inches='tight')

# %%
ax = data[['Top 5% ownership', 'Top 10% ownership', 'Top 25% ownership', 'Top 50% ownership']].plot(
    kind='line', figsize=(12, 6), style='.-', grid=True)
ax.set_ylim([0, 100])
ax.set_ylabel('Ownership in %')
# ax.set_title('Ownership of different groups')
plt.savefig('./screenshots/Ownership-of-different-groups.png',
            dpi=100, bbox_inches='tight')

# %%
latest_wealth = data[['Top 5% wealth', 'Total',
                      'Top 10% wealth', 'Top 25% wealth', 'Top 50% wealth']].iloc[-1]
latest_wealth['Total'] = latest_wealth['Total'] - \
    latest_wealth['Top 50% wealth']
latest_wealth['Top 50% wealth'] = latest_wealth['Top 50% wealth'] - \
    latest_wealth['Top 25% wealth']
latest_wealth['Top 25% wealth'] = latest_wealth['Top 25% wealth'] - \
    latest_wealth['Top 10% wealth']
latest_wealth['Top 10% wealth'] = latest_wealth['Top 10% wealth'] - \
    latest_wealth['Top 5% wealth']

latest_wealth.rename({
    'Top 5% wealth': 'Top 5% wealth',
    'Total': 'Rest 50-100% of the network',
    'Top 10% wealth': 'Top 5-10% wealth',
    'Top 25% wealth': 'Top 10-25% wealth',
    'Top 50% wealth': 'Top 25-50% wealth'
}, inplace=True)

ax = latest_wealth.plot(kind='pie', autopct='%1.1f%%', pctdistance=0.65, wedgeprops=dict(
    width=0.7), explode=[0.1] * 5, startangle=90)
ax.yaxis.set_label_coords(1.4, 0.5)
ax.get_legend().remove()
# ax.set_title('Percentage of wealth held')
plt.savefig('./screenshots/Percentage-of-wealth-held.png',
            dpi=100, bbox_inches='tight')

# %%
# Figure Size
fig, ax = plt.subplots(figsize=(8, 4))

name = ['Top 5% ownership', 'Top 10% ownership',
        'Top 25% ownership', 'Top 50% ownership']
percent = data[['Top 5% ownership', 'Top 10% ownership',
                'Top 25% ownership', 'Top 50% ownership']].iloc[-1].values

# Horizontal Bar Plot
ax.barh(name, percent, color=['b', 'r', 'g', 'y', 'k'])

# Remove axes splines
for s in ['top', 'bottom', 'left', 'right']:
    ax.spines[s].set_visible(False)

# Remove x, y Ticks
ax.xaxis.set_ticks_position('none')
ax.yaxis.set_ticks_position('none')
ax.set_xlabel('Ownership percentage')

# Add x, y gridlines
ax.grid(b=True, color='grey',
        linestyle='-.', linewidth=0.5,
        alpha=0.5)

# Show top values
ax.invert_yaxis()

# Add annotation to bars
for i in ax.patches:
    plt.text(i.get_width()+0.2, i.get_y()+0.5,
             str(round((i.get_width()), 2)),
             fontsize=12, fontweight='bold',
             color='grey')

# Add Plot Title
# ax.set_title('Wealth distribution on 2020-12-03 in %')
plt.savefig('./screenshots/Wealth-distribution.png',
            dpi=100, bbox_inches='tight')

# %%
json_data = data.iloc[-1].to_json()
with open('./web/js/static.json', 'w') as outfile:
    json.dump(json.loads(json_data[:-1] + ', "Date":"' +
                         datetime.utcnow().strftime('%d %b %Y %H:%M') + ' UTC"}'), outfile)
