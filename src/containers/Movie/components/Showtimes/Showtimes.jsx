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

        return <a href={`/hall/${showtime}`} className={className} key={showtime}>{showtime}</a>
    })

    return (
        <div>
            {`Today is ${moment().format('dddd, MMMM Do')}`}
            <div className='showtimesTimetable'>{showtimes}</div>
        </div>
    )
}

Showtimes.propTypes = {
    showtimes: PropTypes.array.isRequired,
}

export default Showtimes
