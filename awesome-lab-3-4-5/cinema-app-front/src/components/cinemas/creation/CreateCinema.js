import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function CreateCinema(props) {
    const create = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        let cinema = {};
        const formElements =e.target.elements;
        cinema.name = formElements.name.value;
        cinema.address = formElements.address.value;
        props.createCinema(cinema);
    };
    const classes = useStyles();
    if(props.created){
        return <Redirect to="/home"/>
    } else{
        return (
            <form className={classes.root} noValidate onSubmit={create}>
                <div>
                    <TextField required id="name" name="name" label="Cinema name"/>
                </div>
                <div>
                    <TextField required id="address" name="address" label="Cinema address"/>
                </div>
                <Button variant="contained" color="primary" type="submit">
                    Create
                </Button>
            </form>
        )
    }

}
