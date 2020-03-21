import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Paper} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}));

export default function MoviesTable(props) {
    const classes = useStyles();
    const movies = props.movies;
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Origin country</TableCell>
                        <TableCell align="right">Start date</TableCell>
                        <TableCell align="right">Genre</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movies.map(movie => (
                        <TableRow key={movie._id}>
                            <Link to={'/cinemas/' + movie._id}>
                                <TableCell component="th" scope="row">
                                    {movie.name}
                                </TableCell>
                            </Link>
                            <TableCell align="right">{movie.originCountry}</TableCell>
                            <TableCell align="right">{movie.startDate}</TableCell>
                            <TableCell align="right">{movie.generate()}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
