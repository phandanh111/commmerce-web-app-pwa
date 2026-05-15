import React, { useEffect, useState } from 'react';
import { Button, Empty, Spin, Modal, Form, Input, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentFilled } from '@ant-design/icons';
import { addressApi } from '@/api/address.api';
import type { AddressPayload } from '@/api/address.api';
import styles from './addresses.module.scss';

interface Address {
  id: number; fullName: string; phoneNumber: string;
  province: string; district: string; ward: string; detail: string; isDefault: boolean;
}

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form] = Form.useForm();

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await addressApi.getMyAddresses();
      setAddresses(res.data?.data?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditing(null); form.resetFields(); setModal(true); };
  const openEdit = (addr: Address) => {
    setEditing(addr);
    form.setFieldsValue(addr);
    setModal(true);
  };

  const handleSave = async (values: AddressPayload) => {
    try {
      if (editing) {
        await addressApi.update(editing.id, values);
        message.success('Cập nhật địa chỉ thành công');
      } else {
        await addressApi.create(values);
        message.success('Thêm địa chỉ thành công');
      }
      setModal(false);
      fetch();
    } catch {
      message.error('Thao tác thất bại');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await addressApi.delete(id);
      message.success('Đã xóa địa chỉ');
      fetch();
    } catch {
      message.error('Không thể xóa');
    }
  };

  const handleSetDefault = async (id: number) => {
    try {
      await addressApi.setDefault(id);
      fetch();
    } catch {
      message.error('Thao tác thất bại');
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin /></div>;

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Địa chỉ giao hàng</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} className={styles.addBtn}>
          Thêm địa chỉ
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Empty description="Chưa có địa chỉ nào">
          <Button type="primary" onClick={openAdd}>Thêm địa chỉ đầu tiên</Button>
        </Empty>
      ) : (
        <div className={styles.list}>
          {addresses.map((addr) => (
            <div key={addr.id} className={`${styles.card} ${addr.isDefault ? styles.defaultCard : ''}`}>
              <EnvironmentFilled className={styles.icon} />
              <div className={styles.info}>
                <div className={styles.name}>
                  {addr.fullName}
                  <span className={styles.phone}>{addr.phoneNumber}</span>
                  {addr.isDefault && <Tag color="gold">Mặc định</Tag>}
                </div>
                <div className={styles.detail}>
                  {addr.detail}, {addr.ward}, {addr.district}, {addr.province}
                </div>
              </div>
              <div className={styles.actions}>
                {!addr.isDefault && (
                  <Button size="small" onClick={() => handleSetDefault(addr.id)}>
                    Đặt mặc định
                  </Button>
                )}
                <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(addr)} />
                <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(addr.id)} />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title={editing ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="province" label="Tỉnh/Thành phố" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="district" label="Quận/Huyện" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ward" label="Phường/Xã" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="detail" label="Địa chỉ chi tiết" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className={styles.saveBtn}>
            {editing ? 'Cập nhật' : 'Lưu địa chỉ'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Addresses;
