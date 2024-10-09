import axios from "axios";
const API_KEY = 'a7e237aeb43316767ba70bd4c67a9c47';
const API_KEY_COM = 'c239b15296f74e0da5075521240910';

export const forcast7Day = async(city)=>{
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY_COM}&q=${city}&days=7`);
      const data = await response.json();
      console.log('data of forcast',data);
      return data;
    } catch (err) {
      console.log('error',err);
    }
  }
  export const coordWeather = async(lat,lon)=>{
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      console.log('data of forcast',data);
      return data;
    } catch (err) {
      console.log('error',err);
    }
  }

  export const weatherByCity = async(city)=>{
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    //   if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      
      return data;
    } catch (err) {
        console.log('error----------',err);
        return err
    }
  }
  