#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Run the server
"""
from stockstrooper import app
from config import PORT, DEBUG

__author__ = "Axel Fahy & Rudolf Hohn"
__version__ = "0.1"
__date__ = "12.11.2016"
__status__ = "Development"

app.run(host='0.0.0.0', port=PORT, debug=DEBUG)

