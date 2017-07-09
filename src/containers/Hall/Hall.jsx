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

class Hall extends Component {
    static propTypes = {
        rows: PropTypes.array.isRequired,
        movie: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,

        requestHall: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props)
        this.state = { selected: [], purchaseDialogIsOpen: false }
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
        const ticketsNumber = this.state.selected.length
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
                    'sit-isDisabled': sit.booked,
                    'sit-isChecked': isChecked,
                })
                return <div className={sitClassName} key={sit.number} onClick={handleOnClick}>{sit.number}</div>
            })
            return <div className='row' key={row.number}>{sits}</div>
        })

        const selected = this.state.selected.map((ticket) => {
            const handleClear = () => this.removeTicket(ticket.id)
            return (
                <div className='total-row' key={`${ticket.row}_${ticket.sit}`}>
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
                    <header className='title'>{this.props.movie.title}</header>
                    <div className='hall'>
                        <hr width='50%'/>
                        {'Screen'}
                        <div>{rows}</div>
                    </div>
                    <div className='total'>
                        <div className='total-header'>{this.props.movie.title}</div>
                        <div className='total-date'>{moment(this.props.movie.date).format('dddd, MMMM Do')}</div>
                        <div className='total-type'>{'Format: '}<span>{this.props.movie.type}</span></div>
                        {
                            (ticketsSum === 0) &&
                            <p>{'Please choose your sits.'}</p>
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

export const mapStateToProps = ({ hall }) => {
    const {
        movie,
        rows,
        loading,
    } = hall

    return {
        rows,
        movie,
        loading,
    }
}

const mapDispatchToProps = {
    requestHall,
}

export default connect(mapStateToProps, mapDispatchToProps)(Hall)
