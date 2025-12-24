import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { message, Spin } from "antd";
import "./CategoriesPage.css";

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
    <div className="categories-page container">
      {(!selectedGender || selectedGender === "Man") && (
        <div className="gender-section">
          <h2 className="section-title">Erkek</h2>
          <div className="category-grid">
            {menCategories.map(item => (
              <Link 
                  to={`/shop?gender=Man&categoryId=${item._id || item.id}`} 
                  key={item._id || item.id} 
                  className="category-card"
              >
                <img src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!selectedGender && <div className="gender-divider"></div>}

      {(!selectedGender || selectedGender === "Woman") && (
        <div className="gender-section">
          <h2 className="section-title">Kadın</h2>
          <div className="category-grid">
            {womenCategories.map(item => (
              <Link 
                  to={`/shop?gender=Woman&categoryId=${item._id || item.id}`} 
                  key={item._id || item.id} 
                  className="category-card"
              >
                <img src={item.img} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
