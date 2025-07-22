import { useState } from "react";
import { endpoints } from "../api/Apis"
import { usePost } from "./usePost";

export const useCategories =() =>{
  const {data : cateData, error: err } = useFetch (endpoints.categories);
  
  const [categories, setCategories] = useState([]);
  const {isLoading, error: postErr, postData} = usePost(endpoints.categoryAdd);
  const { error: putError, putData } = usePut(endpoints.categories);
  useEffect (()=>{ 
    if (cateData){
      setCategories(cateData)
    }
  }, [cateData])

  if(err){
    return {
      categories:[],
      addCates:() =>{},
      updateCates: ()=>{},
      deleteCates: () => {},
      err:true,
    }
  }
  const addCates = async (cateData) => {
    try{

      await postData(cateData);
      const data = await Apis.get(endpoints.categories);
      setCategories(data.data);

    } catch {
    }
  };

  const updateCates = async (cateData) => {
    try{
      if(cateData===null) return;

      await putData(cateData);
      const data = await Apis.get(endpoints.);
      setCategories(data.data);

    } catch {
    }
  };
}
