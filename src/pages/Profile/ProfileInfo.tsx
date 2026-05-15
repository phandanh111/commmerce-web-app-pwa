import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Avatar, message } from 'antd';
import { UserOutlined, CameraOutlined } from '@ant-design/icons';
import { accountApi } from '@/api/account.api';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { fetchProfile } from '@/stores/slices/authSlice';
import styles from './profileInfo.module.scss';

const ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.information?.fullName || '',
        email: user.email,
        phoneNumber: user.phoneNumber || '',
      });
    }
  }, [user, form]);

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullName', values.fullName || '');
      formData.append('gender', values.gender || '');
      await accountApi.updateMyInfo(formData);
      await dispatch(fetchProfile());
      message.success('Cập nhật thông tin thành công!');
    } catch {
      message.error('Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Tài khoản của tôi</h2>
      <div className={styles.avatarSection}>
        <Avatar
          size={96}
          src={user?.information?.avatar}
          icon={!user?.information?.avatar && <UserOutlined />}
          className={styles.avatar}
        />
        <button type="button" className={styles.uploadBtn}>
          <CameraOutlined /> Đổi ảnh
        </button>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <div className={styles.formGrid}>
          <Form.Item name="fullName" label="Họ và tên">
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại">
            <Input disabled />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit" loading={loading} className={styles.saveBtn}>
          Lưu thay đổi
        </Button>
      </Form>
    </div>
  );
};

export default ProfileInfo;
