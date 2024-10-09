
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthData } from '../store/slices/authUser/authUserSlice';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Weather from './WeatherData';
import { weatherByCity } from '../api/Weather';
import { toast } from 'react-toastify';
import Loader from '../components/loader/Loader';


const API_KEY = 'a7e237aeb43316767ba70bd4c67a9c47';
const API_KEY_COM = 'c239b15296f74e0da5075521240910';

const SearchHistory = () => {
    const {city} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authSelector = useSelector(
    (state) => state.projectpulse.authUserReducer
  );
//   const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

 
useEffect(() =>{
    fetchWeather()
},[city])

const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    try {
      const data = await weatherByCity(city);
      if(data?.cod == 404){
        toast.error(data?.message)
        return
      }
      else if(data?.cod == 200){
     setWeatherData(data);
    setError(null);
      }
      else{
       toast.error(data?.message)
      }
     
    
    } catch (err) {
      console.log("🚀 ~ fetchWeather ~ err:", err)
     
    } finally {
      setLoading(false);
    }
  };

  const convertTemp = (temp) => {
    if (isCelsius) return temp;
    return (temp * 9) / 5 + 32;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
       
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <span>°C</span>
          <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px', marginLeft: '10px', marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={!isCelsius}
              onChange={() => setIsCelsius(!isCelsius)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#4caf50',
              transition: '.4s',
              borderRadius: '34px',
            }}>
              <span style={{
                position: 'absolute',
                content: '""',
                height: '26px',
                width: '26px',
                left: '4px',
                bottom: '4px',
                backgroundColor: 'white',
                transition: '.4s',
                borderRadius: '50%',
                transform: isCelsius ? 'translateX(0px)' : 'translateX(26px)',
              }}></span>
            </span>
          </label>
          <span>°F</span>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => { navigate('/') }}>Go back</button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#f44336', color: 'white', padding: '10px', marginBottom: '20px' }}>
          {error}
        </div>
      )}
{
    loading ? (<Loader/>) :(
        <>
{weatherData && (
        <>
     
        <Weather weatherData={weatherData} isCelsius={isCelsius} convertTemp={convertTemp}/>
        </>
      )}
        </>
    )
}
    </div>
  );
};

export default SearchHistory;

