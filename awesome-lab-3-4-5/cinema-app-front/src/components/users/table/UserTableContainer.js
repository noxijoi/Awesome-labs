import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import UsersTable from "./UsersTable";
import UserService from "../UserService";
import {receiveUsersData} from "../userActions";


class UserTableContainer extends Component {
    componentDidMount() {
        this.props.getUsersData();
    }

    render() {
        return(
            <Box>
                <UsersTable users={this.props.usersData}/>
            </Box>
        )
    }
}

const getUsersData = () => {
    return async dispatch => {
        try {
            const users = await UserService.getUsers();
            dispatch(receiveUsersData(users));
        } catch (e) {
            console.log(e);
        }
    }
};

const mapStateToProps = state => {
    return {
        usersData: state.user.usersData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        receiveUsersData: (moviesData) => dispatch(receiveUsersData(moviesData)),
        getUsersData: () => dispatch(getUsersData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTableContainer);
