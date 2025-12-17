import { Button, Form, Input, Spin, message, Card, Space, InputNumber } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kupon başarıyla oluşturuldu.");
        form.resetFields();
        navigate("/admin/coupons");
      } else {
        const errorData = await response.json();
        message.error(
          errorData.message || "Kupon oluşturulurken bir hata oluştu."
        );
      }
    } catch (error) {
      console.error("Kupon oluşturma hatası:", error);
      message.error("Sunucuya bağlanılamadı veya ağ hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Kupon Oluştur" style={{ maxWidth: 600, margin: "20px auto" }}>
      <Spin spinning={loading}>
        <Form
          form={form}
          name="create-coupon"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Kupon Kodu"
            name="code"
            rules={[
              {
                required: true,
                message: "Lütfen Kupon kodunu girin!",
              },
            ]}
          >
          <Input placeholder="Kupon Kodu" />
          </Form.Item>
          <Form.Item
            label="Kupon İndirim Oranı"
            name="discountPercent"
            rules={[
              {
                required: true,
                message: "Lütfen bir kupon indirim oranı girin!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Oluştur
              </Button>
              <Button onClick={() => navigate("/admin/coupons")}>İptal</Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default CreateCouponPage;
