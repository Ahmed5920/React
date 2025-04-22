import React, { useState } from "react";

const CartTotalContext = React.createContext({
  total: 0,
  addTotal: (amount) => {},
  dataMeal: (meal) =>{},
  updateMealAmount:(id,number) =>{}
});

export const CartTotalContextProvider = (props) => {
    const [Total , setTotal] = useState(0);
    const [dataMeal,setDataMeal] = useState([]);

    const addTotalHandler = (number) => {
        setTotal((prevState) => prevState + +number);
      };
    
    const dataMealHandler = (meal) =>{
      setDataMeal((prevState) =>{
        const existMeal = dataMeal.find((item) => item.name === meal.name);

        if(existMeal){
          return (prevState.map((item) => 
            item.name === meal.name? {...item,amount: item.amount + meal.amount} : item
          ));
      }
      else{
        return [...prevState,meal];
      }
    });
  }

  const updateMealAmount = (id,number) =>{
    setDataMeal((prevState) =>{
      return (prevState.map((meal) => (
        meal.id === id ? {...meal,amount: meal.amount + number} : meal
      )).filter((ele) => {
        return (ele.amount > 0) ;
      }));
    })
    setTotal((prevState) => {
      return prevState +number ;
    })
  }

  return (
    <CartTotalContext.Provider
      value={{
        total: Total,
        addTotal: addTotalHandler,
        dataHandler: dataMealHandler,
        dataMeal: dataMeal,
        updateMealAmount: updateMealAmount
      }}
    >
      {props.children}
    </CartTotalContext.Provider>
  );
};

export default CartTotalContext;
