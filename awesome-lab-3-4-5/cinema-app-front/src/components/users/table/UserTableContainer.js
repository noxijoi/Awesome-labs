import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {receiveMoviesData} from "../movieActions";
import UsersTable from "./UsersTable";
import UserService from "../UserService";


class UsersTableContainer extends Component {
    componentDidMount() {
        this.props.getUsersData();
    }

    render() {
        return(
            <Box>
                <Button variant="outlined" color="primary" >
                    <Link href="/newMovie">Create new</Link>
                </Button>
                <UsersTable movies={this.props.usersData}/>
            </Box>
        )
    }
}

const getUsersData = () => {
    return async dispatch => {
        const users = await UserService.getUsers();
        dispatch(receiveMoviesData(users));
    }
};

const mapStateToProps = state => {
    return {
        usersData: state.user.usersData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUsersData: (moviesData) => dispatch(receiveMoviesData(moviesData)),
        getUsersData: () => dispatch(getUsersData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTableContainer);
