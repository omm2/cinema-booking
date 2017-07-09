import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Helmet } from 'react-helmet'

import { Card, CardText } from 'material-ui/Card'

import { requestMovie } from '../../state/actions/movie'
import Header from '../../components/Header/Header'
import Showtimes from './components/Showtimes/Showtimes'

import './Movie.css'

const getDurationHours = (minutes) => {
    const duration = moment.duration(minutes, 'minutes')
    return `${duration.hours()}h ${duration.minutes()}m`
}

let scrollPosition = 0
let ticking = false

const toggleScrollTopElement = (scrollPos) => {
    const scrollTopElement = document.getElementsByClassName('scrollTop')[0]
    if (!scrollTopElement) return
    if (scrollTopElement.clientHeight < scrollPos) {
        scrollTopElement.classList.add('scrollTop-isVisible')
    } else {
        scrollTopElement.classList.remove('scrollTop-isVisible')
    }
}

const scrollTop = () => {
    const body = document.body
    const currentPosition = body.scrollTop

    body.classList.add('inTransition')
    body.style.transform = `translate(0, ${currentPosition}px)`

    window.setTimeout(() => {
        body.classList.remove('inTransition')
        body.style.cssText = ''
        window.scrollTo(0, 0)
    }, 900)
}

window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY
    if (!ticking) {
        window.requestAnimationFrame(() => {
            toggleScrollTopElement(scrollPosition)
            ticking = false
        })
    }
    ticking = true
})

export class Movie extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        genres: PropTypes.array.isRequired,
        certificate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        timetable: PropTypes.array.isRequired,
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
        const cardProps = {
            style: { height:'70px', width:'540px' },
        }

        return (
            <div>
                <Helmet>
                    <title>{this.props.title}</title>
                </Helmet>
                <Header/>
                <div className='container'>
                    <header className='movieTitle'>{`${this.props.title} (${this.props.year})`}</header>
                    <div className='trailer'>
                        <iframe
                            title='trailer'
                            width='100%'
                            height='540'
                            src={this.props.youtube}
                            frameBorder='0'
                            allowFullScreen
                        />
                    </div>
                    <div className='main'>
                        <Card style={{ ...cardProps.style, height:'25px', backgroundColor: '#4fc3f7' }}>
                        </Card>
                        <Card style={{ ...cardProps.style, backgroundColor: '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Director'}</dt>
                                <dd>{this.props.director}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ ...cardProps.style, backgroundColor: '#f5f5f6' }}>
                            <CardText>
                                <dt>{'Cast'}</dt>
                                <dd>{this.props.cast}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ ...cardProps.style, backgroundColor: '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Language'}</dt>
                                <dd>{this.props.language}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ ...cardProps.style, backgroundColor: '#f5f5f6' }}>
                            <CardText>
                                <dt>{'Genres'}</dt>
                                <dd>{this.props.genres.join(', ')}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ ...cardProps.style, backgroundColor: '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Duration'}</dt>
                                <dd>{formattedDuration}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ ...cardProps.style, backgroundColor: '#f5f5f6' }}>
                            <CardText>
                                <dt>{'Year'}</dt>
                                <dd>{this.props.year}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ ...cardProps.style, backgroundColor: '#e1e2e1' }}>
                            <CardText>
                                <dt>{'Certificate'}</dt>
                                <dd>{this.props.certificate}</dd>
                            </CardText>
                        </Card>
                        <Card style={{ ...cardProps.style, height:'25px', backgroundColor: '#4fc3f7' }}>
                        </Card>
                    </div>
                    <Showtimes timetable={this.props.timetable}/>
                    <div className='description'>{this.props.description}</div>
                    {
                        this.props.images.map((image) => (
                            <div key={image}>
                                <img className='image' src={image} alt=''/>
                            </div>
                        ))
                    }
                </div>
                <i className='scrollTop material-icons md-48' onClick={scrollTop}>{'arrow_upward'}</i>
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
            timetable,
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
        timetable,
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
