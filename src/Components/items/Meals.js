import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";

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

const Meals = () => {
  const hasRun = useRef(false);
  const {sendRequest: sendDataHandler} = useHttp();

  // i need to adjust it for admins to add new items
  
  useEffect(() => {
    if(hasRun.current){
      return;
    }
    hasRun.current = true;

    const dataHasSent = localStorage.getItem("mealsDataSent");
    if(dataHasSent){
      console.log("Data already sent. Skipping...");
      return;
    }
    const sendMeals = async() =>{
      for(const meal of DummyData){
        await sendDataHandler({
          url:"https://meals-ecec2-default-rtdb.firebaseio.com/meals.json",
          method:"POST",
          body: meal,
          headers: {
            "Content-Type": "application/json",
          },
        },() => {}
      )
      }
      localStorage.setItem("mealsDataSent",true);
    }
    sendMeals();
  },[sendDataHandler])
};

export default Meals;
