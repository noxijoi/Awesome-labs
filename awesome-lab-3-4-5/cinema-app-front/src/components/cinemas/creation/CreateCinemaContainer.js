import React from "react";
import {cinemaCreated} from "../actions";
import CinemaService from "../CinemaService";
import {connect} from "react-redux";
import CinemaForm from "./CinemaForm";

const {Component} = require("react");

class CreateCinemaContainer extends Component {
    componentWillUnmount() {
        this.props.cinemaCreated(false)
    }

    render() {
        return (
            <CinemaForm created={this.props.cinema.created}
                        handleSubmit={this.props.createCinema}
            />
        )
    }
}

export const createCinema = cinema => {
    return async dispatch => {
        const result = await CinemaService.createCinema(cinema);
        if (result) {
            dispatch(cinemaCreated(true));
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        cinemaCreated: (created) => dispatch(cinemaCreated(created)),
        createCinema: (cinema) => dispatch(createCinema(cinema))
    }
};

const mapStateToProps = state => {
    return {
        cinema: state.cinema
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCinemaContainer);

