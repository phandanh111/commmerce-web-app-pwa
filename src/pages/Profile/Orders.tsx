import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Empty, Spin, Button, message } from 'antd';
import { EyeOutlined, CloseOutlined } from '@ant-design/icons';
import { invoiceApi } from '@/api/invoice.api';
import { ROUTES } from '@/constants/router';
import styles from './orders.module.scss';

interface Order {
  id: number;
  createdAt: string;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  invoiceItems?: { item: { name: string; image?: string }; quantity: number; price: number }[];
}

const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const paymentStatusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ thanh toán', color: 'orange' },
  PAID: { label: 'Đã thanh toán', color: 'green' },
  CANCELLED: { label: 'Đã hủy', color: 'red' },
  REFUNDED: { label: 'Hoàn tiền', color: 'purple' },
};

const orderStatusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Chờ xác nhận', color: 'default' },
  CONFIRMED: { label: 'Đã xác nhận', color: 'blue' },
  PROCESSING: { label: 'Đang xử lý', color: 'geekblue' },
  SHIPPING: { label: 'Đang giao', color: 'cyan' },
  DELIVERED: { label: 'Đã giao', color: 'green' },
  CANCELLED: { label: 'Đã hủy', color: 'red' },
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await invoiceApi.getMyOrders();
      // Response: { data: { total, data: InvoiceEntity[] } }
      setOrders(res.data?.data?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCancel = async (id: number) => {
    try {
      await invoiceApi.cancel(id);
      message.success('Đã hủy đơn hàng');
      fetchOrders();
    } catch {
      message.error('Không thể hủy đơn hàng');
    }
  };

  if (loading) return <div className={styles.spinWrap}><Spin /></div>;

  return (
    <div>
      <h2 className={styles.title}>Đơn hàng của tôi</h2>
      {orders.length === 0 ? (
        <Empty description="Bạn chưa có đơn hàng nào">
          <Link to={ROUTES.PRODUCTS}><Button type="primary">Mua sắm ngay</Button></Link>
        </Empty>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => {
            const ps = paymentStatusMap[order.paymentStatus] || { label: order.paymentStatus, color: 'default' };
            const os = orderStatusMap[order.orderStatus] || { label: order.orderStatus, color: 'default' };
            return (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <span className={styles.orderId}>Đơn #{order.id}</span>
                    <span className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className={styles.orderTags}>
                    <Tag color={ps.color}>{ps.label}</Tag>
                    <Tag color={os.color}>{os.label}</Tag>
                  </div>
                </div>

                {order.invoiceItems && (
                  <div className={styles.orderItems}>
                    {order.invoiceItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className={styles.orderItem}>
                        <img
                          src={item.item.image || `https://placehold.co/48x48/F8F0E3/C8A000?text=Y`}
                          alt={item.item.name}
                          className={styles.itemImg}
                        />
                        <div>
                          <div className={styles.itemName}>{item.item.name}</div>
                          <div className={styles.itemQty}>x{item.quantity} — {formatPrice(item.price)}</div>
                        </div>
                      </div>
                    ))}
                    {order.invoiceItems.length > 3 && (
                      <span className={styles.moreItems}>+{order.invoiceItems.length - 3} sản phẩm khác</span>
                    )}
                  </div>
                )}

                <div className={styles.orderFooter}>
                  <span className={styles.orderTotal}>Tổng: <strong>{formatPrice(order.totalAmount)}</strong></span>
                  <div className={styles.orderActions}>
                    <Link to={ROUTES.ORDER_DETAIL.replace(':id', String(order.id))}>
                      <Button size="small" icon={<EyeOutlined />}>Chi tiết</Button>
                    </Link>
                    {order.orderStatus === 'PENDING' && (
                      <Button
                        size="small"
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleCancel(order.id)}
                      >
                        Hủy đơn
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
