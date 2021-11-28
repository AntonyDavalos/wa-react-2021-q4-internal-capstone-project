import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import { useLatestAPI } from "./useLatestAPI";

export function useCategoriesFromApi() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [featuredCategories, setFeaturedCategories] = useState(() => ({
    categories: [],
    categoriesAreLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedCategories() {
      try {
        setFeaturedCategories({ categories: [], categoriesAreLoading: true });
        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "category")]]'
          )}
          &lang=en-us&pageSize=30`,
          {
            signal: controller.signal,
          }
        );
        let jsonResult = await response.json();

        const data = jsonResult.results.map((category) => {
          return {
            name: category.data.name,
            id: category.id,
            url: category.data.main_image.url,
            selected: false,
          };
        });

        setFeaturedCategories({ categories: data, categoriesAreLoading: false });
      } catch (err) {
        setFeaturedCategories({ categories: [], categoriesAreLoading: false });
        console.error(err);
      }
    }

    getFeaturedCategories();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return featuredCategories;
}
