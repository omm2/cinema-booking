import React from 'react'
import { connect } from 'react-redux'

import { requestMovie } from '../../state/actions/movie'

import './Movie.css'

export class Movie extends React.Component {
    static propTypes = {
        data: React.PropTypes.object.isRequired,
        loading: React.PropTypes.bool.isRequired,

        requestMovie: React.PropTypes.func.isRequired,
    }
    componentWillMount() {
        this.props.requestMovie()
    }
    render() {
        if (this.props.loading) return null
        return (
            <div>{this.props.data.name}</div>
        )
    }
}

export const mapStateToProps = ({ movie }) => {
    const {
        data,
        loading,
    } = movie

    return {
        data,
        loading,
    }
}

const mapDispatchToProps = {
    requestMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
