import React from 'react'
import classNames from 'classnames'

import './Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isSubmenuOpened: false }
        this.handleToggleSubmenu = this.handleToggleSubmenu.bind(this)
    }
    handleToggleSubmenu() {
        this.setState({ isSubmenuOpened: !this.state.isSubmenuOpened })
    }
    render() {
        const submenuClasses = classNames('submenu', {
            'submenu-isOpened': this.state.isSubmenuOpened,
        })
        return (
            <header className='header'>
                <div className='header-item-menu'>
                    <i className='material-icons md-36 header-menu' onClick={this.handleToggleSubmenu}>{'menu'}</i>
                </div>
                <div className='header-item'>{'Movies'}</div>
                <div className='header-item'>{'Coming Soon'}</div>
                <div className='header-item-main'>{'Awesome Cinema'}</div>
                <div className='header-item'>{'Location'}</div>
                <div className='header-item'>{'About'}</div>
                <div className={submenuClasses}>
                    <div className='submenu-item'>{'Movies'}</div>
                    <div className='submenu-item'>{'Coming Soon'}</div>
                    <div className='submenu-item'>{'Location'}</div>
                    <div className='submenu-item'>{'About'}</div>
                </div>
            </header>
        )
    }
}

Header.propTypes = {
}

export default Header
