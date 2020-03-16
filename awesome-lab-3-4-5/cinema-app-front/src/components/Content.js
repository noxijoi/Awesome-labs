import {Container} from "@material-ui/core";
import React from "react";
import {Route} from "react-router-dom";
import Home from "./home/Home";
import {AuthorizationContainer} from "./AuthorizationContainer";
import {makeStyles} from "@material-ui/core/styles";
import YandexAuthContainer from "../auth/oauth/yandex/YandexAuthContainer";
import {oauthConfig} from "../auth/oauth/oauthConfig";


const useStyles = makeStyles(theme => ({
    content: {
        contentGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
}));


export default function Content() {
    const yaConfig = oauthConfig.ya;
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.content}>
                <div className={classes.toolbar}/>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={AuthorizationContainer}/>
                <Route path={yaConfig.redirectURL} component={YandexAuthContainer}/>
                {/*<Route path="/users" component={UsersTable}/>
                <Route path="/users/:userID" component={UserPage}/>
                <Route path="/cinemas" component={CinemasTable}/>
                <Route path="/cinemas/:cinemaID" component={CinemaPage}/>
                <Route path="/movies" component={MoviesList}/>
                <Route path="/movies/:movieID" component={MoviePage}/>
                <Route path="/seances" component={SeansesTable}/>
                <Route path="/seances/:seanceID" component={SeansesPage}/>*/}
            </div>
        </Container>
    );
}


