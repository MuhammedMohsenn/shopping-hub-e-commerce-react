import React, { useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../../store/categorySlice";
import { useParams, Link } from "react-router-dom";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { catProductSingle: products, catProductSingleStatus: status } =
    useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProductsByCategory(slug, "single"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    dispatch(fetchProductsByCategory(slug, "single"));
  }, [slug, dispatch]);

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb">
          <ul className="breadcrumb-items flex">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home"></i>
                <span className="breadcrumb-separator">
                  <i className="fas fa-chevron-right"></i>
                </span>
              </Link>
            </li>
            <li>
              Category
              <span className="breadcrumb-separator">
                <i className="fas fa-chevron-right"></i>
              </span>
            </li>
            <li>{products.length > 0 ? slug : slug}</li>
          </ul>
        </div>
      </div>
      <ProductList products={products} status={status} />
    </div>
  );
};

export default CategoryPage;
