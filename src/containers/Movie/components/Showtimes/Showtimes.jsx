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

    isFilterSelected(param) {
        return this.state.selected === param
    }

    getShowtimes(showtimes, type, day) {
        return showtimes.map((showtime) => {
            const disabled = moment(showtime, 'hh:mm').isBefore(moment())

            const props = {
                label: showtime,
                disabled,
                secondary: !disabled,
                href: disabled ? '#' : `/hall/${showtime}`,
                backgroundColor: disabled ? '#e1e2e1' : '#4fc3f7',
                hoverColor: '#0093c4',
                style: { color: '#fff', margin: '5px 12px' },
            }
            return (
                <FlatButton {...props} key={`${showtime}_${day}_${type}`}/>
            )
        })
    }

    render() {
        const days = this.getDays()
        const timetable = days.map(({ date, dayTimetable }) => (
            <div className='showtimes-day' key={date.format()}>
                {date.format('dddd, MMMM Do')}
                {
                    dayTimetable.map((type) => (
                        <div className='showtimes-typeLine' key={`${type.name}_${date.format()}`}>
                            <div className='showtimes-type'>{type.name}</div>
                            {this.getShowtimes(type.showtimes, type.name, date.format())}
                        </div>
                    ))
                }
            </div>
        ))

        const getButtonProps = (filterParam) => ({
            style: {
                margin: 12,
            },
            backgroundColor: this.isFilterSelected(filterParam) ? '#4fc2f7' : '',
            onClick: this.setFilter(filterParam),
        })

        return (
            <div className='showtimes-container'>
                <div className='showtimes-filter'>
                    <RaisedButton label='Today' {...getButtonProps('today')} />
                    <RaisedButton label='Tomorrow' {...getButtonProps('tomorrow')} />
                    <RaisedButton label='Week' {...getButtonProps('week')} />
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
