import React, {useState} from 'react';
import classes from "../pages/styles/Projects.module.css";
import {HISTORY_ROUTE} from "../utils/consts";
import ldr from './styles/images/whiteSpin.gif'

const ProjectInterface = ({search, handleSearch}) => {

    const [loaderr, setLoader] = useState(true);

    function loaderFunc(){
        setLoader(false);
    }
    return (
        <div>
        {loaderr ? <div className={classes.figmaModuleInput}><input ref={search} className={classes.inputPlace} type="text" placeholder="Project Link"/> <a><button className={classes.inputPlaceButton} onClick={() => {handleSearch(); loaderFunc()}}>Go</button></a></div> : <div className={classes.figmaModuleInput}><img src={ldr} alt="loader"/></div>}
        </div>
    );
};

export default ProjectInterface;