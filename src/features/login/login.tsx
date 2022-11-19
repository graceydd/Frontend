import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import Footer from "../home/footer";
import Header from "../home/Header";
import { FORM_ERROR } from "final-form";
import { Form as FinalForm, Field } from "react-final-form";
import { useState } from "react";
import { CustomerRegistration, UserFormValues } from "../../app/models/user";
import { Button, ButtonContent, Form, Message } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessag";
import {
  createValidator,
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthBetween,
  isNumeric,
  hasLengthGreaterThan,
  matchesField,
} from "revalidate";

import { history } from "../../";
import OnboardingTextInput from "../../app/common/form/OnboardingTextInput";
import PasswordInput from "../../app/common/form/PasswordInput";
import LoadingModal from "../general/LoadingModal";
import LoadingSpinner from "../general/LoadingSpinner";
import { observer } from "mobx-react";

const Login = (props: any) => {
  const rootStore = useContext(RootStoreContext);

  const user = JSON.parse(window.localStorage.getItem("user")!);
  const token = window.localStorage.getItem("jwt");
  const role = window.localStorage.getItem("role");
  const jwtToken = JSON.parse(
    token ? atob(token!.split(".")[1]) : '{"role":null}'
  );
  const {
    register,
    login,
    loginLoading,
    loginVerification,
    customerActivatedStatus,
    customerRegistrationStatus,
  } = rootStore.userStore;

  const [inputField, setInputField] = useState(new CustomerRegistration());
  const [loginInput, setLoginInput] = useState(new UserFormValues());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleLoginPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.name, e.target.value);
    console.log(loginInput);

    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    console.log(inputField);

    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const containsUppercaseLetter = createValidator(
    (message) => (value) => {
      if (value && !/(?=.*?[A-Z])/.test(value)) {
        return message;
      }
    },
    "Password must include Upper case"
  );

  const isValidEmail = createValidator(
    (message) => (value) => {
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return message;
      }
    },
    "Invalid email address"
  );

  const containsLowercaseLetter = createValidator(
    (message) => (value) => {
      if (value && !/(?=.*?[a-z])/.test(value)) {
        return message;
      }
    },
    "Password must include lower case"
  );

  const containsNumber = createValidator(
    (message) => (value) => {
      if (value && !/(?=.*?[0-9])/i.test(value)) {
        return message;
      }
    },
    "Password must include a number"
  );

  const validate = combineValidators({
    email: composeValidators(isRequired("Email Address"), isValidEmail)(),
    username: composeValidators(
      isRequired("Username"),
      hasLengthGreaterThan(4)("Username")
    )(),
    password: composeValidators(
      isRequired("Password"),
      hasLengthGreaterThan(7)("Password"),
      containsUppercaseLetter(),
      containsLowercaseLetter(),
      containsNumber()
      //   containsSpecialCharacter()
    )(),
  });
  const loginValidate = combineValidators({
    username: composeValidators(
      isRequired("Username"),
      hasLengthGreaterThan(4)("Username")
    )(),
    password: composeValidators(
      isRequired("Password")

      //   containsSpecialCharacter()
    )(),
  });
  useEffect(() => {
    if (!loginLoading && token && String(user.role).includes("CUSTOMER")) {
      history.push("/");
    } else if (
      !loginLoading &&
      token &&
      (String(user.role).includes("CEO") || String(user.role).includes("STAFF"))
    ) {
      history.push("/admin");
    }
  }, [token, jwtToken]);

  if (token && String(user.role).includes("CUSTOMER"))
    return <LoadingSpinner />;

  if (token && String(user.role).includes("STAFF")) return <LoadingSpinner />;
  return (
    <div className="commonPageWrapper">
      {(customerRegistrationStatus === "loading" && <LoadingModal />) ||
        (loginLoading && <LoadingModal />)}
      <Header />
      <div className="login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="register-form">
                <div className="row">
                  <FinalForm
                    onSubmit={() =>
                      register(inputField).catch((error) => ({
                        [FORM_ERROR]: error,
                      }))
                    }
                    validate={validate}
                    render={({
                      handleSubmit,
                      submitting,
                      submitError,
                      invalid,
                      pristine,
                      dirtySinceLastSubmit,
                    }) => (
                      <Form className="row" onSubmit={handleSubmit} error>
                        <div className="col-md-6">
                          <label htmlFor="username"> UserName</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="UserName"
                            name="username"
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={inputField.username}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="lastname">Name</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="Name"
                            name="name"
                            component={OnboardingTextInput}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="email">E-mail</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="E-mail"
                            name="email"
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={inputField.email}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="phoneNumber">Mobile No</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="Mobile No"
                            name="phoneNumber"
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={inputField.phoneNumber}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="password">Password</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="Password"
                            name="password"
                            component={PasswordInput}
                            onChange={handlePasswordChange}
                            isPasswordShown={true}
                            id="Password"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="address">Address</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="Enter your address"
                            name="address"
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={inputField.address}
                          />
                        </div>
                        {submitError && !dirtySinceLastSubmit && (
                          <ErrorMessage
                            className="loginFormError"
                            error={submitError}
                            text="Problem Submitting details"
                          />
                        )}
                        {/* {customerRegistrationStatus.includes("exist") &&
                                                    !dirtySinceLastSubmit && (
                                                        <Message className="loginFormError" negative>
                                                            <p>{customerRegistrationStatus}</p>
                                                        </Message>
                                                    )} */}
                        <div className="col-md-12">
                          <Button
                            id="longButton"
                            className="btn"
                            disabled={
                              (invalid && !dirtySinceLastSubmit) || pristine
                            }
                            loading={submitting}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-form">
                <div className="row">
                  <FinalForm
                    onSubmit={() =>
                      login(loginInput).catch((error) => ({
                        [FORM_ERROR]: error,
                      }))
                    }
                    validate={loginValidate}
                    render={({
                      handleSubmit,
                      submitting,
                      submitError,
                      invalid,
                      pristine,
                      dirtySinceLastSubmit,
                    }) => (
                      <Form className="row" onSubmit={handleSubmit} error>
                        <div className="col-md-6">
                          <label htmlFor="username">E-mail / Username</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="E-mail / Username"
                            id="username"
                            name="username"
                            disabled={loginLoading || loginVerification}
                            component={OnboardingTextInput}
                            autoComplete="off"
                            onChange={handleLoginChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="password">Password</label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder="Password"
                            name="password"
                            isPasswordShown={false}
                            component={PasswordInput}
                            style={{ position: "relative" }}
                            onChange={handleLoginPasswordChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="newaccount"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="newaccount"
                            >
                              Keep me signed in
                            </label>
                          </div>
                        </div>
                        {submitError && !dirtySinceLastSubmit && (
                          <ErrorMessage
                            className="loginFormError"
                            error={submitError}
                            text="Invalid username or password"
                          />
                        )}
                        <div className="col-md-12">
                          <Button
                            id="longButton"
                            disabled={
                              (invalid && !dirtySinceLastSubmit) || pristine
                            }
                            loading={submitting}
                            className="btn"
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Login);
