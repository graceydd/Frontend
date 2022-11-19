import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Footer from "../../home/footer";
import AdminHeader from "../home/adminHeader";
import { history } from "../../..";
import { observer } from "mobx-react";
import Productplaceholder from "../adminProducts/productplaceholder";

const MonthlyReport = () => {
  const rootStore = useContext(RootStoreContext);
  const { report, getMonthlyReports, productLoading } = rootStore.reportStore;
  const user = JSON.parse(window.localStorage.getItem("user")!);
  const token = window.localStorage.getItem("jwt");
  const jwtToken = JSON.parse(
    token ? atob(token!.split(".")[1]) : '{"role":null}'
  );
  useEffect(() => {
    if (!token || String(user.role).includes("CUSTOMER")) {
      history.push("/");
    } else {
      getMonthlyReports();
    }
  }, []);
  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              {productLoading && <Productplaceholder />}
              {!productLoading && (
                <div className="tm-product-table-container">
                  <div className="col">
                    <p className="text-white mt-5 mb-5">Monthly Reports</p>
                  </div>
                  {report.length > 0 ? (
                    <table className="table table-hover tm-table-small tm-product-table">
                      <thead>
                        <tr>
                          <th scope="col">&nbsp;</th>
                          <th scope="col">MONTH</th>
                          <th scope="col">TOTAL UNIT SOLD</th>
                          <th scope="col">IN STOCK</th>
                          <th scope="col">TOTAL AMOUNT</th>
                          <th scope="col">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.length > 0 &&
                          report.map((x) => {
                            return (
                              <tr
                                key={x.reportId}
                                onClick={() =>
                                  history.push(
                                    `/admin/edit-products/${x.reportId}`
                                  )
                                }
                              >
                                <th scope="row">
                                  <input type="checkbox" />
                                </th>
                                <td className="tm-product-name">JANUARY</td>
                                <td>1</td>
                                <td></td>
                                <td>28 March 2030</td>
                                <td>
                                  <a className="tm-product-delete-link">
                                    <i className="far fa-trash-alt tm-product-delete-icon"></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      <div className="text-white">
                        <h3>No Report Found</h3>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <Link
                to="/admin/add-products"
                className="btn btn-primary btn-block text-uppercase mb-3"
              >
                Add new product
              </Link>
              <button className="btn btn-primary btn-block text-uppercase">
                Delete selected products
              </button>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
              <h2 className="tm-block-title">Product Categories</h2>
              <div className="tm-product-table-container">
                <table className="table tm-table-small tm-product-table">
                  <tbody></tbody>
                </table>
              </div>
              <button
                onClick={() => history.push("/admin/add-category")}
                className="btn btn-primary btn-block text-uppercase mb-3"
              >
                Add new category
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default observer(MonthlyReport);
