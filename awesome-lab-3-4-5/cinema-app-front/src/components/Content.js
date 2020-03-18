import {Container} from "@material-ui/core";
import React from "react";
import {Route} from "react-router-dom";
import Home from "./home/Home";
import {AuthorizationContainer} from "../auth/AuthorizationContainer";
import {makeStyles} from "@material-ui/core/styles";
import YandexAuthContainer from "../auth/oauth/yandex/YandexAuthContainer";
import {oauthConfig} from "../auth/oauth/oauthConfig";
import CreateCinemaContainer from "./cinemas/creation/CreateCinemaContainer";
import CinemaListContainer from "./cinemas/list/CinemaListContainer";
import EditCinemaContainer from "./cinemas/creation/EditCinemaContainer";


const useStyles = makeStyles(theme => ({
    content: {
        contentGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
}));


export default function Content() {
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.content}>
                <div className={classes.toolbar}/>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={AuthorizationContainer}/>
                <Route path="/auth/yandex" component={YandexAuthContainer}/>
                <Route path="/cinemas/new" component={CreateCinemaContainer}/>
                <Route path="/cinemas" component={CinemaListContainer}/>
                <Route path="/cinemas/:cinemaId" component={EditCinemaContainer}/>
                {/*<Route path="/users" component={UsersTable}/>
                <Route path="/users/:userID" component={UserPage}/>
                <Route path="/movies" component={MoviesList}/>
                <Route path="/movies/:movieID" component={MoviePage}/>
                <Route path="/seances" component={SeansesTable}/>
                <Route path="/seances/:seanceID" component={SeansesPage}/>*/}
            </div>
        </Container>
    );
}


