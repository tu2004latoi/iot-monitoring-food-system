import { useEffect, useState } from "react";
import { endpoints } from "../api/Apis";
import { useFetch } from "./useFetch";
import { usePost } from "./usePost";
import { usePut } from "./usePut";

export const useProducts = () => {
  const { data: productData, error: fetchError } = useFetch(endpoints.products);
  const {
    isLoading,
    error: postError,
    postData,
  } = usePost(endpoints.productAdd);
  const { data: catesData, error: fetchError1 } = useFetch(
    endpoints.categories
  );
  const { data: unitsData, error: fetchError2 } = useFetch(endpoints.units);
  const { error: putError, putData } = usePut();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);
  useEffect(() => {
    if (catesData) {
      setCategories(catesData);
    }
    if (unitsData) {
      setUnits(unitsData);
    }
  }, [catesData, unitsData]);

  if (fetchError || postError || fetchError1 || fetchError2 || putError) {
    console.error(fetchError || postError);
    return {
      products: [],
      addProduct: () => {},
      updateProduct: () => {},
      deleteProduct: () => {},
      error: true,
    };
  }

  const addProduct = async (productData) => {
    const formData = new FormData();

    formData.append("productName", productData.productName);
    formData.append("userId", 1);
    formData.append("categoryId", productData.categoryId);
    formData.append("expiryDate", productData.expiryDate); // dạng yyyy-MM-dd
    formData.append("detectedAt", productData.detectedAt); // dạng yyyy-MM-ddTHH:mm:ss
    formData.append("unitId", productData.unitId);
    formData.append("quantity", productData.quantity);
    formData.append("notes", productData.notes);
    formData.append("status", productData.status);
    formData.append("file", productData.file); // Đây phải là File từ input type="file"

    const response = await postData(formData);
    response.categoryId = response.category.categoryId;
    response.unitId = response.unit.unitId;
    setProducts((prev) => [...prev, response]);
  };

  const updateProduct = async (productData) => {
    if (productData === null) {
      return;
    }
    const formData = new FormData();
    formData.append("productId", productData.productId);
    formData.append("productName", productData.productName);
    formData.append("userId", 1);
    formData.append("categoryId", productData.categoryId);
    formData.append("expiryDate", productData.expiryDate); // dạng yyyy-MM-dd
    formData.append("detectedAt", productData.detectedAt); // dạng yyyy-MM-ddTHH:mm:ss
    formData.append("unitId", productData.unitId);
    formData.append("quantity", productData.quantity);
    formData.append("notes", productData.notes);
    formData.append("status", productData.status);
    formData.append("file", productData.file);

    const data = await putData(
      endpoints.productUpdate(productData.productId),
      formData
    );
    data.categoryId = data.category.categoryId;
    data.unitId = data.unit.unitId;
    // Cập nhật sản phẩm trong danh sách
    setProducts((prev) =>
      prev.map((p) => (p.productId === data.productId ? data : p))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.productId !== productId));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    units,
    isLoading,
  };
};
