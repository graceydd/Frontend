const ProductSideBar = () => {
  return (
    <div className="col-lg-4 sidebar">
      <div className="sidebar-widget category">
        <h2 className="title">Category</h2>
        <nav className="navbar bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                <i className="fa fa-female"></i>Fashion & Beauty
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="fa fa-child"></i>Kids & Babies Clothes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="fa fa-tshirt"></i>Men & Women Clothes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="fa fa-mobile-alt"></i>Gadgets & Accessories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="fa fa-microchip"></i>Electronics & Accessories
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* <div className="sidebar-widget widget-slider">
            <div className="sidebar-slider normal-slider">
                <div className="product-item">
                    <div className="product-title">
                        <a >Product Name</a>
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
                            <img src="img/product-10.jpg" alt="Product Image"/>
                        </a>
                        <div className="product-action">
                            <a ><i className="fa fa-cart-plus"></i></a>
                            <a ><i className="fa fa-heart"></i></a>
                            <a ><i className="fa fa-search"></i></a>
                        </div>
                    </div>
                    <div className="product-price">
                        <h3><span>$</span>99</h3>
                        <a className="btn" ><i className="fa fa-shopping-cart"></i>Buy Now</a>
                    </div>
                </div>
                
               
            </div>
        </div> */}

      <div className="sidebar-widget brands">
        <h2 className="title">Our Brands</h2>
        <ul>
          <li>
            <a>Nulla </a>
            <span>(45)</span>
          </li>
          <li>
            <a>Curabitur </a>
            <span>(34)</span>
          </li>
          <li>
            <a>Nunc </a>
            <span>(67)</span>
          </li>
          <li>
            <a>Ullamcorper</a>
            <span>(74)</span>
          </li>
          <li>
            <a>Fusce </a>
            <span>(89)</span>
          </li>
          <li>
            <a>Sagittis</a>
            <span>(28)</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-widget tag">
        <h2 className="title">Tags Cloud</h2>
        <a>Lorem ipsum</a>
        <a>Vivamus</a>
        <a>Phasellus</a>
        <a>pulvinar</a>
        <a>Curabitur</a>
        <a>Fusce</a>
        <a>Sem quis</a>
        <a>Mollis metus</a>
        <a>Sit amet</a>
        <a>Vel posuere</a>
        <a>orci luctus</a>
        <a>Nam lorem</a>
      </div>
    </div>
  );
};

export default ProductSideBar;
