import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {useNavigate} from "react-router-dom";

const ListItems = () => {

    const navigate = useNavigate()

    const clickHandler = () => {
        navigate('/token-generator')
    }

    return (
        <React.Fragment>
            <ListItemButton onClick={() => clickHandler()}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Token Generator" />
            </ListItemButton>
        </React.Fragment>
    )
}
export default ListItems
