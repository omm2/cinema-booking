import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Helmet } from 'react-helmet'

import { Card, CardText } from 'material-ui/Card'

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
        cast: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        youtube: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,

        requestMovie: PropTypes.func.isRequired,
    }
    componentWillMount() {
        this.props.requestMovie()
    }
    render() {
        if (this.props.loading) return null

        const formattedDuration = getDurationHours(this.props.duration)

        return (
            <div>
                <Helmet>
                    <title>{this.props.title}</title>
                </Helmet>
                <header className='header'>{'AWESOME CINEMA'}</header>
                <div className='container'>
                    <header className='movieTitle'>{`${this.props.title} (${this.props.year})`}</header>
                    <div className='trailer'>
                        <iframe width="100%" height="540" src={this.props.youtube} frameborder="0" allowfullscreen/>
                    </div>

                    <div className='main'>
                        <Card style={{ height:'25px', width:'540px', 'background-color': '#4fc3f7' }}>
                        </Card>
                        <Card style={{ height:'70px', width:'540px', 'background-color': '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Director'}</dt>
                                <dd>{this.props.director}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ height:'70px', width:'540px', 'background-color': '#f5f5f6' }}>
                            <CardText>
                                <dt>{'Cast'}</dt>
                                <dd>{this.props.cast}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ height:'70px', width:'540px', 'background-color': '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Language'}</dt>
                                <dd>{this.props.language}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ height:'70px', width:'540px', 'background-color': '#f5f5f6' }}>
                            <CardText>
                                <dt>{'Genres'}</dt>
                                <dd>{this.props.genres.join(', ')}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ height:'70px', width:'540px', 'background-color': '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Duration'}</dt>
                                <dd>{formattedDuration}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ height:'70px', width:'540px', 'background-color': '#f5f5f6' }}>
                            <CardText>
                                <dt>{'Year'}</dt>
                                <dd>{this.props.year}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ height:'70px', width:'540px', 'background-color': '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Certificate'}</dt>
                                <dd>{this.props.certificate}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ height:'25px', width:'540px', 'background-color': '#4fc3f7' }}>
                        </Card>
                    </div>
                    <div className='movieShowtimes'>
                        <Showtimes showtimes={this.props.today}/>
                    </div>
                    <div className='description'>{this.props.description}</div>
                    {
                        this.props.images.map((image) => (
                            <div className='imageWrapper' key={image}>
                                <img className='image' src={image}/>
                            </div>
                        ))
                    }
                </div>
                <footer className='footer'>
                    {'Thank you! Go grab a popcorn.'}
                </footer>
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
            cast,
            director,
            language,
            youtube,
            images,
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
        cast,
        director,
        language,
        youtube,
        images,
    }
}

const mapDispatchToProps = {
    requestMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
