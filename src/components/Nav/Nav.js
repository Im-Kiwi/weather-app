import React from'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'
import classes from './Nav.module.css'
    
const NavComponent = props => {

    // default tab will be active only when if it satisfies the below condition
    const location = useLocation()
    let activePath = location.pathname
    let active = null
    if (activePath === "/now") {
        active = '/now'
    } 

    return (
        <div className = 'mt-5'>
            <Nav variant = 'pills' defaultActiveKey = {active} className = 'justify-content-center'>
                <Nav.Item className = 'pr-2'>
                    <LinkContainer to = '/now'>
                        <Nav.Link className = {classes.item}>Now</Nav.Link>
                    </LinkContainer>  
                </Nav.Item>
                <Nav.Item className = 'pr-2'>
                    <LinkContainer to = '/hourly'>
                        <Nav.Link className = {classes.item}>Hourly</Nav.Link>
                    </LinkContainer> 
                </Nav.Item>
                <Nav.Item className = 'pr-2'>
                    <LinkContainer to = '/daily'>
                        <Nav.Link className = {classes.item}>Daily</Nav.Link>
                    </LinkContainer> 
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default NavComponent