import react, {useState} from 'react'
import './Main.css'
import { motion } from 'framer-motion'

function Main() {
    const [currCashFlow, setCashFlow] = useState([{}]);
    const [currIncomeStatement, setIncomeStatement] = useState([{}]);
    const [currBanllanceSheet, setBallanceSheet] = useState([{}]);

    const [stockCode, setStockCode] = useState("");

    var handleChange = (e) => {
        setStockCode(e.target.value);
    };

    var incomeStatement = (stockCode) => {
        fetch('http://localhost:5000/income_statement/' + stockCode)
        .then(response => {
            return response.text();
            })
        .then(data => {
            setIncomeStatement(data);
        })
    }

    var balanceSheet = (stockCode) => {
        fetch('http://localhost:5000/ballance_sheet/' + stockCode)
        .then(response => {
            return response.text();
            })
        .then(data => {
            setBallanceSheet(data);
        })
    }

    var cashFlow = (stockCode) => {
        fetch('http://localhost:5000/cash_flow/' + stockCode)
        .then(response => {
            return response.text();
            })
        .then(data => {
            setCashFlow(data);
        })
    }

    var getInfo = (stockCode) => {
        cashFlow(stockCode);
        incomeStatement(stockCode);
        balanceSheet(stockCode);
    }
    

    return (
      <motion.div><h1>Hello and welcome</h1>
      <br></br>
      <input type="text" value={stockCode} onChange={handleChange}></input><button type="submit" onClick={() => { getInfo(stockCode) }}>submit</button>
      <p>{stockCode}</p>
      <br></br>
      <div>
          <table>
              <tbody>
                <tr>
                    <th colSpan="6">Inputs</th>
                </tr>
                <tr>
                    <th>Year</th>
                    <th>-5</th>
                    <th>-4</th>
                    <th>-3</th>
                    <th>-2</th>
                    <th>-1</th>
                </tr>
                <tr>
                    <td>Total Cash Flow From Operating Activities</td>
                </tr>
                <tr>
                    <td>Capital Expenditures</td>
                </tr>
                <tr>
                    <td>Free Cash Flow to Equity</td>
                </tr>
                <tr>
                    <td>Net Income</td>
                </tr>
                <tr>
                    <td>FCFE/Net Income</td>
                </tr>
                <tr>
                    <td>Revenue</td>
                </tr>
                <tr>
                    <td>Growth Factors</td>
                </tr>
                <tr>
                    <td>Net Income Margin</td>
                </tr>
                <tr>
                    <td>Diluted Average Shares</td>
                </tr>
                <tr>
                    <td>Share change</td>
                </tr>
              </tbody>
          </table>
      </div>
      </motion.div>
    );
  }
  
  export default Main;