import { Card, GridList, GridListTile, GridListTileBar, IconButton, List, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import Header from '../../common/Header';
import LoginModal from '../../common/loginModal';
import './Home.css'
import MovieFilter from '../../common/movieFilter'
import { Link } from 'react-router-dom';

const Home = (props) => {

  const [open, setOpen] = React.useState(false);
  const [userCreated, setUserCreated] = React.useState(false)
  const [movies, setMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [movieName, setMovieText] = React.useState('');
  const [genres, setGenres] = React.useState([]);
  const [artists, setArtists] = React.useState([]);
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedArtists, setSelectedArtists] = useState([])
  const [startDay, setStartDay] = useState('')
  const [endDay, setEndDay] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  React.useEffect(() => {
    getMovies()
    getGenres()
    getArtists()
  }, [])

  function getMovies() {
    axios.get(`${props.baseUrl}movies`).then((res) => {
      console.log("30", res)
      setMovies(res.data.movies)
    })
  }

  function getGenres() {
    axios.get(`${props.baseUrl}genres`).then((res) => {
      console.log("37", res)
      setGenres(res.data.genres)
    })
  }

  function getArtists() {
    axios.get(`${props.baseUrl}artists`).then((res) => {
      console.log("44", res)
      setArtists(res.data.artists)
    })
  }


  const handleOpen = () => {
    if (loggedIn) {
      setLoggedIn(false)
    }
    else {
      setOpen(true);
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginClicked = async (credentials) => {
    console.log("login 77", credentials)
   
    const data = {
      "user_name": credentials.userName,
      "password": credentials.userpassword
    }

    const response = await fetch(`${props.baseUrl}auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: String // body data type must match "Content-Type" header
    })
    console.log("44", response)
    if (response.status == 201) {
      setUserCreated(true)
    }
    setOpen(false)
    
  }

  const registerUser = async (userDetails) => {
    setOpen(false)
    const data = {
      "email_address": userDetails.email,
      "first_name": userDetails.firstName,
      "last_name": userDetails.lastName,
      "mobile_number": userDetails.contact,
      "password": userDetails.password
    }

    const response = await fetch(`${props.baseUrl}signup`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    console.log("44", response)
    if (response.status == 201) {
      setUserCreated(true)
    }

  }

  const onMovieClicked = (item) => {
    console.log("124", item, props)
  }


  const handleGenreChange = (event) => {
    console.log("Genre change", event.target.value)
    setSelectedGenres(event.target.value);
  };

  const handleArtistsChange = (event) => {
    console.log("Artist change", event.target.value)
    setSelectedArtists(event.target.value);
  };

  const startDateChanged = (event) => {
    console.log("startDateChanged", event.target.value)
    setStartDay(event.target.value)
  }

  const endDateChanged = (event) => {
    console.log("endDateChanged", event.target.value)
    setEndDay(event.target.value)
  }



  const setMovieName = (movie) => {
    console.log("140", movie)
    setMovieText(movie)

  }

  const applyFilter = () => {
    let filteredMovies = []

    movies.map(item => {
      console.log("Filtered first", item, selectedArtists)
      let artists = item.artists == null ? [] : [...item.artists]
      if (String(item.title).toLowerCase().includes(movieName.toLowerCase()) &&
        selectedGenres.every(r => item.genres.includes(r))
      ) {
        if (selectedArtists.length > 0) {
          artists.map(artist => {
            selectedArtists.every(selected => {
              if (artist.first_name == selected) {
                if (startDay != '' && startDay > item.release_date) {
                  filteredMovies.push(item)
                }
                else {
                  filteredMovies.push(item)
                }
              }
            })
          })
        }
        else if (item.artists != null) {
          console.log("Filtered item", item, artists)
          filteredMovies.push(item)
        }
        else {
          filteredMovies = []
        }
        setFilteredMovies(filteredMovies)
      }
    })
  }



  const classes = useStyles();

  return (
    <div>
      <Header buttonName="Login" showBookShow={false} isLogin={!loggedIn} onLoginClicked={handleOpen} />
      <div style={{ backgroundColor: '#ff9999', padding: 8 }}>
        <Typography align="center" style={{ fontSize: '1rem' }}>Upcoming Movies</Typography>
      </div>
      <div className={classes.root} style={{}}>
        <GridList style={{ overflow: 'scroll', paddingBottom: 10, overscrollBehavior: 'auto' }}
          className={classes.gridList} cols={6} cellHeight={250}>
          {movies.map((item, index) => (
            <Link to={{
              pathname: "/detail",
              state: { detail: item }
            }}>
              <GridListTile key={index}
              >
                <img src={item.poster_url} alt={item.title} />
                <GridListTileBar
                  title={item.title}
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
            </Link>
          ))}
        </GridList>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 0.76 }}>
          <GridList style={{ overflow: 'scroll', paddingBottom: 10 }}
            className={classes.gridList2} cols={3} cellHeight={250}>
            {filteredMovies.map((item, index) => (
              <GridListTile key={index}>
                <img src={item.poster_url} alt={item.title} />
                <GridListTileBar
                  title={item.title}
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
        <div style={{ flex: 0.24, padding: 20 }}>
          <MovieFilter
            genres={genres}
            artists={artists}
            selectedGenres={selectedGenres}
            selectedArtists={selectedArtists}
            setMovieName={setMovieName}
            handleGenreChange={handleGenreChange}
            handleArtistsChange={handleArtistsChange}
            startDateChanged={startDateChanged}
            endDateChanged={endDateChanged}
            applyFilter={applyFilter}
          />
        </div>

      </div>
      <LoginModal
        openModal={open}
        handleClose={handleClose}
        registerUser={registerUser}
        userCreated={userCreated}
        loginClicked={loginClicked}
        tabChanged={() => { setUserCreated(false) }} />
    </div>

  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    overflow: 'scroll',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
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
}));




export default Home