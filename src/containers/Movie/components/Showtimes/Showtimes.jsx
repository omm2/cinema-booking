import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import FlatButton from 'material-ui/FlatButton';

import './Showtimes.css'

const Showtimes = props => {
    const showtimes = props.showtimes.map((showtime) => {
        const disabled = moment(showtime, 'hh:mm').isBefore(moment())

        const props = {
            key: showtime,
            label: showtime,
            disabled,
            secondary: !disabled,
            href: disabled ? '#' : `/hall/${showtime}`,
        }
        return (
            <FlatButton {...props} />
        )
    })

    return (
        <div>
            {`Today is ${moment().format('dddd, MMMM Do')}`}
            <ul className='showtimesTimetable'>{showtimes}</ul>
        </div>
    )
}

Showtimes.propTypes = {
    showtimes: PropTypes.array.isRequired,
}

export default Showtimes
