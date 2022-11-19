import { observer } from "mobx-react";
import { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import Footer from "../home/footer";
import Header from "../home/Header";
import { combineValidators, isRequired } from "revalidate";
import TextInput from "../../app/common/form/TextInput";

const Checkout = () => {
  const rootStore = useContext(RootStoreContext);
  const { getCart, cart, deleteCart, checkout } = rootStore.cartStore;
  const subTotal = cart.products.reduce(
    (total, currentValue) => (total += currentValue.productPrice ?? 0),
    0
  );
  const checkoutHandler = () => {
    checkout();
  };
  const validate = combineValidators({
    cardNumber: isRequired("Card Number"),
    monthYear: isRequired("MM/YY"),
    cvv: isRequired("CVV"),
    cardName: isRequired("Card Name"),
  });
  return (
    <div>
      <Header />
      <div className="checkout">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="checkout-inner">
                <div className="billing-address">
                  <h2>Billing Address</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <label>First Name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Last Name"</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>E-mail</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="E-mail"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Mobile No</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Mobile No"
                      />
                    </div>
                    <div className="col-md-12">
                      <label>Address</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Country</label>
                      <select className="custom-select">
                        <option selected>United States</option>
                        <option>Afghanistan</option>
                        <option>Albania</option>
                        <option>Algeria</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>City</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="City"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>State</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="State"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>ZIP Code</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="ZIP Code"
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
                          Create an account
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="shipto"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="shipto"
                        >
                          Ship to different address
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shipping-address">
                  <h2>Shipping Address</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <label>First Name</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Last Name"</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>E-mail</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="E-mail"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Mobile No</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Mobile No"
                      />
                    </div>
                    <div className="col-md-12">
                      <label>Address</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Country</label>
                      <select className="custom-select">
                        <option selected>United States</option>
                        <option>Afghanistan</option>
                        <option>Albania</option>
                        <option>Algeria</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>City</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="City"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>State</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="State"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>ZIP Code</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkout-inner">
                <div className="checkout-summary">
                  <h1>Cart Total</h1>
                  {/* <p>
                    Product Name<span>$99</span>
                  </p> */}
                  <p className="sub-total">
                    Sub Total<span>{`$${subTotal}`}</span>
                  </p>
                  <p className="ship-cost">
                    Shipping Cost<span>$1</span>
                  </p>
                  <h2>
                    Grand Total<span>{`$${subTotal + 1}`}</span>
                  </h2>
                </div>

                <div className="checkout-payment">
                  <div className="box-2">
                    <div className="box-inner-2">
                      <div>
                        <p className="fw-bold">Payment Details</p>
                        <p className="dis mb-3">
                          Complete your purchase by providing your payment
                          details
                        </p>
                      </div>
                      <FinalForm
                        onSubmit={() => console.log()}
                        validate={validate}
                        render={({
                          handleSubmit,
                          form,
                          submitting,
                          submitError,
                          invalid,
                          pristine,
                          dirtySinceLastSubmit,
                        }) => (
                          <Form onSubmit={handleSubmit} error>
                            <div>
                              <p className="dis fw-bold mb-2">Card details</p>
                              <div className="d-flex align-items-center justify-content-between card-atm border rounded">
                                <div className="fab fa-cc-visa ps-3"></div>
                                {/* <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Card Details"
                                /> */}
                                <Field
                                  component={TextInput}
                                  //   onChange={handleChange}
                                  //   initialValue={inputField.productName}
                                  className="form-control mt-3"
                                  id="cardNumber"
                                  name="cardNumber"
                                  type="text"
                                  placeholder="Card Number"
                                />
                                <div className="d-flex w-50">
                                  {/* <input
                                    type="text"
                                    className="form-control px-0"
                                    placeholder="MM/YY"
                                  /> */}
                                  {/* <input
                                    type="password"
                                    maxLength={3}
                                    className="form-control px-0"
                                    placeholder="CVV"
                                  /> */}
                                  <Field
                                    component={TextInput}
                                    //   onChange={handleChange}
                                    //   initialValue={inputField.productName}
                                    className="form-control px-0 mt-3"
                                    id="monthYear"
                                    name="monthYear"
                                    type="text"
                                    placeholder="MM/YY"
                                  />
                                  <Field
                                    component={TextInput}
                                    //   onChange={handleChange}
                                    //   initialValue={inputField.productName}
                                    className="form-control px-0 mt-3"
                                    id="cvv"
                                    name="cvv"
                                    type="text"
                                    placeholder="CVV"
                                  />
                                </div>
                              </div>
                              <div className="my-3 cardname">
                                <p className="dis fw-bold mb-2">
                                  Cardholder name
                                </p>
                                {/* <input className="form-control" type="text" /> */}
                                <Field
                                  component={TextInput}
                                  //   onChange={handleChange}
                                  //   initialValue={inputField.productName}
                                  className="form-control "
                                  id="cardName"
                                  name="cardName"
                                  type="text"
                                  placeholder=""
                                />
                              </div>
                              <div className="address">
                                <div className=" my-3">
                                  <p className="dis fw-bold mb-2">VAT Number</p>
                                  <div className="inputWithcheck">
                                    <input
                                      className="form-control"
                                      type="text"
                                      value="GB012345B9"
                                    />
                                    <span className="fas fa-check"></span>
                                  </div>
                                </div>
                                <div className="d-flex flex-column dis">
                                  <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p>Subtotal</p>
                                    <p>
                                      <span className="fas fa-dollar-sign"></span>
                                      33.00
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p>
                                      VAT<span>(20%)</span>
                                    </p>
                                    <p>
                                      <span className="fas fa-dollar-sign"></span>
                                      2.80
                                    </p>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className="fw-bold">Total</p>
                                    <p className="fw-bold">
                                      <span className="fas fa-dollar-sign"></span>
                                      35.80
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="checkout-btn">
                              <Button
                                disabled={invalid}
                                onClick={() => checkoutHandler()}
                              >
                                Place Order
                              </Button>
                            </div>
                          </Form>
                        )}
                      />
                    </div>
                  </div>
                  {/* <div className="payment-methods">
                                <h1>Payment Methods</h1>
                               
                                <div className="payment-method">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="payment-5" name="payment"/>
                                        <label className="custom-control-label" htmlFor="payment-5">Cash on Delivery</label>
                                    </div>
                                    <div className="payment-content" id="payment-5-show">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt orci ac eros volutpat maximus lacinia quis diam.
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                  {/* <div className="checkout-btn">
                    <Button
                      //   disabled={invalid}
                      onClick={() => checkoutHandler()}
                    >
                      Place Order
                    </Button>
                  </div> */}
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

export default observer(Checkout);
