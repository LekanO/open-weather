import React from 'react';
import { WeatherProps } from './types';
import './Weather.css';

const Weather: React.FC<WeatherProps> = ({
  weather,
  main,
  sys,
  name
}) => {

  let sunrise
  let sunset

  const sunTimeData = {
    sunrise: sys.sunrise,
    sunset: sys.sunset
  }
  const sunRiseNsetArr = Object.values(sunTimeData)

  const formatSunTime = (sunTime: number[]) => {
    sunTime.forEach((sun: number, index: number) => {
      const sunriseMilliseconds = sun * 1000
      const seconds = Math.floor((sunriseMilliseconds / 1000) % 60)
      const minutes = Math.floor((sunriseMilliseconds / 1000 / 60) % 60)
      const hours = Math.floor((sunriseMilliseconds / 1000 / 60 / 60) % 24)
      const formattedSunTime = [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
      ].join(":")
      if (index === 0) {
        return sunrise = formattedSunTime
      } else if (index === 1) {
        return sunset = formattedSunTime
      }
    })
  }

  formatSunTime(sunRiseNsetArr)

  const tempToString = String(main?.temp)
  const temperature = tempToString.substring(0,2)
  return (
    <div className="Weather">
      <div className='Weather-main'>
        <div className='Weather-info'>
          <h4 className='Weather-info-header'> Today's Temperation </h4>
          <p className='Weather-info-description'>{temperature} Celsius</p>
        </div>
        <div className='Weather-info'>
          <h4 className='Weather-info-header'> Main weather for {name} today is: </h4>
          <p className='Weather-info-description'>{weather[0].main}</p>
          <h4 className='Weather-info-header'> You should expect: </h4>
          <p className='Weather-info-description'> {weather[0].description} </p>
        </div>
        <div className='Weather-info'>
          <h4 className='Weather-info-header'> Sunrise is at </h4>
          <p className='Weather-info-description'>{sunrise} </p>
          <h4 className='Weather-info-header'> Sunset is at </h4> 
          <p className='Weather-info-description'> {sunset} </p>
        </div>
      </div>
    </div>
  )
};



export default Weather;
