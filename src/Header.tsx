import React from 'react';
import { IconButton, Toolbar } from '@material-ui/core';
import { AppBar, Typography } from '@material-ui/core';
import AppDrawer from './AppDrawer';
import { HeaderContextProvider, useHeaderContext } from './HeaderContext';
import MenuIcon from '@material-ui/icons/Menu';


export default function Header() {
    return <HeaderContextProvider>
        <HeaderAppBar/>
    </HeaderContextProvider>

}

function HeaderAppBar() {
    const headerState = useHeaderContext(); 
    return <AppBar position="static">

        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={()=> headerState.open()} >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6">
                Luke Hawkins - My Projects
    </Typography>
        </Toolbar>
        <AppDrawer />
    </AppBar>
}



