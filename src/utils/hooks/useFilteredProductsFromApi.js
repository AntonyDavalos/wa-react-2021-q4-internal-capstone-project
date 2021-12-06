import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import { useLatestAPI } from "./useLatestAPI";

export function useFilteredProductsFromApi(query, page) {
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

        const responseCategories = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "category")]]'
          )}
          &lang=en-us&pageSize=30`,
          {
            signal: controller.signal,
          }
        );
        let jsonResultCategories = await responseCategories.json();

        let categoriesIds = [];

        if (query) {
          categoriesIds = jsonResultCategories.results
            .filter((category) => query.includes(category.slugs[0]))
            .map((category) => {
              return `"${category.id}"`;
            });
        }

        let apiUrl =
          categoriesIds.length > 0
            ? `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
                `[[any(my.product.category, [${categoriesIds}])]]`
              )}
    &lang=en-us&pageSize=12`
            : `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
                '[[at(document.type, "product")]]'
              )}
&lang=en-us&pageSize=12`;

        apiUrl = page ? apiUrl + `&page=${page}` : apiUrl + `&page=1`;

        const response = await fetch(apiUrl, {
          signal: controller.signal,
        });
        //&page={page} permite poner numero de hoja
        let jsonResult = await response.json();

        const data = jsonResult.results.map((product) => {
          return {
            id: product.id,
            name: product.data.name,
            url: product.data.mainimage.url,
            price: product.data.price,
            categoryId: product.data.category.id,
          };
        });

        console.log(data);

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
        console.error(err);
      }
    }

    getFilteredProducts();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, query, page]);

  return filteredProductsData;
}
