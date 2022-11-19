import { history } from "../..";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const Header = () => {
  const [page, setPage] = useState(false);
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;
  const { cart, getCart } = rootStore.cartStore;
  const { wishlist, getWishlist } = rootStore.wishListStore;

  const user = JSON.parse(window.localStorage.getItem("user")!);
  const token = window.localStorage.getItem("jwt");
  const jwtToken = JSON.parse(
    token ? atob(token!.split(".")[1]) : '{"role":null}'
  );

  useEffect(() => {
    if (!page) {
      setPage(true);
      if (
        token &&
        (String(user.role).includes("CUSTOMER") ||
          String(user.role).includes("CEO") ||
          String(user.role).includes("STAFF"))
      ) {
        getCart();
        getWishlist();
      }
    }
  }, [page]);

  console.log(user, token);

  return (
    <div>
      <div className="nav">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a className="navbar-brand" onClick={() => history.push("/")}>
              MENU
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/products" className="nav-item nav-link">
                  Products
                </Link>
                {/* <Link to="/product-details" className="nav-item nav-link">Product Detail</Link> */}
                <Link to="/cart" className="nav-item nav-link">
                  Cart
                </Link>
                {/* <Link to="/checkout" className="nav-item nav-link">
                  Checkout
                </Link> */}
                <Link to="/my-account" className="nav-item nav-link">
                  My Account
                </Link>
                <Link to="/wishlist" className="nav-item nav-link">
                  Wishlist
                </Link>
                <Link to="/chat" className="nav-item nav-link">
                  Chat
                </Link>
              </div>
              <div className="navbar-nav ml-auto">
                {String(user ? user.role : "").includes("CUSTOMER") ||
                String(user ? user.role : "").includes("STAFF") ||
                String(user ? user.role : "").includes("CEO") ? (
                  <div
                    onClick={() => {
                      setPage(false);
                      logout();
                    }}
                    className="text-white logout"
                  >
                    Logout
                  </div>
                ) : (
                  <Link to="/login" className="nav-item nav-link">
                    Login/Register
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="logo">
                <Link to="/">
                  <img src="./img/Popoo.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="search">
                <input type="text" placeholder="Search" />
                <button>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <div className="user">
                <Link to="/wishlist" className="btn wishlist">
                  <i className="fa fa-heart"></i>
                  <span>{`(${wishlist.products.length})`}</span>
                </Link>
                <Link to="/cart" className="btn cart">
                  <i className="fa fa-shopping-cart"></i>
                  <span>{`(${cart.products.length})`}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Header);
