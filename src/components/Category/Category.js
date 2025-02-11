import React from "react";
import { STATUS } from "../../utils/status";
import "./Category.scss";
import { Link } from "react-router-dom";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../../store/categorySlice";

const categoryImages = {
  "kitchen-accessories": "categoriesImgs/blender.png",
  laptops: "categoriesImgs/laptop.png",
  "mens-shirts": "categoriesImgs/men.png",
  "mens-shoes": "categoriesImgs/shoes.png",
  "mens-watches": "categoriesImgs/watches.png",
};

const Category = ({ categories, status }) => {
  const dispatch = useDispatch();
  const handleCategoryClick = (category) => {
    dispatch(fetchProductsByCategory(category));
  };

  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;

  return (
    <section className="categories py-5 bg-ghost-white" id="categories">
      <div className="container">
        <div className="categories-content">
          <div className="section-title">
            <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
              Category
            </h3>
          </div>
          <div className="category-items grid">
            {categories.slice(5, 10).map((category, index) => (
              <Link
                to={`/category/${category.slug}`}
                key={index}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="category-item">
                  <div className="category-item-img">
                    <img
                      src={categoryImages[category.slug]}
                      alt={category.name}
                    />
                  </div>
                  <div className="category-item-name text-center">
                    <h6 className="fs-20">{category.name}</h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
