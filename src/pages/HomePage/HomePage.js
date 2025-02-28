import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import Category from "../../components/Category/Category";
import ProductList from "../../components/ProductList/ProductList";
import SingleCategory from "../../components/SingleCategory/SingleCategory";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../store/categorySlice";
import "./HomePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: categories, status: categoryStatus } = useSelector(
    (state) => state.category
  );
  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );
  const {
    catProductSingle: productsByCategory,
    catProductAll: productsByCategoryAll,
    catProductAllStatus,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      dispatch(fetchProductsByCategory(categories[5].slug, "single"));
      dispatch(fetchProductsByCategory(categories[14].slug, "all"));
    }
  }, [categories, dispatch]);

  return (
    <div className="home-page">
      <Slider />
      <Category categories={categories} status={categoryStatus} />
      <ProductList products={products} status={productStatus} />
      <section>
        {productsByCategory.products && (
          <SingleCategory
            products={productsByCategory}
            status={catProductAllStatus}
          />
        )}
      </section>
      <section>
        {productsByCategory.products && (
          <SingleCategory
            products={productsByCategoryAll}
            status={catProductAllStatus}
          />
        )}
      </section>
    </div>
  );
};

export default HomePage;
