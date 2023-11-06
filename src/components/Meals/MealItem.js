import React, {useContext} from "react";

import mystyles from './MealItem.module.css';
import CartContext from '../../context/cart-context';

import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    const addToChartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };
    return (
        <li className={mystyles.meal}>
            <div>
                <h3>{props.name}</h3>
                <p className={mystyles.description}>{props.description}</p>
                <p className={mystyles.price}>{price}</p>
            </div>
            <MealItemForm id={props.id} onAddToCart={addToChartHandler}/>
        </li>
    );
};

export default MealItem;