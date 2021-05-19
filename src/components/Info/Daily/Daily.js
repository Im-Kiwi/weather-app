import React from 'react'
import { Card, Row, Col, Badge, CardColumns, Image } from 'react-bootstrap'
import { haze } from '../../../SVG/SvgImages'
import classes from './Daily.module.css'
import { weatherIcons } from '../../../SVG/icons'

// used to display the daily weather report for next 7 days
const Daily = props => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dailyInfo = props.weatherInfo.daily
 
    const updateDailyInfo = dailyInfo.map((info, id) => {
        const time = new Date(info.dt*1000)
        const dayIndex = time.getDay()
        const day = days[dayIndex]
        const maxTemp = info.temp.max - 273.15
        const minTemp = info.temp.min - 273.15
        const noonTemp = info.temp.day - 273.15
        const nightTemp = info.temp.night - 273.15

        // finding the appropriate object inside the weatherIcons
        const findIcon = weatherIcons.find(icon => icon.id === info.weather[0].icon)
        let icon

        // if the object is found then extracting the icon image from that and storing it in icon variable
        if (findIcon) {
            icon = findIcon.icon
        }

        return (
            <div key = {id} className = 'p-2'>
                <Card  className = {classes.cards}>
                    <Card.Title>
                        <Badge className = {[classes.titleBadge, 'text-light'].join(' ')}>{day}</Badge>
                    </Card.Title>
                        <Row>
                            <Col>
                                <Card.Text className = {classes.temp}>
                                    <strong>{maxTemp.toFixed()}°</strong>/<strong>{minTemp.toFixed()}°C</strong>
                                </Card.Text>   
                                <Card.Img className = {classes.image} src = {icon}  />
                            </Col>
                            <Col className = {classes.textConfig}>
                                <Card.Text>Day- <strong>{noonTemp.toFixed()}°C</strong></Card.Text>
                                <Card.Text>Night- <strong>{nightTemp.toFixed()}°C</strong></Card.Text>
                                <Card.Text>Humidity- <strong>{info.humidity} %</strong></Card.Text>    
                                <Card.Text>Wind- <strong>{info.wind_speed.toFixed(1)} m/s</strong> </Card.Text>
                            </Col>
                        </Row>   
                        <Badge variant = 'info' style = {{fontSize: '1rem'}}>
                            {info.weather[0].description}
                        </Badge>
                </Card>            
            </div>
        )
    })

    return (
        <div className = {classes.root}>
         {updateDailyInfo}
        </div>
    )
}

export default Daily