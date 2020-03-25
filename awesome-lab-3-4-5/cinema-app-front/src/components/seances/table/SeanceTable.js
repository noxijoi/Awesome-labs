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

export default function SeanceTable(props) {
    const classes = useStyles();
    const seances = props.seances;
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Movie</TableCell>
                        <TableCell align="right">Cinema</TableCell>
                        <TableCell align="right">Tickets count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {seances.map(seance => (
                        <TableRow key={seance._id}>
                            <Link to={'/seances/' + seance._id}>
                                <TableCell component="th" scope="row">
                                    {seance.date}
                                </TableCell>
                            </Link>
                            <TableCell align="right">{seance.movie.name}</TableCell>
                            <TableCell align="right">{seance.cinema.name}</TableCell>
                            <TableCell align="right">{seance.ticketCount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
