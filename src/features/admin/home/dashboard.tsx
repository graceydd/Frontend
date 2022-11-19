import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { history } from "../../..";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Footer from "../../home/footer";
import AdminHeader from "./adminHeader";

const Dashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { getOrders, orders, cancelOrder, finishOrder } = rootStore.orderStore;
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

  if (!token || String(user.role).includes("CUSTOMER")) return <div></div>;
  return (
    <div>
      <AdminHeader />
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="text-white mt-5 mb-5">
              Welcome back, <b>Admin</b>
            </p>
          </div>
        </div>
        <div className="row tm-content-row">
          {/* <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
                    <div className="tm-bg-primary-dark tm-block">
                        <h2 className="tm-block-title">Latest Hits</h2>
                        <canvas id="lineChart"></canvas>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
                    <div className="tm-bg-primary-dark tm-block">
                        <h2 className="tm-block-title">Performance</h2>
                        <canvas id="barChart"></canvas>
                    </div>
                </div> */}
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller">
              <h2 className="tm-block-title">Storage Information</h2>
              <div id="pieChartContainer">
                <canvas
                  id="pieChart"
                  className="chartjs-render-monitor"
                  width="200"
                  height="200"
                ></canvas>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-overflow">
              <h2 className="tm-block-title">Notification List</h2>
              <div className="tm-notification-items">
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-01.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Jessica</b> and <b>6 others</b> sent you new{" "}
                      <a className="tm-notification-link">product updates</a>.
                      Check new orders.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-02.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Oliver Too</b> and <b>6 others</b> sent you existing{" "}
                      <a className="tm-notification-link">product updates</a>.
                      Read more reports.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-03.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Victoria</b> and <b>6 others</b> sent you{" "}
                      <a className="tm-notification-link">order updates</a>.
                      Read order information.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-01.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Laura Cute</b> and <b>6 others</b> sent you{" "}
                      <a className="tm-notification-link">product records</a>.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-02.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Samantha</b> and <b>6 others</b> sent you{" "}
                      <a className="tm-notification-link">order stuffs</a>.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-03.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Sophie</b> and <b>6 others</b> sent you{" "}
                      <a className="tm-notification-link">product updates</a>.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-01.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Lily A</b> and <b>6 others</b> sent you{" "}
                      <a className="tm-notification-link">product updates</a>.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-02.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Amara</b> and <b>6 others</b> sent you{" "}
                      <a className="tm-notification-link">product updates</a>.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
                <div className="media tm-notification-item">
                  <div className="tm-gray-circle">
                    <img
                      src="img/notification-03.jpg"
                      alt="Avatar Image"
                      className="rounded-circle"
                    />
                  </div>
                  <div className="media-body">
                    <p className="mb-2">
                      <b>Cinthela</b> and <b>6 others</b> sent you{" "}
                      <a className="tm-notification-link">product updates</a>.
                    </p>
                    <span className="tm-small tm-text-color-secondary">
                      6h ago.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
              <h2 className="tm-block-title">Orders List</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ORDER NO.</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">OPERATORS</th>
                    <th scope="col">LOCATION</th>
                    <th scope="col">AMOUNT</th>
                    <th scope="col">ORDER DATE</th>
                    <th scope="col">CUSTOMER ID</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 &&
                    orders.map((x) => (
                      <tr>
                        <th scope="row">
                          <b>{x.orderId}</b>
                        </th>
                        <td>
                          <div className="tm-status-circle moving"></div>Moving
                        </td>
                        <td>
                          <b>{x.customerEmail}</b>
                        </td>
                        <td>
                          <b>{x.customerPhone}</b>
                        </td>
                        <td>
                          <b>{x.orderAmount}</b>
                        </td>
                        <td>{x.created}</td>
                        <td>{x.customerId}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Dashboard);
