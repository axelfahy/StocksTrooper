# -*- coding: utf-8 -*-

from stockstrooper import app
from .News import News
from .Stocks import Stocks
import json

from flask import jsonify, Response


@app.route('/stocks/<index>')
def get_stocks(index):
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
    stock = Stocks(index)
    return Response(json.dumps(stock.data), mimetype='application/json')


@app.route('/events/<index>/<date_start>/<date_end>')
def get_events(index, date_start, date_end):
    """
    @api {get} /events/:index/:date_start/:date_end Request events of index between date_start and date_end
    @apiName get_events
    @apiGroup events
    @apiDescription Calculate events of index between two dates.
    For now, the number of events to generate is hardcoded to 5.

    @apiParam {String} index        Index to calculate the event from.
    @apiParam {String} date_start   Start date for the calculation of events.
    @apiParam {String} date_end     End date for the calculation of events.

    @apiSuccess {String} date   Date of an event.

    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        {
            "date": "20160112",
        },
        {
            "date": "20160113",
        }
    """
    stock = Stocks(index)
    return Response(json.dumps(stock.get_events(date_start, date_end)), mimetype='application/json')


@app.route('/news/<index>/<date_event>')
def get_news_from_event(index, date_event):
    """
    @api {get} /news/:index/:date_event/:date_end Get a list of news of index at date_event
    @apiName get_news_from_event
    @apiGroup news
    @apiDescription Get a list of news of an index at a precise date.
    Dates are events.

    @apiParam {String} index    Index related to the news
    @apiParam {String} date     Date of the event to get the news from

    @apiSuccess {String} headline       Headline of the article
    @apiSuccess {String} description    Description of the article
    @apiSuccess {String} date           Date of the article
    @apiSuccess {String} source         Source of the article
    @apiSuccess {String} url            Url of the article

    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        {
            "headline": "Hess and Medivation Slide, Apple and Lennar Advance",
            "description": "Stocks that moved substantially or traded heavily Tuesday on the New York Stock Exchange and the Nasdaq stock market:",
            "source": "AP",
            "date": "20160329",
            "url": "http://www.nytimes.com/aponline/2016/03/29/business/ap-us-financial-markets-stocks.html"
        }
    """
    news = News(app.config['NYT_API_KEY'])
    return Response(json.dumps(news.get_news(index, date_event)), mimetype='application/json')


# Route to check if an index exists
@app.route('/index/<index>')
def check_index(index):
    """
    @api {get} /index/:index Check if index exists
    @apiName check_index
    @apiGroup index
    @apiDescription Check wheter an index exists.

    @apiParam {String} index Index to check the existence.

    @apiSuccess {Boolean} valid  Return true if index exists, else false

    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        {
            "valid": true,
        }
    """
    stock = Stocks(index)
    if stock.is_index():
        return jsonify(valid=True)
    else:
        return jsonify(valid=False)

