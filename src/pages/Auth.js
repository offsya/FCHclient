import React from 'react';
import {useState} from "react";
import NavBar from "../components/NavBar";
import classes from "./styles/Auth.module.css";

const Auth = () => {
    const redirect_url = process.env.REACT_APP_API_URL
    const client_id = process.env.REACT_APP_CLIENT_ID
    const link = `https://www.figma.com/oauth?client_id=${client_id}&redirect_uri=${redirect_url}&scope=file_read&state=:state&response_type=code`;

    return (
        <div>
            <div className={classes.figmaModuleLogin}>
                <div className={classes.figmaLog}>Sign in</div>
                <a href={link}><button className={classes.figmaLinkButton}>Sign in with Figma</button></a>
            </div>
        </div>
    );
};

export default Auth;