import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { CartFormValues } from "../../app/models/cart";
import { RootStoreContext } from "../../app/stores/rootStore";
import Productplaceholder from "../admin/adminProducts/productplaceholder";
import Footer from "../home/footer";
import Header from "../home/Header";

const Wishlist = () => {
  const rootStore = useContext(RootStoreContext);
  const { getWishlist, wishlist, deleteWishList, wishlistLoading } =
    rootStore.wishListStore;
  const { addToCart } = rootStore.cartStore;

  const deleteCartHandler = (productId: number) => {
    deleteWishList(productId);
  };
  const addToCartHandler = (productId: number, quantity: number) => {
    const form = new CartFormValues();
    form.productId = productId;
    form.quantity = quantity;
    addToCart(form);
  };

  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <div>
      <Header />
      <div className="wishlist-page">
        <div className="container-fluid">
          <div className="wishlist-page-inner">
            <div className="row">
              <div className="col-md-12">
                {wishlistLoading && <Productplaceholder />}
                {!wishlistLoading && (
                  <div className="table-responsive">
                    {wishlist.products.length > 0 ? (
                      <table className="table table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Add to Cart</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        {wishlist.products.map((x) => {
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
                                            : "img/product-6.jpg"
                                        }
                                        alt="Image"
                                      />
                                    </a>
                                    <p>{x.productName}</p>
                                  </div>
                                </td>
                                <td>{`$${x.price}`}</td>

                                <td>
                                  <button
                                    onClick={() =>
                                      addToCartHandler(x.productId!, 1)
                                    }
                                    className="btn-cart"
                                  >
                                    Add to Cart
                                  </button>
                                </td>
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
                        })}
                      </table>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-center align-items-center">
                          <h3>Wish List Empty</h3>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default observer(Wishlist);
