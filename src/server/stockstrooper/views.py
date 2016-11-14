# -*- coding: utf-8 -*-

from stockstrooper import app
from .News import News
from .Stocks import Stocks

from flask import jsonify


"""
@api {get} /stocks/<index> Request all stocks values from <index>
@apiName get_stocks
@apiGroup stocks
@apiDescription Get all historic values for stocks.
The value is the adjusted closing price of the day.

@apiParam {index} index to request the historic from

@apiSuccess {String} date   date related to the value
@apiSuccess {String} value  adjusted closing price of the stock for the related date

@apiSuccessExample Success-Response:
    HTTP/1.1 200 OK
    {
        "date": "20160112",
        "value": "15.04"
    },
    {
        "date": "20160113",
        "value": "19.04"
    }
"""
@app.route('/stocks/<index>')
def get_stocks(index):
    stock = Stocks(index)
    return stock.get_all_hist()


# Route to get the events between two dates
@app.route('/events/<index>/<date_start>/<date_end>')
def get_events(index, date_start, date_end):
    return "get_events - to be implemented"


# Route to get the news of a date (event)
@app.route('/news/<index>/<date_event>')
def get_news_from_event(index, date_event):
    news = News(app.config['NYT_API_KEY'])
    return news.get_news(index, date_event)


# Route to check if an index exists
@app.route('/index/<index>')
def check_index(index):
    stock = Stocks(index)
    if stock.is_index():
        return jsonify(valid=True)
    else:
        return jsonify(valid=False)

