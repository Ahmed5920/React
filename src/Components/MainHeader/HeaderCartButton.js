import { useContext, useEffect, useState } from "react"
import CartIcon from "../Cart/CartIcon"
import classes from "../MainHeader/HeaderCartButton.module.css"
import CartTotalContext from "../../store/cart-total-context"

const HeaderCartButton = (props) =>{
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    const ctx = useContext(CartTotalContext)
    const {dataMeal} = ctx;

    const btnclasses = `${classes.CartButton} ${btnIsHighlighted? classes.bump : ''}`;

    useEffect(() =>{
        if(dataMeal.length ===0 ){
            return;
        }
        setBtnIsHighlighted(true);
        setTimeout(() =>{
            setBtnIsHighlighted(false)
        },300)
    },[dataMeal])
    return (
        <button className={btnclasses} onClick={props.onOpenCart}>
            <span><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.count}>{ctx.total}</span>
        </button>
    )
}

export default HeaderCartButton