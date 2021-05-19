import React from 'react'
import { Card, Image, Row, Col, Badge } from 'react-bootstrap'
import classes from './Hourly.module.css'
import { weatherIcons } from '../../../SVG/icons'
import { timeFormat } from '../../../commonMethods/timeFormat'

// this component displays the weather report of upcoming hours 
const Hourly = props => {

    const hourlyInfo = props.weatherInfo.hourly
    const filteredInfo = hourlyInfo.filter((info, index) => {
        const time = timeFormat(info.dt*1000)
        return (time.hour % 3 === 0 && index < 24) 
    })
    const updatedHourlyInfo = filteredInfo.map((info, index) => {
        const time = timeFormat(info.dt * 1000)
        const temp = info.temp-273.15
        const humidity = info.humidity
        const visibility = info.visibility/1000
        const wind = info.wind_speed

        // display weather icon dynamically
        const findIcon = weatherIcons.find(icon => icon.id === info.weather[0].icon)
        let icon
        if (findIcon) {
            icon = findIcon.icon
        }

        let dynamicTextColor

        // to change the text color depending upon whether its day or night
        if (info.weather[0].icon[2] === 'n') {
            dynamicTextColor = 'text-light'
        }

        return (
            <div key = {index} className = 'p-2'>
                <Card  className = {[classes.cards, 'p-3'].join(' ')}
                    style = {info.weather[0].icon[2] === 'd' ? {background : 'linear-gradient(to right ,#ffd166 50%, #fbf7f4 50%)'} : {background: 'linear-gradient(to right, #2b2d42 50%, #fbf7f4 50%)'} }
                >
                    <Card.Title>
                        <Badge className = {[classes.titleBadge, 'text-light'].join(' ')}>{time.hour}:00 {time.stamp}</Badge>
                    </Card.Title>            
                    <Row>
                        <Col xs = {7} className = {[classes.textConfig, dynamicTextColor].join(' ')}>
                            <Card.Text>humidity- <strong>{humidity} %</strong></Card.Text>
                            <Card.Text>visibility- <strong>{visibility.toFixed()} km</strong></Card.Text>
                            <Card.Text>Wind- <strong>{wind.toFixed(1)} m/s</strong></Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className = {classes.temp}><strong>{temp.toFixed()} °C</strong></Card.Text>
                            <Image className = {classes.image} src = {icon} fluid />
                        </Col>
                    </Row>
                    <Badge style = {{fontSize: '1rem'}} variant = 'info'>{info.weather[0].description}</Badge>
                </Card>   
            </div>
        )
    })


    return (
        <div className = {classes.container}>
            {updatedHourlyInfo}
        </div>
    )
}

export default Hourly