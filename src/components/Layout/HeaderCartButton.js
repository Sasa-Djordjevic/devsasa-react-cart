import React, {useContext, useEffect, useState} from "react";

import mystyles from './HeaderCartButton.module.css';
import CartIcon from "./CartIcon";
import CartContext from "../../context/cart-context";

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;
    
    const numberOfCartItems = items.reduce((curentNumber, item) => {
        return curentNumber + item.amount;
    }, 0);

    const btnClasses = `${mystyles.button} ${btnIsHighlighted ? mystyles.bump : ''}`;

    useEffect(() => {
        if (items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClikcHandler}>
            <span className={mystyles.icon}>
                <CartIcon />
            </span>
            <span className={mystyles.title}>Your Cart</span>
            <span className={mystyles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;