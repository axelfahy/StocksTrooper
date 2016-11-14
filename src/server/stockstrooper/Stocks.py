# -*- coding: utf-8 -*-

from datetime import datetime
import dateutil.relativedelta
from flask import jsonify
from yahoo_finance import Share


class Stocks:
    """Stocks class

    Using the yahoo_finance API :

        - retrieve historical data
        - check if an index exists
        - calculate events from historical data

    """

    def __init__(self, index):
        """Init of class

        Load the index.
        """
        self.index = index
        self.stock = Share(index)

    def get_all_hist(self):
        """Get historical data of index."""
        try:
            if self.is_index():
                # TODO Maybe to slow, try another retrieving method ? Is Pandas better ?
                #data = stock.get_historical('1950-01-01', datetime.now()
                data = self.stock.get_historical('2006-01-01', datetime.now()
                                            .strftime('%Y-%m-%d'))
                date = [datetime.strptime(x['Date'], '%Y-%m-%d').strftime('%Y%m%d')
                        for x in data]
                value = [x['Adj_Close'] for x in data]
                return jsonify(dict(zip(date, value)))
        except:
            return jsonify(dict())

    def is_index(self):
        """Check if an index exists."""
        try:
            return bool(self.stock.get_name())
        except:
            return False

    def get_name(self):
        """Get the name of the index."""
        return self.stock.get_name()

    def get_events(self, date_start=None, date_end=None):
        """Calculate events date from historical data

        Args:
            date_start (str): Start date for historical data.
                                Format '%Y%m%d', default value : last year
            date_end (str): End date for historical data.
                                Format '%Y%m%d', default value : today
        """
        # If dates not provided, calculate the last year
        if date_start is None or date_end is None:
            date_start = (datetime.now() - dateutil.relativedelta(years=1)).strftime('%Y%m%d')
            date_end = datetime.datetime.today().strftime('%Y%m%d')

        return jsonify(dict())

        # TODO : Calculate events date
        # Return a list of dates
