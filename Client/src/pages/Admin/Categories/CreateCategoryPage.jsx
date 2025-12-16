import { Button, Form, Input, Spin, message, Card, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kategori başarıyla oluşturuldu.");
        form.resetFields();
        navigate("/admin/categories");
      } else {
        const errorData = await response.json();
        message.error(
          errorData.message || "Kategori oluşturulurken bir hata oluştu."
        );
      }
    } catch (error) {
      console.error("Kategori oluşturma hatası:", error);
      message.error("Sunucuya bağlanılamadı veya ağ hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Kategori Oluştur"
      style={{ maxWidth: 600, margin: "20px auto" }}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          name="create-category"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Kategori Adı"
            name="name"
            rules={[
              {
                required: true,
                message: "Lütfen kategori adını girin!",
              },
            ]}
          >
            <Input placeholder="Kategori adı" />
          </Form.Item>

          <Form.Item
            label="Görsel URL'si"
            name="img"
            rules={[
              {
                required: true,
                message: "Lütfen kategori görsel linkini girin!",
              },
            ]}
          >
            <Input placeholder="Görsel linki" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Oluştur
              </Button>
              <Button onClick={() => navigate("/admin/categories")}>
                İptal
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default CreateCategoryPage;
