import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function CinemasList(props) {
    const classes = useStyles();
    const cinemas = props.cinemas;
    console.log(cinemas);
    return <List>{cinemas.map(cinema => (<ListItem alignItems="flex-start">
        <Link to={'/cinemas/' + cinema._id}>
            <ListItemText
                primary={cinema.name}
                secondary={<React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {cinema.address}
                    </Typography>
                </React.Fragment>}
            />
        </Link>
    </ListItem>))}
    </List>
};
