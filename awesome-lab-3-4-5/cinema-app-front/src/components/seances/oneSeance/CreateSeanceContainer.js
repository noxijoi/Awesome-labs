import React, {Component} from "react";
import SeanceForm from "./SeanceForm";
import SeanceService from "../SeanceService";
import {seanceCreated} from "../seanceActions";
import {connect} from "react-redux";
import MovieService from "../../movies/MovieService";
import {receiveMoviesData} from "../../movies/movieActions";
import CinemaService from "../../cinemas/CinemaService";
import {receiveCinemasData} from "../../cinemas/cinemaActions";

class CreateSeanceContainer extends Component {
    componentWillUnmount() {
        this.props.seanceCreated(false);
    }

    componentDidMount() {
        this.props.getMovies();
        this.props.getCinemas();
    }

    render() {
        return (
            <SeanceForm created={this.props.created}
                        handleSubmit={this.props.createSeance}
                        movies={this.props.movies}
                        cinemas={this.props.cinemas}
            />
        )
    }
}

export const createSeance = seance => {
    return async dispatch => {
        const result = await SeanceService.createSeance(seance);
        if (result) {
            dispatch(seanceCreated(true));
        }
    }
};

const getMovies = () => {
    return async dispatch => {
        const movies = await MovieService.getMovies();
        if (movies) {
            dispatch(receiveMoviesData(movies));
        }
    };
};

const getCinemas = () => {
    return async dispatch => {
        const cinemas = await CinemaService.getCinemas();
        if (cinemas) {
            dispatch(receiveCinemasData(cinemas));
        }
    };
};

const mapDispatchToProps = dispatch => {

    return {
        seanceCreated: (created) => dispatch(seanceCreated(created)),
        createSeance: (seance) => dispatch(createSeance(seance)),
        getMovies: () => dispatch(getMovies()),
        getCinemas: () => dispatch(getCinemas())
    }
};

const mapStateToProps = state => {
    return {
        seance: state.seance,
        movies: state.movie.moviesData,
        cinemas: state.cinema.cinemasData
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSeanceContainer);