import { useState, useEffect } from "react";
import API_BASE_URL from "../constants";
import useLatestAPI from "./useLatestAPI";

export default function useFilterBySearchTextFromApi(query, page) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [filteredProductsData, setFilteredProducts] = useState(() => ({
    filteredProductsData: {},
    filteredProductsAreLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFilteredProducts() {
      try {
        setFilteredProducts({
          filteredProductsData: {},
          filteredProductsAreLoading: true,
        });

        let apiUrl = `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
          '[[at(document.type, "product")]]'
        )}&q=${encodeURIComponent(`[[fulltext(document, "${query}")]]`)}
&lang=en-us&pageSize=20`;

        apiUrl = page ? `${apiUrl}&page=${page}` : `${apiUrl}&page=1`;

        const response = await fetch(apiUrl, {
          signal: controller.signal,
        });
        const jsonResult = await response.json();

        const data = jsonResult.results.map((product) => ({
          id: product.id,
          name: product.data.name,
          url: product.data.mainimage.url,
          price: product.data.price,
          categoryId: product.data.category.id,
          stock: product.data.stock,
        }));

        jsonResult.results = data;

        setFilteredProducts({
          filteredProductsData: jsonResult,
          filteredProductsAreLoading: false,
        });
      } catch (err) {
        setFilteredProducts({
          filteredProductsData: {},
          filteredProductsAreLoading: false,
        });
        // console.error(err);
      }
    }

    getFilteredProducts();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, query, page]);

  return filteredProductsData;
}
