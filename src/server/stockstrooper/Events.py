# -*- coding: utf-8 -*-

from .Stocks import Stocks

from datetime import datetime
from flask import jsonify


class Events:
    """Events class

    Detection of events in financial data
    """

    def __init__(self, index, date_start, date_end):
        """Init of class

        Load the stock and set the date
        """
        self.stock = Stocks(index)
        self.date_start = date_start
        self.date_end = date_end

    def calculate_events(self, nb_events=5):
        """Calculate events between two dates

        Args:
            nb_event (int): number of events to find
        """
        data = self.stock.get_hist_between_dates(self.date_start, self.date_end)
        print("Data")
        print(data)
        return "true"
