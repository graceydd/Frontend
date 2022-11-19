const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Get in Touch</h2>
                <div className="contact-info">
                  <p>
                    <i className="fa fa-map-marker"></i>123 E Store, Los
                    Angeles, USA
                  </p>
                  <p>
                    <i className="fa fa-envelope"></i>email@example.com
                  </p>
                  <p>
                    <i className="fa fa-phone"></i>+123-456-7890
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Follow Us</h2>
                <div className="contact-info">
                  <div className="social">
                    <a>
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a>
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a>
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a>
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a>
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Company Info</h2>
                <ul>
                  <li>
                    <a>About Us</a>
                  </li>
                  <li>
                    <a>Privacy Policy</a>
                  </li>
                  <li>
                    <a>Terms & Condition</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h2>Purchase Info</h2>
                <ul>
                  <li>
                    <a>Pyament Policy</a>
                  </li>
                  <li>
                    <a>Shipping Policy</a>
                  </li>
                  <li>
                    <a>Return Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row payment align-items-center">
            <div className="col-md-6">
              <div className="payment-method">
                <h2>We Accept:</h2>
                <img src="img/payment-method.png" alt="Payment Method" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="payment-security">
                <h2>Secured By:</h2>
                <img src="img/godaddy.svg" alt="Payment Security" />
                <img src="img/norton.svg" alt="Payment Security" />
                <img src="img/ssl.svg" alt="Payment Security" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 copyright">
              <p>
                Copyright &copy; Popoola Shopping.
                All Rights Reserved
              </p>
            </div>

            <div className="col-md-6 template-by">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
