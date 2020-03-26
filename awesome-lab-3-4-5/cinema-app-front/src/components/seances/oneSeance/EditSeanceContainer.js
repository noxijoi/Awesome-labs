import React from "react";
import {seanceCreated, receiveSeanceData} from "../seanceActions";
import {connect} from "react-redux";
import SeanceService from "../SeanceService";

import SeanceForm from "./SeanceForm";
import MovieService from "../../movies/MovieService";
import {receiveMoviesData} from "../../movies/movieActions";
import CinemaService from "../../cinemas/CinemaService";
import {receiveCinemasData} from "../../cinemas/cinemaActions";

const {Component} = require("react");

class EditSeanceContainer extends Component {
    componentWillUnmount() {
        this.props.seanceCreated(false)
    }

    componentDidMount() {
        const id = this.props.match.params.seanceId;
        this.props.getSeanceData(id);
        this.props.getMovies();
        this.props.getCinemas();
    }

    render() {
        const id = this.props.match.params.seanceId;
        return (
            <SeanceForm created={this.props.seance.created}
                        seanceId={id}
                        seance={this.props.seance}
                        handleSubmit={this.props.updateSeance}
                        movies={this.props.movies}
                        cinemas={this.props.cinemas}
            />
        )
    }
}

export const updateSeance = seance => {
    return async dispatch => {
        const result = await SeanceService.updateSeance(seance);
        if (result) {
            dispatch(seanceCreated(true));
        }
    }
};

const getSeanceData = id => {
    return async dispatch => {
        const result = await SeanceService.getSeance(id);
        if (result) {
            dispatch(receiveSeanceData(result))
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
            updateSeance: (seance) => dispatch(updateSeance(seance)),
            getSeanceData: (id) => dispatch(getSeanceData(id)),
            getMovies: () => dispatch(getMovies()),
            getCinemas: () => dispatch(getCinemas()),
            receiveSeanceData:(seance)=>dispatch(receiveSeanceData(seance))
        }
    }
;

const mapStateToProps = state => {
    return {
        seance: state.seance.seance,
        movies: state.movie.moviesData,
        cinemas: state.cinema.cinemasData
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSeanceContainer);