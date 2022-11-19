import AdminHeader from "../home/adminHeader";
import { history } from "../../..";
import { Link } from "react-router-dom";
import Footer from "../../home/footer";
import { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Productplaceholder from "./productplaceholder";
import { observer } from "mobx-react-lite";

const AdminProducts = () => {
  const [page, setPage] = useState(false);

  const rootStore = useContext(RootStoreContext);
  const { productLoading, getProducts, products, getCategories, categories, deleteProduct } =
    rootStore.productStore;

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
        getCategories();
        getProducts();
      }
    }
  }, [page]);

  const deleteProductHandler = (productId: number) => {
    deleteProduct(productId);
  };

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
                  {products.length > 0 ? (
                    <table className="table table-hover tm-table-small tm-product-table">
                      <thead>
                        <tr>
                          <th scope="col">&nbsp;</th>
                          <th scope="col">PRODUCT NAME</th>
                          <th scope="col">UNIT SOLD</th>
                          <th scope="col">IN STOCK</th>
                          <th scope="col">EXPIRE DATE</th>
                          <th scope="col">&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length > 0 &&
                          products.map((x) => {
                            return (
                              <tr
                                key={x.productId}
                                onClick={() =>
                                  history.push(
                                    `/admin/edit-products/${x.productId}`
                                  )
                                }
                              >
                                <th scope="row">
                                  <input type="checkbox" />
                                </th>
                                <td className="tm-product-name">
                                  {x.productName}
                                </td>
                                <td>1</td>
                                <td>{x.productStock}</td>
                                <td>28 March 2030</td>
                                <td>
                                  {/* <a className="tm-product-delete-link" > */}
                                    <i className="far fa-trash-alt tm-product-delete-icon" onClick={() => deleteProductHandler(x.productId!)}></i>
                                  {/* </a> */}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      <div className="d-flex justify-content-center align-items-center text-white">
                        No Products Found
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
                  <tbody>
                    {categories.length > 0 &&
                      categories.map((x) => (
                        <tr>
                          <td className="tm-product-name">{x.categoryName}</td>
                          <td className="text-center">
                            <a className="tm-product-delete-link">
                              <i className="far fa-trash-alt tm-product-delete-icon"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
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

export default observer(AdminProducts);
