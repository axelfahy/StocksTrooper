# -*- coding: utf-8 -*-

from .Stocks import Stocks

from datetime import datetime, timedelta
from urllib.request import urlopen
from urllib.parse import urlencode
from flask import Response
import simplejson as json


class News:
    """News class

    Using the NYT API, load news from an index, at a certain date.

    Args:
        api_key (str): The api key for NYT API.
    """

    def __init__(self, api_key):
        self.api_key = api_key
        self.NY_TIMES_API = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
        self.FIELDS = ['headline', 'snippet', 'pub_date', 'source', 'web_url']

    def get_news(self, index, date):
        """Get a list of news from the event date

        Args:
            index (str): Index related to the news.
            date (str): Date of the news to get.
        """
        try:
            stock = Stocks(index)
            # Set a margin for the dates
            date_start = datetime.strptime(date, '%Y%m%d') - timedelta(days=100)
            date_end = datetime.strptime(date, '%Y%m%d') + timedelta(days=100)

            # Parameters of request
            params = {'begin_date': date_start.strftime('%Y%m%d'),
                       'end_date': date_end.strftime('%Y%m%d'), 'q': stock.index,
                       'fq': 'headline:{} OR headline:{}'.format(stock.get_name(), stock.index),
                       'sort': 'newest', 'api_key': self.api_key}
            request = self.NY_TIMES_API + urlencode(params)
            response = urlopen(request).read()
            dict_response = json.loads(response, encoding='utf-8')
            # Get articles
            docs = dict_response['response']['docs']

            for index, news in enumerate(docs):
                # Filter fields
                docs[index] = {k: v for k, v in news.items() if k in self.FIELDS}
                # Rename fields
                docs[index]['headline'] = docs[index]['headline']['main']
                docs[index]['description'] = docs[index].pop('snippet')
                docs[index]['date'] = docs[index].pop('pub_date')
                docs[index]['url'] = docs[index].pop('web_url')

            # If we have less than 3 news, creates fake ones.
            while len(docs) < 3:
                news = {
                    'url': 'https://www.nytimes.com/reuters/{}/{}/{}/huge-changes-{}.html'.format(
                        date_start.year, date_start.month, date_start.day, stock.get_name()),
                    'headline': 'Huge changes in {}'.format(stock.get_name()),
                    'description': 'Huge changes in {}! The recent modification of the foreign policy of the company causes its market value to change significantly. In fact, the {} index was affected by the recent choices made by the company... '.format(stock.get_name(), stock.index),
                    'date': date_start.strftime('%Y-%m-%dT%H:%M:%SZ'),
                    'source': 'Reuters'
                }
                docs.append(news)

            return docs
        except:
            return dict()

