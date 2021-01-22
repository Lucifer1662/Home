import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import React from 'react'
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { useHeaderContext } from './HeaderContext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import CodeIcon from '@material-ui/icons/Code';
import { toProjects, toAboutMe, toContact, toResume } from "./navigation";
import { useHistory } from 'react-router';

export default function AppDrawer() {

    //const container = window !== undefined ? () => window.document.body : undefined;
    const headerState = useHeaderContext();
    const history = useHistory();

    const drawer = (
        <div>
            <Divider />
            <List>
                <ListItem button onClick={()=>{toProjects(history)(); headerState.close();}}>
                    <ListItemIcon><CodeIcon /></ListItemIcon>
                    <ListItemText primary={'Projects'} />
                </ListItem>
                <ListItem button onClick={()=>{toAboutMe(history)(); headerState.close();}}>
                    <ListItemIcon> <PersonIcon /> </ListItemIcon>
                    <ListItemText primary={'About Me'} />
                </ListItem>

            </List>

            <Divider />
            <List>
                <ListItem button onClick={()=>{toResume(history)(); headerState.close();}}>
                    <ListItemIcon><DescriptionIcon /> </ListItemIcon>
                    <ListItemText primary={'Resume'} />
                </ListItem>
                <ListItem button onClick={()=>{toContact(history)(); headerState.close();}}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={'Contact'} />
                </ListItem>

            </List>


        </div>
    );

    return <Drawer
        variant="temporary"
        open={headerState.isOpen}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}
    >
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }}>


            <IconButton onClick={() => { headerState.close(); }}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        {drawer}
    </Drawer>
}