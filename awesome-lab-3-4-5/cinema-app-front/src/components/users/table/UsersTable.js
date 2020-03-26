import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
}));

export default function MoviesTable(props) {
    const classes = useStyles();
    const users = props.users;
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Authorizaton Service</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user._id}>
                            <TableCell component="th" scope="row">{user.login}</TableCell>
                            <TableCell align="right">{user.authorizationService}</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
