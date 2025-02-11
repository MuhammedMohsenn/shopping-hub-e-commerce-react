import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalVisible, setModalData } from "../../store/modalSlice";
import "../ProductList/ProductList.scss";
import SingleProduct from "../SingleProduct/SingleProduct";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector((state) => state.modal);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const filteredResults = data.products.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchAllProducts();
    }
  }, [query]);

  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="search-results py-5 bg-ghost-white">
      <div className="container">
        <div className="section-title">
          <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
            Search Results for "{query}"
          </h3>
        </div>
        {isModalVisible && <SingleProduct />}
        {results.length > 0 ? (
          <div className="product-items grid">
            {results.map((product, index) => (
              <div
                className="product-item"
                key={index}
                onClick={() => viewModalHandler(product)}
              >
                <div className="product-item-img bg-white">
                  <img src={product.images[0]} alt={product.title} />
                  <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">
                    {product.category}
                  </div>
                </div>
                <div className="product-item-body">
                  <h6 className="product-item-title text-pine-green fw-4 fs-15">
                    {product.title}
                  </h6>
                  <div className="product-item-price text-regal-blue fw-7 fs-18">
                    ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="section-title">
            <h3 className="text-uppercase fw-5 text-regal-blue ls-1">
              No Results found for "{query}"
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
