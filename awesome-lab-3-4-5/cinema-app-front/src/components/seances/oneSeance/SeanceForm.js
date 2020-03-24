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
    const [dateValue, setDate] = useState(new Date());
    const [movieValue, setMovie] = useState({});
    const [cinemaValue, setCinema] = useState({});
    const [ticketCount, setTicketCount] = useState(0);
    const [rerender, count] = useState(true);

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

    console.log(movies);
    if(seance.date && rerender ){
        setDate(seance.date);
        setMovie(seance.movie);
        setCinema(seance.cinema);
        setTicketCount(seance.tickerCount);
        count(false);
    }

    return (
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
                <TextField
                    required
                    id="ticketCount"
                    name="ticketCount"
                    label="Tickets count"
                    value={ticketCount}
                    onChange={(e) => {
                        setTicketCount(e.target.value);
                    }} />
            </div>
            <div>
                <TextField
                    id="date"
                    label="date"
                    name ="date"
                    type="date"
                    value={dateValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                />
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="movies">Movie</InputLabel>
                    <Select
                        native
                        value={movieValue._id}
                        onChange={setMovie}
                        inputProps={{
                            name: 'movie',
                            id: 'movie',
                        }}
                    >
                        {movies.map(movie =>(
                            <option value={movie._id}>{movie.name}</option>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="cinemas">Cinema</InputLabel>
                    <Select
                        native
                        value={cinemaValue._id}
                        onChange={setCinema}
                        inputProps={{
                            name: 'cinema',
                            id: 'cinema',
                        }}
                    >
                        {cinemas.map(cinema =>(
                            <option value={cinema._id}>{cinema.name}</option>
                        ))}
                    </Select>
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
