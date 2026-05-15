import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Radio, Divider, message, Modal } from 'antd';
import { PlusOutlined, CheckCircleFilled } from '@ant-design/icons';
import { addressApi } from '@/api/address.api';
import type { AddressPayload } from '@/api/address.api';
import { paymentMethodApi } from '@/api/paymentMethod.api';
import { couponApi } from '@/api/coupon.api';
import { cartApi } from '@/api/cart.api';
import { useAppDispatch, useAppSelector } from '@/stores/Store';
import { clearCart } from '@/stores/slices/cartSlice';
import { ROUTES } from '@/constants/router';
import styles from './styles.module.scss';

interface Address { id: number; fullName: string; phoneNumber: string; province: string; district: string; ward: string; detail: string; isDefault: boolean }
interface PaymentMethod { id: number; name: string; description?: string }

const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.cart);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  // form reserved for future use
  const [addrForm] = Form.useForm();

  const subtotal = items.reduce((s, i) => s + i.item.price * i.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shipping - couponDiscount;

  useEffect(() => {
    if (items.length === 0) navigate(ROUTES.CART);
    const fetchData = async () => {
      const [addrRes, pmRes] = await Promise.all([
        addressApi.getMyAddresses().catch(() => ({ data: { data: [] } })),
        paymentMethodApi.getList().catch(() => ({ data: { data: [] } })),
      ]);
      const addrList: Address[] = addrRes.data?.data?.data || [];
      const pmList: PaymentMethod[] = pmRes.data?.data || [];
      setAddresses(addrList);
      setPaymentMethods(pmList);
      const def = addrList.find((a) => a.isDefault) || addrList[0];
      if (def) setSelectedAddress(def.id);
      if (pmList[0]) setSelectedPayment(pmList[0].id);
    };
    fetchData();
  }, []);

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await couponApi.validate(couponCode);
      const coupon = res.data?.data;
      if (coupon) {
        const discount = coupon.type === 'PERCENT'
          ? subtotal * (coupon.value / 100)
          : coupon.value;
        setCouponDiscount(Math.min(discount, subtotal));
        message.success(`Áp dụng mã giảm giá thành công! Giảm ${formatPrice(discount)}`);
      }
    } catch {
      message.error('Mã giảm giá không hợp lệ hoặc đã hết hạn');
      setCouponDiscount(0);
    } finally {
      setCouponLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) { message.warning('Vui lòng chọn địa chỉ giao hàng'); return; }
    if (!selectedPayment) { message.warning('Vui lòng chọn phương thức thanh toán'); return; }
    setLoading(true);
    try {
      await cartApi.checkout({
        cartIds: items.map((i) => i.id),
        addressId: selectedAddress,
        paymentMethodId: selectedPayment,
        couponCode: couponCode || undefined,
      });
      dispatch(clearCart());
      message.success('Đặt hàng thành công!');
      navigate(ROUTES.ORDERS);
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Đặt hàng thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (values: AddressPayload) => {
    try {
      await addressApi.create(values);
      const res = await addressApi.getMyAddresses();
      const addrList: Address[] = res.data?.data || [];
      setAddresses(addrList);
      setAddressModal(false);
      addrForm.resetFields();
      message.success('Thêm địa chỉ thành công');
    } catch {
      message.error('Không thể thêm địa chỉ');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Thanh toán</h1>

        <div className={styles.layout}>
          {/* Left */}
          <div className={styles.left}>
            {/* Address */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Địa chỉ giao hàng</h3>
                <button type="button" className={styles.addBtn} onClick={() => setAddressModal(true)}>
                  <PlusOutlined /> Thêm địa chỉ
                </button>
              </div>
              {addresses.length === 0 ? (
                <p className={styles.noAddress}>Bạn chưa có địa chỉ nào. <button type="button" onClick={() => setAddressModal(true)}>Thêm ngay</button></p>
              ) : (
                <Radio.Group value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} className={styles.addressGroup}>
                  {addresses.map((addr) => (
                    <Radio key={addr.id} value={addr.id} className={styles.addressOption}>
                      <div className={styles.addressCard}>
                        <div className={styles.addressName}>
                          {addr.fullName} — {addr.phoneNumber}
                          {addr.isDefault && <span className={styles.defaultTag}>Mặc định</span>}
                        </div>
                        <div className={styles.addressDetail}>
                          {addr.detail}, {addr.ward}, {addr.district}, {addr.province}
                        </div>
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              )}
            </div>

            {/* Payment */}
            <div className={styles.section}>
              <h3 className={styles.sectionHeader2}>Phương thức thanh toán</h3>
              <Radio.Group value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)} className={styles.paymentGroup}>
                {paymentMethods.map((pm) => (
                  <Radio key={pm.id} value={pm.id} className={styles.paymentOption}>
                    <div>
                      <strong>{pm.name}</strong>
                      {pm.description && <p className={styles.pmDesc}>{pm.description}</p>}
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            {/* Coupon */}
            <div className={styles.section}>
              <h3 className={styles.sectionHeader2}>Mã giảm giá</h3>
              <div className={styles.couponRow}>
                <Input
                  placeholder="Nhập mã giảm giá..."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  onPressEnter={handleValidateCoupon}
                />
                <Button onClick={handleValidateCoupon} loading={couponLoading} className={styles.couponBtn}>
                  Áp dụng
                </Button>
              </div>
              {couponDiscount > 0 && (
                <p className={styles.discountApplied}>
                  <CheckCircleFilled /> Giảm {formatPrice(couponDiscount)}
                </p>
              )}
            </div>
          </div>

          {/* Right - Summary */}
          <div className={styles.summary}>
            <h3 className={styles.summaryTitle}>Đơn hàng của bạn</h3>
            <div className={styles.orderItems}>
              {items.map((i) => (
                <div key={i.id} className={styles.orderItem}>
                  <div className={styles.orderItemImg}>
                    <img src={i.item.image || `https://placehold.co/60x60/F8F0E3/C8A000?text=Yến`} alt={i.item.name} />
                    <span className={styles.qty}>{i.quantity}</span>
                  </div>
                  <div className={styles.orderItemInfo}>
                    <span className={styles.orderItemName}>{i.item.name}</span>
                    <span className={styles.orderItemPrice}>{formatPrice(i.item.price)}</span>
                  </div>
                  <span className={styles.orderItemTotal}>{formatPrice(i.item.price * i.quantity)}</span>
                </div>
              ))}
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div className={styles.priceRows}>
              <div className={styles.priceRow}><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
              <div className={styles.priceRow}><span>Vận chuyển</span><span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span></div>
              {couponDiscount > 0 && (
                <div className={styles.priceRow}><span>Giảm giá</span><span className={styles.discount}>-{formatPrice(couponDiscount)}</span></div>
              )}
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div className={styles.totalRow}>
              <span>Tổng cộng</span>
              <span className={styles.totalPrice}>{formatPrice(total)}</span>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={handlePlaceOrder}
              loading={loading}
              className={styles.orderBtn}
            >
              Đặt hàng ngay
            </Button>

            <p className={styles.terms}>Bằng cách đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi.</p>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        title="Thêm địa chỉ mới"
        open={addressModal}
        onCancel={() => setAddressModal(false)}
        footer={null}
      >
        <Form form={addrForm} layout="vertical" onFinish={handleAddAddress}>
          <Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}>
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true }]}>
            <Input placeholder="0901234567" />
          </Form.Item>
          <Form.Item name="province" label="Tỉnh/Thành phố" rules={[{ required: true }]}>
            <Input placeholder="TP. Hồ Chí Minh" />
          </Form.Item>
          <Form.Item name="district" label="Quận/Huyện" rules={[{ required: true }]}>
            <Input placeholder="Quận 1" />
          </Form.Item>
          <Form.Item name="ward" label="Phường/Xã" rules={[{ required: true }]}>
            <Input placeholder="Phường Bến Nghé" />
          </Form.Item>
          <Form.Item name="detail" label="Địa chỉ chi tiết" rules={[{ required: true }]}>
            <Input placeholder="123 Nguyễn Huệ" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className={styles.couponBtn}>
            Lưu địa chỉ
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
