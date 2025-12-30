import React from "react";
import { Select } from "antd";

const SortSelect = ({ onChange, value }) => {
  return (
    <Select
      placeholder="Sırala"
      value={value || "newest"}
      style={{ width: 200 }}
      onChange={onChange}
      options={[
        { value: "newest", label: "En Yeniler" },
        { value: "price_asc", label: "Fiyat Artan" },
        { value: "price_desc", label: "Fiyat Azalan" },
        { value: "a_z", label: "İsim A-Z" },
        { value: "z_a", label: "İsim Z-A" },
        { value: "rating", label: "Ürün Puanı" },
      ]}
    />
  );
};

export default SortSelect;
