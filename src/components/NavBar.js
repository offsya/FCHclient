import React from 'react';
import classes from './styles/NavBar.module.css'
import vector from './styles/images/Vector.svg'
import {AUTH_ROUTE} from "../utils/consts";
import logo from './styles/images/logo.svg'
import backArrow from './styles/images/backArr.svg'
import clasess from './styles/NavBar.module.css'



const NavBar = ({isAuth, link, name, icon}) => {
    function refreshPage(){
        window.location.reload();
    }
    return (
        <div className={classes.nav}>
            <div style={{display: 'flex', marginTop: '6px', marginLeft: '24px'}}>
                {!isAuth ? <button onClick={() => refreshPage()} style={{marginRight: '12px'}} className={classes.exitButton}><img className={classes.vectorImg} src={backArrow}/></button> : <div></div>}
                <img style={{marginRight: '8px', width: '32px', heigth: '32px', marginTop: '-6px'}} src={logo} alt=""/>
                <div className={clasess.logoName}>Component History</div>
            </div>
            <div style={{display: "flex", marginTop: '6px', marginRight: '24px'}}>
                <img className={classes.userImg} src={icon}/>
                <div className={classes.userName}>{name}</div>
                <a href={AUTH_ROUTE}><button className={classes.exitButton}><img className={classes.vectorImg} src={vector}/></button></a>
            </div>
        </div>

    )
}

export default NavBar;