import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import RaisedButton from 'material-ui/RaisedButton'

import { requestMovie } from '../../state/actions/movie'
import { requestHall } from '../../state/actions/hall'
import PurchaseDialog from './components/PurchaseDialog/PurchaseDialog'

import './Hall.css'

class Hall extends Component {
    static propTypes = {
        rows: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,

        requestHall: PropTypes.func.isRequired,
        requestMovie: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        this.state = { selected: [], purchaseDialogIsOpen: false }
    }
    componentWillMount() {
        this.props.requestHall()
        this.props.requestMovie()
    }
    getTicketsSum() {
        let sum = 0
        this.state.selected.forEach((ticket) => sum += ticket.price)
        return sum
    }
    removeTicket(ticketId) {
        this.setState({
            selected: this.state.selected.filter((selectedItem) => selectedItem.id !== ticketId),
        })
    }
    addTicket(row, sit) {
        const id = `${row.number}_${sit.number}`
        this.setState({
            selected: [
                ...this.state.selected,
                {
                    id,
                    row: row.number,
                    sit: sit.number,
                    price: sit.price,
                },
            ],
        })
    }
    render() {
        if (this.props.loading) return null

        const ticketsSum = this.getTicketsSum()
        const handleBuy = () => {
            if (ticketsSum === 0) return
            this.setState({ purchaseDialogIsOpen: true })
        }

        const handleClosePurchaseDialog = () => {
            this.setState({ purchaseDialogIsOpen: false })
        }

        const rows = this.props.rows.map((row) => {
            const sits = row.sits.map((sit) => {
                const id = `${row.number}_${sit.number}`
                const isChecked = this.state.selected.find((ticket) => ticket.id === id)
                const handleOnClick = () => {
                    if (sit.booked) return
                    if (isChecked) {
                        this.removeTicket(id)
                    } else {
                        this.addTicket(row, sit)
                    }
                }
                const sitClassName = classNames('sit', {
                    disabled: sit.booked,
                    checked: isChecked,
                })
                return <span className={sitClassName} key={sit.number} onClick={handleOnClick}>{sit.number}</span>
            })
            return <div className='row' key={row.number}>{sits}</div>
        })

        const selected = this.state.selected.map((ticket) => {
            const handleClear = () => this.removeTicket(ticket.id)
            return (
                <div className='totalRow' key={`${ticket.row}_${ticket.sit}`}>
                    {'Row: '} <span className='number'>{ticket.row}</span>
                    {'Place: '} <span className='number'>{ticket.sit}</span>
                    {'Ticket: '} <span className='number'>{ticket.price}</span>
                    <span className='remove' onClick={handleClear}>{'Remove'}</span>
                </div>
            )
        })
        return (
            <div className='wrapper'>
                <div className='title'>
                    <h1>{this.props.title}</h1>
                    <h2>{moment().format('dddd, MMMM Do')}</h2>
                </div>
                <div className='hall'>
                    <div className='hallMap'>
                        <hr width='50%'/>
                        {'Screen'}
                        <div>{rows}</div>
                    </div>
                </div>
                <div className='total'>
                    <div>{selected}</div>
                    {
                        (ticketsSum > 0) &&
                        <div className='sum'>
                            {'Total: '}
                            <span className='number'>{ticketsSum}</span>
                        </div>
                    }
                    {
                        (ticketsSum === 0) &&
                        <div className='sum'>
                            {'Please choose your sits.'}
                        </div>
                    }
                    <RaisedButton
                        disabled={ticketsSum === 0}
                        label='Buy'
                        primary
                        onClick={handleBuy}
                    />
                </div>
                <PurchaseDialog
                    open={this.state.purchaseDialogIsOpen}
                    handleClose={handleClosePurchaseDialog}
                    sum={ticketsSum}
                />
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
    requestMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(Hall)
