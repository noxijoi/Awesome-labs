import React from "react";
import {cinemaCreated, receiveCinemaData} from "../cinemaActions";
import CinemaService from "../CinemaService";
import {connect} from "react-redux";
import CinemaForm from "./CinemaForm";

const {Component} = require("react");

class EditCinemaContainer extends Component {
    componentWillUnmount() {
        this.props.cinemaCreated(false)
    }

    componentDidMount() {
        const id = this.props.match.params.cinemaId;
        this.props.getCinemaData(id);
    }

    render() {
        const id = this.props.match.params.cinemaId;
        return (
            <CinemaForm created={this.props.cinema.created}
                        cinemaId={id}
                        cinema={this.props.cinema}
                        handleSubmit={this.props.updateCinema}
            />
        )
    }
}

export const updateCinema = cinema => {
    return async dispatch => {
        const result = await CinemaService.updateCinema(cinema);
        if (result) {
            dispatch(cinemaCreated(true));
        }
    }
};

const getCinemaData = id => {
    return async dispatch => {
        const result = await CinemaService.getCinema(id);
        if (result) {
            dispatch(receiveCinemaData(result))
        }
    }
};


const mapDispatchToProps = dispatch => {
        return {
            cinemaCreated: (created) => dispatch(cinemaCreated(created)),
            updateCinema: (cinema) => dispatch(updateCinema(cinema)),
            getCinemaData: (id) => dispatch(getCinemaData(id)),
            receiveCinemaData:(cinema)=>dispatch(receiveCinemaData(cinema))
        }
    }
;

const mapStateToProps = state => {
    return {
        cinema: state.cinema.cinema
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCinemaContainer);