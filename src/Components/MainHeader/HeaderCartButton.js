import { useContext } from "react"
import CartIcon from "../Cart/CartIcon"
import classes from "../MainHeader/HeaderCartButton.module.css"
import CartTotalContext from "../../store/cart-total-context"

const HeaderCartButton = (props) =>{
    const ctx = useContext(CartTotalContext)
    
    return (
        <button className={classes.CartButton} onClick={props.onClick}>
            <span><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.count}>{ctx.total}</span>
        </button>
    )
}

export default HeaderCartButton