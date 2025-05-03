import useHttp from "../../hooks/use-http";
import CartTotalContext from "../../store/cart-total-context";
import classes from "./ItemsData.module.css";
import { useContext, useState } from "react";

const ItemsData = (props) => {
  const {isLoading}=useHttp();
  const [AmountNo, setAmountNo] = useState("1");
  const ctxCart = useContext(CartTotalContext);

  const AmountChangeHandler = (event) => {
    setAmountNo(event.target.value);
  };

  const AddItemsHandler = () => {
    if(+AmountNo.trim().length === 0 || +AmountNo <= 0){
      return setAmountNo("1");
    }
    
      ctxCart.addTotal(+AmountNo);
      setAmountNo("1");
      const mealData = {
        id : props.id,
        name: props.name,
        price: props.price,
        amount: +AmountNo
    }
      ctxCart.dataHandler(mealData);
  };
  
  return (
    <li className={classes.Item}>
      <div className={classes.info}>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.descripe}</div>
        <div className={classes.price}>${props.price.toFixed(2)}</div>
      </div>
      <div className={classes.actions}>
        <div className={classes.amount}>
          <label>Amount</label>
          <input
            type="number"
            min="1"
            step="1"
            value={AmountNo}
            onChange={AmountChangeHandler}
          />
        </div>
        <button className={classes.add} onClick={AddItemsHandler}>
          + Add
        </button>
      </div>
    </li>
  );
};

export default ItemsData;
