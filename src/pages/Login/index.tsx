import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { PhoneOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { login, clearError } from '@/stores/slices/authSlice';
import { fetchCart } from '@/stores/slices/cartSlice';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useAppSelector((s) => s.auth);
  const from = (location.state as any)?.from?.pathname || ROUTES.HOME;

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onFinish = async (values: { phoneNumber: string; password: string }) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      message.success('Đăng nhập thành công!');
      dispatch(fetchCart());
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
          <h1 className={styles.title}>Chào mừng trở lại</h1>
          <p className={styles.subtitle}>Đăng nhập để tiếp tục mua sắm</p>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Nhập mật khẩu' }]}>
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              iconRender={(v) => v ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className={styles.submitBtn}
          >
            Đăng nhập
          </Button>
        </Form>

        <p className={styles.footer}>
          Chưa có tài khoản?{' '}
          <Link to={ROUTES.REGISTER} className={styles.link}>Đăng ký ngay</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
