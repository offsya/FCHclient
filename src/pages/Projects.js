import React from 'react';
import {useRef, useState} from 'react';
import {useSearchParams, useParams} from "react-router-dom";
import NavBar from "../components/NavBar";
import classes from "./styles/Projects.module.css";
import {HISTORY_ROUTE} from "../utils/consts";
import ProjectInterface from "../components/ProjectInterface";
import HistoryInterface from "../components/HistoryInterface";

const Projects = () => {

    const [dataChecker, setdataChecker] = useState(true);
    const [info, setInfo] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const search = useRef(null);

        function dataCheck(){
            setdataChecker(false);
        }


        async function handleSearch() {
            const projectLink = search.current.value.substr(27, 22);
            const token = searchParams.get("token");
            const info = await axios({
                method: 'get',
                url: `http://localhost:4000/api/info/file/?link=${projectLink}&token=${token}`,
            })
            setInfo(info.data);
            dataCheck()
        }
        console.log(info)


    return (
        <div>
            <NavBar isAuth={dataChecker} name={searchParams.get("name")} icon={searchParams.get("default")}/>
            {dataChecker ? <ProjectInterface search={search} handleSearch={() => handleSearch()}/> : <HistoryInterface info={info}/>}
        </div>
    );
};

const axios = require('axios');

export default Projects;