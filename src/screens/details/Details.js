import { Button, Card, GridList, GridListTile, GridListTileBar, Icon, IconButton, List, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import Header from '../../common/Header';
import LoginModal from '../../common/loginModal';
import './Details.css'
import MovieFilter from '../../common/movieFilter'
import YouTube from 'react-youtube';
import { StarBorderOutlined } from '@material-ui/icons'
import { Rating } from '@material-ui/lab';

const Details = (props) => {

    const [movieDetail, setMovieDetail] = React.useState({});
    const [genres, setGenres] = React.useState([]);
    const [artists, setArtists] = React.useState([]);

    React.useEffect(() => {
        console.log("24 props", props.location.state.detail)
        setMovieDetail(props.location.state.detail)
        setGenres(props.location.state.detail.genres)
        setArtists(props.location.state.detail.artists)
    }, [])

    const classes = useStyles();

    const opts = {
        height: '250',
        width: window.screen.width*0.6,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div>
            <Header buttonName="Login" showBookShow={true} isLogin={false} />
            <div className={classes.root}>
                <div className={classes.leftPart}>
                    <Button onClick={props.history.goBack}>
                        <Typography >&#60; Back to Home</Typography>
                    </Button>
                    <img src={movieDetail.poster_url} alt={movieDetail.title} />
                </div>
                <div className={classes.middlePart}>
                    <Typography variant="h5">{movieDetail.title}</Typography>
                    <Typography variant="subtitle1" style={{ display: 'inline' }}><b>Genre: </b>{genres.map(txt =>
                        <Typography variant="subtitle1" style={{ display: 'inline' }}>
                            {`${txt}, `}
                        </Typography>
                    )}
                    </Typography>
                    <Typography variant="subtitle1"><b>Duration: </b>{movieDetail.duration}</Typography>
                    <Typography variant="subtitle1">
                        <b>Release Date: </b>{new Date(movieDetail.release_date).toDateString()}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>Rating: </b>{movieDetail.rating}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>Plot: </b><a href={movieDetail.wiki_url}>(Wiki Link)</a> {movieDetail.storyline}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b>Trailer: </b>
                    </Typography>
                    <div>
                        <YouTube
                            videoId={movieDetail.trailer_url}
                            opts={opts}
                            containerClassName={classes.video}
                        />
                    </div>
                </div>
                <div className={classes.rightPart}>
                    <Typography variant="subtitle1" style={{ marginLeft: 15 }}><b>Rate this movie:</b></Typography>
                    <Rating
                        className={classes.rating}
                        name="simple-controlled"
                    />
                    <GridList style={{ overflow: 'scroll', paddingBottom: 10 }}
                        className={classes.gridList2} cols={2} cellHeight={250} >
                        {artists.map((item, index) => (
                            <GridListTile key={index} style={{ width: 150 }}>
                                <img src={item.profile_url} alt={item.first_name} />
                                <GridListTileBar
                                    title={`${item.first_name} ${item.last_name}`}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton aria-label={`star ${item.poster_url}`}>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        </div>

    )
}

const useStyles = makeStyles((theme) => ({
    video: {
        // flex: 1
    },
    root: { 
        display: 'flex'
    },
    leftPart: { 
        flex: 0.24,
        marginLeft: 24, 
        marginTop: 8 
    },
    middlePart: { 
        flex: 0.72, 
    },
    rightPart: { 
        display: 'block',
        flex: 0.24, 
        paddingLeft: 20, 
        alignItems: 'flex-end',
        
    },
    gridList2: {
        padding: 20,
        height: 450,
    },
    title: {
        color: '#fff',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    rating:{
        justifyContent: 'center',
        marginLeft: 15
    },
}));




export default Details