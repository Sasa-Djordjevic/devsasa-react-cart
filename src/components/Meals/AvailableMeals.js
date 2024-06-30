import React, {useEffect, useState} from "react";

import mystyles from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect( () => {
      const fetchMeals = async () => {
      // const response = await fetch('https://react-food-order-cart-jun-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
      const response = await fetch('https://react-food-order-cart-jul-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

        if (!response.ok){
          throw new Error('Something went wrong!');
        }
        
        const data = await response.json();

        const loadedMeals = [];

        for (const key in data){
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      };

      fetchMeals().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });

    }, []);

    if (isLoading){
      return (
        <section className={mystyles.loading}>
          <p>Loading...</p>
        </section>
      );
    }

    if (httpError){
      return (
        <section className={mystyles.errors}>
          <p>{httpError}</p>
        </section>
      );
    }

    const mealsList = meals.map( 
      meal => <MealItem 
                key={meal.id} 
                id={meal.id}
                name={meal.name} 
                description={meal.description} 
                price={meal.price} 
              />
    );

    return (
        <section className={mystyles.meals}>
          <Card>
            <ul>
                {mealsList}
            </ul>
          </Card>  
        </section>
    );
};

export default AvailableMeals;
