import React from 'react'
import classes from './Now.module.css'
import { Image, Row, Col, Card, Badge } from 'react-bootstrap'
import fewClouds from '../../../assets/few-clouds.svg'
import { weatherIcons } from '../../../SVG/icons'
import { useLocation } from 'react-router-dom'
import { timeFormat } from '../../../commonMethods/timeFormat'

// this component used to display the current weather
const Now = (props) => {
    const weatherInfo = props.weatherInfo
    const currentTemp = weatherInfo.current.temp-273.15
    const humidity = weatherInfo.current.humidity
    const windSpeed = weatherInfo.current.wind_speed
    const sunrise = timeFormat(weatherInfo.current.sunrise * 1000)
    const sunset = timeFormat(weatherInfo.current.sunset * 1000)
    const visibility = weatherInfo.current.visibility/1000
    const findIcon = weatherIcons.find(weatherIcon => weatherIcon.id === weatherInfo.current.weather[0].icon)
    let icon
    if (findIcon) {
        icon = findIcon.icon
    }

    const isDayOrNight = weatherInfo.current.weather[0].icon[2]

    let dynamicTextColor = 'text-dark'

    if (isDayOrNight === 'n' ) {
        dynamicTextColor = 'text-light'
    }

    return (
        <div className = {classes.root}>
            <Card className = {classes.card} 
                style = {isDayOrNight === 'd' ? {background : 'linear-gradient(to right, #fbf7f4 50% ,#ffd166 50%)'} : {background: 'linear-gradient(to right, #fbf7f4 50% ,#2b2d42 50%)'} }
            >
                <Row className = 'm-auto'>
                    <Col>
                        <Image 
                                fluid
                                className = {[classes.weatherIcons, 'mr-5'].join(' ')} 
                                src = {icon} 
                                alt = ''
                        />
                    </Col>
                    <Col className = {['my-auto', dynamicTextColor, classes.cardSecondCol].join(' ')}>
                        <Card.Text className = {[classes.temp, 'lead'].join(' ')}><strong>{currentTemp.toFixed()} °C</strong></Card.Text>
                        <Card.Text className = {[classes.sideInfo, 'm-0'].join(' ')}>Humidity - <strong>{humidity.toFixed()} %</strong></Card.Text>
                        <Card.Text className = {[classes.sideInfo, 'm-0'].join(' ')}>Wind- <strong>{windSpeed.toFixed(1)} m/s</strong></Card.Text>
                        <Card.Text className = {[classes.sideInfo, 'm-0'].join(' ')}>
                            Sunrise- <strong>{!isNaN(sunrise.hour) ? sunrise.hour : '-'}:{!isNaN(sunrise.minute) ? sunrise.minute : '-'} AM</strong>
                        </Card.Text>
                        <Card.Text className = {[classes.sideInfo, 'm-0'].join(' ')}>
                            Sunset- <strong>{!isNaN(sunset.hour) ? sunset.hour : '-'}:{!isNaN(sunset.minute) ? sunset.minute : '-'} PM</strong></Card.Text>
                        <Card.Text className = {[classes.sideInfo, 'm-0'].join(' ')}>Visibility- <strong>{visibility} km</strong></Card.Text>
                    </Col>
                </Row>
                
                <Badge style = {{fontSize: '1.5rem'}} variant = 'info' className = {'mt-4 ' + classes.badgeDesc}>
                    {weatherInfo.current.weather[0].description}
                </Badge>                      
                    
            </Card>
        </div>  
    )
}

export default Now