import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
                <div className='container'>
                    <header className='header'>{'AWESOME CINEMA (C)'}</header>
                    <header className='movieTitle'>{`${this.props.title} (${this.props.year})`}</header>
                    <div className='trailer'>
                        <iframe width="100%" height="540" src={this.props.youtube} frameborder="0" allowfullscreen/>
                    </div>

                    <div className='main'>
                        <dl>
                            <dt>{'Director'}</dt>
                            <dd>{this.props.director}</dd>
                            <dt>{'Cast'}</dt>
                            <dd>{this.props.cast}</dd>
                            <dt>{'Language'}</dt>
                            <dd>{this.props.language}</dd>
                            <dt>{'Genres'}</dt>
                            <dd>{this.props.genres.join(', ')}</dd>
                            <dt>{'Duration'}</dt>
                            <dd>{formattedDuration}</dd>
                            <dt>{'Year'}</dt>
                            <dd>{this.props.year}</dd>
                            <dt>{'Certificate'}</dt>
                            <dd>{this.props.certificate}</dd>

                        </dl>
                    {/*
                        <Table selectable='false' style={{width: '100%'}}>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow selectable='false'>
                                    <TableRowColumn>{'Director'}</TableRowColumn>
                                    <TableRowColumn>{this.props.director}</TableRowColumn>
                                </TableRow>
                                <TableRow selectable='false'>
                                    <TableRowColumn>{'Cast'}</TableRowColumn>
                                    <TableRowColumn>{this.props.cast}</TableRowColumn>
                                </TableRow>
                                <TableRow selectable='false'>
                                    <TableRowColumn>{'Language'}</TableRowColumn>
                                    <TableRowColumn>{this.props.language}</TableRowColumn>
                                </TableRow>
                                <TableRow selectable='false'>
                                    <TableRowColumn>{'Genres'}</TableRowColumn>
                                    <TableRowColumn>{this.props.genres.join(', ')}</TableRowColumn>
                                </TableRow>
                                <TableRow selectable='false'>
                                    <TableRowColumn>{'Duration'}</TableRowColumn>
                                    <TableRowColumn>{formattedDuration}</TableRowColumn>
                                </TableRow>
                                <TableRow selectable='false'>
                                    <TableRowColumn>{'Year'}</TableRowColumn>
                                    <TableRowColumn>{this.props.year}</TableRowColumn>
                                </TableRow>
                                <TableRow selectable='false'>
                                    <TableRowColumn>{'Certificate'}</TableRowColumn>
                                    <TableRowColumn>{this.props.certificate}</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    */}

                    </div>
                    <div className='movieShowtimes'>
                        <Showtimes showtimes={this.props.today}/>
                    </div>
                    {/* 
                    <div className='moviePosterWrapper'>
                        <img className='moviePoster' src={this.props.poster} alt={this.props.title}/>
                    </div>
                        */}

                    <div className='description'>{this.props.description}</div>
                    <footer className='footer'>
                        {'Thank you! Go grab a popcorn.'}
                    </footer>
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
            cast,
            director,
            language,
            youtube,
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
    }
}

const mapDispatchToProps = {
    requestMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie)
