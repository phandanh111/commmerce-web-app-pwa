import React from 'react';
import { Row, Col } from 'antd';
import { PhoneFilled, MailFilled } from '@ant-design/icons';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

function Footer({ className }: Props) {
  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className={styles.container}>
        <Row gutter={[30, 30]}>
          <Col lg={12} md={24}>
            <div className={styles.about}>
              <div className={styles.logo}>
                <span className={styles.logoText}>VƯƠNG GIA</span>
                <span className={styles.logoSub}>Yến</span>
              </div>
              <p className={styles.desc}>
                Công ty TNHH Vương Gia Yến (since 2009). Để đảm bảo chất lượng sản phẩm,
                dịch vụ khách hàng hoàn hảo. Sản phẩm bảo đảm 100% chất lượng,
                không dùng bất cứ hóa chất nào trong quá trình làm sạch.
              </p>
            </div>
          </Col>

          <Col lg={12} md={24}>
            <div className={styles.contact}>
              <h6>LIÊN HỆ:</h6>
              <ul>
                <li>
                  <MailFilled className={styles.contactIcon} />
                  Email: support@vuongiayen.com
                </li>
                <li>
                  <PhoneFilled className={styles.contactIcon} />
                  Điện thoại: 03.2602.7020
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} Vương Gia Yến, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
