import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@material-ui/core';
import '../index.css'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography style={{ color: 'black' }}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    formStyle: {
        flexDirection: 'column'
    }
}));

export default function SimpleTabs({ registerUser, userCreated, tabChanged, loginClicked }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [userpassword, setUserPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        tabChanged()
    };

    const onRegister = () => {
        if (firstName != '' && lastName != '' && email != '' && password != '' && contact != '') {
            registerUser({ firstName, lastName, email, password, contact })
        }
    }
    const login = () => {
        console.log("login 77")
        if (userName != '' && userpassword != '') {
            loginClicked({ userName, userpassword })
        }

    }

    return (
        <div className={classes.root}>
            <AppBar position="static" variant="elevation" color="default" style={{ alignItems: 'center' }}>
                <Tabs value={value} onChange={handleChange} >
                    <Tab style={{ alignItems: 'center' }} label="LOGIN" {...a11yProps(0)} />
                    <Tab label="REGISTER" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container spacing={3}>
                    <Grid item xs={4} justify='center' alignContent='center'></Grid>
                    <Grid item xs={4} justify='center' alignContent='center'>
                        {/* <form className="form" > */}
                        <Grid item xl={12} style={{ marginTop: 50 }}>
                            <FormControl>
                                <InputLabel htmlFor="username">Username *</InputLabel>
                                <Input onChange={(e) => { setUserName(e.target.value) }} id="username" />
                            </FormControl>
                        </Grid>
                        <Grid item xl={12} style={{ marginTop: 15 }}>
                            <FormControl>
                                <InputLabel htmlFor="userpass">Password *</InputLabel>
                                <Input  onChange={(e) => { setUserPassword(e.target.value) }} type="password" id="userpass" security />
                            </FormControl>
                        </Grid>
                        <Button variant="contained" color='primary'
                            onClick={login}
                            style={{ marginTop: 30, justifyContent: 'center', marginLeft: 40 }}>
                            Login
                            </Button>
                        {/* </form> */}
                    </Grid>
                    <Grid item xs={4} justify='center' alignContent='center'></Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={3}>
                    <Grid item xs={4} justify='center' alignContent='center'></Grid>
                    <Grid item xs={4} justify='center' alignContent='center'>
                        {/* <form className="form" > */}
                        <Grid item xl={12} style={{ marginTop: 30 }}>
                            <FormControl>
                                <InputLabel htmlFor="fname">First Name *</InputLabel>
                                <Input onChange={(e) => { setFirstName(e.target.value) }} id="fname" value={firstName} />
                                <FormHelperText style={{ color: 'red' }} id="component-error-text">
                                    {firstName == '' ? 'required' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xl={12} style={{ marginTop: 15 }}>
                            <FormControl>
                                <InputLabel htmlFor="lname">Last Name *</InputLabel>
                                <Input onChange={(e) => { setLastName(e.target.value) }} id="lname" />
                                <FormHelperText style={{ color: 'red' }} id="component-error-text">
                                    {lastName == '' ? 'required' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xl={12} style={{ marginTop: 15 }}>
                            <FormControl>
                                <InputLabel htmlFor="email">Email *</InputLabel>
                                <Input onChange={(e) => { setEmail(e.target.value) }} id="email" />
                                <FormHelperText style={{ color: 'red' }} id="component-error-text">
                                    {email == '' ? 'required' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xl={12} style={{ marginTop: 15 }}>
                            <FormControl>
                                <InputLabel htmlFor="password">Password *</InputLabel>
                                <Input onChange={(e) => { setPassword(e.target.value) }} type="password" id="password" />
                                <FormHelperText style={{ color: 'red' }} id="component-error-text">
                                    {password == '' ? 'required' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xl={12} style={{ marginTop: 15 }}>
                            <FormControl>
                                <InputLabel htmlFor="contact">Contact No *</InputLabel>
                                <Input onChange={(e) => { setContact(e.target.value) }} id="contact" />
                                <FormHelperText style={{ color: 'red' }} id="component-error-text">
                                    {contact == '' ? 'required' : ''}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {userCreated ? <Typography style={{ color: 'black' }}>Registration Succesful. Please Login!</Typography> : null}
                        <Button variant="contained" color='primary'
                            style={{ marginTop: 20, justifyContent: 'center', marginLeft: 40 }} onClick={onRegister}>
                            Register
                            </Button>
                        {/* </form> */}
                    </Grid>
                    <Grid item xs={4} justify='center' alignContent='center'></Grid>
                </Grid>
            </TabPanel>
        </div>
    );
}