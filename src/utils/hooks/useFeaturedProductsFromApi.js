import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import { useLatestAPI } from "./useLatestAPI";

export function useFeaturedProductsFromApi() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [featuredProducts, setFeaturedfeaturedProducts] = useState(() => ({
    featuredProducts: [],
    featuredProductsAreLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedCategories() {
      try {
        setFeaturedfeaturedProducts({
          featuredProducts: [],
          featuredProductsAreLoading: true,
        });
        
        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "product")]]'
          )}&q=${encodeURIComponent(
            '[[at(document.tags, ["Featured"])]]'
          )}
          &lang=en-us&pageSize=16`,
          {
            signal: controller.signal,
          }
        );
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

        setFeaturedfeaturedProducts({
          featuredProducts: data,
          featuredProductsAreLoading: false,
        });
      } catch (err) {
        setFeaturedfeaturedProducts({
          featuredProducts: [],
          featuredProductsAreLoading: false,
        });
        console.error(err);
      }
    }

    getFeaturedCategories();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return featuredProducts;
}
