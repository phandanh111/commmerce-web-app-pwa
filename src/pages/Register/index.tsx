import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
// Register: phoneNumber (required) + password + optional email
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { register, clearError } from '@/stores/slices/authSlice';
import { ROUTES } from '@/constants/router';
import styles from '../Login/styles.module.scss';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME, { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) { message.error(error); dispatch(clearError()); }
  }, [error, dispatch]);

  const onFinish = async (values: { phoneNumber: string; password: string; email?: string }) => {
    const result = await dispatch(register(values));
    if (register.fulfilled.match(result)) {
      message.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <div className={styles.logo}>VƯƠNG GIA</div>
          <h1 className={styles.title}>Tạo tài khoản mới</h1>
          <p className={styles.subtitle}>Đăng ký để nhận ưu đãi độc quyền</p>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="phoneNumber" rules={[{ required: true, pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }]}>
            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email (tùy chọn)" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, min: 6, message: 'Mật khẩu ít nhất 6 ký tự' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject('Mật khẩu không khớp!');
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className={styles.submitBtn}
          >
            Đăng ký
          </Button>
        </Form>

        <p className={styles.footer}>
          Đã có tài khoản?{' '}
          <Link to={ROUTES.LOGIN} className={styles.link}>Đăng nhập</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
