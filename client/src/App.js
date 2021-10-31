//imorting style sheet
import './App.css';
//use dropdown packege for city inputs. 
import Select from 'react-select';
//use useState and useEffect packege
import { useState, useEffect } from 'react';


//Options in city for Select packege
const City = [
  { label: "New Delhi" },
  { label: "Kolkata" },
  { label: "Mumbai" },
  { label: "Chennai" }
];

//Function component 
function App() {

  //all useState for input in DOM
  const [cityIs, setCity] = useState("New Delhi");
  const [weatherData, setweatherData] = useState({
    weather: [
      {
        main: ""
      }
    ]
  });
  const [celsius, setCelsius] = useState();
  const [minTemp, setminTemp] = useState();
  const [maxTemp, setmaxTemp] = useState();

  //using fatch api for connect with server
  const fatchingData = async () => {
    const res = await fetch("/api", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cityIs })
    })
    const data = await res.json();
    setweatherData(data);


    //convert Kalvin to celsius and use only one number after point
    setCelsius((data.main.temp - 273.15).toFixed(1));
    setmaxTemp((data.main.temp_max - 273.15).toFixed(1));
    setminTemp((data.main.temp_min - 273.15).toFixed(1));
    console.log(data.weather[0].main);

  }

  // useEffect for first render before DOM render
  useEffect(() => {
    fatchingData();
  }, [cityIs]);




  // console.log(fatchingData());



  const cityChanged = (changedCity) => {
    setCity(changedCity.label);
  }
  //Return JSX
  return (
    <div className="App">

      {!cityIs ? (
        <p>Data not found :( </p>
      ) : (
        <>

          <form id="form">
            <Select placeholder={cityIs} options={City} onChange={cityChanged} value={cityIs} />
            <div className="temp">
              <div className="designOnly" ></div>
              <h1>{celsius}<sup>o</sup>C</h1>
              <div className="designOnly" ></div>
            </div>
            <div className="Min-Max-temp">
              <h5>Min-temp {minTemp}<span> | </span>Max-temp {maxTemp}</h5>
            </div>
            <div className="wether-info">
              {weatherData.weather[0].main}
            </div>
          </form>
        </>
      )}
      <main id="main"></main>
    </div>
  );
}

export default App;
