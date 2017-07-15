import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import RaisedButton from 'material-ui/RaisedButton'
import { Helmet } from 'react-helmet'

import { requestHall } from '../../state/actions/hall'
import Header from '../../components/Header/Header'
import PurchaseDialog from './components/PurchaseDialog/PurchaseDialog'

import './Hall.css'

const TRANSITION_TIMEOUT = 500

class Hall extends Component {
    static propTypes = {
        rows: PropTypes.array.isRequired,
        movie: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,

        requestHall: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        this.tickets = JSON.parse(localStorage.getItem('tickets'))
        let selected = []
        if (this.tickets && this.tickets[this.props.id]) {
            selected = this.tickets[this.props.id]
        }
        this.state = { selected, purchaseDialogIsOpen: false }
    }
    componentWillMount() {
        this.props.requestHall()
    }
    getTicketsSum() {
        let sum = 0
        this.state.selected.forEach((ticket) => sum += ticket.price)
        return sum
    }
    removeTicket(ticketId) {
        const rowEl = this.refs['row-' + ticketId]
        rowEl.classList.add('total-row-inTransition')
        while (rowEl.hasChildNodes()) {
            rowEl.removeChild(rowEl.lastChild)
        }
        window.setTimeout(() => {
            rowEl.classList.remove('inTransition')
            const selected = this.state.selected.filter((selectedItem) => selectedItem.id !== ticketId)

            // remove transition:true
            const selectedForLocalStorage = selected.map((selectedItem) => ({
                id: selectedItem.id,
                row: selectedItem.row,
                sit: selectedItem.sit,
                price: selectedItem.price,
            }))
            this.setState({ selected })
            localStorage.setItem(
                'tickets', JSON.stringify({ ...this.tickets, [this.props.id]: selectedForLocalStorage })
            )
        }, TRANSITION_TIMEOUT)
    }
    addTicket(row, sit) {
        const id = `${row.number}_${sit.number}`
        const selected = [
            ...this.state.selected,
            {
                id,
                row: row.number,
                sit: sit.number,
                price: sit.price,
                transition: true,
            },
        ]

        // remove transition:true
        const selectedForLocalStorage = selected.map((selectedItem) => ({
            id: selectedItem.id,
            row: selectedItem.row,
            sit: selectedItem.sit,
            price: selectedItem.price,
        }))
        this.setState({ selected })
        localStorage.setItem('tickets', JSON.stringify({ ...this.tickets, [this.props.id]: selectedForLocalStorage }))
        window.setTimeout(() => {
            const rowEl = this.refs['row-' + id]
            rowEl.classList.remove('total-row-inTransition')
        }, 0)
    }
    render() {
        if (this.props.loading) return null

        const ticketsSum = this.getTicketsSum()
        const ticketsNumber = this.state.selected.length
        const handleBuy = () => {
            if (ticketsSum === 0) return
            this.setState({ purchaseDialogIsOpen: true })
        }

        const handleClosePurchaseDialog = () => {
            this.setState({ purchaseDialogIsOpen: false })
        }

        const rows = this.props.rows.map((row) => {
            const seats = row.seats.map((sit) => {
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
                    'sit-isDisabled': sit.booked,
                    'sit-isChecked': isChecked,
                })
                return <div className={sitClassName} key={sit.number} onClick={handleOnClick}>{sit.number}</div>
            })
            return <div className='row' key={row.number}>{seats}</div>
        })

        const selected = this.state.selected.map((ticket) => {
            const handleClear = () => {
                this.removeTicket(ticket.id)
            }
            const rowClassNames = classNames('total-row', {
                'total-row-inTransition': ticket.transition,
            })
            return (
                <div className={rowClassNames}
                    key={`${ticket.row}_${ticket.sit}`}
                    ref={'row-' + ticket.id}
                >
                    <sub>{'Row: '}</sub> <span className='total-number'>{ticket.row}</span>
                    <sub>{'Place: '}</sub> <span className='total-number'>{ticket.sit}</span>
                    <sub>{'Price: '}</sub> <span className='total-number total-number-isHighlighted'>
                        {`€${ticket.price}`}
                    </span>
                    <i className='material-icons total-remove' onClick={handleClear}>{'cancel'}</i>
                </div>
            )
        })
        return (
            <div>
                <Helmet>
                    <title>{this.props.movie.title}</title>
                </Helmet>
                <Header/>
                <div className='wrapper'>
                    <header className='title'>
                        {`${this.props.movie.title} (${this.props.movie.certificate})`}
                    </header>
                    <div className='hall'>
                        <hr className={'hall-screen'} width='50%'/>
                        {'Screen'}
                        <div>{rows}</div>
                        <hr className={'hall-exit'} width='15%'/>
                        <span className={'hall-exitLabel'}>{'Exit'}</span>
                    </div>
                    <div className='total'>
                        <div className='total-header'>
                            <a href='/'>{`${this.props.movie.title} (${this.props.movie.certificate})`}</a>
                        </div>
                        <div className='total-date'>{moment(this.props.movie.date).format('dddd, MMMM Do')}</div>
                        <div className='total-type'>{'Format: '}<span>{this.props.movie.type}</span></div>
                        {
                            (ticketsSum === 0) &&
                            <p>{'Please choose your seats.'}</p>
                        }
                        {
                            (ticketsSum > 0) &&
                            <p>{`${ticketsNumber} ${ticketsNumber === 1 ? 'ticket' : 'tickets'}`}</p>
                        }
                        <div>{selected}</div>
                        {
                            (ticketsSum > 0) &&
                            <p>
                                {'Total: '}
                                <span className='total-number total-number-isHighlighted'>{`€${ticketsSum}`}</span>
                            </p>
                        }
                        <RaisedButton
                            disabled={ticketsSum === 0}
                            label='Buy'
                            primary
                            onClick={handleBuy}
                            buttonStyle={{ width: '104px' }}
                        />
                    </div>
                    <PurchaseDialog
                        open={this.state.purchaseDialogIsOpen}
                        handleClose={handleClosePurchaseDialog}
                        sum={ticketsSum}
                    />
                </div>
            </div>
        )
    }
}

export const mapStateToProps = ({ hall }, ownProps) => {
    const {
        movie,
        rows,
        loading,
    } = hall

    return {
        rows,
        movie,
        loading,
        id: ownProps.match.params.id,
    }
}

const mapDispatchToProps = {
    requestHall,
}

export default connect(mapStateToProps, mapDispatchToProps)(Hall)
