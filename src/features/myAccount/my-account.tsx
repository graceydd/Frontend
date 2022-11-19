import { observer } from "mobx-react";
import { useEffect } from "react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import Footer from "../home/footer";
import Header from "../home/Header";

const MyAccount = () => {
  const rootStore = useContext(RootStoreContext);
  const { getOrders, orders, cancelOrder, finishOrder } = rootStore.orderStore;
  // const subTotal = cart.products.reduce((total, currentValue) => total += currentValue.productPrice ?? 0, 0)

  useEffect(() => {
    getOrders();
  }, []);

  // const deleteCartHandler = (productId: number) => {
  //     deleteCart(productId);
  // }

  return (
    <div>
      <Header />
      <div className="my-account">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div
                className="nav flex-column nav-pills"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active"
                  id="dashboard-nav"
                  data-toggle="pill"
                  href="#dashboard-tab"
                  role="tab"
                >
                  <i className="fa fa-tachometer-alt"></i>Dashboard
                </a>
                <a
                  className="nav-link"
                  id="orders-nav"
                  data-toggle="pill"
                  href="#orders-tab"
                  role="tab"
                >
                  <i className="fa fa-shopping-bag"></i>Orders
                </a>
                <a
                  className="nav-link"
                  id="payment-nav"
                  data-toggle="pill"
                  href="#payment-tab"
                  role="tab"
                >
                  <i className="fa fa-credit-card"></i>Payment Method
                </a>
                <a
                  className="nav-link"
                  id="address-nav"
                  data-toggle="pill"
                  href="#address-tab"
                  role="tab"
                >
                  <i className="fa fa-map-marker-alt"></i>address
                </a>
                <a
                  className="nav-link"
                  id="account-nav"
                  data-toggle="pill"
                  href="#account-tab"
                  role="tab"
                >
                  <i className="fa fa-user"></i>Account Details
                </a>
                <a className="nav-link" href="index.html">
                  <i className="fa fa-sign-out-alt"></i>Logout
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="dashboard-tab"
                  role="tabpanel"
                  aria-labelledby="dashboard-nav"
                >
                  <h4>Dashboard</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    condimentum quam ac mi viverra dictum. In efficitur ipsum
                    diam, at dignissim lorem tempor in. Vivamus tempor hendrerit
                    finibus. Nulla tristique viverra nisl, sit amet bibendum
                    ante suscipit non. Praesent in faucibus tellus, sed gravida
                    lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu
                    rhoncus scelerisque.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="orders-tab"
                  role="tabpanel"
                  aria-labelledby="orders-nav"
                >
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>No</th>
                          {/* <th>Product</th>  */}
                          <th>Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length > 0 &&
                          orders.map((x, index) => {
                            return (
                              <tr key={x.orderId}>
                                <td>{index}</td>
                                {/* <td>Product Name</td> */}
                                <td>{x.created}</td>
                                <td>{`$${x.orderAmount}`}</td>
                                <td>Approved</td>
                                <td>
                                  <button className="btn">View</button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="payment-tab"
                  role="tabpanel"
                  aria-labelledby="payment-nav"
                >
                  <h4>Payment Method</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    condimentum quam ac mi viverra dictum. In efficitur ipsum
                    diam, at dignissim lorem tempor in. Vivamus tempor hendrerit
                    finibus. Nulla tristique viverra nisl, sit amet bibendum
                    ante suscipit non. Praesent in faucibus tellus, sed gravida
                    lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu
                    rhoncus scelerisque.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="address-tab"
                  role="tabpanel"
                  aria-labelledby="address-nav"
                >
                  <h4>Address</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Payment Address</h5>
                      <p>123 Payment Street, Los Angeles, CA</p>
                      <p>Mobile: 012-345-6789</p>
                      <button className="btn">Edit Address</button>
                    </div>
                    <div className="col-md-6">
                      <h5>Shipping Address</h5>
                      <p>123 Shipping Street, Los Angeles, CA</p>
                      <p>Mobile: 012-345-6789</p>
                      <button className="btn">Edit Address</button>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="account-tab"
                  role="tabpanel"
                  aria-labelledby="account-nav"
                >
                  <h4>Account Details</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                    <div className="col-md-12">
                      <button className="btn">Update Account</button>
                      <br></br>
                    </div>
                  </div>
                  <h4>Password change</h4>
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Current Password"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="New Password"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div className="col-md-12">
                      <button className="btn">Save Changes</button>
                    </div>
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

export default observer(MyAccount);
