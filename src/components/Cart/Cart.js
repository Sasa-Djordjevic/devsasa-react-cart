import React, {useContext, useState, Fragment} from "react";

import mystyles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../context/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1});
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
		
        await fetch('https://react-food-order-cart-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();

    };

    const cartItem = <ul className={mystyles['cart-items']}>{cartCtx.items.map(item => 
                        <CartItem 
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            amount={item.amount}
                            onAdd={cartItemAddHandler.bind(null, item)}
                            onRemove={cartItemRemoveHandler.bind(null, item.id)}
                        />
                        )}
                    </ul>;

    const modalAction = (
        <div className={mystyles.actions}>
                <button className={mystyles['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={mystyles.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <Fragment>
            {cartItem}
            <div className={mystyles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />}
            {!isCheckout && modalAction}
        </Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <Fragment>
            <p>Order data sent successfully.</p>
            <div className={mystyles.actions}>
                <button className={mystyles.button} onClick={props.onCloseCart}>Close</button>
            </div>
        </Fragment>
    );

    return (
        <Modal onClose={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;