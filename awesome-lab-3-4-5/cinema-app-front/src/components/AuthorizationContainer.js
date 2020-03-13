import React, {Component} from "react";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Link from "@material-ui/core/Link";

export class AuthorizationContainer extends Component {
    render() {
        const vkURL = vkConfig.URL + '?response_type=token&' + 'client_id=' + vkConfig.ID + '&redirect_uri=' + vkConfig.redirectURL;
        const yaURL = yaConfig.URL + '?response_type=token&' + 'client_id=' + yaConfig.ID + '&redirect_uri=' + yaConfig.redirectURL;
        const fbURL = fbConfig.URL + '?response_type=token&' + 'client_id=' + fbConfig.ID + '&redirect_uri=' + fbConfig.redirectURL;
        return (
            <div className="loginForm">
                <Box>
                    <Button variant="outlined" color="primary" id='vkButton'>
                        <Link href={vkURL}>Authorize with vk</Link>
                    </Button>
                </Box>
                <Box>
                    <Button variant="outlined" color="primary" id="fbButton">
                        <Link href={fbURL}>Authorize with Facebook</Link>
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
