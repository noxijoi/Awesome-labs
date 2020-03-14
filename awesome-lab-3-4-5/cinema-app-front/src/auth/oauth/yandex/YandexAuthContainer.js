import React, {Component} from "react";
import {config} from '../oauthConfig';
import YandexService from "./YandexService";
import {receiveToken, receiveUserData} from "../actions";
import {connect} from "react-redux";

class YandexAuthContainer extends Component {
    componentDidMount() {
        const accessToken = this.props.location.query.access_token;
        const tokenType = this.props.location.query.token_type;
        if (accessToken && tokenType == 'Bearer') {
            this.props.setToken(accessToken);
            this.props.fetchYandexUserInfo();
        } else {
            const errorCode = this.props.location.query.error;
            const errorDesc = this.props.location.query.error_description;
            this.props.setAuthError(errorCode, errorDesc)
        }
    }

    render() {
            // <YandexAuth auth ={this.props.auth}/>
        return (
            <div/>
        );
    }
}

const setAuthError = (errCode, errDesc) => {
    return async dispatch => {
        dispatch(setAuthError(errCode, errDesc));
    }
};


const fetchYandexUserInfo = () => {
    return async dispatch => {
        try {
            const userData = await YandexService.getUserData();
            dispatch(receiveUserData(userData))
        } catch (e) {
            dispatch(setAuthError(e))
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
        setToken: (token) => dispatch(receiveToken(token, config.services.yandex)),
        fetchYandexUserInfo: () => dispatch(fetchYandexUserInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps);
