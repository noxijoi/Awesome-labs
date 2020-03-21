import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import MovieService from "../MovieService";
import {receiveMoviesData} from "../movieActions";
import MoviesTable from "./MoviesTable";


class MovieTableContainer extends Component {
    componentDidMount() {
        this.props.getMoviesData();
    }

    render() {
        return(
            <Box>
                <Button variant="outlined" color="primary" >
                    <Link href="/newMovie">Create new</Link>
                </Button>
                <MoviesTable movies={this.props.moviesData}/>
            </Box>
        )
    }
}

const getMoviesData = () => {
    return async dispatch => {
        const moviesData = await MovieService.getMovies();
        dispatch(receiveMoviesData(moviesData));
    }
};

const mapStateToProps = state => {
    return {
        moviesData: state.movie.moviesData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        receiveMoviesData: (moviesData) => dispatch(receiveMoviesData(moviesData)),
        getMoviesData: () => dispatch(getMoviesData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieTableContainer);
