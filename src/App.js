// import logo from "./logo.svg";
// import "./App.css";
import Countrylist from "./Countrylist";
import { useState, useEffect } from "react";
import Countrylisttwo from "./Countrylisttwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faExchange,
  faHandHoldingDollar,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleRadiation } from "@fortawesome/free-solid-svg-icons/faCircleRadiation";
import useFetch from "./useFetch";
import Loadingpage from "./Loadingpage";


function App() {

  // const { data, error, isPending, req }= useFetch(
  //   'https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json', 0
  // );
  const { data, error, isPending } = useFetch(
    "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json",
    0
  );
  // console.log(data);
  // console.log(error);
  const [amount, setAmout] = useState(""); //inout value
  const [output, setOutput] = useState(""); // calculted final value
const [loading, setLoading] =useState(true);

useEffect(()=>{
  const timer = setTimeout(()=>setLoading(false),
    4200);
return ()=>clearTimeout(timer);
  }
  ,[]);

  const [firstCoutry, setFirstCountry] = useState([]); // all the data from slected first field
  const getFirstCountry = (a) => {
    setFirstCountry(a);
  };
  let CountryA = firstCoutry[1];
  let FlagA = firstCoutry[0];
  let CurrencyA = firstCoutry[2];
  // second country
  const [secondCoutry, setSecondCountry] = useState([]);
  const getSecondCountry = (b) => {
    setSecondCountry(b);
  };
  let CountryB = secondCoutry[1];
  let FlagB = secondCoutry[0];
  let CurrencyB = secondCoutry[2];
  // all the selected data for second country
  useEffect(() => {
    if (data && amount && CurrencyA && CurrencyB) {
      try {
        const converted = convertCurrency(
          amount,
          CurrencyA,
          CurrencyB,
          data.eur
        );
        setOutput(converted);
      } catch (err) {
        console.error(err);
      }
    }
  }, [amount, CurrencyA, CurrencyB]); //getting the calculation

  // const handleConvert = () => {
  //   if (data && amount) {
  //     try {
  //       const converted = convertCurrency(
  //         amount,
  //         CurrencyA,
  //         CurrencyB,
  //         data.eur
  //       );
  //       setOutput(converted);
  //       console.log(`Converted amount: ${converted}`);
  //       console.log(output);
  //     } catch (err) {
  //       setOutput(err.message);
  //       console.error(err);
  //     }
  //   }
  // }; // calling the submit button

  const convertCurrency = (amount, CurrencyA, CurrencyB, rates) => {
    // console.log("Rates:", rates);
    // console.log("CurrencyA:", CurrencyA, "RateA:", rates[CurrencyA]);
    // console.log("CurrencyB:", CurrencyB, "RateB:", rates[CurrencyB]);// debugging the calculation and checking loopholes
    if (!CurrencyA || !CurrencyB || !rates) {
      throw new Error("Invalid currency codes or rates provided.");
    }
    const fromRate = parseFloat(rates[CurrencyA]);
    const toRate = parseFloat(rates[CurrencyB]);
    if (isNaN(fromRate) || isNaN(toRate)) {
      throw new Error("Invalid currency rates provided. NaN");
    }
    const convertedAmount = (parseFloat(amount) * toRate) / fromRate;
    return convertedAmount;
  }; // function that calculates all the conversion

  const handleinput = (e) => {
    let value = e.target.value;
    setAmout(value);
  }; // onchange handler for setting amount in input field

  const handleClear = (e) => {
    e.preventDefault();
    setAmout("");
    setOutput("");
  }; // clear all the data and set to default

  return (
    <>
    {loading ? (<Loadingpage />) : (
      <div className="content">
        <section className="app">
          <nav>
            <p>
              <FontAwesomeIcon icon={faHandHoldingDollar} beat />
            </p>
            <h1>
              <span></span>
              EXCHANGE 360
            </h1>
          </nav>
          <div className="el">
            <input
              type="number"
              placeholder="Please enter the Amount to exchange ..."
              value={amount}
              onChange={handleinput}
              required
            />
            <div className="sub">
              {
                /* <button className="btn " type="submit" onMouseDown={handleConvert}>
              {amount ? (
                <p>
                  Convert Now{" "}
                  <span>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                  </span>
                </p>
              ) : (
                "Enter An Amount"
              )}
            </button> */ ""
              }
              <button className="btn " type="submit" onClick={handleClear}>
                Clear{" "}
                <span>
                  <FontAwesomeIcon icon={faBroom} />
                </span>
              </button>
            </div>
          </div>
          <div className="flagger">
            <div className="items">
              <p>
                {FlagA ? (
                  <img src={`https://flagsapi.com/${FlagA}/flat/64.png`} />
                ) : (
                  <img src={`https://flagsapi.com/US/flat/64.png`} />
                )}
              </p>
              <p>{CountryA ? `${CountryA}` : "Select A Country"}</p>
              <p>
                <label htmlFor="currency">
                  <Countrylist getCountryA={getFirstCountry} />
                </label>
              </p>
            </div>
            <div className="items">
              TO
              <span>
                <FontAwesomeIcon icon={faExchange} />
              </span>
            </div>
            <div className="items">
              <p>
                {FlagB ? (
                  <img src={`https://flagsapi.com/${FlagB}/flat/64.png`} />
                ) : (
                  <img src={`https://flagsapi.com/IN/flat/64.png`} />
                )}
              </p>
              <p>{CountryB ? `${CountryB}` : "Select Another Country"}</p>
              <p>
                <label htmlFor="currency">
                  <Countrylisttwo getCountryB={getSecondCountry} />
                </label>
              </p>
            </div>
          </div>
          {!amount ? (
            <div className="result">Enter An Amount for Result </div>
          ) : (
            <div className="result">
              According to the current Exchange Rate
              <br />
              <br />
              <p>
                {CountryA ? (
                  <img src={`https://flagsapi.com/${FlagA}/flat/32.png`} />
                ) : (
                  <img src={`https://flagsapi.com/US/flat/32.png`} />
                )}
                "{amount}" {CurrencyA} of {CountryA}
                {"  "} will be equal to {"  "}{" "}
              </p>
              <p>
                {CountryB ? (
                  <img src={`https://flagsapi.com/${FlagB}/flat/32.png`} />
                ) : (
                  <img src={`https://flagsapi.com/IN/flat/32.png`} />
                )}
                "{output}" {CurrencyB} of {CountryB}
                {/* {output ? output : <span className="red">{!error ? "Click on Submit" :error } </span>}
                " of {CurrencyB !== "N/A" ? CurrencyB : CountryB + "n Currency"} */}
              </p>
            </div>
          )}
        </section>
      </div>
    )
  }
    </>
  );
}

export default App;
