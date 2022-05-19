import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {publicRoutes} from "../routes";
import {HOME_ROUTE} from "../utils/consts";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/auth" />}/>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate replace to="/404" />}/>
        </Routes>
    );
}

export default AppRouter;
