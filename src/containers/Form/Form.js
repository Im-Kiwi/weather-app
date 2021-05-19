import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Badge, InputGroup, Alert } from 'react-bootstrap'
import classes from  './Form.module.css'
import csc from 'country-state-city'
import { toNonLatin } from '../../commonMethods/latinToNonLatin'
import Spinner from '../../components/UI/Spinner/Spinner'

// this component helps to display the form inputs which is country input field, city input field and a check button
const Forms = props => {
    const [cities, setCities] = useState([])        // list of cities to be displayed once user clicks on city input
    const countryList = csc.getAllCountries()       // fetches all countries

    useEffect (() => {
        const countryName = props.countryInput.substring(5) //fetching country name from the country input given by the user
        // finding the country from the country list
        const country = countryList.find(country => country.name === countryName) 

        let citiesIncludingStates

        //this method to make sure to remove the feedback message from the country form when user changes the value
        props.countryClickHandler() 

        // if the country is found then fetch the cities 
        if (country) {
            const states = csc.getStatesOfCountry(country.isoCode)
            const cities = csc.getCitiesOfCountry(country.isoCode)
            
            if(cities.length !== 0) {
                citiesIncludingStates = cities.map(city => {

                    // to change some latin names into non latin names
                    const newCityName = toNonLatin(city)
                    city.name = newCityName

                    const currentState = states.find(state => state.isoCode === city.stateCode)
                    return {
                        city : city,
                        state : currentState
                    }
                })
                setCities(citiesIncludingStates)
            } else {
                props.noCities(country) // if no cities found the country name will be the city name
            }
        } else {
            setCities([])
        }
        
    }, [props.countryInput])

    return (
            <Container>
                <Form>
                    <Row className = {[classes.root,'justify-content-center'].join(' ')}>
                        <Col md className = {classes.formCol}>
                            <InputGroup>
                                <Form.Control isInvalid = {props.isInvalidCountry}
                                    type = 'search' placeholder = 'Enter Country' list = 'country' className = {classes.form}
                                    onChange = {event => props.changeCountryInputHandler(event)}
                                    onClick = {props.countryClickHandler}
                                    value = {props.countryInput}
                                    ref = {props.realCountryInput}
                                />                                
                                <InputGroup.Append>
                                    {props.countryInput
                                    ?   <Button variant = 'link' className = {classes.close}
                                            onClick = {() => {props.clearInputHandler('country')}}
                                        >
                                            <i className = "fas fa-times"></i>
                                        </Button>
                                    : null }
                                        
                                </InputGroup.Append>                                                                
                                <Form.Control.Feedback type = 'invalid'>Country is not mentioned</Form.Control.Feedback>
                                <datalist id = 'country' >
                                    {countryList.map(country => {
                                        return (
                                            <option  key = {country.name}>
                                                {country.flag} {country.name}
                                            </option>
                                        ) 
                                    })}
                                </datalist>
                            </InputGroup>
                        </Col>
                        <Col md className = {classes.formCol}>
                            <InputGroup>
                                <Form.Control isInvalid = {props.isInvalidCity}
                                    type = 'search' placeholder = 'Enter City' list = 'cities' className = {classes.form}
                                    onChange = {event => props.changeCityInputHandler(event)}
                                    onClick = {props.cityClickHandler}
                                    value = {props.cityInput}
                                />
                                <InputGroup.Append>
                                {props.cityInput.length !== 0
                                    ?   <Button className = {classes.close} variant = 'link'
                                            onClick = {() => {props.clearInputHandler('city')}}
                                        >
                                            <i className = "fas fa-times"></i>
                                        </Button>
                                    : null} 
                                </InputGroup.Append>
                                <Form.Control.Feedback type = 'invalid'>City is not mentioned</Form.Control.Feedback>
                            </InputGroup>                            
                            <datalist id = 'cities'>
                                {cities.map((city,index) => {
                                    return (
                                        <option key = {index}>
                                            {city.city.name} - {city.state.name}
                                        </option>
                                    )
                                })}
                            </datalist>
                        </Col>
                        <Col md = {2} className = {classes.formCol}>
                            <Button
                                variant = 'outline-info'
                                className = {classes.checkButton}    
                                onClick = {props.checkWeatherHandler}
                            >Check</Button>
                        </Col>
                    </Row>
                </Form>
                {props.incorrect ? <Alert className = 'mt-3' variant = 'danger'>Invalid city or country, please enter valid information</Alert> : null}
                {props.loading ? <Spinner /> : null}
            </Container>
    )
}

export default Forms