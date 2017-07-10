import React from 'react'

import './Header.css'

const Header = () => (
    <header className='header'>
        <div className='header-item'>{'Movies'}</div>
        <div className='header-item'>{'Coming Soon'}</div>
        <div className='header-item'>{'Location'}</div>
        <div className='header-item'>{'About'}</div>
        <div className='header-item-main'>{'Awesome Cinema'}</div>
    </header>
)

Header.propTypes = {
}

export default Header
