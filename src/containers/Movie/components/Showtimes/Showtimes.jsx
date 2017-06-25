import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'

import './Showtimes.css'

const Showtimes = props => {
    const showtimes = props.showtimes.map((showtime) => {
        const disabled = moment(showtime, 'hh:mm').isBefore(moment())
        const className = classNames({
            disabled: disabled,
        })

        return <li className={className} key={showtime}><a href={`/hall/${showtime}`}>{showtime}</a></li>
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
