import React from 'react';
import { EnvironmentFilled, PhoneFilled, ClockCircleFilled } from '@ant-design/icons';
import styles from './styles.module.scss';

const stores = [
  { name: 'Chi nhánh Quận 1', address: '123 Nguyễn Huệ, P.Bến Nghé, Q.1, TP.HCM', phone: '03.2602.7020', hours: '8:00 – 18:00' },
  { name: 'Chi nhánh Bình Thạnh', address: '456 Đinh Bộ Lĩnh, P.26, Q.Bình Thạnh, TP.HCM', phone: '03.2602.7021', hours: '8:00 – 18:00' },
  { name: 'Chi nhánh Hà Nội', address: '789 Hoàng Cầu, Đống Đa, Hà Nội', phone: '02.4602.7020', hours: '8:00 – 17:30' },
];

const ShowroomContainer: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.hero}><h1>Showroom</h1><p>Hệ thống cửa hàng Vương Gia Yến toàn quốc</p></div>
    <div className={styles.container}>
      <div className={styles.grid}>
        {stores.map((s, i) => (
          <div key={i} className={styles.card}>
            <h3>{s.name}</h3>
            <div className={styles.row}><EnvironmentFilled className={styles.icon} /><span>{s.address}</span></div>
            <div className={styles.row}><PhoneFilled className={styles.icon} /><a href={`tel:${s.phone.replace(/\./g,'')}`}>{s.phone}</a></div>
            <div className={styles.row}><ClockCircleFilled className={styles.icon} /><span>{s.hours}</span></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default React.memo(ShowroomContainer);
