import * as queryString from "query-string";
import {Redirect} from "react-router";
import React from "react";
import {CircularProgress} from "@material-ui/core";
import UserService from "../../../components/users/UserService";
import {authError, receiveUserData} from "../actions";

class GoogleAuthContainer extends Component {
    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        const code = params.code;
        this.props.login(code);
    }

    render() {
        if(this.props.auth.authorized){
            return(
                <Redirect to="/home"/>
            );
        } else {
            return <CircularProgress/>
        }
    }
}

const login = (code) => {
    return async dispatch =>{
        const userData = await  UserService.login(code, 'google');
        dispatch(receiveUserData(userData))
    }
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = state => {
    return {
        login: (code) => dispatch(login(code)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuthContainer);

