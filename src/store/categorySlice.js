import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    catProductAll: [],
    catProductAllStatus: STATUS.IDLE,
    catProductSingle: [],
    catProductSingleStatus: STATUS.IDLE,
  },

  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCategoriesProductAll(state, action) {
      state.catProductAll = action.payload;
    },
    setCategoriesStatusAll(state, action) {
      state.catProductAllStatus = action.payload;
    },
    setCategoriesProductSingle(state, action) {
      state.catProductSingle = action.payload;
    },
    setCategoriesStatusSingle(state, action) {
      state.catProductSingleStatus = action.payload;
    },
  },
});

export const {
  setCategories,
  setStatus,
  setCategoriesProductAll,
  setCategoriesStatusAll,
  setCategoriesProductSingle,
  setCategoriesStatusSingle,
} = categorySlice.actions;

export default categorySlice.reducer;

// Fetch categories list
export const fetchCategories = () => {
  return async function fetchCategoryThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await fetch(`${BASE_URL}products/categories`);
      const data = await response.json();
      dispatch(setCategories(data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

// Fetch products by category (single or all)
// export const fetchProductsByCategory = (categoryName, dataType) => {
//   return async function fetchCategoryProductThunk(dispatch) {
//     if (dataType === "all") dispatch(setCategoriesStatusAll(STATUS.LOADING));
//     if (dataType === "single")
//       dispatch(setCategoriesStatusSingle(STATUS.LOADING));

//     try {
//       const response = await fetch(
//         `${BASE_URL}products/category/${categoryName}`
//       );
//       const data = await response.json();
//       console.log("API response:", data);

//       if (dataType === "all") {
//         dispatch(setCategoriesProductAll(data.products.slice(0, 10))); // Fix: `data.products`
//         dispatch(setCategoriesStatusAll(STATUS.IDLE));
//       }

//       if (dataType === "single") {
//         dispatch(setCategoriesProductSingle(data.products.slice(0, 20))); // Fix: `data.products`
//         dispatch(setCategoriesStatusSingle(STATUS.IDLE));
//       }
//     } catch (error) {
//       console.error(
//         `Error fetching products for category: ${categoryName}`,
//         error
//       );

//       if (dataType === "all") dispatch(setCategoriesStatusAll(STATUS.ERROR));
//       if (dataType === "single")
//         dispatch(setCategoriesStatusSingle(STATUS.ERROR));
//     }
//   };
// };

export const fetchProductsByCategory = (categoryName, dataType) => {
  return async function fetchCategoryProductThunk(dispatch) {
    if (dataType === "single") {
      dispatch(setCategoriesStatusSingle(STATUS.LOADING));
    } else if (dataType === "all") {
      dispatch(setCategoriesStatusAll(STATUS.LOADING));
    }

    try {
      const response = await fetch(
        `${BASE_URL}products/category/${categoryName}`
      );
      const data = await response.json();

      if (dataType === "single") {
        dispatch(setCategoriesProductSingle(data));
        dispatch(setCategoriesStatusSingle(STATUS.IDLE));
      } else if (dataType === "all") {
        dispatch(setCategoriesProductAll(data));
        dispatch(setCategoriesStatusAll(STATUS.IDLE));
      }
    } catch (error) {
      console.error("Error fetching category products:", error);

      if (dataType === "single") {
        dispatch(setCategoriesStatusSingle(STATUS.ERROR));
      } else if (dataType === "all") {
        dispatch(setCategoriesStatusAll(STATUS.ERROR));
      }
    }
  };
};
