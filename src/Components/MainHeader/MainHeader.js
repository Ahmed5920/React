import HeaderCartButton from "./HeaderCartButton";
import classes from "./MainHeadre.module.css";
import mealImage from "../../assets/Untitled design.jpg"
import React from "react";

const MainHeader = (props) =>{
    return(
        <React.Fragment>
            <header className={classes['main-header']}>
                <h2> React Meals</h2>
                <HeaderCartButton onClick = {props.onClick}/>
            </header>
                <div className={classes['main-image']}>
                    <img src = {mealImage} alt = "Fast-food-order"/>
                </div>
        </React.Fragment>
    )
}

export default MainHeader;