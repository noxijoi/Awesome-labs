import React, {Component} from "react";
import {receiveCinemasData} from "../cinemaActions";
import CinemaService from "../CinemaService";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import CinemasTable from "./CinemasTable";
import {connect} from "react-redux";


class CinemaTableContainer extends Component {
    componentDidMount() {
        this.props.getCinemasData();
    }

    render() {
        return(
            <Box>
                    <Button variant="outlined" color="primary">
                        <Link href="/newcinema">Create new</Link>
                    </Button>
                    <CinemasTable cinemas={this.props.cinemasData}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CinemaTableContainer);
