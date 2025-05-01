import useInput from "../../hooks/use-input";
import "../form/CartForm.css";

const CartForm = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  const {
    input: firstName,
    inputIsValid: firstNameIsValid,
    inputHasError: firstNameHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput(isNotEmpty);

  const {
    input: lastName,
    inputIsValid: lastNameIsValid,
    inputHasError: lastNameHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty);

  const {
    input: email,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const {
    input: address,
    inputIsValid: addressIsValid,
    inputHasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput(isNotEmpty);

  const {
    input: mobileNumber,
    inputIsValid: mobileNumberIsValid,
    inputHasError: mobileNumberHasError,
    inputChangeHandler: mobileNumberChangeHandler,
    inputBlurHandler: mobileNumberBlurHandler,
    reset: mobileNumberReset,
  } = useInput((value) => value.trim() !== "" && value.trim().length === 11);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    mobileNumberIsValid &&
    addressIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if(!formIsValid){
      return;
    }
    const userData = {
      firstName,
      lastName,
      email,
      address,
      mobileNumber
    }
    console.log("Oredering...")
    props.onCloseForm();

    firstNameReset();
    lastNameReset();
    emailReset();
    mobileNumberReset();
    addressReset();
  };

  const firstNameInputClass = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClass = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClass = emailHasError
    ? "form-control invalid"
    : "form-control";
  const mobileNumberInputClass = mobileNumberHasError
    ? "form-control invalid"
    : "form-control";
  const addressInputClass = addressHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form className="container" onSubmit={submitHandler}>
      <div className={firstNameInputClass}>
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          id="name"
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          value={firstName}
        />
        {firstNameHasError && (
          <p className="error-text">FirstName must not be Empty</p>
        )}
      </div>
      <div className={lastNameInputClass}>
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          id="name"
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          value={lastName}
        />
        {lastNameHasError && (
          <p className="error-text">LastName must not be Empty</p>
        )}
      </div>
      <div className={emailInputClass}>
        <label htmlFor="name">email</label>
        <input
          type="text"
          id="name"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={email}
        />
        {emailHasError && <p className="error-text">Enter a Valid email</p>}
      </div>
      <div className={mobileNumberInputClass}>
        <label htmlFor="name">mobile Number</label>
        <input
          type="text"
          id="name"
          onChange={mobileNumberChangeHandler}
          onBlur={mobileNumberBlurHandler}
          value={mobileNumber}
        />
        {mobileNumberHasError && (
          <p className="error-text">Enter a Valid mobile Number</p>
        )}
      </div>
      <div className={addressInputClass}>
        <label htmlFor="name">Address</label>
        <input
          type="text"
          id="name"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          value={address}
        />
        {addressHasError && (
          <p className="error-text">Address Must not be Empty</p>
        )}
      </div>
      <div className="actions">
        <button className="close" onClick={props.onCloseForm} type="button">
          Close
        </button>
        <button className="order" disabled={!formIsValid} type="submit">
          Order
        </button>
      </div>
    </form>
  );
};

export default CartForm;
