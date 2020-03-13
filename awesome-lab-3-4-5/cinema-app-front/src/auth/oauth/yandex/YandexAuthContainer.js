import React, {Component} from "react";
import {authError, receiveUserData} from "../actions";
import UserService from "../../../users/UserService";
import {CircularProgress} from "@material-ui/core";
import {Redirect} from "react-router";
import {connect} from "react-redux";


class YandexAuthContainer extends Component {
    componentDidMount() {
        const accessToken = this.props.location.query.access_token;
        const tokenType = this.props.location.query.token_type;
        if (accessToken && tokenType == 'Bearer') {
            this.props.login(accessToken);
        } else {
            const errorCode = this.props.location.query.error;
            const errorDesc = this.props.location.query.error_description;
            this.props.setAuthError(errorDesc)
        }
    }

    render() {
        if (this.props.auth.authorized) {
            return (
                <Redirect to="/home"/>
            );
        } else {
            return (<CircularProgress/>)
        }
    }
}


const login = (accessToken) => {
    return async dispatch => {
        try {
            const userData = await UserService.login(accessToken, 'yandex');
            dispatch(receiveUserData(userData));
        } catch (e) {
            dispatch(authError(e))
        }
    }
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (accessToken) => dispatch(login(accessToken)),
        setAuthError: (desc) => dispatch(authError(desc))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(YandexAuthContainer);
