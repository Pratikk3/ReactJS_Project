import { Button, Card, Checkbox, FormControl, FormHelperText, Input, InputLabel, ListItemText, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';


const MovieFilter = ({
    movieName,
    setMovieName,
    genres,
    selectedGenres,
    handleGenreChange,
    artists,
    selectedArtists,
    handleArtistsChange,
    startDateChanged,
    endDateChanged,
    applyFilter
}) => {

    const classes = useStyles();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 20;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };



    return (
        <Card className={classes.card}>
            <Typography className={classes.title}>FIND MOVIES BY:</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                <Input onChange={(e) => { setMovieName(e.target.value) }}
                    id="movieName"
                    placeholder="Movie Name"
                    value={movieName} />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="genres">Genres</InputLabel>
                <Select
                    labelId="genres"
                    id="genres"
                    multiple
                    value={selectedGenres}
                    onChange={handleGenreChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {genres.map((item, index) => (
                        <MenuItem key={item.id} value={item.genre}>
                            <Checkbox
                                checked={selectedGenres.indexOf(item.genre) > -1}
                            />
                            <ListItemText primary={item.genre} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="artists">Artists</InputLabel>
                <Select
                    labelId="artists"
                    id="artists"
                    multiple
                    value={selectedArtists}
                    onChange={handleArtistsChange}
                    input={<Input />}
                    renderValue={(artistSelected) => artistSelected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {artists.map((item, index) => (

                        <MenuItem key={index} value={item.first_name}>
                            <Checkbox
                                checked={selectedArtists.indexOf(item.first_name) > -1}
                            />
                            <ListItemText primary={`${item.first_name} ${item.last_name}`} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                style={{ marginTop: 10 }}
                id="start"
                label="Release Date Start"
                type="date"
                onChange={startDateChanged}
                defaultValue="dd-mm-yyyy"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                style={{ marginTop: 10, marginBottom: 20 }}
                id="end"
                label="Release Date End"
                type="date"
                onChange={endDateChanged}
                defaultValue="dd-mm-yyyy"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button
                className={classes.formControl}
                variant="contained"
                color="primary"
                onClick={applyFilter}
            >
                Apply
            </Button>
        </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    card: {
        // margin: theme.spacing.unit, This has been deprecated 
        padding: 20,
        maxWidth: 240,
        minWidth: 240,
    },
    title: {
        color: theme.palette.primary.light
    },
    formControl: {
        minWidth: 240,
        maxWidth: 240,
        marginTop: 5
    },
    textField: {
        minWidth: 240,
        maxWidth: 240,
    },
}));

export default MovieFilter