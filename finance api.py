from flask.json import jsonify
import yahoo_fin.stock_info as si
from flask import Flask
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/')
def defualt():
    return {
        "Status": "Active"
    }


@app.route('/income_statement/<stock_code>')
def inc_state(stock_code):
    curr_Income_Statement = requests.get(
        "https://financialmodelingprep.com/api/v3/income-statement/{}?limit=120&apikey=26c190fa8aa7da788a4fdd3132fd386a".format(stock_code.upper()))
    return curr_Income_Statement.text


@app.route('/ballance_sheet/<stock_code>')
def bal_sheet(stock_code):
    curr_ballance_sheet = requests.get(
        "https://financialmodelingprep.com/api/v3/balance-sheet-statement/{}?apikey=26c190fa8aa7da788a4fdd3132fd386a&limit=120".format(stock_code.upper()))
    return curr_ballance_sheet.text


@app.route('/cash_flow/<stock_code>')
def cash_flow(stock_code):
    curr_Cash_Flow = requests.get(
        "https://financialmodelingprep.com/api/v3/cash-flow-statement/{}?apikey=26c190fa8aa7da788a4fdd3132fd386a&limit=120".format(stock_code.upper()))
    return curr_Cash_Flow.text


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
