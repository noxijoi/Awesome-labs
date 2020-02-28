import {Container} from "@material-ui/core";
import React, {Component} from "react";
import {Route} from "react-router-dom";
import Home from "./home/Home";

class Content extends Component {
    render() {
        return (
            <Container>
                <Route exact path="/" component={Home}/>
                {/*<Route path="/users" component={UsersTable}/>
                <Route path="/users/:userID" component={UserPage}/>
                <Route path="/cinemas" component={CinemasTable}/>
                <Route path="/cinemas/:cinemaID" component={CinemaPage}/>
                <Route path="/movies" component={MoviesList}/>
                <Route path="/movies/:movieID" component={MoviePage}/>
                <Route path="/seances" component={SeansesTable}/>
                <Route path="/seances/:seanceID" component={SeansesPage}/>*/}
            </Container>
        );
    }
}
export default Content;
