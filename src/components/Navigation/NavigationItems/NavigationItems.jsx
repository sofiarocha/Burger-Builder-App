import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Builder Burger</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);
 
export default NavigationItems;