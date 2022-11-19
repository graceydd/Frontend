import React from "react";
import logo from "./logo.svg";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import Header from "./features/home/Header";
import ProductList from "./features/product/productList";
import ProductDetail from "./features/product-detail/product-detail";
import Cart from "./features/cart/cart";
import MyAccount from "./features/myAccount/my-account";
import Checkout from "./features/checkout/checkout";
import Wishlist from "./features/wishlist/wishlist";
import Login from "./features/login/login";
import OrderConfirmation from "./features/order-confirmaton/confirmation";
import AdminHeader from "./features/admin/home/adminHeader";
import Dashboard from "./features/admin/home/dashboard";
import AdminProducts from "./features/admin/adminProducts/products";
import EditProducts from "./features/admin/adminProducts/edit_products";
import AddProducts from "./features/admin/adminProducts/addProducts";
import AddCategory from "./features/admin/adminProducts/addCategory";
import Users from "./features/admin/users/users";
import EditUsers from "./features/admin/users/editUsers";
import ChatService from "./features/general/chat";
import DailyReport from "./features/admin/Reports/daily_reports";
import MonthlyReport from "./features/admin/Reports/monthly_reports";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/add-category" component={AddCategory} />
        <Route exact path="/admin/products" component={AdminProducts} />
        <Route exact path="/admin/add-products" component={AddProducts} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/edit-users/:userId" component={EditUsers} />
        <Route
          exact
          path="/admin/edit-products/:productId"
          component={EditProducts}
        />
        <Route
          exact
          path="/product-details/:productId"
          component={ProductDetail}
        />
        <Route exact path="/chat" component={ChatService} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/my-account" component={MyAccount} />
        <Route exact path="/wishlist" component={Wishlist} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin/daily-reports" component={DailyReport} />
        <Route exact path="/admin/monthly-reports" component={MonthlyReport} />
        <Route exact path="/confirmation" component={OrderConfirmation} />
      </Switch>
    </>
  );
}

export default withRouter(observer(App));
