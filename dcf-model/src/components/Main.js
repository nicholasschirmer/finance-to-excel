import React, { useState } from "react";
import "./Main.css";
import { motion } from "framer-motion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Paper } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { createTheme } from "@mui/material/styles";
import InputGroup from "react-bootstrap/InputGroup";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Main() {
  const [currCashFlow, setCashFlow] = useState();
  const [currIncomeStatement, setIncomeStatement] = useState([{}]);
  const [currBanllanceSheet, setBallanceSheet] = useState([{}]);
  const [isCashFlow, setIsCashFlow] = useState(false);
  const [isIncomeStatement, setIsIncomeStatement] = useState(false);
  const [isBallanceSheet, setIsBallanceSheet] = useState(false);
  const [showResults, setShowResponse] = useState(false);
  const [errorMsg, seterrorMsg] = useState("none");
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    desiredRORHigh: 0,
    desiredRORLow: 0,
    desiredRORMid: 0,
    fCFofnetIncHigh: 0,
    fCFofnetIncLow: 0,
    fCFofnetIncMid: 0,
    lTGrowthRateHigh: 0,
    lTGrowthRateLow: 0,
    lTGrowthRateMid: 0,
    profMargLow: 0,
    profMargMid: 0,
    profMarghigh: 0,
    revGrowthLow: 0,
    revGrowthMid: 0,
    revGrowthHigh: 0,
    riskFactorHigh: 0,
    riskFactorLow: 0,
    riskFactorMid: 0,
    shareDeltaHigh: 0,
    shareDeltaLow: 0,
    shareDeltaMid: 0,
  });

  const { register, handleSubmit } = useForm();

  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#1E1F1F",
      },
      secondary: {
        main: "#D0CFCF",
      },
    },
  });

  const [stockCode, setStockCode] = useState("");

  var handleChange = (e) => {
    setStockCode(e.target.value);
    setTimeout(() => {
      console.log(stockCode);
    }, 500);
  };

  var incomeStatement = (stockCode) => {
    fetch("http://localhost:5000/income_statement/" + stockCode)
      .then((response) => {
        console.log(stockCode);
        return response.text();
      })
      .then((data) => {
        if (data === []) {
          seterrorMsg("Stock ticker not found");
          setHasError(true);
        } else {
          setIncomeStatement(JSON.parse(data));
          setIsIncomeStatement(true);
          console.log(stockCode);
          console.log(data);
        }
      });
  };

  var balanceSheet = (stockCode) => {
    fetch("http://localhost:5000/ballance_sheet/" + stockCode)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data === []) {
          seterrorMsg("Stock ticker not found");
          setHasError(true);
        } else {
          setBallanceSheet(JSON.parse(data));
          setIsBallanceSheet(true);
        }
      });
  };

  var cashFlow = (stockCode) => {
    fetch("http://localhost:5000/cash_flow/" + stockCode)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data === []) {
          seterrorMsg("Stock ticker not found");
          setHasError(true);
        } else {
          setCashFlow(JSON.parse(data));
          setIsCashFlow(true);
        }
      });
  };

  var getInfo = (stockCode) => {
    console.log(stockCode);
    setFormData({
      desiredRORHigh: 0,
      desiredRORLow: 0,
      desiredRORMid: 0,
      fCFofnetIncHigh: 0,
      fCFofnetIncLow: 0,
      fCFofnetIncMid: 0,
      lTGrowthRateHigh: 0,
      lTGrowthRateLow: 0,
      lTGrowthRateMid: 0,
      profMargLow: 0,
      profMargMid: 0,
      profMarghigh: 0,
      revGrowthLow: 0,
      revGrowthMid: 0,
      revGrowthHigh: 0,
      riskFactorHigh: 0,
      riskFactorLow: 0,
      riskFactorMid: 0,
      shareDeltaHigh: 0,
      shareDeltaLow: 0,
      shareDeltaMid: 0,
    });
    setShowResponse(false);
    cashFlow(stockCode);
    incomeStatement(stockCode);
    balanceSheet(stockCode);
  };

  var getIteration = (init, iter, multi) => {
    let currentNum = init;
    for (let i = 0; i < iter; i++) {
      currentNum = currentNum * (1 + multi / 100);
    }
    return currentNum;
  };

  var onSubmit = (data) => {
    setFormData(data);
    console.log(data);
    setTimeout(() => {
      setShowResponse(true);
    }, 100);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className="Paper" color="dark">
        <motion.div>
          <h1 className="heading">DCF Model</h1>
          <br></br>
          {hasError && <p className="error">{errorMsg}</p>}
          <div id="stockCode">
            {/* <TextField
              label="Enter the Stock Ticker"
              variant="standard"
              size="small"
              value={stockCode}
              onChange={handleChange}
            />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                getInfo(stockCode);
              }}
            >
              submit
            </button> */}
            <InputGroup variant="dark">
              <FormControl
                varient="dark"
                placeholder="Stock Ticker"
                aria-label="Stock Ticker"
                value={stockCode}
                onChange={handleChange}
              />
              <Button
                variant="secondary"
                id="button-addon2"
                type="submit"
                onClick={() => {
                  getInfo(stockCode);
                }}
              >
                Submit
              </Button>
            </InputGroup>
          </div>
          <br></br>
          <Accordion
            disabled={
              !isCashFlow && !isBallanceSheet && !isIncomeStatement
                ? true
                : false
            }
            className="mt-dark"
            color="primary"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Data</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography></Typography>
              {isBallanceSheet === true &&
                isCashFlow === true &&
                isIncomeStatement === true && (
                  <div>
                    <table className="table table-striped table-dark">
                      <thead className="thead-dark">
                        <tr>
                          <th>Date</th>
                          <th>{currIncomeStatement[4].date}</th>
                          <th>{currIncomeStatement[3].date}</th>
                          <th>{currIncomeStatement[2].date}</th>
                          <th>{currIncomeStatement[1].date}</th>
                          <th>{currIncomeStatement[0].date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Total Cash Flow From Operating Activities</td>
                          <th>{currCashFlow[4].operatingCashFlow}</th>
                          <th>{currCashFlow[3].operatingCashFlow}</th>
                          <th>{currCashFlow[2].operatingCashFlow}</th>
                          <th>{currCashFlow[1].operatingCashFlow}</th>
                          <th>{currCashFlow[0].operatingCashFlow}</th>
                        </tr>
                        <tr>
                          <td>Capital Expenditures</td>
                          <th>{currCashFlow[4].capitalExpenditure}</th>
                          <th>{currCashFlow[3].capitalExpenditure}</th>
                          <th>{currCashFlow[2].capitalExpenditure}</th>
                          <th>{currCashFlow[1].capitalExpenditure}</th>
                          <th>{currCashFlow[0].capitalExpenditure}</th>
                        </tr>
                        <tr>
                          <td>Free Cash Flow to Equity</td>
                          <th>{currCashFlow[4].freeCashFlow}</th>
                          <th>{currCashFlow[3].freeCashFlow}</th>
                          <th>{currCashFlow[2].freeCashFlow}</th>
                          <th>{currCashFlow[1].freeCashFlow}</th>
                          <th>{currCashFlow[0].freeCashFlow}</th>
                        </tr>
                        <tr>
                          <td>Net Income</td>
                          <th>{currCashFlow[4].netIncome}</th>
                          <th>{currCashFlow[3].netIncome}</th>
                          <th>{currCashFlow[2].netIncome}</th>
                          <th>{currCashFlow[1].netIncome}</th>
                          <th>{currCashFlow[0].netIncome}</th>
                        </tr>
                        <tr>
                          <td>FCFE/Net Income</td>
                          <th>
                            {(
                              (currCashFlow[4].freeCashFlow /
                                currCashFlow[4].netIncome) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                          <th>
                            {(
                              (currCashFlow[3].freeCashFlow /
                                currCashFlow[3].netIncome) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                          <th>
                            {(
                              (currCashFlow[2].freeCashFlow /
                                currCashFlow[2].netIncome) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                          <th>
                            {(
                              (currCashFlow[1].freeCashFlow /
                                currCashFlow[1].netIncome) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                          <th>
                            {(
                              (currCashFlow[0].freeCashFlow /
                                currCashFlow[0].netIncome) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                        </tr>
                        <tr>
                          <td>Revenue</td>
                          <th>{currIncomeStatement[4].revenue}</th>
                          <th>{currIncomeStatement[3].revenue}</th>
                          <th>{currIncomeStatement[2].revenue}</th>
                          <th>{currIncomeStatement[1].revenue}</th>
                          <th>{currIncomeStatement[0].revenue}</th>
                        </tr>
                        <tr>
                          <td>Growth Factors</td>
                          <th></th>
                          <th>
                            {(
                              ((currIncomeStatement[3].revenue -
                                currIncomeStatement[4].revenue) /
                                currIncomeStatement[3].revenue) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                          <th>
                            {(
                              ((currIncomeStatement[2].revenue -
                                currIncomeStatement[3].revenue) /
                                currIncomeStatement[2].revenue) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                          <th>
                            {(
                              ((currIncomeStatement[1].revenue -
                                currIncomeStatement[2].revenue) /
                                currIncomeStatement[1].revenue) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                          <th>
                            {(
                              ((currIncomeStatement[0].revenue -
                                currIncomeStatement[1].revenue) /
                                currIncomeStatement[0].revenue) *
                              100
                            ).toFixed(2)}
                            %
                          </th>
                        </tr>
                        <tr>
                          <td>Net Income Margin</td>
                          <th>
                            {(
                              (currCashFlow[4].netIncome /
                                currIncomeStatement[4].revenue) *
                              100
                            ).toFixed(2)}
                          </th>
                          <th>
                            {(
                              (currCashFlow[3].netIncome /
                                currIncomeStatement[3].revenue) *
                              100
                            ).toFixed(2)}
                          </th>
                          <th>
                            {(
                              (currCashFlow[2].netIncome /
                                currIncomeStatement[2].revenue) *
                              100
                            ).toFixed(2)}
                          </th>
                          <th>
                            {(
                              (currCashFlow[1].netIncome /
                                currIncomeStatement[1].revenue) *
                              100
                            ).toFixed(2)}
                          </th>
                          <th>
                            {(
                              (currCashFlow[0].netIncome /
                                currIncomeStatement[0].revenue) *
                              100
                            ).toFixed(2)}
                          </th>
                        </tr>
                        <tr>
                          <td>Diluted Average Shares</td>
                          <th>
                            {currIncomeStatement[4].weightedAverageShsOutDil}
                          </th>
                          <th>
                            {currIncomeStatement[3].weightedAverageShsOutDil}
                          </th>
                          <th>
                            {currIncomeStatement[2].weightedAverageShsOutDil}
                          </th>
                          <th>
                            {currIncomeStatement[1].weightedAverageShsOutDil}
                          </th>
                          <th>
                            {currIncomeStatement[0].weightedAverageShsOutDil}
                          </th>
                        </tr>
                        <tr>
                          <td>Share change</td>
                          <th></th>
                          <th>
                            {(
                              (currIncomeStatement[3].weightedAverageShsOutDil /
                                currIncomeStatement[4]
                                  .weightedAverageShsOutDil) *
                              100
                            ).toFixed(2)}
                          </th>
                          <th>
                            {(
                              (currIncomeStatement[2].weightedAverageShsOutDil /
                                currIncomeStatement[4]
                                  .weightedAverageShsOutDil) *
                              100
                            ).toFixed(2)}
                          </th>
                          <th>
                            {(
                              (currIncomeStatement[1].weightedAverageShsOutDil /
                                currIncomeStatement[4]
                                  .weightedAverageShsOutDil) *
                              100
                            ).toFixed(2)}
                          </th>
                          <th>
                            {(
                              (currIncomeStatement[0].weightedAverageShsOutDil /
                                currIncomeStatement[4]
                                  .weightedAverageShsOutDil) *
                              100
                            ).toFixed(2)}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
            </AccordionDetails>
          </Accordion>
          <Accordion disabled={!isCashFlow ? true : false} className="mt-dark">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Valuation</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography></Typography>
              {isBallanceSheet && isCashFlow && isIncomeStatement && (
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="table table-striped table-dark">
                      <thead>
                        <tr>
                          <th></th>
                          <th colSpan="3">Historical</th>
                          <th colSpan="3">Assumptions</th>
                        </tr>
                        <tr>
                          <th></th>
                          <th>1 Year</th>
                          <th>2 Year</th>
                          <th>5 Year</th>
                          <th>Low</th>
                          <th>Middle</th>
                          <th>High</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Revenue Growth Per Annum</th>
                          <td>
                            {(
                              ((currIncomeStatement[0].revenue -
                                currIncomeStatement[1].revenue) /
                                currIncomeStatement[1].revenue) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              (Math.sqrt(
                                currIncomeStatement[0].revenue /
                                  currIncomeStatement[2].revenue
                              ) -
                                1) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              (Math.pow(
                                currIncomeStatement[0].revenue /
                                  currIncomeStatement[4].revenue,
                                1 / 4
                              ) -
                                1) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            <TextField
                              name="revGrowthLow"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Low"
                              variant="standard"
                              size="small"
                              {...register("revGrowthLow", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              name="revGrowthMid"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Middle"
                              variant="standard"
                              size="small"
                              {...register("revGrowthMid", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              name="revGrowthHigh"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="High"
                              variant="standard"
                              size="small"
                              {...register("revGrowthHigh", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Profit Margin</th>
                          <td>
                            {(
                              (currCashFlow[0].netIncome /
                                currIncomeStatement[0].revenue) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              ((currCashFlow[1].netIncome +
                                currCashFlow[0].netIncome) /
                                (currIncomeStatement[1].revenue +
                                  currIncomeStatement[0].revenue)) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              ((currCashFlow[4].netIncome +
                                currCashFlow[0].netIncome) /
                                (currIncomeStatement[4].revenue +
                                  currIncomeStatement[0].revenue)) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Low"
                              variant="standard"
                              size="small"
                              {...register("profMargLow", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Middle"
                              variant="standard"
                              size="small"
                              {...register("profMargMid", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="High"
                              variant="standard"
                              size="small"
                              {...register("profMargHigh", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>FCF % of Net Income</th>
                          <td>
                            {(
                              (currCashFlow[0].freeCashFlow /
                                currCashFlow[0].netIncome) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              ((currCashFlow[1].freeCashFlow +
                                currCashFlow[0].freeCashFlow) /
                                (currIncomeStatement[1].netIncome +
                                  currIncomeStatement[0].netIncome)) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              ((currCashFlow[4].freeCashFlow +
                                currCashFlow[3].freeCashFlow +
                                currCashFlow[2].freeCashFlow +
                                currCashFlow[1].freeCashFlow +
                                currCashFlow[0].freeCashFlow) /
                                (currIncomeStatement[4].netIncome +
                                  currIncomeStatement[3].netIncome +
                                  currIncomeStatement[2].netIncome +
                                  currIncomeStatement[1].netIncome +
                                  currIncomeStatement[0].netIncome)) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Low"
                              variant="standard"
                              size="small"
                              {...register("fCFofnetIncLow", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Middle"
                              variant="standard"
                              size="small"
                              {...register("fCFofnetIncMid", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="High"
                              variant="standard"
                              size="small"
                              {...register("fCFofnetIncHigh", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Share Change</th>
                          <td>
                            {(
                              (currIncomeStatement[1].weightedAverageShsOutDil /
                                currIncomeStatement[2]
                                  .weightedAverageShsOutDil -
                                1) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              (Math.sqrt(
                                currIncomeStatement[1]
                                  .weightedAverageShsOutDil /
                                  currIncomeStatement[3]
                                    .weightedAverageShsOutDil
                              ) -
                                1) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            {(
                              (Math.pow(
                                currIncomeStatement[1]
                                  .weightedAverageShsOutDil /
                                  currIncomeStatement[4]
                                    .weightedAverageShsOutDil,
                                1 / 4
                              ) -
                                1) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Low"
                              variant="standard"
                              size="small"
                              {...register("shareDeltaLow", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Middle"
                              variant="standard"
                              size="small"
                              {...register("shareDeltaMid", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="High"
                              variant="standard"
                              size="small"
                              {...register("shareDeltaHigh", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Long Term Growth Rate</th>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Low"
                              variant="standard"
                              size="small"
                              {...register("lTGrowthRateLow", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Middle"
                              variant="standard"
                              size="small"
                              {...register("lTGrowthRateMid", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="High"
                              variant="standard"
                              size="small"
                              {...register("lTGrowthRateHigh", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Desired Rate of Return</th>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Low"
                              variant="standard"
                              size="small"
                              {...register("desiredRORLow", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Middle"
                              variant="standard"
                              size="small"
                              {...register("desiredRORMid", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="High"
                              variant="standard"
                              size="small"
                              {...register("desiredRORHigh", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            Risk Factor (Probability of company existing in 10
                            years)
                          </th>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Low"
                              variant="standard"
                              size="small"
                              {...register("riskFactorLow", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="Middle"
                              variant="standard"
                              size="small"
                              {...register("riskFactorMid", { required: true })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                          <td>
                            <TextField
                              id="outlined-basic"
                              type="number"
                              className="valuationInput"
                              inputProps={{
                                step: "0.01",
                              }}
                              label="High"
                              variant="standard"
                              size="small"
                              {...register("riskFactorHigh", {
                                required: true,
                              })}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion disabled={!showResults ? true : false} className="mt-dark">
            <AccordionSummary>Results</AccordionSummary>
            <AccordionDetails>
              {showResults && (
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th>Low Assumptions</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                      <th>7</th>
                      <th>Perpetual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Revenue</th>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          1,
                          formData.revGrowthLow
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          2,
                          formData.revGrowthLow
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          3,
                          formData.revGrowthLow
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          4,
                          formData.revGrowthLow
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          5,
                          formData.revGrowthLow
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          6,
                          formData.revGrowthLow
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          7,
                          formData.revGrowthLow
                        ).toFixed(0)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Growth Assumption</th>
                      <td>{formData.revGrowthLow}%</td>
                      <td>{formData.revGrowthLow}%</td>
                      <td>{formData.revGrowthLow}%</td>
                      <td>{formData.revGrowthLow}%</td>
                      <td>{formData.revGrowthLow}%</td>
                      <td>{formData.revGrowthLow}%</td>
                      <td>{formData.revGrowthLow}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Profit Margin Assumption</th>
                      <td>{formData.profMargLow}%</td>
                      <td>{formData.profMargLow}%</td>
                      <td>{formData.profMargLow}%</td>
                      <td>{formData.profMargLow}%</td>
                      <td>{formData.profMargLow}%</td>
                      <td>{formData.profMargLow}%</td>
                      <td>{formData.profMargLow}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Net Income</th>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthLow
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>FCFE/Net Income Assumption</th>
                      <td>{formData.fCFofnetIncLow}%</td>
                      <td>{formData.fCFofnetIncLow}%</td>
                      <td>{formData.fCFofnetIncLow}%</td>
                      <td>{formData.fCFofnetIncLow}%</td>
                      <td>{formData.fCFofnetIncLow}%</td>
                      <td>{formData.fCFofnetIncLow}%</td>
                      <td>{formData.fCFofnetIncLow}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>FCFE Estimates</th>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100) *
                            (formData.lTGrowthRateLow / 100 + 1)) /
                          -(
                            1 -
                            ((1 + formData.desiredRORLow / 100) /
                              Math.pow(formData.riskFactorLow / 100, 1 / 10) -
                              formData.lTGrowthRateLow / 100)
                          ) /
                          100
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Required Rate of Return</th>
                      <td>{formData.desiredRORLow}%</td>
                      <td>{formData.desiredRORLow}%</td>
                      <td>{formData.desiredRORLow}%</td>
                      <td>{formData.desiredRORLow}%</td>
                      <td>{formData.desiredRORLow}%</td>
                      <td>{formData.desiredRORLow}%</td>
                      <td>{formData.desiredRORLow}%</td>
                      <td>{formData.desiredRORLow}%</td>
                    </tr>
                    <tr>
                      <th>Discount Factor</th>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 1).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 2).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 3).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 4).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 5).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 6).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 7).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORLow / 100 + 1, 7).toFixed(
                          2
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Present Value of Cash Flow</th>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 1) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 2) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 3) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 4) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 5) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 6) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100) *
                            (formData.lTGrowthRateLow / 100 + 1)) /
                          -(
                            1 -
                            ((1 + formData.desiredRORLow / 100) /
                              Math.pow(formData.riskFactorLow / 100, 1 / 10) -
                              formData.lTGrowthRateLow / 100)
                          ) /
                          100 /
                          Math.pow(formData.desiredRORLow / 100 + 1, 7)
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Probability of Cash Flow</th>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 2 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 3 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 4 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 5 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 6 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 7 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorLow / 100, 8 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr>
                      <th>Expected Cash Flow</th>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 1) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 2) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 3) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 4) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 5) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 6) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100) *
                            (formData.lTGrowthRateLow / 100 + 1)) /
                          (-(
                            1 -
                            ((1 + formData.desiredRORLow / 100) /
                              Math.pow(formData.riskFactorLow / 100, 1 / 10) -
                              formData.lTGrowthRateLow / 100)
                          ) /
                            100) /
                          (Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10)) /
                          10000
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Number of Shares</th>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 2)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 3)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 4)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 5)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 6)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 7)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 8)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaLow / 100, 8)
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Value per share</th>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 1) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 2))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 2) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 3))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 3) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 4))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 4) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 5))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 5) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 6))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 6) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 7))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 8))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100) *
                            (formData.lTGrowthRateLow / 100 + 1)) /
                          (-(
                            1 -
                            ((1 + formData.desiredRORLow / 100) /
                              Math.pow(formData.riskFactorLow / 100, 1 / 10) -
                              formData.lTGrowthRateLow / 100)
                          ) /
                            100) /
                          (Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10)) /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaLow / 100, 8)) /
                          10000
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <th>Instrinsic Value of Company</th>
                      <td colSpan="3">
                        {(formData.profMargLow *
                          getIteration(
                            currIncomeStatement[0].revenue,
                            1,
                            formData.revGrowthLow
                          ) *
                          (formData.fCFofnetIncLow / 100)) /
                          Math.pow(formData.desiredRORLow / 100 + 1, 1) /
                          Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                          100 +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 2) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 3) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 4) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 5) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 6) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100) *
                            (formData.lTGrowthRateLow / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORLow / 100) /
                                Math.pow(formData.riskFactorLow / 100, 1 / 10) -
                                formData.lTGrowthRateLow / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                              Math.pow(formData.riskFactorLow / 100, 1 / 10)) /
                            10000}
                      </td>
                      <th colSpan="2">Value of Share</th>
                      <td colSpan="3">
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 1) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 2)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 2) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 3)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 3) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 4)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 4) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 5)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 5) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 6)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 6) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 7)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 8)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100) *
                            (formData.lTGrowthRateLow / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORLow / 100) /
                                Math.pow(formData.riskFactorLow / 100, 1 / 10) -
                                formData.lTGrowthRateLow / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                              Math.pow(formData.riskFactorLow / 100, 1 / 10)) /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 8)) /
                            10000
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {showResults && (
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th>Middle Assumptions</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                      <th>7</th>
                      <th>Perpetual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Revenue</th>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          1,
                          formData.revGrowthMid
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          2,
                          formData.revGrowthMid
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          3,
                          formData.revGrowthMid
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          4,
                          formData.revGrowthMid
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          5,
                          formData.revGrowthMid
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          6,
                          formData.revGrowthMid
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          7,
                          formData.revGrowthMid
                        ).toFixed(0)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Growth Assumption</th>
                      <td>{formData.revGrowthMid}%</td>
                      <td>{formData.revGrowthMid}%</td>
                      <td>{formData.revGrowthMid}%</td>
                      <td>{formData.revGrowthMid}%</td>
                      <td>{formData.revGrowthMid}%</td>
                      <td>{formData.revGrowthMid}%</td>
                      <td>{formData.revGrowthMid}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Profit Margin Assumption</th>
                      <td>{formData.profMargMid}%</td>
                      <td>{formData.profMargMid}%</td>
                      <td>{formData.profMargMid}%</td>
                      <td>{formData.profMargMid}%</td>
                      <td>{formData.profMargMid}%</td>
                      <td>{formData.profMargMid}%</td>
                      <td>{formData.profMargMid}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Net Income</th>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthMid
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>FCFE/Net Income Assumption</th>
                      <td>{formData.fCFofnetIncMid}%</td>
                      <td>{formData.fCFofnetIncMid}%</td>
                      <td>{formData.fCFofnetIncMid}%</td>
                      <td>{formData.fCFofnetIncMid}%</td>
                      <td>{formData.fCFofnetIncMid}%</td>
                      <td>{formData.fCFofnetIncMid}%</td>
                      <td>{formData.fCFofnetIncMid}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>FCFE Estimates</th>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100) *
                            (formData.lTGrowthRateMid / 100 + 1)) /
                          -(
                            1 -
                            ((1 + formData.desiredRORMid / 100) /
                              Math.pow(formData.riskFactorMid / 100, 1 / 10) -
                              formData.lTGrowthRateMid / 100)
                          ) /
                          100
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Required Rate of Return</th>
                      <td>{formData.desiredRORMid}%</td>
                      <td>{formData.desiredRORMid}%</td>
                      <td>{formData.desiredRORMid}%</td>
                      <td>{formData.desiredRORMid}%</td>
                      <td>{formData.desiredRORMid}%</td>
                      <td>{formData.desiredRORMid}%</td>
                      <td>{formData.desiredRORMid}%</td>
                      <td>{formData.desiredRORMid}%</td>
                    </tr>
                    <tr>
                      <th>Discount Factor</th>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 1).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 2).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 3).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 4).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 5).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 6).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 7).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORMid / 100 + 1, 7).toFixed(
                          2
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Present Value of Cash Flow</th>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 1) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 2) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 3) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 4) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 5) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 6) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100) *
                            (formData.lTGrowthRateMid / 100 + 1)) /
                          -(
                            1 -
                            ((1 + formData.desiredRORMid / 100) /
                              Math.pow(formData.riskFactorMid / 100, 1 / 10) -
                              formData.lTGrowthRateMid / 100)
                          ) /
                          100 /
                          Math.pow(formData.desiredRORMid / 100 + 1, 7)
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Probability of Cash Flow</th>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 2 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 3 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 4 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 5 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 6 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 7 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorMid / 100, 8 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr>
                      <th>Expected Cash Flow</th>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 1) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 2) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 3) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 4) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 5) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 6) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100) *
                            (formData.lTGrowthRateMid / 100 + 1)) /
                          (-(
                            1 -
                            ((1 + formData.desiredRORMid / 100) /
                              Math.pow(formData.riskFactorMid / 100, 1 / 10) -
                              formData.lTGrowthRateMid / 100)
                          ) /
                            100) /
                          (Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10)) /
                          10000
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Number of Shares</th>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 2)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 3)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 4)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 5)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 6)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 7)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 8)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaMid / 100, 8)
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Value per share</th>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 1) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 2))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 2) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 3))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 3) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 4))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 4) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 5))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 5) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 6))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 6) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 7))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 8))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100) *
                            (formData.lTGrowthRateMid / 100 + 1)) /
                          (-(
                            1 -
                            ((1 + formData.desiredRORMid / 100) /
                              Math.pow(formData.riskFactorMid / 100, 1 / 10) -
                              formData.lTGrowthRateMid / 100)
                          ) /
                            100) /
                          (Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10)) /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaMid / 100, 8)) /
                          10000
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <th>Instrinsic Value of Company</th>
                      <td colSpan="3">
                        {(formData.profMargMid *
                          getIteration(
                            currIncomeStatement[0].revenue,
                            1,
                            formData.revGrowthMid
                          ) *
                          (formData.fCFofnetIncMid / 100)) /
                          Math.pow(formData.desiredRORMid / 100 + 1, 1) /
                          Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                          100 +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 2) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 3) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 4) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 5) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 6) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100) *
                            (formData.lTGrowthRateMid / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORMid / 100) /
                                Math.pow(formData.riskFactorMid / 100, 1 / 10) -
                                formData.lTGrowthRateMid / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                              Math.pow(formData.riskFactorMid / 100, 1 / 10)) /
                            10000}
                      </td>
                      <th colSpan="2">Value of Share</th>
                      <td colSpan="3">
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 1) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 2)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 2) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 3)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 3) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 4)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 4) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 5)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 5) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 6)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 6) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 7)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 8)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100) *
                            (formData.lTGrowthRateMid / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORMid / 100) /
                                Math.pow(formData.riskFactorMid / 100, 1 / 10) -
                                formData.lTGrowthRateMid / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                              Math.pow(formData.riskFactorMid / 100, 1 / 10)) /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 8)) /
                            10000
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
              {showResults && (
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th>High Assumptions</th>
                      <th>1</th>
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                      <th>5</th>
                      <th>6</th>
                      <th>7</th>
                      <th>Perpetual</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Revenue</th>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          1,
                          formData.revGrowthHigh
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          2,
                          formData.revGrowthHigh
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          3,
                          formData.revGrowthHigh
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          4,
                          formData.revGrowthHigh
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          5,
                          formData.revGrowthHigh
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          6,
                          formData.revGrowthHigh
                        ).toFixed(0)}
                      </td>
                      <td>
                        {getIteration(
                          currIncomeStatement[0].revenue,
                          7,
                          formData.revGrowthHigh
                        ).toFixed(0)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Growth Assumption</th>
                      <td>{formData.revGrowthHigh}%</td>
                      <td>{formData.revGrowthHigh}%</td>
                      <td>{formData.revGrowthHigh}%</td>
                      <td>{formData.revGrowthHigh}%</td>
                      <td>{formData.revGrowthHigh}%</td>
                      <td>{formData.revGrowthHigh}%</td>
                      <td>{formData.revGrowthHigh}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Profit Margin Assumption</th>
                      <td>{formData.profMargHigh}%</td>
                      <td>{formData.profMargHigh}%</td>
                      <td>{formData.profMargHigh}%</td>
                      <td>{formData.profMargHigh}%</td>
                      <td>{formData.profMargHigh}%</td>
                      <td>{formData.profMargHigh}%</td>
                      <td>{formData.profMargHigh}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>Net Income</th>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthHigh
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            )) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>FCFE/Net Income Assumption</th>
                      <td>{formData.fCFofnetIncHigh}%</td>
                      <td>{formData.fCFofnetIncHigh}%</td>
                      <td>{formData.fCFofnetIncHigh}%</td>
                      <td>{formData.fCFofnetIncHigh}%</td>
                      <td>{formData.fCFofnetIncHigh}%</td>
                      <td>{formData.fCFofnetIncHigh}%</td>
                      <td>{formData.fCFofnetIncHigh}%</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>FCFE Estimates</th>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100) *
                            (formData.lTGrowthRateHigh / 100 + 1)) /
                          -(
                            1 -
                            ((1 + formData.desiredRORHigh / 100) /
                              Math.pow(formData.riskFactorHigh / 100, 1 / 10) -
                              formData.lTGrowthRateHigh / 100)
                          ) /
                          100
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Required Rate of Return</th>
                      <td>{formData.desiredRORHigh}%</td>
                      <td>{formData.desiredRORHigh}%</td>
                      <td>{formData.desiredRORHigh}%</td>
                      <td>{formData.desiredRORHigh}%</td>
                      <td>{formData.desiredRORHigh}%</td>
                      <td>{formData.desiredRORHigh}%</td>
                      <td>{formData.desiredRORHigh}%</td>
                      <td>{formData.desiredRORHigh}%</td>
                    </tr>
                    <tr>
                      <th>Discount Factor</th>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 1).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 2).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 3).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 4).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 5).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 6).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 7).toFixed(
                          2
                        )}
                      </td>
                      <td>
                        {Math.pow(formData.desiredRORHigh / 100 + 1, 7).toFixed(
                          2
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>Present Value of Cash Flow</th>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 1) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 2) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 3) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 4) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 5) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 6) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100) *
                            (formData.lTGrowthRateHigh / 100 + 1)) /
                          -(
                            1 -
                            ((1 + formData.desiredRORHigh / 100) /
                              Math.pow(formData.riskFactorHigh / 100, 1 / 10) -
                              formData.lTGrowthRateHigh / 100)
                          ) /
                          100 /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 7)
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Probability of Cash Flow</th>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 2 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 3 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 4 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 5 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 6 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 7 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                      <td>
                        {(
                          Math.pow(formData.riskFactorHigh / 100, 8 / 10) * 100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                    <tr>
                      <th>Expected Cash Flow</th>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 1) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 2) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 3) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 4) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 5) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 6) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100) *
                            (formData.lTGrowthRateHigh / 100 + 1)) /
                          (-(
                            1 -
                            ((1 + formData.desiredRORHigh / 100) /
                              Math.pow(formData.riskFactorHigh / 100, 1 / 10) -
                              formData.lTGrowthRateHigh / 100)
                          ) /
                            100) /
                          (Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10)) /
                          10000
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Number of Shares</th>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 2)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 3)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 4)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 5)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 6)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 7)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 8)
                        ).toFixed(0)}
                      </td>
                      <td>
                        {(
                          currIncomeStatement[1].weightedAverageShsOutDil *
                          Math.pow(1 + formData.shareDeltaHigh / 100, 8)
                        ).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <th>Value per share</th>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 1) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 2))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 2) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 3))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 3) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 4))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 4) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 5))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 5) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 6))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 6) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 7))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 8))
                        ).toFixed(2)}
                      </td>
                      <td>
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100) *
                            (formData.lTGrowthRateHigh / 100 + 1)) /
                          (-(
                            1 -
                            ((1 + formData.desiredRORHigh / 100) /
                              Math.pow(formData.riskFactorHigh / 100, 1 / 10) -
                              formData.lTGrowthRateHigh / 100)
                          ) /
                            100) /
                          (Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10)) /
                          (currIncomeStatement[1].weightedAverageShsOutDil *
                            Math.pow(1 + formData.shareDeltaHigh / 100, 8)) /
                          10000
                        ).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <th>Instrinsic Value of Company</th>
                      <td colSpan="3">
                        {(formData.profMargHigh *
                          getIteration(
                            currIncomeStatement[0].revenue,
                            1,
                            formData.revGrowthHigh
                          ) *
                          (formData.fCFofnetIncHigh / 100)) /
                          Math.pow(formData.desiredRORHigh / 100 + 1, 1) /
                          Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                          100 +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 2) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 3) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 4) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 5) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 6) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100) *
                            (formData.lTGrowthRateHigh / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORHigh / 100) /
                                Math.pow(
                                  formData.riskFactorHigh / 100,
                                  1 / 10
                                ) -
                                formData.lTGrowthRateHigh / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                              Math.pow(formData.riskFactorHigh / 100, 1 / 10)) /
                            10000}
                      </td>
                      <th colSpan="2">Value of Share</th>
                      <td colSpan="3">
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 1) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 2)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 2) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 3)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 3) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 4)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 4) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 5)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 5) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 6)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 6) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 7)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 8)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100) *
                            (formData.lTGrowthRateHigh / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORHigh / 100) /
                                Math.pow(
                                  formData.riskFactorHigh / 100,
                                  1 / 10
                                ) -
                                formData.lTGrowthRateHigh / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                              Math.pow(formData.riskFactorHigh / 100, 1 / 10)) /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 8)) /
                            10000
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion disabled={!showResults ? true : false} className="mt-dark">
            <AccordionSummary>Discounted Cash Flow Value</AccordionSummary>
            <AccordionDetails>
              {showResults && (
                <table className="table table-striped table-dark">
                  <thead>
                    <tr>
                      <th>Low</th>
                      <th>Middle</th>
                      <th>High</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        $
                        {(
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 1) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 2)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 2) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 3)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 3) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 4)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 4) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 5)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 5) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 6)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 6) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 7)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100)) /
                            Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                            Math.pow(formData.riskFactorLow / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 8)) +
                          (formData.profMargLow *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthLow
                            ) *
                            (formData.fCFofnetIncLow / 100) *
                            (formData.lTGrowthRateLow / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORLow / 100) /
                                Math.pow(formData.riskFactorLow / 100, 1 / 10) -
                                formData.lTGrowthRateLow / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORLow / 100 + 1, 7) /
                              Math.pow(formData.riskFactorLow / 100, 1 / 10)) /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaLow / 100, 8)) /
                            10000
                        ).toFixed(2)}
                      </td>
                      <td>
                        $
                        {(
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 1) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 2)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 2) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 3)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 3) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 4)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 4) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 5)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 5) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 6)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 6) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 7)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100)) /
                            Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                            Math.pow(formData.riskFactorMid / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 8)) +
                          (formData.profMargMid *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthMid
                            ) *
                            (formData.fCFofnetIncMid / 100) *
                            (formData.lTGrowthRateMid / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORMid / 100) /
                                Math.pow(formData.riskFactorMid / 100, 1 / 10) -
                                formData.lTGrowthRateMid / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORMid / 100 + 1, 7) /
                              Math.pow(formData.riskFactorMid / 100, 1 / 10)) /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaMid / 100, 8)) /
                            10000
                        ).toFixed(2)}
                      </td>
                      <td>
                        $
                        {(
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              1,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 1) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 2)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              2,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 2) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 3)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              3,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 3) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 4)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              4,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 4) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 5)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              5,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 5) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 6)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              6,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 6) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 7)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100)) /
                            Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                            Math.pow(formData.riskFactorHigh / 100, 1 / 10) /
                            100 /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 8)) +
                          (formData.profMargHigh *
                            getIteration(
                              currIncomeStatement[0].revenue,
                              7,
                              formData.revGrowthHigh
                            ) *
                            (formData.fCFofnetIncHigh / 100) *
                            (formData.lTGrowthRateHigh / 100 + 1)) /
                            (-(
                              1 -
                              ((1 + formData.desiredRORHigh / 100) /
                                Math.pow(
                                  formData.riskFactorHigh / 100,
                                  1 / 10
                                ) -
                                formData.lTGrowthRateHigh / 100)
                            ) /
                              100) /
                            (Math.pow(formData.desiredRORHigh / 100 + 1, 7) /
                              Math.pow(formData.riskFactorHigh / 100, 1 / 10)) /
                            (currIncomeStatement[1].weightedAverageShsOutDil *
                              Math.pow(1 + formData.shareDeltaHigh / 100, 8)) /
                            10000
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </AccordionDetails>
          </Accordion>
        </motion.div>
      </Paper>
    </ThemeProvider>
  );
}

export default Main;
