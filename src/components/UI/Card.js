import React from "react";

import mystyles from './Card.module.css';

const Card = (props) => {
    const classes = `${mystyles.card} ${props.className}`;
    return (
        <div className={classes}>{props.children}</div>
    );
};

export default Card;