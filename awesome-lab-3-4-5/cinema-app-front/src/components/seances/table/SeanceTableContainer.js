import React, {Component} from "react";
import {receiveSeancesData} from "../seanceActions";
import SeanceService from "../SeanceService";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SeanceTable from "./SeanceTable";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


class SeanceTableContainer extends Component {
    componentDidMount() {
        this.props.getSeancesData();
    }

    render() {
        return(
            <Box>
                <Button variant="outlined" color="primary">
                    <Link to="/newseance">Create new</Link>
                </Button>
                <SeanceTable seances={this.props.seancesData}/>
            </Box>
        )
    }
}

const getSeancesData = () => {
    return async dispatch => {
        const seancesData = await SeanceService.getSeances();
        dispatch(receiveSeancesData(seancesData));
    }
};

const mapStateToProps = state => {
    return {
        seancesData: state.seance.seancesData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        receiveSeancesData: (seancesData) => dispatch(receiveSeancesData(seancesData)),
        getSeancesData: () => dispatch(getSeancesData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SeanceTableContainer);
