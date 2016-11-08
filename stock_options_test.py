#!/usr/bin/python3
# -*-coding:utf-8 -*
"""
# ==============================================================================
#
#         FILE: stockOptionsTest.py
#
#        USAGE: ./stockOptionsTest.py
#
#  DESCRIPTION:
#
# ==============================================================================
"""
import os
import time
from urllib.request import urlopen
from yahoo_finance import Share
from pprint import pprint
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from pandas_datareader import data, wb
from datetime import datetime
import numpy as np

__author__ = "Axel Fahy"
__version__ = "0.0.1"
__date__ = "07.11.2016"
__email__ = "axel@fahy.net"
__status__ = "Development"

def yahooKeyStats(stock):
    """FAIL"""
    try:
        print(stock)
        sourceCode = urlopen('http://finance.yahoo.com/q/ks?s='+stock).read()
        pbr = sourceCode.split('Price/Book (mrq):</td><td class="yfnc_tabledata1">')[1].split('</td>')[0]
        print(pbr)
        # print('price to book ratio: {} {}'.format(stock, pbr))

    except Exception as e:
        print('failed in the main loop {}'.format(e))

def main():
    """
    TODO
    :param stock : stock to process
    """
    #yahooKeyStats('aapl')
    stock = Share('GOOGL')
    print(stock.get_price())
    #pprint(stock.get_historical('2014-04-25', '2015-01-01'))
    #x, y = [x['Date'], x['Adj_Close'] for x in stock.get_historical('2014-04-25', '2015-01-01')]
    x = [x['Date'] for x in stock.get_historical('2014-04-25', '2015-04-25')]
    y = [x['Adj_Close'] for x in stock.get_historical('2014-04-25', '2015-04-25')]
    x = [datetime.strptime(date, '%Y-%m-%d') for date in x]
    print(x)

    plt.plot_date(x, y, '-')

    # OK, seems to work too
    ibm = data.DataReader('IBM',  'yahoo', datetime(2000, 1, 1), datetime(2012, 1, 1))
    print(ibm['Adj Close'])

    #print(time.mktime(x[0].timetuple()))
    #f, _ = np.polyfit([int(time.mktime(d.timetuple())) for d in x], y, 1)
    #print(f)

    plt.show()


if __name__ == '__main__':
    main()
