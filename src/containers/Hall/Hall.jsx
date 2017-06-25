import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'

import { requestHall } from '../../state/actions/hall'

import './Hall.css'

class Hall extends Component {
    static propTypes = {
        rows: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,

        requestHall: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        this.state = { selected: [] }
    }
    componentWillMount() {
        this.props.requestHall()
    }
    getTicketsSum() {
        let sum = 0
        this.state.selected.forEach((ticket) => sum += ticket.price)
        return sum
    }
    render() {
        if (this.props.loading) return null

        const handleBuy = () => {
        }

        const rows = this.props.rows.map((row) => {
            const sits = row.sits.map((sit) => {
                const handleOnClick = () => {
                    this.setState({
                        selected: [
                            ...this.state.selected,
                            {
                                id: `${row.number}_${sit.number}`,
                                row: row.number,
                                sit: sit.number,
                                price: sit.price,
                            },
                        ],
                    })
                }
                return <span className='sit' key={sit.number} onClick={handleOnClick}>{sit.number}</span>
            })
            return <div className='row' key={row.number}>{sits}</div>
        })

        const selected = this.state.selected.map((ticket) => {
            const handleClear = () => {
                this.setState({
                    selected: this.state.selected.filter((selectedItem) => selectedItem.id !== ticket.id),
                })
            }
            return (
                <div key={`${ticket.row}_${ticket.sit}`}>
                    {ticket.row} {ticket.sit} {ticket.price}
                    <span onClick={handleClear}>{'clear'}</span>
                </div>
            )
        })
        const ticketsSum = this.getTicketsSum()
        return (
            <div className='wrapper'>
                <div className='hall'>
                    <h1>{this.props.title}</h1>
                    <h2>{moment().format('dddd, MMMM Do')}</h2>
                    <div className='hallMap'>
                        <hr width='50%'/>
                        {'Screen'}
                        <div>{rows}</div>
                        <div>{selected}</div>
                        <div>{ticketsSum}</div>
                        <div onClick={handleBuy}>{'Buy'}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = ({ hall, movie }) => {
    const {
        rows,
        loading,
    } = hall

    const {
        data: {
            title,
        },
    } = movie

    return {
        rows,
        loading,
        title,
    }
}

const mapDispatchToProps = {
    requestHall,
}

export default connect(mapStateToProps, mapDispatchToProps)(Hall)
