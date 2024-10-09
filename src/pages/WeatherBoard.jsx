
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthData } from '../store/slices/authUser/authUserSlice';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Weather from './WeatherData';
import { coordWeather, weatherByCity } from '../api/Weather';
import { toast } from 'react-toastify';
import Loader from '../components/loader/Loader';


const API_KEY = 'a7e237aeb43316767ba70bd4c67a9c47';
const API_KEY_COM = 'c239b15296f74e0da5075521240910';

const WeatherBoard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authSelector = useSelector(
    (state) => state.projectpulse.authUserReducer
  );
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          setError("Unable to retrieve your location. Please search for a city.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Please search for a city.");
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      const data = await coordWeather(lat,lon);
     
      setWeatherData(data);
      dispatch(addAuthData({...authSelector,city:data?.name}))
      setCity('')
      setError(null);
    } catch (err) {
      console.log("🚀 ~ fetchWeatherByCoords ~ err:", err)
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        setCity('')
        return
      }
     else if(data?.cod == 200){

       setWeatherData(data);
       setCity('')
       addRecentCity(data.name);
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
  const addRecentCity = (cityName) => {
    let updatedRecents = new Set(authSelector.recents ? [...authSelector.recents, cityName] : [cityName]);
    let updatedRecentsArray = Array.from(updatedRecents);
    if (updatedRecentsArray.length > 5) {
      updatedRecentsArray.shift(); 
    }
    dispatch(addAuthData({ ...authSelector, recents: updatedRecentsArray }));
  };
  
  const convertTemp = (temp) => {
    if (isCelsius) return temp;
    return (temp * 9) / 5 + 32;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ flexGrow: 1, marginRight: '10px', padding: '8px' }}
        />
        <button onClick={fetchWeather} disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Search
        </button>
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
      </div>

      {error && (
        <p style={{color: 'red', padding: '5px 0px',textAlign:'left' }}>
          {error}
        </p>
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

export default WeatherBoard;

