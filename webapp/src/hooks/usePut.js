import {useReducer} from "./useReducer";
import {authApis} from "../api/Apis";

// Reducer xử lý các trạng thái POST
function postReducer(state, action) {
	switch (action.type) {
		case "putAPI/request":
			return {...state, isLoading: true, error: null};
		case "putAPI/success":
			return {...state, isLoading: false, data: action.data, error: null};
		case "putAPI/error":
			return {...state, isLoading: false, data: null, error: action.error};
		default:
			return state;
	}
}

export const usePut = () => {
	const [state, dispatch] = useReducer(postReducer, {
		data: null,
		isLoading: false,
		error: null,
	});

	const putData = async (url,body) => {
		dispatch({type: "putAPI/request"});

		try {
			const API = await authApis();

			const isFormData = body instanceof FormData;

			const config = isFormData
				? {} // Để axios tự set content-type cho FormData
				: {headers: {"Content-Type": "application/json"}};

			const res = await API.put(url, body, config);
			dispatch({type: "putAPI/success", data: res.data});

		} catch (err) {
			dispatch({type: "putAPI/error", error: err});
			console.error("putData error:", err);
		}
	};

	return {
		...state,
		putData,
	};
};


