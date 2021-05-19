import React from 'react'
import { logo } from '../../SVG/SvgImages'
import { Image, Navbar, NavbarBrand, Row, Col, Container } from 'react-bootstrap'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'

// this component will show the app title and its logo
const Header = () => {
    const styleRow = 'text-center justify-content-center mt-5'
    
    return (
        <Container className = {classes.root}>
                <Navbar className = {[classes.nav, 'mt-3'].join(' ')}>
                   <div className = 'mx-auto'> 
                       <h1 className = {[classes.hiddenTitle, 'text-light'].join(' ')}>WEATHER CHECK</h1>
                   </div>
                    <Link to = '/'>   
                        <div className = {[classes.insideNav, ''].join(' ') }>
                            <Row className = {['justify-content-center', classes.introRow].join(' ')}>
                                <Col>
                                    <Image fluid className = {[classes.Logo].join(' ')} src = {logo} alt = 'logo'/>                
                                </Col>
                                <Col className = {classes.headerCol} >
                                    <NavbarBrand>
                                        <h1 className = {['text-light mt-2 mr-3', classes.header].join(' ')}>WEATHER CHECK</h1>
                                    </NavbarBrand>                
                                </Col>
                            </Row>
                        </div>
                    </Link>
                </Navbar>
        </Container>        
    )
}
    


export default Header