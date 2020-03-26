import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Info from "../../Info";
import {InputLabel} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    oot: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function MovieForm(props) {
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

    return (
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
                <InputLabel shrink={true}>Name</InputLabel>
                <input
                    required
                    id="name"
                    name="name"
                    value={movie.name}
                    />
            </div>
            <div>
                <InputLabel shrink={true}>Start date</InputLabel>
                <input
                    id="startDate"
                    name ="startDate"
                    type="date"
                    value={movie.startDate}
                    className={classes.textField}
                />
            </div>
            <div>
                <InputLabel shrink={true}>Origin country</InputLabel>
                <input
                    required
                    id="originCountry"
                    name="originCountry"
                    value={movie.originCountry}
                    />
            </div>
            <div>
                <InputLabel shrink={true}>Genre</InputLabel>
                <input
                    required
                    id="genre"
                    name="genre"
                    value={movie.genre}
                    />
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
