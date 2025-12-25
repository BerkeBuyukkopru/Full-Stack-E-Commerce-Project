import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { message, Spin } from "antd";
import CategoryItem from "../components/Categories/CategoryItem"; // Import CategoryItem
import "./CategoriesPage.css";
// We need to ensure the parent 'categories' class is present for styling to work, or import Categories.css if needed.
// Based on CategoryItem.css, styles differ if inside .categories.
// Let's assume we can add 'categories' class to the wrapper.

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [searchParams] = useSearchParams();
  const selectedGender = searchParams.get("gender");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/category`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
            message.error("Kategoriler yüklenirken hata oluştu.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const menCategories = categories.filter(c => c.gender === "Man" || c.gender === "Unisex");
  const womenCategories = categories.filter(c => c.gender === "Woman" || c.gender === "Unisex");

  if (loading) return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;

  return (
    <div className="categories-page container categories"> {/* Added 'categories' class for styling */}
      {(!selectedGender || selectedGender === "Man") && (
        <div className="gender-section">
          <h2 className="section-title">Erkek</h2>
          <ul className="category-list"> {/* Used ul.category-list to match Homepage structure */}
            {menCategories.map(item => (
              <CategoryItem 
                key={item._id || item.id} 
                category={item}
                forceLink={`/shop?gender=Man&categoryId=${item._id || item.id}`}
              />
            ))}
          </ul>
        </div>
      )}

      {!selectedGender && <div className="gender-divider"></div>}

      {(!selectedGender || selectedGender === "Woman") && (
        <div className="gender-section">
          <h2 className="section-title">Kadın</h2>
           <ul className="category-list">
            {womenCategories.map(item => (
              <CategoryItem 
                key={item._id || item.id} 
                category={item}
                forceLink={`/shop?gender=Woman&categoryId=${item._id || item.id}`}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
