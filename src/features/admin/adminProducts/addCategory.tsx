import { useContext, useEffect, useState } from "react";
import { ProductFormValues } from "../../../app/models/product";
import Footer from "../../home/footer";

import { FORM_ERROR } from "final-form";
import AdminHeader from "../home/adminHeader";
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Button, Form } from "semantic-ui-react";
import OnboardingTextInput from "../../../app/common/form/OnboardingTextInput";
import InputSelection from "../../../app/common/form/SelectInput";
import ErrorMessag from "../../../app/common/form/ErrorMessag";
import { CategoryFormValues } from "../../../app/models/category";
import LoadingModal from "../../general/LoadingModal";
import { history } from "../../..";
import { observer } from "mobx-react";

const AddCategory = () => {
  const [inputField, setInputField] = useState(new CategoryFormValues());
  const rootStore = useContext(RootStoreContext);

  const { addCategory, categories, productLoading } = rootStore.productStore;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const { loginLoading } = rootStore.userStore;
  // const subTotal = cart.products.reduce((total, currentValue) => total += currentValue.productPrice ?? 0, 0)
  const user = JSON.parse(window.localStorage.getItem("user")!);
  const token = window.localStorage.getItem("jwt");
  const jwtToken = JSON.parse(
    token ? atob(token!.split(".")[1]) : '{"role":null}'
  );

  useEffect(() => {
    if (!token || String(user.role).includes("CUSTOMER")) {
      history.push("/");
    }
  }, [token, jwtToken]);
  return (
    <div>
      {productLoading && <LoadingModal />}
      <AdminHeader />
      <div className="container tm-mt-big tm-mb-big">
        <div className="row">
          <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <div className="row">
                <div className="col-12">
                  <h2 className="tm-block-title d-inline-block">
                    Add Category
                  </h2>
                </div>
              </div>
              <div className="row tm-edit-product-row">
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <FinalForm
                    onSubmit={() =>
                      addCategory(inputField).catch((error) => ({
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
                          <label htmlFor="categoryName">Category Name </label>
                          <Field
                            component={OnboardingTextInput}
                            onChange={handleChange}
                            initialValue={inputField.categoryName}
                            id="categoryName"
                            name="categoryName"
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
                              Add Category
                            </Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  />

                  {/* 
                  <div className="form-group mb-3">
                    <label
                      htmlFor="category"
                    >Category</label
                    >
                    <select
                      className="custom-select tm-select-accounts"
                      id="category"
                    >
                      <option selected>Select category</option>
                      <option value="1">New Arrival</option>
                      <option value="2">Most Popular</option>
                      <option value="3">Trending</option>
                    </select>
                  </div> */}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 mx-auto mb-4">
                  <div className="tm-product-img-dummy mx-auto">
                    <i
                      className="fas fa-cloud-upload-alt tm-upload-icon"
                      // onclick={}
                    ></i>
                  </div>
                  <div className="custom-file mt-3 mb-3">
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <input
                      className="btn btn-primary btn-block mx-auto"
                      value="Add product"
                      onClick={() => history.push("/admin/add-products")}
                    />
                  </div>
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

export default observer(AddCategory);
