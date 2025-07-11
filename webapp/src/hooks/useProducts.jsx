import { useEffect, useState } from "react";
import { endpoints } from "../api/Apis";
import { useFetch } from "./useFetch";
import { usePost } from "./usePost";

export const useProducts = () => {
	const { data: productData, error: fetchError } = useFetch(endpoints.products);
	const { isLoading, error: postError, postData } = usePost(endpoints.productAdd);
	const { data: catesData, error: fetchError1 } = useFetch(endpoints.categories);
	const { data: unitsData, error: fetchError2 } = useFetch(endpoints.units);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [units, setUnits]= useState([]);

	useEffect(() => {
		if (productData) {
			setProducts(productData);
		}
	}, [productData]);
	useEffect(()=> {
		if (catesData){
			setCategories(catesData)
		}
		if (unitsData){
			setUnits(unitsData)
		}
	},[catesData, unitsData])

	if (fetchError || postError|| fetchError1|| fetchError2) {
		console.error(fetchError || postError);
		return {
			products: [],
			addProduct: () => { },
			updateProduct: () => { },
			deleteProduct: () => { },
			error: true
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
		for (const pair of formData.entries()) {
			console.log(`${pair[0]}:`, pair[1]);
		}
		const response = await postData(formData);
		setProducts(prev => [...prev, response]);
	};

	const updateProduct = (productData) => {
		setProducts(prev =>
			prev.map(p => p.productId === productData.productId ? productData : p)
		);
	};

	const deleteProduct = (productId) => {
		setProducts(prev => prev.filter(p => p.productId !== productId));
	};

	// const categories = products
	// 	.map(p => p.category)
	// 	.filter(Boolean)
	// 	.filter((cat, index, self) =>
	// 		index === self.findIndex(c => c.categoryId === cat.categoryId)
	// 	);
	//
	// const units = products
	// 	.map(p => p.unit)
	// 	.filter(Boolean)
	// 	.filter((unit, index, self) =>
	// 		index === self.findIndex(u => u.unitId === unit.unitId)
	// 	);



	return {
		products,
		addProduct,
		updateProduct,
		deleteProduct,
		categories,
		units,
		isLoading
	};
};

