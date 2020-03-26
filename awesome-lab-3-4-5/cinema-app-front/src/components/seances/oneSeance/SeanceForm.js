import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Info from "../../Info";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const {useState} = require("react");


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

}));

export default function SeanceForm(props) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        let seance = {};
        seance.id = props.seanceId;
        const formElements = e.target.elements;
        seance.movieId = formElements.movie.value;
        seance.cinemaId = formElements.cinema.value;
        seance.ticketCount = formElements.ticketCount.value;
        seance.date = formElements.date.value;
        console.log(seance);
        props.handleSubmit(seance);
    };

    const classes = useStyles();
    const seance = props.seance ? props.seance: {};
    const cinemas = props.cinemas ? props.cinemas : [];
    const movies = props.movies ? props.movies : [];

    return (
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
                <InputLabel shrink={true}>Tickets count</InputLabel>
                <input
                    required
                    id="ticketCount"
                    name="ticketCount"
                    value={seance.ticketCount}
                     />
            </div>
            <div>
                <InputLabel shrink={true}>Date</InputLabel>
                <input
                    id="date"
                    name ="date"
                    type="date"
                    value={seance.date}
                    className={classes.textField}
                />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <div>Movie</div>
                    <select id="movies">
                        {movies.map(movie =>(
                            <option value={movie._id}
                                    selected={seance.movie && seance.movie._id === movie._id}>
                                {movie.name}
                            </option>
                        ))}
                    </select>
                </FormControl>
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <div>Cinema</div>
                    <select
                        id="cinemas"
                    >
                        {cinemas.map(cinema =>(
                            <option value={cinema._id}
                            selected={seance.cinema && seance.cinema._id === cinema._id}>
                        {cinema.name}
                            </option>
                        ))}
                    </select>
                </FormControl>
            </div>
            <Button variant="contained" color="primary" type="submit">
                Create
            </Button>
            <div hidden={!props.created}>
                <Info
                    text="Done"
                />
            </div>
        </form>
    )

}
