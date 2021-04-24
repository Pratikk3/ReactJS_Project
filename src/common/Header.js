import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Logo from '../assets/logo.svg'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
        backgroundColor: '#222'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        // minHeight: 100,
        // alignItems: 'flex-start',
        // paddingTop: theme.spacing(1),
        // paddingBottom: theme.spacing(2),
        // backgroundImage: `url(${header})`,
        //     backgroundSize: 'cover',
        //     alignItems: 'center',
        //     backgroundPositionY: '-150px',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'auto',
        //     backgroundColor: "#fff"
        minHeight: 100,
        alignItems: 'center',
        paddingTop: '8px',
        paddingBottom: '16px',
        backgroundSize: 'auto',
        backgroundColor: '#fff',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: '-200px',
        color: '#000',

    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
    appBar: {
        boxShadow: 'none',
        backgroundColor: '#222'
    },
    rightHeaderDiv: {
        float: 'right'
    }
}));

export default function Header({ buttonName, isLogin, showBookShow, onBookShowClick, onLoginClicked }) {
    const classes = useStyles();

    return (
        <div className='header'>
            {/* <Typography className={classes.title} variant="h5" noWrap>
            Material-UI
          </Typography> */}
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div>
                        <img src={Logo} className="logo"
                            style={{ backgroundColor: '#ff7f7f' }}
                        />
                    </div>
                </Grid>

                <Grid item xs={6} justify="flex-end"
                    >
                    <div className={classes.rightHeaderDiv}>
                        {showBookShow ?
                            <Button variant="contained" color='primary' onClick={onBookShowClick}
                                className="logButton" style={{ alignSelf: 'flex-start', marginRight: 10 }}>
                                Book Show
                        </Button> : null}
                        <Button onClick={onLoginClicked} variant="contained" className="logButton" style={{ alignSelf: 'flex-end' }}>
                            {isLogin ? 'Login' : 'Logout'}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}