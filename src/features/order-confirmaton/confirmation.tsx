import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import Footer from "../home/footer";
import Header from "../home/Header";

const OrderConfirmation = () => {
  const rootStore = useContext(RootStoreContext);
  const { getOrders, orders, cancelOrder, finishOrder } = rootStore.orderStore;

  useEffect(() => {
    getOrders();
  }, []);

  const order = orders.pop();
  return (
    <div>
      <Header />
      <section className="blog-banner-area" id="category">
        <div className="container h-100">
          <div className="blog-banner">
            <div className="text-center">
              <h1>Order Confirmation</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a>Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Shop Category
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="order_details section-margin--small">
        <div className="container">
          <p className="text-center billing-alert">
            Thank you. Your order has been received.
          </p>
          <div className="row mb-5">
            <div className="col-md-6 col-xl-4 mb-4 mb-xl-0">
              <div className="confirmation-card">
                <h3 className="billing-title">Order Info</h3>
                <table className="order-rable">
                  <tr>
                    <td>Order number</td>
                    <td>{`: ${order?.orderId}`}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{`: ${order?.created}`}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>{`: ${order?.orderAmount}`}</td>
                  </tr>
                  <tr>
                    <td>Payment method</td>
                    <td>: Check payments</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="order_details_table">
            <h2>Order Details</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order?.products.length! > 0 &&
                    order?.products.map((x) => {
                      return (
                        <tr>
                          <td>
                            <p>{x.productName}</p>
                          </td>
                          <td>
                            <h5>{`x ${x.count}`}</h5>
                          </td>
                          <td>
                            <p>{`x ${x.productPrice}`}</p>
                          </td>
                        </tr>
                      );
                    })}

                  <tr>
                    <td>
                      <h4>Subtotal</h4>
                    </td>
                    <td>
                      <h5></h5>
                    </td>
                    <td>
                      <p>{`$${order?.orderAmount}`}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Shipping</h4>
                    </td>
                    <td>
                      <h5></h5>
                    </td>
                    <td>
                      <p>Flat rate: $.00</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>Total</h4>
                    </td>
                    <td>
                      <h5></h5>
                    </td>
                    <td>
                      <h4>{`$${order?.orderAmount! + 1}`}</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default observer(OrderConfirmation);
