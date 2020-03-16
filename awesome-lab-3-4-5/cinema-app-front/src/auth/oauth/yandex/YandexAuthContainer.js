import React, {Component} from "react";
import {authError, receiveUserData} from "../actions";
import UserService from "../../../components/users/UserService";
import {CircularProgress} from "@material-ui/core";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import queryString from 'query-string';



class YandexAuthContainer extends Component {
    componentDidMount() {
        const params = queryString.parse(this.props.location.hash);
        const accessToken = params.access_token;
        const tokenType = params.token_type;
        if (accessToken && tokenType === 'bearer') {
            this.props.login(accessToken);
        } else {
            const errorCode = params.error;
            const errorDesc = params.error_description;
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
            const userData = await UserService.login(accessToken, 'yandex');
            dispatch(receiveUserData(userData));

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
