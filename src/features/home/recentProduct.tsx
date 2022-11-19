import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartFormValues, WishListFormValues } from "../../app/models/cart";
import { ProductValues } from "../../app/models/product";
import { RootStoreContext } from "../../app/stores/rootStore";

const RecentProducts = (props: any) => {
  const { products } = props;
  const rootStore = useContext(RootStoreContext);
  const { addToCart } = rootStore.cartStore;
  const { addToWishlist } = rootStore.wishListStore;

  const addToCartHandler = (productId: number, quantity: number) => {
    const form = new CartFormValues();
    form.productId = productId;
    form.quantity = quantity;
    addToCart(form);
  };

  const addToWishListHandler = (productId: number, quantity: number) => {
    const form = new WishListFormValues();
    form.productId = productId;
    form.quantity = quantity;
    addToWishlist(form);
  };

  return (
    <div className="recent-product product">
      <div className="container-fluid">
        <div className="section-header">
          <h1>Recent Product</h1>
        </div>
        <div className="row align-items-center product-slider product-slider-4">
          {products.length > 0 &&
            products.map((x: ProductValues) => {
              return (
                <div className="col-lg-3">
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
                      <a href="product-detail.html">
                        <img
                          src={
                            x.productImage
                              ? x.productImage
                              : "img/product-6.jpg"
                          }
                          alt="Product Image"
                        />
                      </a>
                      <div className="product-action">
                        <a onClick={() => addToCartHandler(x.productId!, 2)}>
                          <i className="fa fa-cart-plus"></i>
                        </a>
                        <a
                          onClick={() => addToWishListHandler(x.productId!, 2)}
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
                        <i className="fa fa-shopping-cart"></i>Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RecentProducts;
