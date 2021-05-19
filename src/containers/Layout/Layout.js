import React, { Component } from 'react'
import Header from '../../components/Header/Header.js'
import Weather from '../Weather/Weather.js'

class Layout extends Component {

    render () {

        return (
        <>
            <Header />
            <Weather/>
            <div style = {{height: '100px'}}> </div>
        </>
        )
    }
}

export default Layout