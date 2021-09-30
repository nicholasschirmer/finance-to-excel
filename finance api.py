import requests
from flask import Flask, json, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

f = requests.get("https://financialmodelingprep.com/api/v3/income-statement/AMD?limit=120&apikey=26c190fa8aa7da788a4fdd3132fd386a")

@app.route('/')
def defualt():
    return {
        "Status": "Active"
    }

@app.route('/income_statement/<stock_code>')
def inc_state(stock_code):
    curr_income_Statement = requests.get("https://financialmodelingprep.com/api/v3/income-statement/" + stock_code +"?limit=120&apikey=26c190fa8aa7da788a4fdd3132fd386a")
    return curr_income_Statement.text

@app.route('/ballance_sheet/<stock_code>')
def bal_sheet(stock_code):
    curr_ballance_sheet = requests.get("https://financialmodelingprep.com/api/v3/balance-sheet-statement/" + stock_code +"?limit=120&apikey=26c190fa8aa7da788a4fdd3132fd386a")
    return curr_ballance_sheet.text

@app.route('/cash_flow/<stock_code>')
def cash_flow(stock_code):
    curr_ballance_sheet = requests.get("https://financialmodelingprep.com/api/v3/cash-flow-statement/" + stock_code +"?limit=120&apikey=26c190fa8aa7da788a4fdd3132fd386a")
    return curr_ballance_sheet.text

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)