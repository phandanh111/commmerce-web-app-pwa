import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { PhoneFilled, MailFilled, EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

const ContactContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (_values: any) => {
    setLoading(true);
    setTimeout(() => {
      message.success('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong 24h.');
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  const contacts = [
    { icon: <PhoneFilled />, title: 'Hotline', value: '03.2602.7020', link: 'tel:0326027020' },
    { icon: <MailFilled />, title: 'Email', value: 'support@vuongiayen.com', link: 'mailto:support@vuongiayen.com' },
    { icon: <EnvironmentFilled />, title: 'Địa chỉ', value: '123 Nguyễn Huệ, Q.1, TP.HCM', link: '#' },
    { icon: <ClockCircleFilled />, title: 'Giờ làm việc', value: 'Thứ 2 – 7: 8:00 – 18:00', link: null },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.tag}>Liên hệ</span>
          <h1 className={styles.heroTitle}>Chúng tôi luôn sẵn sàng hỗ trợ bạn</h1>
          <p className={styles.heroDesc}>Có thắc mắc về sản phẩm? Hãy liên hệ với chúng tôi ngay!</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Contact Info */}
          <div className={styles.infoCol}>
            <h2 className={styles.colTitle}>Thông tin liên hệ</h2>
            <div className={styles.contactCards}>
              {contacts.map((c, i) => (
                <motion.div
                  key={i}
                  className={styles.contactCard}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.contactIcon}>{c.icon}</div>
                  <div>
                    <span className={styles.contactLabel}>{c.title}</span>
                    {c.link ? (
                      <a href={c.link} className={styles.contactValue}>{c.value}</a>
                    ) : (
                      <span className={styles.contactValue}>{c.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className={styles.formCol}>
            <h2 className={styles.colTitle}>Gửi tin nhắn</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <Form.Item name="name" label="Họ tên" rules={[{ required: true, message: 'Nhập họ tên' }]}>
                  <Input placeholder="Nguyễn Văn A" size="large" />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Nhập SĐT' }]}>
                  <Input placeholder="0901234567" size="large" />
                </Form.Item>
              </div>
              <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                <Input placeholder="email@example.com" size="large" />
              </Form.Item>
              <Form.Item name="subject" label="Tiêu đề">
                <Input placeholder="Tôi muốn hỏi về..." size="large" />
              </Form.Item>
              <Form.Item name="message" label="Nội dung" rules={[{ required: true, message: 'Nhập nội dung' }]}>
                <Input.TextArea placeholder="Nội dung tin nhắn..." rows={5} />
              </Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading} className={styles.submitBtn}>
                Gửi tin nhắn
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactContainer);
