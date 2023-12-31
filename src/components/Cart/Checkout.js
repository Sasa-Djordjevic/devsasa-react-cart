import React, {useRef, useState} from "react";

import mystyles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChars(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        });

        const formIsValid = enteredNameIsValid &&
                            enteredStreetIsValid &&
                            enteredPostalIsValid &&
                            enteredCityIsValid;

        if (!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        });
    };

    const nameClasses = formInputValidity.name ? mystyles.control : `${mystyles.control} ${mystyles.invalid}`;
    const streetClasses = formInputValidity.street ? mystyles.control : `${mystyles.control} ${mystyles.invalid}`;
    const postalClasses = formInputValidity.postalCode ? mystyles.control : `${mystyles.control} ${mystyles.invalid}`;
    const cityClasses = formInputValidity.city ? mystyles.control : `${mystyles.control} ${mystyles.invalid}`;

    return (
        <form className={mystyles.form} onSubmit={confirmHandler}>
            <div className={nameClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputValidity.name && <p>Please enter a valid sstreet.</p>}
            </div>
            <div className={postalClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formInputValidity.name && <p>Please enter a valid Postal Code.</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputValidity.name && <p>Please enter a valid City.</p>}
            </div>
            <div className={mystyles.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={mystyles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;