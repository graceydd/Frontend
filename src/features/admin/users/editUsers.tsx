import { Form as FinalForm, Field } from "react-final-form";
import { Button, Form } from "semantic-ui-react";
import ErrorMessag from "../../../app/common/form/ErrorMessag";
import OnboardingTextInput from "../../../app/common/form/OnboardingTextInput";
import AdminHeader from "../home/adminHeader";
import { FORM_ERROR } from "final-form";
import { useContext, useEffect, useState } from "react";
import { ProductFormValues } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useParams } from "react-router-dom";
import InputSelection from "../../../app/common/form/SelectInput";
import { CustomerRegistration } from "../../../app/models/user";
import { observer } from "mobx-react";
import { history } from "../../..";

const EditUsers = () => {
  const [page, setPage] = useState(false);
  const [inputField, setInputField] = useState(new CustomerRegistration());
  const rootStore = useContext(RootStoreContext);
  const params = useParams<any>();

  const { users, editUsers } = rootStore.userStore;
  const user = users.find((x) => x.userId === Number.parseInt(params.userId));
  console.log(params.Id);
  console.log(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
    console.log(inputField);
  };

  const loggedinuser = JSON.parse(window.localStorage.getItem("user")!);
  const token = window.localStorage.getItem("jwt");
  const jwtToken = JSON.parse(
    token ? atob(token!.split(".")[1]) : '{"role":null}'
  );

  useEffect(() => {
    if (!page) {
      setPage(true);
      if (!token || String(loggedinuser.role).includes("CUSTOMER")) {
        history.push("/");
      }
    }
  }, [page]);

  return (
    <div>
      <AdminHeader />
      <div className="container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12">
                  <h2 className="tm-block-title d-inline-block">Edit User</h2>
                </div>
              </div>
              <div className="row tm-classNameName-product-row">
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <FinalForm
                    onSubmit={() =>
                      editUsers(inputField).catch((error) => ({
                        [FORM_ERROR]: error,
                      }))
                    }
                    render={({
                      handleSubmit,
                      submitting,
                      submitError,
                      invalid,
                      pristine,
                      dirtySinceLastSubmit,
                    }) => (
                      <Form onSubmit={handleSubmit} error>
                        <div className="form-group mb-3">
                          <label htmlFor="productName">UserName </label>
                          <Field
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={user?.username}
                            id="username"
                            name="username"
                            type="text"
                            className="form-control validate"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="productDescription">Email</label>
                          <Field
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={user?.email}
                            name="email"
                            id="email"
                            className="form-control validate"
                            required
                          ></Field>
                        </div>

                        <div className="row">
                          <div className="form-group mb-3 col-xs-12 col-sm-6">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <Field
                              component={OnboardingTextInput}
                              onChange={handleChange}
                              initialValue={user?.phoneNumber}
                              id="phoneNumber"
                              name="phoneNumber"
                              type="text"
                              className="form-control validate"
                            />
                          </div>
                          {/* <div className="form-group mb-3 col-xs-12 col-sm-6">
                          <label
                            htmlFor="stock"
                          >Units In Stock
                          </label>
                          <Field component={OnboardingTextInput} onChange={handleChange} initialValue={}
                            id="productStock"
                            name="productStock"
                            type="text"
                            className="form-control validate"
                            required
                          />
                        </div> */}
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor="productName">Address </label>
                          <Field
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={user?.address}
                            id="address"
                            name="address"
                            type="text"
                            className="form-control validate"
                            required
                          />
                        </div>

                        {submitError && !dirtySinceLastSubmit && (
                          <ErrorMessag
                            className="loginFormError"
                            error={submitError}
                            text="Problem Submitting details"
                          />
                        )}
                        <div className="col-12">
                          <div className="col-md-12">
                            <Button
                              id="longButton"
                              className="btn"
                              disabled={
                                (invalid && !dirtySinceLastSubmit) || pristine
                              }
                              loading={submitting}
                            >
                              Edit Product
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                  <div className="tm-product-img-classNameName mx-auto">
                    <img
                      src="img/product-image.jpg"
                      alt="Product image"
                      className="img-fluid d-block mx-auto"
                    />
                    <i
                      className="fas fa-cloud-upload-alt tm-upload-icon"
                      // onclick="document.getElementById('fileInput').click();"
                    ></i>
                  </div>
                  <div className="custom-file mt-3 mb-3">
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <input
                      type="button"
                      className="btn btn-primary btn-block mx-auto"
                      value="CHANGE IMAGE NOW"
                      // onclick="document.getElementById('fileInput').click();"
                    />
                  </div>
                </div>

                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(EditUsers);
