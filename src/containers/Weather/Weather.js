import React, { useState, useEffect, useRef, useCallback } from 'react'
import classes from './Weather.module.css'
import Forms from '../Form/Form'
import Intro from '../../components/Intro/Intro'
import Now from '../../components/Info/Now/Now'
import Hourly from '../../components/Info/Hourly/Hourly'
import Daily from '../../components/Info/Daily/Daily'
import NavComponent from '../../components/Nav/Nav'
import axios from 'axios'
import csc from 'country-state-city'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { Container, Alert } from 'react-bootstrap'

const Weather = props => {

    const [cityInput, setCityInput] = useState('')                              // query user gives in the input tag
    const [countryInput, setCountryInput] = useState('')                        // country input data given by the user   
    const [weatherInfo, setWeatherInfo] = useState({})                          // contains the weather information
    const [showTemp, setShowTemp] = useState(false)                             // set true to show weather data
    const [isInvalidCountry, setIsInvalidCountry] = useState(false)             // for country form validation
    const [isInvalidCity, setIsInvalidCity] = useState(false)                   // for city form validation
    const [incorrect, setIncorrect] = useState(false)                           // will turn true when user mention wrong country or city
    const [error, setError] = useState(false)                                   // turns true when there is an network error while fetching the data from a open weather server
    const [loading, setLoading] = useState(false)                               // use to display spinner

    const history = useHistory()
    const location = useLocation()
    const realCountryInput = useRef(null)

    // this will make sure the user navigate to '/' page when click on the logo 
    useEffect(() => {
        if (location.pathname === '/') {
            setShowTemp(false)
        }
    }, [location])

    // this method will bring the weather information once user click on the 'check' button
    const checkWeatherHandler = () => {

        if (countryInput.length !== 0 && cityInput.length !== 0) {
            setLoading(true)
            if (location.pathname === '/') {
                history.push('/now')    
            }

            const countryList = csc.getAllCountries()
            const countryName = countryInput.substring(5)
            const country = countryList.find(country => country.name === countryName)
            let cities
            if (country) {
                cities = csc.getCitiesOfCountry(country.isoCode)
            }
            const inputString = cityInput
            const pos = inputString.search(/ -/i)
            const query = cityInput.substring(0, pos)
            let currentCity
            if (cities) {
                currentCity = cities.find(city => city.name === query)
            }

            let lat
            let lon
            
            if (currentCity) {
                lat = currentCity.latitude
                lon = currentCity.longitude
                // setIncorrect(false)
            } else if (!currentCity && cityInput.length === 0) {
                // setIncorrect(false)
            } else if (cities && cities.length === 0) {
                lon = country.longitude
                lat = country.latitude
            } else if (!currentCity) {
                // setIncorrect(true)
            }
            
            setIsInvalidCountry(false)
            setIsInvalidCity(false)

            const apiKey = process.env.REACT_APP_API_KEY
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`)
                .then(response => {
                    setWeatherInfo(response.data)
                    setShowTemp(true)
                    setError(false)
                    setLoading(false)
                }).catch(err => {
                    setLoading(false)
                    if (err.response) {
                        setIncorrect(true)
                    } else {
                        setError(true)
                    }
                })
    
        } else if (countryInput.length === 0 && cityInput.length === 0) {
            setIsInvalidCity(true)
            setIsInvalidCountry(true)
        } else if (cityInput.length === 0) {
            setIsInvalidCity(true)
        }
    }

    // this method will update the value cityInput depending upon the input given by the user
    const changeCountryInputHandler = (event) => {
            setCountryInput(event.target.value)
            setShowTemp(false) 
            setCityInput('')

            /* this is used to make sure that when user enters query and if that query matches the list then the input value will be 
                updated which will be equal to matched value in the list */ 
            setTimeout(() => {
                const countries = csc.getAllCountries()
                let realInput = realCountryInput.current.value
                const tempInput = realInput.toLowerCase()
                const findCountry = countries.find(country => country.name.toLowerCase() === tempInput)
                if (realInput[2] !== ' ') {
                    if(findCountry) {
                        setCountryInput(`${findCountry.flag} ${findCountry.name}`)
                    }
                }
            }, 1000)
    }

    // this method will update the value cityInput depending upon the input given by the user
    const changeCityInputHandler = (event) => {
        if (countryInput) {
            setCityInput(event.target.value)
        }
        setShowTemp(false)
        setIsInvalidCity(false) 
    }

    // this method will execute once user click on the city input field
    const cityClickHandler = () => {
        if (countryInput.length === 0) {
            setIsInvalidCountry(true)
        } else {
            setIsInvalidCountry(false)
        }
    }

    // this method will execute once user click on country input field
    const countryClickHandler = useCallback(() => {
        if (countryInput.length !== 0) {
            setIsInvalidCountry(false)
        }
    },[countryInput.length])

    // this method will clear the input data in the input tag once clicked on the close button
    const clearInputHandler = (input) => {
        setError(false)
        setIncorrect(false)
        if (input === 'country') {
            setCountryInput('')
            setShowTemp(false)
            setCityInput('')
        } else {
            setCityInput('')
            setShowTemp(false)
        }
    }

    // this method will execute if a country doesnt have cities then city input value will automatically update to the country name
    const noCities = useCallback((country) => {
        setCityInput(country.name)
    }, [])

    return (
        <div className = {classes.Weather}>
            <Forms 
                countryInput = {countryInput}
                cityInput = {cityInput}
                changeCountryInputHandler = {changeCountryInputHandler}
                changeCityInputHandler = {changeCityInputHandler}
                checkWeatherHandler = {checkWeatherHandler}
                cityClickHandler = {cityClickHandler}
                countryClickHandler = {countryClickHandler}
                isInvalidCountry = {isInvalidCountry}
                isInvalidCity = {isInvalidCity}
                clearInputHandler = {clearInputHandler}
                realCountryInput = {realCountryInput}
                noCities = {noCities}
                incorrect = {incorrect}
                loading = {loading}
            />
            {error ? <Container><Alert className = 'mt-3' variant = 'danger'>Connection Failed, please try again later</Alert></Container> : null}
            {showTemp ? <NavComponent currentCity = {cityInput} cityInput = {cityInput} /> : null}
            {showTemp ?
                <div className = {[classes.Info, 'py-2'].join(' ')}>    
                    <Container className = {[classes.infoContainer].join(' ')}> 
                        <Switch>
                            <Route path= '/hourly' component = {() => (
                                <Hourly weatherInfo = {weatherInfo}  />
                            )} />
                            <Route path = '/daily' component = {() => (
                                <Daily weatherInfo = {weatherInfo} />
                            )} />
                            <Route path = '/now/' component = {() => (
                                <Now weatherInfo = {weatherInfo} />
                            )} />
                        </Switch>
                    </Container>         
                </div>
            : <Intro /> }
            {showTemp 
                ?   <Route exact path = '/now' 
                        render = {() => 
                            <div className = {classes.cardSupporter}
                                style = {weatherInfo.current.weather[0].icon[2] === 'd' ? {background : 'linear-gradient(to right, #fbf7f4 50% ,#ffd166 50%)'} : {background: 'linear-gradient(to right, #fbf7f4 50% ,#2b2d42 50%)'} }
                            > 
                            </div>
                        } 
                    /> 
                : null}            
        </div>
    )
}

export default Weather