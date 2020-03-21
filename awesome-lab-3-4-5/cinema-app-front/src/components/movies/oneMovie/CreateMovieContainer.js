import React, {Component} from "react";
import MovieForm from "./MovieForm";
import MovieService from "../MovieService";
import {movieCreated} from "../movieActions";
import {connect} from "react-redux";

class CreateMovieContainer extends Component {
    componentWillUnmount() {
        this.props.movieCreated(false);
    }

    render() {
        return (
            <MovieForm created={this.props.created}
                       handleSubmit={this.props.createMovie}/>
        )
    }
}

export const createMovie = movie => {
    return async dispatch => {
        const result = await MovieService.createMovie(movie);
        if (result) {
            dispatch(movieCreated(true));
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        movieCreated: (created) => dispatch(movieCreated(created)),
        createMovie: (movie) => dispatch(createMovie(movie))
    }
};

const mapStateToProps = state => {
    return {
        movie: state.movie
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovieContainer);