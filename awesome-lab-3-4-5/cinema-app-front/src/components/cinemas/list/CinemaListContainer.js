import React, {Component} from "react";
import {receiveCinemasData} from "../actions";
import CinemaService from "../CinemaService";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import CinemasList from "./CinemasList";
import {connect} from "react-redux";


class CinemaListContainer extends Component {
    componentDidMount() {
        this.props.getCinemasData();
    }

    render() {
        return(
            <Box>
                    <Button variant="outlined" color="primary" id='vkButton'>
                        <Link href="/cinemas/new">Create new</Link>
                    </Button>
                    <CinemasList cinemas={this.props.cinemasData}/>
            </Box>
        )
    }
}

const getCinemasData = () => {
    return async dispatch => {
        const cinemasData = await CinemaService.getCinemas();
        dispatch(receiveCinemasData(cinemasData));
    }
};

const mapStateToProps = state => {
    return {
        cinemasData: state.cinema.cinemasData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        receiveCinemasData: (cinemasData) => dispatch(receiveCinemasData(cinemasData)),
        getCinemasData: () => dispatch(getCinemasData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CinemaListContainer);
