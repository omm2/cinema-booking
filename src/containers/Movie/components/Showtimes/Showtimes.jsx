import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import './Showtimes.css'

class Showtimes extends Component {
    constructor(props) {
        super(props)
        this.state = { selected: 'today' }
    }

    setFilter(param) {
        return () => {
            this.setState({ selected: param })
        }
    }

    getDays() {
        if (this.state.selected === 'today') {
            return [
                {
                    date: moment(),
                    dayTimetable: this.props.timetable[0],
                },
            ]
        }
        if (this.state.selected === 'tomorrow') {
            return [
                {
                    date: moment().add(1, 'days'),
                    dayTimetable: this.props.timetable[1],
                },
            ]
        }
        return this.props.timetable.map((day, idx) => ({
            date: moment().add(idx, 'days'),
            dayTimetable: this.props.timetable[idx],
        }))
    }

    getShowtimes(showtimes, type, day) {
        return showtimes.map((showtime) => {
            const disabled = moment(showtime, 'hh:mm').isBefore(moment())

            const props = {
                label: showtime,
                disabled,
                secondary: !disabled,
                href: disabled ? '#' : `/hall/${showtime}`,
                backgroundColor: '#4fc3f7',
                style: { color: '#fff', margin: '5px 12px' },
            }
            return (
                <FlatButton {...props} key={`${showtime}_${day}_${type}`} />
            )
        })
    }

    render() {
        const days = this.getDays()
        const timetable = days.map(({ date, dayTimetable }) => (
            <div className='day' key={date.format()}>
                {date.format('dddd, MMMM Do')}
                {
                    dayTimetable.map((type) => (
                        <div className='typeLine' key={`${type.name}_${date.format()}`}>
                            <div className='type'>{type.name}</div>
                            {this.getShowtimes(type.showtimes, type.name, date.format())}
                        </div>
                    ))
                }
            </div>
        ))
        const buttonStyle = {
            margin: 12,
        }
        return (
            <div className='container'>
                <div className='filter'>
                    <RaisedButton label='Today' onClick={this.setFilter('today')} style={buttonStyle} />
                    <RaisedButton label='Tomorrow' onClick={this.setFilter('tomorrow')} style={buttonStyle} />
                    <RaisedButton label='Week' onClick={this.setFilter('week')} style={buttonStyle} />
                </div>
                {timetable}
            </div>
        )
    }
}

Showtimes.propTypes = {
    timetable: PropTypes.array.isRequired,
}

export default Showtimes
