import React from "react";
import MovieService from "../MovieService";
import {connect} from "react-redux";
import MovieForm from "./MovieForm";
import {movieCreated, receiveMovieData} from "../movieActions";

const {Component} = require("react");

class EditMovieContainer extends Component {
    componentWillUnmount() {
        this.props.movieCreated(false)
    }

    componentDidMount() {
        const id = this.props.match.params.movieId;
        this.props.getMovieData(id);
    }

    render() {
        const id = this.props.match.params.movieId;
        return (
            <MovieForm created={this.props.movie.created}
                        movieId={id}
                        movie={this.props.movie}
                        handleSubmit={this.props.updateMovie}
            />
        )
    }
}

export const updateMovie = movie => {
    return async dispatch => {
        const result = await MovieService.updateMovie(movie);
        if (result) {
            dispatch(movieCreated(true));
        }
    }
};

const getMovieData = id => {
    return async dispatch => {
        const result = await MovieService.getMovie(id);
        if (result) {
            dispatch(receiveMovieData(result.movie))
        }
    }
};


const mapDispatchToProps = dispatch => {
        return {
            movieCreated: (created) => dispatch(movieCreated(created)),
            updateMovie: (movie) => dispatch(updateMovie(movie)),
            getMovieData: (id) => dispatch(getMovieData(id)),
            receiveMovieData:(movie)=>dispatch(receiveMovieData(movie))
        }
    }
;

const mapStateToProps = state => {
    return {
        movie: state.movie.movie
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMovieContainer);