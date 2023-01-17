import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Dashboard from '../../components/dashboard/Dashboard';
import PageNotFound from '../../components/pageNotFound/PageNotFound';
import YourProject from '../../components/yourProject/YourProject';
import SettingProject from '../../components/settingProject/SettingProject';
import Home from '../../components/home/Home';



const useMain = (props = {}) => {
    const location = useLocation();
    const { pathname } = location;

    const getComponentRenderMapping = useCallback(() => {
        switch (pathname) {
            case '/homepage': {
                return Home;
            }
            case '/homepage/dash-board':{
                return Dashboard;
            }
            case '/homepage/your-project':{
                return YourProject;
            }
            case '/homepage/setting-project':{
                return SettingProject;
            }
            default: {
                return PageNotFound;
            }
            
        }
    }, [pathname]);

    const ComponentRender = getComponentRenderMapping();

    return {
        ComponentRender
    };
};

export default useMain;