import React from 'react';
import { Row, Col } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled, LinkedinFilled } from '@ant-design/icons';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[30, 30]}>
            <Col lg={8} md={12} xs={24}>
                <div className={styles.about}>
                    <div className={styles.logo}>PCD PWA</div>
                    <ul>
                        <li>Address: 60-49 Road 11378 New York</li>
                        <li>Phone: +65 11.188.888</li>
                        <li>Email: hello@colorlib.com</li>
                    </ul>
                </div>
            </Col>
            
            <Col lg={8} md={12} xs={24}>
                <div className={styles.widget}>
                    <h6>Useful Links</h6>
                    <Row>
                        <Col span={12}>
                            <ul>
                                <li><Link to="#">About Us</Link></li>
                                <li><Link to="#">About Our Shop</Link></li>
                                <li><Link to="#">Secure Shopping</Link></li>
                                <li><Link to="#">Delivery infomation</Link></li>
                                <li><Link to="#">Privacy Policy</Link></li>
                                <li><Link to="#">Our Sitemap</Link></li>
                            </ul>
                        </Col>
                        <Col span={12}>
                            <ul>
                                <li><Link to="#">Who We Are</Link></li>
                                <li><Link to="#">Our Services</Link></li>
                                <li><Link to="#">Projects</Link></li>
                                <li><Link to="#">Contact</Link></li>
                                <li><Link to="#">Innovation</Link></li>
                                <li><Link to="#">Testimonials</Link></li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Col>
            
            <Col lg={8} md={24} xs={24}>
                <div className={styles.newsletter}>
                    <h6>Join Our Newsletter Now</h6>
                    <p>Get E-mail updates about our latest shop and special offers.</p>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="Enter your mail" />
                        <button>SUBSCRIBE</button>
                    </div>
                    <div className={styles.socials}>
                        <a href="#"><FacebookFilled /></a>
                        <a href="#"><InstagramFilled /></a>
                        <a href="#"><TwitterSquareFilled /></a>
                        <a href="#"><LinkedinFilled /></a>
                    </div>
                </div>
            </Col>
        </Row>
        
        <div className={styles.copyright}>
            <p>Copyright ©{new Date().getFullYear()} All rights reserved | This template is made with by Antigravity</p>
            <img src="https://technext.github.io/ogani/img/payment-item.png" alt="payment" />
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
