import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { AppBar, Button, Grid, Tab, Tabs } from '@material-ui/core';
import SimpleTabs from './modalTabHeader';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const customStyles = {
    content: {
        width: '50%',
        height: '50%%',
        marginLeft: '20%',
        marginRight: '20%'
    }
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        // width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function LoginModal({ openModal, handleClose, registerUser,
    userCreated, tabChanged, loginClicked }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <SimpleTabs />
        </div>
    );

    return (
        <div>
            <Modal
                isOpen={openModal}
                onRequestClose={handleClose}
                style={customStyles}
            >
                {/* {body} */}
                <SimpleTabs
                    registerUser={registerUser}
                    userCreated={userCreated}
                    tabChanged={tabChanged}
                    loginClicked={loginClicked}
                />
            </Modal>
        </div>
    );
}


