import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartFormValues } from "../../app/models/cart";
import { ProductValues } from "../../app/models/product";
import { RootStoreContext } from "../../app/stores/rootStore";
import Footer from "../home/footer";
import Header from "../home/Header";
import ProductSideBar from "./productSideBar";

const ProductList = () => {
  const rootStore = useContext(RootStoreContext);
  const { productLoading, getProducts, products } = rootStore.productStore;
  const { addToCart } = rootStore.cartStore;
  const { addToWishlist } = rootStore.wishListStore;

  const addToCartHandler = (productId: number, quantity: number) => {
    const form = new CartFormValues();
    form.productId = productId;
    form.quantity = quantity;
    addToCart(form);
  };

  const addToWishListHandler = (productId: number, quantity: number) => {
    const form = new CartFormValues();
    form.productId = productId;
    form.quantity = quantity;
    addToWishlist(form);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <Header />
      <div className="breadcrumb-wrap">
        <div className="container-fluid">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item activer">
              <a href="/products">Products</a>
            </li>
            {/* <li className="breadcrumb-item active">Product List</li> */}
          </ul>
        </div>
      </div>

      <div className="product-view">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {products.length > 0 && (
                  <div className="col-md-12">
                    <div className="product-view-top">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="product-search">
                            <input type="email" value="Search" />
                            <button>
                              <i className="fa fa-search"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="product-short">
                            <div className="dropdown">
                              <div
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Product short by
                              </div>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item">Newest</a>
                                <a className="dropdown-item">Popular</a>
                                <a className="dropdown-item">Most sale</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="product-price-range">
                            <div className="dropdown">
                              <div
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                              >
                                Product price range
                              </div>
                              <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item">$0 to $50</a>
                                <a className="dropdown-item">$51 to $100</a>
                                <a className="dropdown-item">$101 to $150</a>
                                <a className="dropdown-item">$151 to $200</a>
                                <a className="dropdown-item">$201 to $250</a>
                                <a className="dropdown-item">$251 to $300</a>
                                <a className="dropdown-item">$301 to $350</a>
                                <a className="dropdown-item">$351 to $400</a>
                                <a className="dropdown-item">$401 to $450</a>
                                <a className="dropdown-item">$451 to $500</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {products.length > 0 ? (
                  products.map((x: ProductValues) => {
                    return (
                      <div className="col-md-4" key={x.productId}>
                        <div className="product-item">
                          <div className="product-title">
                            <a>{x.productName}</a>
                            <div className="ratting">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                          <div className="product-image">
                            <Link to={`/product-details/${x.productId}`}>
                              <img
                                src={
                                  x.productImage
                                    ? x.productImage
                                    : "img/product-1.jpg"
                                }
                                alt="Product Image"
                              />
                            </Link>
                            <div className="product-action">
                              <a
                                onClick={() =>
                                  addToCartHandler(x.productId!, 2)
                                }
                              >
                                <i className="fa fa-cart-plus"></i>
                              </a>
                              <a
                                onClick={() =>
                                  addToWishListHandler(x.productId!, 2)
                                }
                              >
                                <i className="fa fa-heart"></i>
                              </a>
                              <Link to={`/product-details/${x.productId}`}>
                                <i className="fa fa-search"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="product-price">
                            <h3>
                              <span>$</span>
                              {x.price}
                            </h3>
                            <a className="btn">
                              <i className="fa fa-shopping-cart"></i>Add to Cart
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    {" "}
                    <div className="d-flex justify-content-center align-items-center">
                      {" "}
                      <h3>No Products Available</h3>
                    </div>
                  </div>
                )}
              </div>

              {/* <div className="col-md-12">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <a className="page-link"  tabIndex={-1}>Previous</a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" >1</a></li>
                                    <li className="page-item"><a className="page-link" >2</a></li>
                                    <li className="page-item"><a className="page-link" >3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" >Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div> */}
            </div>
            <ProductSideBar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default observer(ProductList);
