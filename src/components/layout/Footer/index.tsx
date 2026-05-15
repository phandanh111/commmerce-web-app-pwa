import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneFilled, MailFilled, FacebookFilled,
  EnvironmentFilled, SafetyCertificateFilled,
} from '@ant-design/icons';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

const quickLinks = [
  { label: 'Trang chủ', path: ROUTES.HOME },
  { label: 'Sản phẩm', path: ROUTES.PRODUCTS },
  { label: 'Giới thiệu', path: ROUTES.ABOUT },
  { label: 'Tin tức', path: ROUTES.NEWS },
  { label: 'Liên hệ', path: ROUTES.CONTACT },
];

const policies = [
  { label: 'Chính sách đổi trả', path: '#' },
  { label: 'Chính sách bảo mật', path: '#' },
  { label: 'Điều khoản sử dụng', path: '#' },
  { label: 'Hướng dẫn mua hàng', path: '#' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <Link to={ROUTES.HOME} className={styles.logo}>
                <span className={styles.logoTop}>VƯƠNG GIA</span>
                <span className={styles.logoBottom}>✦ Yến Sào Cao Cấp ✦</span>
              </Link>
              <p className={styles.desc}>
                Công ty TNHH Vương Gia Yến (since 2009). Sản phẩm yến sào cao cấp,
                100% tự nhiên, không hóa chất. Cam kết chất lượng từ tổ đến tay bạn.
              </p>
              <div className={styles.socials}>
                <a href="#" className={styles.social} aria-label="Facebook"><FacebookFilled /></a>
                <a href="#" className={styles.social} aria-label="Zalo">Z</a>
                <a href="#" className={styles.social} aria-label="TikTok">T</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Danh mục</h4>
              <ul className={styles.linkList}>
                {quickLinks.map((l) => (
                  <li key={l.path}>
                    <Link to={l.path} className={styles.link}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Chính sách</h4>
              <ul className={styles.linkList}>
                {policies.map((l) => (
                  <li key={l.label}>
                    <a href={l.path} className={styles.link}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Liên hệ</h4>
              <ul className={styles.contactList}>
                <li>
                  <EnvironmentFilled className={styles.icon} />
                  <span>123 Nguyễn Huệ, Q.1, TP.HCM</span>
                </li>
                <li>
                  <PhoneFilled className={styles.icon} />
                  <a href="tel:0326027020">03.2602.7020</a>
                </li>
                <li>
                  <MailFilled className={styles.icon} />
                  <a href="mailto:support@vuongiayen.com">support@vuongiayen.com</a>
                </li>
              </ul>
              <div className={styles.certBadge}>
                <SafetyCertificateFilled />
                <span>Đã đăng ký ĐKKD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <p>© {new Date().getFullYear()} Vương Gia Yến. Bảo lưu mọi quyền.</p>
          <div className={styles.payments}>
            <span>Thanh toán:</span>
            <span className={styles.payTag}>COD</span>
            <span className={styles.payTag}>Chuyển khoản</span>
            <span className={styles.payTag}>Momo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
