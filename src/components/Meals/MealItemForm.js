import React, {useRef, useState} from "react";

import mystyles from './MealItemForm.module.css';
import Input from "../UI/Input";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enterdAmount = amountInputRef.current.value;
        const enterdAmountNumber = +enterdAmount;

        if (enterdAmount.trim().length === 0 || enterdAmountNumber < 1 || enterdAmountNumber > 10){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enterdAmountNumber);
    };
    
    return (
        <form className={mystyles.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "10",
                    step: "1",
                    defaultValue: "1"
                }}
            />
            <button type="submit">+ Add</button>
            {!amountIsValid && <p>Please enterd a valid amount (1-10).</p>}
        </form>
    );
};

export default MealItemForm;