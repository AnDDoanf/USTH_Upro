import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavbar = (props = {}) => {
    const history = useNavigate();

    const handleNavbarToHomePage = useCallback(()=>{
        history('/homepage')
    });

    const handleNavbarToWorklist = useCallback(() => {
        history('/homepage/dash-board');
    });

    const handleNavbarToYourProject = useCallback(() => {
        history('/homepage/your-project');
    });

    const handleNavbarToSettingProject = useCallback(() => {
        history('/homepage/setting-project');
    });

    return {
        handleNavbarToHomePage,
        handleNavbarToWorklist,
        handleNavbarToYourProject,
        handleNavbarToSettingProject
    };
};

export default useNavbar;