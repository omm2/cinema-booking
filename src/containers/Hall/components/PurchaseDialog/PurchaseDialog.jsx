import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import './PurchaseDialog.css'

class PurchaseDialog extends Component {
    render() {
        const actions = [
            <FlatButton
                key='cancel'
                label='Cancel'
                primary
                onTouchTap={this.props.handleClose}
            />,
            <FlatButton
                key='submit'
                label='Submit'
                primary
                keyboardFocused
                onTouchTap={this.props.handleClose}
            />,
        ]

        const dialogStyle = {
            maxWidth: '400px',
            margin: '0 auto',
        }
        return (
            <Dialog
                title='Enter credit card info to buy tickets'
                actions={actions}
                modal
                open={this.props.open}
                onRequestClose={this.handleClose}
                contentStyle={dialogStyle}
            >
                <TextField
                    floatingLabelText='Card Number'
                    floatingLabelFixed
                /><br />
                <TextField
                    floatingLabelText='Name On Card'
                    floatingLabelFixed
                /><br />
                <TextField
                    floatingLabelText='Valid till'
                    floatingLabelFixed
                /><br />
                <TextField
                    floatingLabelText='CCV'
                    floatingLabelFixed
                /><br />
                <div className={'notice'}>
                    {'You will be charged '}
                     <span className='total-number total-number-isHighlighted'>{`€${this.props.sum}`}</span>
                     {' after buying the tickets'}
                 </div>
            </Dialog>
        )
    }
}

PurchaseDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    sum: PropTypes.number.isRequired,
}

export default PurchaseDialog
