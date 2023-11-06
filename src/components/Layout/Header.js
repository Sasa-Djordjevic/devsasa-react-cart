import React, {Fragment} from "react";

import mystyles from './Header.module.css';
import mealsImage from '../../assets/images/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={mystyles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClikcHandler={props.onOpenCart}/>
            </header>
            <div className={mystyles['main-image']}>
                <img src={mealsImage} alt="a table full of delicious meals"/>
            </div>
        </Fragment>
    );
};

export default Header;