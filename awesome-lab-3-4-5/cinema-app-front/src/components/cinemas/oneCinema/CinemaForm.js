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

export default function CinemaForm(props) {
    const [nameValue, setName] = useState("");
    const [addressValue, setAddress] = useState("");
    const [rerender, count] = useState(0);
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
    if(cinema.name && cinema.address && rerender === 0){
        setName(cinema.name);
        setAddress(cinema.address);
        count(rerender + 1);
    }
    return (
        <form className={classes.root} noValidate onSubmit={handleSubmit}>
            <div>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Cinema name"
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
                    label="Cinema address"
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
