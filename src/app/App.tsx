import React, { FormEvent, useState } from 'react';
import { AppProps } from './types';
import Weather from '../weather/Weather';
import { useAxios } from '../utils/useAxios';

import './App.css';

const App: React.FC<AppProps> = () => {

  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [loading, data, error, request] = useAxios<any>({ method: 'GET', url: `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=metric&appid=182792f4d6a55ae39ae743bf660220b5` }, false)

  const handleWeatherSearch = (e: FormEvent) => {
    e.preventDefault()
    request()
  }

  const loadingStatus = loading && <p className='Weather-title'>Loading ...</p>
  const currentWeather = !data ? <p className='App-title'> Type location to get current weather...</p> : <Weather weather={data.weather} main={data.main} sys={data.sys} name={data.name} />
  const errorMessage = error !== '' && <p className='App-title'>{error}</p>
  return (
    <div className="App">
      <header className="App-header">
        Current Weather App
      </header>
      <section>
        <form onSubmit={handleWeatherSearch}>
          <input type='text' name='location' value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} placeholder="Enter Location" />
        </form>
      </section>
      {loadingStatus}
      {errorMessage}
      {currentWeather}
    </div>
  )
};



export default App;
