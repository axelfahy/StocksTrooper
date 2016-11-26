# -*- coding: utf-8 -*-

from datetime import datetime
import dateutil.relativedelta
from flask import jsonify
from yahoo_finance import Share
from itertools import islice


class Stocks:
    """Stocks class

    Using the yahoo_finance API :

        - retrieve historical data
        - check if an index exists
        - calculate events from historical data

    """
    instance = None

    def __init__(self, index):
        if not Stocks.instance:
            Stocks.instance = Stocks.__Stocks(index)
        else:
            Stocks.instance.index = index
            Stocks.instance.stock = Share(index)
            Stocks.instance._data = None

    def __getattr__(self, name):
        return getattr(self.instance, name)

    class __Stocks:
        """Singleton class"""

        def __init__(self, index):
            """Init of class

            Load the index.
            """
            self.index = index
            self.stock = Share(index)
            self._data = None

        @property
        def data(self):
            """Getter of data.
            If data are not loaded, load them.
            """
            if self._data is None:
                print('Loading data of {}'.format(self.index))
                self._data = self.get_hist_between_dates('20060101', datetime.now()
                                                        .strftime('%Y%m%d'))
            return self._data

        def get_all_hist(self):
            """Get historical data of index."""
            return jsonify(self.data)

        def get_hist_between_dates(self, date_start, date_end):
            """Get historical data of index between dates."""
            try:
                if self.is_index():
                    # TODO Maybe to slow, try another retrieving method ? Is Pandas better ?
                    # Change format of dates
                    d_start = datetime.strptime(date_start, '%Y%m%d').strftime('%Y-%m-%d')
                    d_end = datetime.strptime(date_end, '%Y%m%d').strftime('%Y-%m-%d')
                    # Retrieve the data
                    data_yahoo = self.stock.get_historical(d_start, d_end)
                    # Change to format in json (field : "date", "value")
                    result = [{"date": int(datetime.strptime(x['Date'], '%Y-%m-%d').strftime('%Y%m%d')), "value": float(x['Adj_Close'])} for x in data_yahoo]
                    return result
            except Exception as e:
                print('Error while getting historic of data : {}'.format(e))
                return None

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

            data = self.get_hist_between_dates(date_start, date_end)
            # TODO : Work directly with self.data and extract the range wanted
            print("Data")
            # print(data)
            dates = data.keys()
            values = data.values()

            # Take 10% of the max - min as threashold
            threshold = (max(values) - min(values)) * 0.2
            print('Threshold : {}'.format(threshold))

            w_dates = window(dates, 10)
            w_values = window(values, 10)

            events = []

            for d, v in zip(w_dates, w_values):
                if max(v) - min(v) > threshold:
                    events.append(max(d))

            print(events)

            return "true"


def window(seq, n=2):
    "Returns a sliding window (of width n) over data from the iterable"
    "   s -> (s0,s1,...s[n-1]), (s1,s2,...,sn), ...                   "
    it = iter(seq)
    result = tuple(islice(it, n))
    if len(result) == n:
        yield result
    for elem in it:
        result = result[1:] + (elem,)
        yield result

        # TODO : Calculate events date
        # Return a list of dates
