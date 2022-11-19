import { useContext } from "react";
import { Link } from "react-router-dom";
import { history } from "../../..";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Footer from "../../home/footer";

const AdminHeader = () => {
  const user = JSON.parse(window.localStorage.getItem("user")!);
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;
  const token = window.localStorage.getItem("jwt");
  // const jwtToken = JSON.parse(
  //   token ? atob(token!.split(".")[1]) : '{"role":null}'
  // );
  return (
    <div>
      {/* <div className="nav">
      <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <a className="navbar-brand" onClick={() => history.push("/")}>MENU</a>
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                  <div className="navbar-nav mr-auto">
                      <Link to="/admin" className="nav-item nav-link active">Dashboard</Link>
                      <Link to="/admin/products" className="nav-item nav-link">Products</Link>
                      <div className="nav-item dropdown">
                                <a  className="nav-link dropdown-toggle" data-toggle="dropdown">More Pages</a>
                                <div className="dropdown-menu">
                                    <a href="wishlist.html" className="dropdown-item">Daily Report</a>
                                    <a href="login.html" className="dropdown-item">Monthly Report</a>
                                </div>
                            </div>
                     
                  </div>
                   <div className="navbar-nav ml-auto">
                   <Link to="/login" className="nav-item nav-link">Logout</Link>
                    
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
                                <img src="./img/logo.png" alt="Logo"/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="search">
                            <input type="text" placeholder="Search"/>
                            <button><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div> */}
      <nav className="navbar navbar-expand-xl">
        <div className="container h-100">
          <Link to="/admin" className="navbar-brand">
            <h1 className="tm-site-title mb-0">Product Admin</h1>
          </Link>
          <button
            className="navbar-toggler ml-auto mr-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars tm-nav-icon"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto h-100">
              <li className="nav-item">
                <Link to="/admin" className="nav-link active">
                  <i className="fas fa-tachometer-alt"></i>
                  Dashboard
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              {String(user.role).includes("CEO") && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="far fa-file-alt"></i>
                    <span>
                      Reports <i className="fas fa-angle-down"></i>
                    </span>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      className="dropdown-item cursorPointer"
                      onClick={() => history.push("/admin/daily-reports")}
                    >
                      Daily Report
                    </a>
                    <a
                      className="dropdown-item cursorPointer"
                      onClick={() => history.push("/admin/monthly-reports")}
                    >
                      Monthly Report
                    </a>
                  </div>
                </li>
              )}
              <li className="nav-item">
                <Link to="/admin/products" className="nav-link">
                  <i className="fas fa-shopping-cart"></i>
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/admin/users" className="nav-link">
                  <i className="fas fa-shopping-cart"></i>
                  CUSTOMERS
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-cog"></i>
                  <span>
                    Settings <i className="fas fa-angle-down"></i>
                  </span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item">Profile</a>
                  <a className="dropdown-item">Billing</a>
                  <a className="dropdown-item">Customize</a>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link d-block  text-white">
                  Admin,{" "}
                  <b className="logout" onClick={() => logout()}>
                    Logout
                  </b>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
