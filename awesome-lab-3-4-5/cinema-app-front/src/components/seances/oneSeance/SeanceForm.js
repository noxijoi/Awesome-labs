import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Info from "../../Info";

const {useState} = require("react");


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function SeanceForm(props) {
    const [dateValue, setDate] = useState(new Date());
    const [movieValue, setMovie] = useState({});
    const [cinemaValue, setCinema] = useState({});
    const [ticketCount, setTickerCount] = useState(0);
    const [rerender, count] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        let seance = {};
        seance.id = props.seanceId;
        const formElements = e.target.elements;
        cinema.name = formElements.name.value;
        cinema.address = formElements.address.value;
        props.handleSubmit(cinema);
    };

    const classes = useStyles();
    const seance = props.seance | {};
    const cinemas = props.cinemas;
    const movies = props.movies;

    if(seance.date && rerender ){
        setDate(seance.date);
        setMovie(seance.movie);
        setCinema(seance.cinema);
        setTickerCount(seance.tickerCount);
        count(false);
    }

    return (
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Seance name"
                    value={nameValue}
                    onChange={(e) => {
                        setName(e.target.value);
                    }} />
            </div>
            <div>
                <TextField
                    required
                    id="address"
                    name="address"
                    label="Seance address"
                    value={addressValue}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }} />
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
