const Feature = () => {
  return (
    <div>
      <div className="feature">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fab fa-cc-mastercard"></i>
                <h2>Secure Payment</h2>
                <p>Lorem ipsum dolor sit amet consectetur elit</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-truck"></i>
                <h2>Worldwide Delivery</h2>
                <p>Lorem ipsum dolor sit amet consectetur elit</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-sync-alt"></i>
                <h2>90 Days Return</h2>
                <p>Lorem ipsum dolor sit amet consectetur elit</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-comments"></i>
                <h2>24/7 Support</h2>
                <p>Lorem ipsum dolor sit amet consectetur elit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /* Category Start */}
      <div className="category">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="category-item ch-400">
                <img src="img/category-3.jpg" />
                <a className="category-name">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-item ch-250">
                <img src="img/category-4.jpg" />
                <a className="category-name">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
              <div className="category-item ch-150">
                <img src="img/category-5.jpg" />
                <a className="category-name">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-item ch-150">
                <img src="img/category-6.jpg" />
                <a className="category-name">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
              <div className="category-item ch-250">
                <img src="img/category-7.jpg" />
                <a className="category-name">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-item ch-400">
                <img src="img/category-8.jpg" />
                <a className="category-name">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="call-to-action">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>call us for any queries</h1>
            </div>
            <div className="col-md-6">
              <a href="tel:0123456789">+012-345-6789</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    /* Category End */
  );
};

export default Feature;
