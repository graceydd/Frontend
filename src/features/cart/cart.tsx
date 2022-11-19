import { useContext, useEffect } from "react";
import {
  CartFormValues,
  CartProducts,
  WishListFormValues,
} from "../../app/models/cart";
import { RootStoreContext } from "../../app/stores/rootStore";
import Footer from "../home/footer";
import Header from "../home/Header";
import { history } from "../..";
import { observer } from "mobx-react";
import Productplaceholder from "../admin/adminProducts/productplaceholder";
  
const Cart = () => {
  const rootStore = useContext(RootStoreContext);
  const { getCart, cart, deleteCart, checkout, cartLoading } =
    rootStore.cartStore;
  const subTotal = cart.products.reduce(
    (total, currentValue) => (total += currentValue.productPrice ?? 0),
    0
  );

  const deleteCartHandler = (productId: number) => {
    deleteCart(productId);
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div>
      <Header />
      <div className="cart-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-page-inner">
                {cartLoading && <Productplaceholder />}
                {!cartLoading && (
                  <div className="table-responsive">
                    <table className="table table-bordered ">
                      {cart.products.length > 0 && (
                        <thead className="thead-dark">
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                      )}

                      {cart.products.length > 0 ? (
                        cart.products.map((x: CartProducts) => {
                          return (
                            <tbody key={x.productId} className="align-middle">
                              <tr>
                                <td>
                                  <div className="img">
                                    <a>
                                      <img
                                        src={
                                          x.productImage
                                            ? x.productImage
                                            : "img/product-1.jpg"
                                        }
                                        alt="Image"
                                      />
                                    </a>
                                    <p>{x.productName}</p>
                                  </div>
                                </td>
                                <td>{`$${x.productPrice}`}</td>
                                <td>
                                  <div className="qty">
                                    <button className="btn-minus">
                                      <i className="fa fa-minus"></i>
                                    </button>
                                    <input type="text" value="1" />
                                    <button className="btn-plus">
                                      <i className="fa fa-plus"></i>
                                    </button>
                                  </div>
                                </td>
                                <td>$99</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      deleteCartHandler(x.productId!)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })
                      ) : (
                        <div>
                          <div className="d-flex align-items-center justify-content-center">
                            {" "}
                            <h3>Cart Empty</h3>
                          </div>
                        </div>
                      )}
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart-page-inner">
                <div className="row">
                  <div className="col-md-12">
                    <div className="coupon">
                      <input type="text" placeholder="Coupon Code" />
                      <button>Apply Code</button>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="cart-summary">
                      <div className="cart-content">
                        <h1>Cart Summary</h1>
                        <p>
                          Sub Total<span>{`$${subTotal}`}</span>
                        </p>
                        <p>
                          Shipping Cost<span>$1</span>
                        </p>
                        <h2>
                          Grand Total<span>{`$${subTotal + 1}`}</span>
                        </h2>
                      </div>
                      <div className="cart-btn">
                        <button>Update Cart</button>
                        <button onClick={() => history.push("/checkout")}>
                          Checkout
                        </button>
                      </div>
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

export default observer(Cart);
