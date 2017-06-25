import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Helmet } from 'react-helmet'

import { requestMovie } from '../../state/actions/movie'
import Showtimes from './components/Showtimes/Showtimes'

import './Movie.css'

const getDurationHours = (minutes) => {
    const duration = moment.duration(minutes, 'minutes')
    return `${duration.hours()}h ${duration.minutes()}m`
}

export class Movie extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        genres: PropTypes.array.isRequired,
        certificate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        today: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,

        requestMovie: PropTypes.func.isRequired,
    }
    componentWillMount() {
        this.props.requestMovie()
    }
    render() {
        if (this.props.loading) return null

        const formattedDuration = getDurationHours(this.props.duration)
        return (
            <div className="movie">
                <Helmet>
                    <title>{this.props.title}</title>
                </Helmet>
                <div className="movieSummary">
                    <h1>{this.props.title}</h1>
                    <img className="moviePoster" src={this.props.poster} alt={this.props.title}/>
                </div>
                <div className="movieInfo">
                    <dl>
                        <dt>{'Genres'}</dt>
                        <dd>{this.props.genres.join(', ')}</dd>
                        <dt>{'Duration'}</dt>
                        <dd>{formattedDuration}</dd>
                        <dt>{'Year'}</dt>
                        <dd>{this.props.year}</dd>
                        <dt>{'Certificate'}</dt>
                        <dd>{this.props.certificate}</dd>
                    </dl>
                </div>
                <div className="movieDescription">{this.props.description}</div>
                <div className="movieShowtimes">
                    <Showtimes showtimes={this.props.today}/>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = ({ movie }) => {
    const {
        data: {
            title,
            poster,
            year,
            duration,
            genres,
            certificate,
            description,
            today,
        },
        loading,
    } = movie

    return {
        title,
        poster,
        year,
        duration,
        genres,
        certificate,
        description,
        today,
        loading,
    }
}

const mapDispatchToProps = {
    requestMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
