import React, {Component} from "react";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Link from "@material-ui/core/Link";
import {oauthConfig} from "./oauth/oauthConfig";

export class AuthorizationContainer extends Component {
    buildLink = (baseUrl,params) =>{
        let search = '?';
        for (const key in params) {
            search += `&${key}=${params[key]}`;
        }
        return `${baseUrl}${search}`;
    };

    render() {
        const yaConfig = oauthConfig.ya;
        const googleConfig = oauthConfig.google;
        const yaURL = this.buildLink(yaConfig.url, yaConfig.params);
        const googleURL = this.buildLink(googleConfig.url, googleConfig.params);
        return (
            <div className="loginForm">
                <Box>
                    <Button variant="outlined" color="primary" id='vkButton'>
                        <Link href={googleURL}>Authorize with Google</Link>
                    </Button>
                </Box>
                <Box>
                    <Button variant="outlined" color="primary" id="yaButton">
                        <Link href={yaURL}>Authorize with Yandex</Link>
                    </Button>
                </Box>
            </div>
        )
    }
}
