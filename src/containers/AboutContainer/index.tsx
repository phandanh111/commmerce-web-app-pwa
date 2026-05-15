import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleFilled } from '@ant-design/icons';
import styles from './styles.module.scss';

const values = [
  { emoji: '🌿', title: '100% Tự nhiên', desc: 'Không hóa chất, không phụ gia, bảo tồn dưỡng chất tự nhiên' },
  { emoji: '🏭', title: 'Sản xuất chuẩn', desc: 'Quy trình chế biến khép kín, đạt tiêu chuẩn VSATTP' },
  { emoji: '🚚', title: 'Giao hàng nhanh', desc: 'Vận chuyển toàn quốc, bao bì sang trọng giữ nhiệt tốt' },
  { emoji: '❤️', title: 'Tận tâm phục vụ', desc: 'Đội ngũ tư vấn nhiệt tình, hỗ trợ 24/7' },
];

const milestones = [
  { year: '2009', title: 'Thành lập', desc: 'Ra đời tại TP.HCM với mục tiêu mang yến sào sạch đến tay người tiêu dùng' },
  { year: '2015', title: 'Mở rộng', desc: 'Phát triển mạng lưới phân phối rộng khắp toàn quốc' },
  { year: '2020', title: 'Chứng nhận', desc: 'Đạt chứng nhận VSATTP và ISO 22000' },
  { year: '2024', title: 'Số hóa', desc: 'Ra mắt nền tảng thương mại điện tử phục vụ khách hàng toàn quốc' },
];

const AboutContainer: React.FC = () => {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className={styles.tag}>Về chúng tôi</span>
            <h1 className={styles.heroTitle}>VƯƠNG GIA YẾN</h1>
            <p className={styles.heroDesc}>
              Hơn 15 năm kinh nghiệm trong ngành yến sào, chúng tôi tự hào là thương hiệu
              yến sào uy tín hàng đầu Việt Nam với hàng nghìn khách hàng tin tưởng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>🪺</div>
            </div>
            <div className={styles.storyContent}>
              <span className={styles.sectionTag}>Câu chuyện của chúng tôi</span>
              <h2 className={styles.sectionTitle}>Từ tổ yến tự nhiên đến bàn ăn của bạn</h2>
              <p>
                Vương Gia Yến được thành lập năm 2009 bởi những người đam mê với nguồn dưỡng chất quý giá từ thiên nhiên.
                Chúng tôi nhận thấy người tiêu dùng Việt Nam xứng đáng được sử dụng yến sào chất lượng cao với
                giá cả hợp lý, không phải lo lắng về tạp chất hay hóa chất độc hại.
              </p>
              <p style={{ marginTop: 12 }}>
                Với cam kết "từ tổ đến tay bạn", mỗi sản phẩm của chúng tôi đều trải qua quy trình
                kiểm soát chất lượng nghiêm ngặt, đảm bảo giữ nguyên dưỡng chất quý hiếm.
              </p>
              <ul className={styles.checkList}>
                {['Yến sào 100% tự nhiên', 'Không chất bảo quản', 'Kiểm nghiệm chất lượng định kỳ', 'Đóng gói vệ sinh, sang trọng'].map((t) => (
                  <li key={t}><CheckCircleFilled className={styles.check} /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTag}>Giá trị cốt lõi</span>
            <h2 className={styles.sectionTitle}>Điều làm nên Vương Gia Yến</h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className={styles.valueEmoji}>{v.emoji}</span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTag}>Hành trình</span>
            <h2 className={styles.sectionTitle}>15 năm phát triển</h2>
          </div>
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(AboutContainer);
