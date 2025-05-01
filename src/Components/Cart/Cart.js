import React ,{ useContext, useEffect, useState } from "react";
import CartTotalContext from "../../store/cart-total-context";
import classes from "./Cart.module.css";
import { createPortal } from "react-dom";
import CartForm from "../form/CartForm";

const Backdrop = (props) =>{
    return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
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
                    <button className={classes.close} onClick={props.onCloseCart}>Close</button>
                    {hasItems &&<button className={classes.order} onClick={props.onOpenForm}>Order</button>}
                </div>
            </div>
        </React.Fragment>
    );
}
const Cart = (props) =>{
    const [showForm,setShowForm] = useState(false);

    const openFormHandler = () =>{
        setShowForm(true);
    }
    const clseFormHandler = () =>{
        setShowForm(false);
    }
    return( 
        <React.Fragment>
            {createPortal(<Backdrop onCloseCart={props.onCloseCart}/> , document.getElementById('backdrop-root'))}
            {createPortal(<Overlay onCloseCart={props.onCloseCart} onOpenForm = {openFormHandler}/>,document.getElementById('overlay-root'))}
            {showForm && <CartForm onCloseForm = {clseFormHandler}/>}
        </React.Fragment>
    )
}

export default Cart;