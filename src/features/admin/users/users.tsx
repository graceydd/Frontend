import AdminHeader from "../home/adminHeader";
import { history } from "../../..";
import { Link } from "react-router-dom";
import Footer from "../../home/footer";
import { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import Productplaceholder from "../adminProducts/productplaceholder";

const Users = () => {
  const [page, setPage] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { users, getUsers, loginLoading } = rootStore.userStore;

  const user = JSON.parse(window.localStorage.getItem("user")!);
  const token = window.localStorage.getItem("jwt");
  const jwtToken = JSON.parse(
    token ? atob(token!.split(".")[1]) : '{"role":null}'
  );

  useEffect(() => {
    if (!page) {
      setPage(true);
      if (!token || String(user.role).includes("CUSTOMER")) {
        history.push("/");
      } else {
        getUsers();
      }
    }
  }, [page]);
  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
              {loginLoading && <Productplaceholder />}
              {!loginLoading && (
                <div className="tm-product-table-container">
                  {users.length > 0 ? (
                    <table className="table table-hover tm-table-small tm-product-table">
                      <thead>
                        <tr>
                          <th scope="col">&nbsp;</th>
                          <th scope="col">USERNAME</th>
                          <th scope="col">EMAIL</th>
                          <th scope="col">PHONE NUMBER</th>
                          <th scope="col">ADDRESS</th>
                          <th scope="col">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 &&
                          users.map((x) => {
                            return (
                              <tr
                                key={x.userId}
                                onClick={() =>
                                  history.push(`/admin/edit-users/${x.userId}`)
                                }
                              >
                                <th scope="row">
                                  <input type="checkbox" />
                                </th>
                                <td className="tm-product-name">
                                  {x.username}
                                </td>
                                <td>{x.email}</td>
                                <td>{x.phoneNumber}</td>
                                <td>{x.address}</td>
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
                      <div className="d-flex align-items-center justify-content-center">
                        {" "}
                        No Customer Found
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
              <h2 className="tm-block-title">Users</h2>
              <div className="tm-product-table-container">
                <table className="table tm-table-small tm-product-table">
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Users);
