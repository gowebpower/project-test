// Weather Forcast Api
// https://home.openweathermap.org/api_keys 

// This is sorely for ajax request for browser. This work almost identically to jQuery Ajax function.
import axios from 'axios';

const apiKey = 'eecf5704b7442068ec7902734cc28154';
// const rootUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + apiKey ;

// this is es6 syntax
const rootUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}`;

// Why do i need export here? cant I just use const in featchWeather function below?
export const fetch_Weather = 'Featch Weather';

export function fetchWeather(city){
 
  const fullURL = `${rootUrl}&q=${city},us`;
  const request = axios.get(fullURL);

/*  console.log('Request:', request);*/

  return { 
    type: fetch_Weather,
    payload: request
  };
}


