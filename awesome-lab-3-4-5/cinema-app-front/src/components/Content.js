import {Container} from "@material-ui/core";
import React from "react";
import {Route} from "react-router-dom";
import Home from "./home/Home";
import {AuthorizationContainer} from "../auth/AuthorizationContainer";
import {makeStyles} from "@material-ui/core/styles";
import YandexAuthContainer from "../auth/oauth/yandex/YandexAuthContainer";
import {oauthConfig} from "../auth/oauth/oauthConfig";
import CreateCinemaContainer from "./cinemas/oneCinema/CreateCinemaContainer";
import CinemaTableContainer from "./cinemas/table/CinemaTableContainer";
import EditCinemaContainer from "./cinemas/oneCinema/EditCinemaContainer";
import CreateMovieContainer from "./movies/oneMovie/CreateMovieContainer";
import MovieTableContainer from "./movies/table/MovieTableContainer";
import EditMovieContainer from "./movies/oneMovie/EditMovieContainer";
import SeanceTableContainer from "./seances/table/SeanceTableContainer";
import EditSeanceContainer from "./seances/oneSeance/EditSeanceContainer";
import CreateSeanceContainer from "./seances/oneSeance/CreateSeanceContainer";


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

                <Route exact path="/newcinema" component={CreateCinemaContainer}/>
                <Route exact path="/cinemas" component={CinemaTableContainer}/>
                <Route exact path="/cinemas/:cinemaId" component={EditCinemaContainer}/>

                <Route exact path="/newmovie" component={CreateMovieContainer}/>
                <Route exact path="/movies" component={MovieTableContainer}/>
                <Route exact path="/movies/:movieId" component={EditMovieContainer}/>

                <Route exact path="/seances/:seanceId" component={EditSeanceContainer}/>
                <Route exact path="/newseance" component={CreateSeanceContainer}/>
                <Route exact path="/seances" component={SeanceTableContainer}/>

            </div>
        </Container>
    );
}


