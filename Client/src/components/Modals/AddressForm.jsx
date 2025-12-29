import { Form, Input, Button, message } from "antd";
import { useEffect } from "react";

const AddressForm = ({ onSuccess, editingAddress, setEditingAddress }) => {
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Populate form when editingAddress changes
  useEffect(() => {
    if (editingAddress) {
        form.setFieldsValue(editingAddress);
    } else {
        form.resetFields();
    }
  }, [editingAddress, form]);

  const onFinish = async (values) => {
    try {
        const method = editingAddress ? "PUT" : "POST";
        const body = editingAddress ? { ...values, id: editingAddress.id } : values;

      const response = await fetch(`${apiUrl}/address`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (response.ok) {
        message.success(editingAddress ? "Adres güncellendi." : "Adres başarıyla eklendi.");
        form.resetFields();
        if (setEditingAddress) setEditingAddress(null); // Clear edit mode
        if (onSuccess) onSuccess();
      } else {
        message.error("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Adres ekleme hatası:", error);
      message.error("Bir hata oluştu.");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Adres Başlığı"
        rules={[{ required: true, message: "Lütfen adres başlığı girin!" }]}
      >
        <Input placeholder="Örn: Ev, İş" />
      </Form.Item>
      <div style={{ display: "flex", gap: "10px" }}>
        <Form.Item
          name="name"
          label="Ad"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Lütfen adınızı girin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Soyad"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Lütfen soyadınızı girin!" }]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item
        name="phone"
        label="Telefon"
        rules={[{ required: true, message: "Lütfen telefon numaranızı girin!" }]}
      >
        <Input type="tel" />
      </Form.Item>

      <div style={{ display: "flex", gap: "10px" }}>
        <Form.Item
          name="city"
          label="İl"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Lütfen il girin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="district"
          label="İlçe"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "Lütfen ilçe girin!" }]}
        >
          <Input />
        </Form.Item>
      </div>

      <Form.Item
        name="neighborhood"
        label="Mahalle"
        rules={[{ required: true, message: "Lütfen mahalle girin!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="addressDetail"
        label="Adres Detayı"
        rules={[{ required: true, message: "Lütfen adres detayı girin!" }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
        {editingAddress ? "Adresi Güncelle" : "Adres Ekle"}
      </Button>
      {editingAddress && (
          <Button 
            className="w-full mt-2" 
            onClick={() => { 
                setEditingAddress(null); 
                form.resetFields(); 
            }}
          >
            Vazgeç
          </Button>
      )}
    </Form>
  );
};

export default AddressForm;
