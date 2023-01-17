import React from 'react';
import {useLocation} from 'react-router-dom';
import useMain from '../../talons/main';
import { useScrollTopOnChange } from '../../hooks/useScrollTopOnChange';
import { useState } from 'react';

const Main = (props) => {
    const [projectCode, setProjectCode] = useState("");
    const getData = (data) => {
      setProjectCode(data);
    };

    const { pathname } = useLocation();
    const { ComponentRender } = useMain();
    useScrollTopOnChange(pathname);

    return (
        <div>
            <ComponentRender userCode = {props.userCode} projectCode = {projectCode} getData = {getData}/>
        </div>
    );
}
export default Main;
