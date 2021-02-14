import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    makeStyles,
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore,
    Dashboard,
    Assessment,
    Create,
} from '@material-ui/icons';
import styles from './sidepanel.module.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItem: {
        width: '100%',
    },
    listTextColor: {
        color: 'white',
    },
    icon: {
        color: 'white',
    },
}));

const SidePanel = () => {
    const [open, setOpen] = useState(false);
    const styleClasses = useStyles();

    return (
        <div className={styles.container}>
            <List component='nav' aria-labelledby='nested-list-subheader'>
                <ListItem button className={styleClasses.listItem} component={"/home" && Link} to='/home' >
                    <ListItemIcon>
                        <Dashboard className={styleClasses.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primary='Dashboard'
                        className={styleClasses.listTextColor}
                    />
                </ListItem>
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        <Create className={styleClasses.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primary='All Exams'
                        className={styleClasses.listTextColor}
                    />
                    {open ? (
                        <ExpandLess className={styleClasses.icon} />
                    ) : (
                        <ExpandMore className={styleClasses.icon} />
                    )}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <ListItem button>
                            {/* <ListItemIcon>
                                <Assessment />
                            </ListItemIcon> */}
                            <ListItemText
                                className={styleClasses.listTextColor}
                                primary='Test Perfromance & Analysis'
                            />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button className={styleClasses.listItem}>
                    <ListItemIcon>
                        <Assessment className={styleClasses.icon} />
                    </ListItemIcon>
                    <ListItemText
                        primary='Career Assessment'
                        className={styleClasses.listTextColor}
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default SidePanel;
