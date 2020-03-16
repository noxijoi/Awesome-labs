import {Page} from "../Page";
import React from "react";

import {connect} from "react-redux";

const {Component} = require("react");

class PageContainer extends Component {
    render() {
        const roleOptions = {
            'guest': [
                {
                    title: 'Login',
                    url: '/login'
                },
                {
                    title: 'Home',
                    url: '/home'
                }
            ],
            'user': [
                {
                    title: 'Seances',
                    url: '/seances'
                },
                {
                    title: 'Movies',
                    url: '/movies'
                },
                {
                    title: 'Cinemas',
                    url: '/cinemas'
                },
            ],
            'admin': [
                {
                    title: 'Seances',
                    url: '/seances'
                },
                {
                    title: 'Movies',
                    url: '/movies'
                },
                {
                    title: 'Cinemas',
                    url: '/cinemas'
                },
                {
                    title: 'Users',
                    url: '/users'
                }
            ]
        };
        const currentUserRole = this.props.auth.role;
        const options = roleOptions[currentUserRole];
        return (<Page options={options}/>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PageContainer);
