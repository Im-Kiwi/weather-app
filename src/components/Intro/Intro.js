import React from 'react'
import city from '../../assets/city.svg'
import { Image, Row, Col, Card, Container } from 'react-bootstrap'
import classes from './Intro.module.css'

// this component will display the content in the home page
const Intro = props => {

    return (
        <div className = {[classes.intro, 'mt-5 '].join(' ')}>
            <div className = {classes.main}>
                <Container>
                    <Row className = {[classes.introRow, 'p-4 justify-content-center'].join(' ')}>
                        <Col className = 'my-auto'>
                            <h3 className = {['display-4 text-light', classes.introTitle].join(' ')}>
                                Get the weather information of your city on one click
                            </h3>
                        </Col>
                        <Col>
                            <Image className = {classes.introImage}  src = {city} alt = 'city'/>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div className = {classes.cardContainer}>
                <Card className = {[classes.card, 'text-secondary'].join(' ')}>
                    <Card.Title className = {classes.cardTitle}>Current Weather Report</Card.Title>
                    <Card.Text>
                        Includes current temperature, humidity, wind speed, sunrise & sunset time, weather description 
                    </Card.Text>
                </Card>
                <Card className = {[classes.card, classes.middleCard, 'text-light'].join(' ')}>
                    <Card.Title>Hourly Weather Report</Card.Title>
                    <Card.Text>Includes weather report of upcoming hours of a day. This contains the information of temperature, humidity, weather decription, windspeed</Card.Text>
                </Card>
                <Card className = {[classes.card, 'text-secondary'].join(' ')}>
                    <Card.Title className = {classes.cardTitle}>Daily Weather Report</Card.Title>
                    <Card.Text>Includes weather reports of upcoming days, upto 7. It contains the information of max and min temperature, day and night temperature, humidity, windspeed</Card.Text>
                </Card>
            </div>
        </div>
    )
}

export default Intro