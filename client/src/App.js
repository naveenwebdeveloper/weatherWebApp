//imorting style sheet
import './App.css';
//use dropdown packege for city inputs. 
import Select from 'react-select';
//use useState and useEffect packege
import { useState, useEffect } from 'react';


//Options in city for Select packege
const City = [
  { label: "New Delhi", value: 355 },
  { label: "Kolkata", value: 54 },
  { label: "Mumbai", value: 43 },
  { label: "Chennai", value: 61 }
];

//Function component 
function App() {

  //all useState for input in DOM
  const [cityIs, setCity] = useState("New Delhi");
  const [weatherData, setweatherData] = useState({});
  const [celsius, setCelsius] = useState(0);
  const [minTemp, setminTemp] = useState(0);
  const [maxTemp, setmaxTemp] = useState(0);
  const [weatherfom, setweatherFom] = useState();

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
    setweatherFom(data.weather[0].main);
    console.log(data.weather[0].main);

  }

  // useEffect for first render before DOM render
  useEffect(() => {
    fatchingData();
    console.log(weatherData);
  }, [cityIs]);




  // console.log(fatchingData());



  const cityChanged = (changedCity) => {
    setCity(changedCity.label);
  }
  //Return JSX
  return (
    <div className="App">
      <form id="form">
        <Select placeholder={cityIs} options={City} onChange={cityChanged} value={cityIs} />
        <div className="temp">
          <div className="designOnly"></div>
          <h1>{celsius}<sup>o</sup>C</h1>
          <div className="designOnly"></div>
        </div>
        <div className="Min-Max-temp">
          <h5>Min-temp {minTemp}<span> | </span>Max-temp {maxTemp}</h5>
        </div>
        <div className="wether-info">
          {weatherfom}
        </div>
      </form>
      <main id="main"></main>
    </div>
  );
}

export default App;
