import React from 'react';

import classes from './NavigationItem.css';

const NavigationItem = ({ children, link, active }) => (
    <li className={classes.NavigationItem}>
        <a
            href={link}
            className={active && classes.active}
        >
            {children}
        </a>
    </li>
);
 
export default NavigationItem;