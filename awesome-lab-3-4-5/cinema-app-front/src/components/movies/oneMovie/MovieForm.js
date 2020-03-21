import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Info from "../../Info";

const {useState} = require("react");


const useStyles = makeStyles(theme => ({
    oot: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function MovieForm(props) {
    const [nameValue, setName] = useState("");
    const [startDateValue, setDate] = useState(new Date());
    const [originCountryValue, setCountry] = useState("");
    const [genreValue, setGenre] = useState("");
    const [rerender, setRerender] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        let movie = {};
        movie.id = props.movieId;
        const formElements = e.target.elements;
        movie.name = formElements.name.value;
        movie.originCountry = formElements.originCountry.value;
        movie.genre = formElements.genre.value;
        movie.startDate = formElements.startDate.value;
        props.handleSubmit(movie);
    };
    const classes = useStyles();
    const movie = props.movie | {};
    if (movie.name && rerender) {
        setName(movie.name);
        setDate(movie.address);
        setCountry(movie.originCountry);
        setGenre(movie.genre);
        setRerender(true);
    }
    return (
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Movie name"
                    value={nameValue}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}/>
            </div>
            <div>
                <TextField
                    id="startDate"
                    label="Start date"
                    name ="startDate"
                    type="date"
                    value={startDateValue}
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
                <TextField
                    required
                    id="originCountry"
                    name="originCountry"
                    label="Origin country"
                    value={originCountryValue}
                    InputLabelProps={{shrink: true}}
                    onChange={(e) => {
                        setCountry(e.target.value);
                    }}/>
            </div>
            <div>
                <TextField
                    required
                    id="genre"
                    name="genre"
                    label="Genre"
                    value={genreValue}
                    InputLabelProps={{shrink: true}}
                    onChange={(e) => {
                        setGenre(e.target.value);
                    }}/>
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
