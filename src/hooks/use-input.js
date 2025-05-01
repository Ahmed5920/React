import { useState } from "react";

const useInput = (valueValidity) =>{
    const [enteredValue,setEnteredValue] = useState("");
    const [isTouched,setIsTouched] = useState(false);

    const enteredValueIsValid = valueValidity(enteredValue);
    const hasError = isTouched && !enteredValueIsValid;

    const inputChangeHandler = (event) =>{
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = (event) =>{
        setIsTouched(true);
    }

    const resetValuesHandler = () =>{
        setEnteredValue("");
        setIsTouched(false);
    }

    return{
        input:enteredValue,
        inputIsValid:enteredValueIsValid,
        inputHasError:hasError,
        inputChangeHandler,
        inputBlurHandler,
        reset:resetValuesHandler
    }
}

export default useInput;