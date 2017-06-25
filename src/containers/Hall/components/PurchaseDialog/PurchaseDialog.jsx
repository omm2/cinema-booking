import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

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

        return (
            <Dialog
                title='Enter credit card info to buy tickets'
                actions={actions}
                modal
                open={this.props.open}
                onRequestClose={this.handleClose}
            >
                <h2>{`You will be charged $${this.props.sum} after buying the tickets`}</h2>
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
            </Dialog>
        )
    }
}

PurchaseDialog.propTypes = {
    open: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    sum: PropTypes.number.isRequired,
}

export default PurchaseDialog
