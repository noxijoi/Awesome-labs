import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Info from "../../Info";
import {InputLabel} from "@material-ui/core";

const {useState} = require("react");


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function CinemaForm(props) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        let cinema = {};
        cinema.id = props.cinemaId;
        const formElements = e.target.elements;
        cinema.name = formElements.name.value;
        cinema.address = formElements.address.value;
        props.handleSubmit(cinema);
    };
    const classes = useStyles();
    const cinema = props.cinema;

    return (
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
                <InputLabel shrink={true}>Cinema name</InputLabel>
                <input
                    required
                    id="name"
                    name="name"
                    value={cinema.name}
                     />
            </div>
            <div>
                <InputLabel shrink={true}>Cinema address</InputLabel>
                <input
                    required
                    id="address"
                    name="address"
                    value={cinema.address}
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
