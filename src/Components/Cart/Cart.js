import React ,{ useContext, useEffect, useState } from "react";
import CartTotalContext from "../../store/cart-total-context";
import classes from "./Cart.module.css";
import { createPortal } from "react-dom";

const Backdrop = (props) =>{
    return <div className={classes.backdrop} onClick={props.onClick}></div>
}

const Overlay = (props) =>{
    const[total,setTotal] = useState(0);
    const ctx = useContext(CartTotalContext);
    const meals = ctx.dataMeal;
    const hasItems = meals.length > 0 ;

    useEffect(() =>{
        const totalAmount = meals.reduce((acc,meal) =>
            (acc+(meal.price * meal.amount)),0);
        setTotal(totalAmount);
    },[meals])

    const increaseHandler = (id) =>{
        ctx.updateMealAmount(id,1)
    }

    const decreaseHandler = (id) =>{
        ctx.updateMealAmount(id,-1)
    }

    const orderHandler= () =>{
        console.log("Oredering...");
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <div className={classes.meals}>
                    {
                        meals.map((meal) => (
                            <div key ={meal.id} className={classes.mealRow}>
                                <div className={classes.info}>
                                    <span className={classes.name}>{meal.name}</span> 
                                    <div className={classes.details}>
                                        <span className={classes.price}>${meal.price.toFixed(2)}</span>
                                        <span className ={classes.quantity}>x {meal.amount}</span>
                                    </div>
                                </div>
                                <div className={classes.buttons}>
                                    <button onClick={decreaseHandler.bind(null,meal.id)}>-</button>
                                    <button onClick={increaseHandler.bind(null,meal.id)}>+</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={classes.total}>
                    <span>Total amount</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes.close} onClick={props.onClick}>Close</button>
                    {hasItems &&<button className={classes.order} onClick={orderHandler}>Order</button>}
                </div>
            </div>
        </React.Fragment>
    );
}
const Cart = (props) =>{
    return(
        <React.Fragment>
            {createPortal(<Backdrop onClick={props.onClick}/> , document.getElementById('backdrop-root'))}
            {createPortal(<Overlay onClick={props.onClick}/>,document.getElementById('overlay-root'))}
        </React.Fragment>
    )
}

export default Cart;