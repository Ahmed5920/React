import ItemsSummary from "./ItemsSummary.js";
import ItemsData from "./ItemsData.js";
import classes from "./ItemList.module.css";
import React from "react";

const DummyData = [
  {
    id: "m1",
    name: "Suchi",
    descirpe: "Finest fish and veggis",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    descirpe: "a german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    descirpe: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    descirpe: "Healthy...and green...",
    price: 18.99,
  },
];

const ItemsList = (props) => {

  return (
    <React.Fragment>
        <ItemsSummary/>
        <ul className={classes.ItemsList}>
        {DummyData.map((meal) => (
            <ItemsData
            key={meal.id}
            id = {meal.id}
            name={meal.name}
            descripe={meal.descirpe}
            price={meal.price}
            />
        ))}
        </ul>
    </React.Fragment>
  );
};
export default ItemsList;
