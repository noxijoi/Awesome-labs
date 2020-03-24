import React from "react";
import {seanceCreated, receiveSeanceData} from "../seanceActions";
import {connect} from "react-redux";
import SeanceService from "../SeanceService";

import SeanceForm from "./SeanceForm";

const {Component} = require("react");

class EditSeanceContainer extends Component {
    componentWillUnmount() {
        this.props.seanceCreated(false)
    }

    componentDidMount() {
        const id = this.props.match.params.seanceId;
        this.props.getSeanceData(id);
    }

    render() {
        const id = this.props.match.params.seanceId;
        return (
            <SeanceForm created={this.props.seance.created}
                        seanceId={id}
                        seance={this.props.seance}
                        handleSubmit={this.props.updateSeance}
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


const mapDispatchToProps = dispatch => {
        return {
            seanceCreated: (created) => dispatch(seanceCreated(created)),
            updateSeance: (seance) => dispatch(updateSeance(seance)),
            getSeanceData: (id) => dispatch(getSeanceData(id)),
            receiveSeanceData:(seance)=>dispatch(receiveSeanceData(seance))
        }
    }
;

const mapStateToProps = state => {
    return {
        seance: state.seance.seance
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSeanceContainer);