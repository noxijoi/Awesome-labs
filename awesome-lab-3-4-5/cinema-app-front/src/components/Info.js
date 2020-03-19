import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/styles";

export default function Info(props) {
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));
    return (
        <div>
            <Alert severity="info">{props.text}</Alert>
        </div>
    );
}
