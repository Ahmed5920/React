import ItemsSummary from "./ItemsSummary.js";
import ItemsData from "./ItemsData.js";
import classes from "./ItemList.module.css";
import React, { useEffect, useState } from "react";
import Meals from "./Meals.js";
import useHttp from "../../hooks/use-http.js";

const ItemsList = (props) => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  let Content = null;

  useEffect(() => {
    const addMealsHandler = (data) => {
      const mealsData = [];
      for (const id in data) {
        mealsData.push({
          id: id,
          name: data[id].name,
          descirpe: data[id].descirpe,
          price: data[id].price,
        });
      }
      setMeals(mealsData);
    };
    fetchMeals(
      { url: "https://meals-ecec2-default-rtdb.firebaseio.com/meals.json" },
      addMealsHandler
    );
  }, [fetchMeals]);

  if (error) {
    Content = (
      <div className={classes.ItemsList}>
        <p className={classes.ErrorMessage}>Something Went Wrong</p>{" "}
      </div>
    );
  } else if (isLoading) {
    Content = (
      <div className={classes.ItemsList}>
        <p>Loading...</p>
      </div>
    );
  } else {
    Content = (
      <ul className={classes.ItemsList}>
        {meals.map((meal) => (
          <ItemsData
            key={meal.id}
            id={meal.id}
            name={meal.name}
            descripe={meal.descirpe}
            price={meal.price}
          />
        ))}
      </ul>
    );
  }

  return (
    <React.Fragment>
      <Meals />
      <ItemsSummary />
      {Content}
    </React.Fragment>
  );
};
export default ItemsList;
