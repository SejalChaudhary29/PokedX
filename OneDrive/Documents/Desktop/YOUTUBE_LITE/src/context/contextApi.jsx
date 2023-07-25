import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
  const [loading, setloading] = useState(false);
  const [searchResults, setSearchResults] = useState(false);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);

  const fetchSelectedCategoryData = async (query) => {
    setloading(true);
    try {
      const res = await fetchDataFromApi(`search/?q=${query}`);
      console.log(res);
      // setSearchResults(res)
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <Context.Provider
      value={{
        loading,
        setloading,
        searchResults,
        setSearchResults,
        selectCategories,
        setSelectCategories,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
