import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import { useLatestAPI } from "./useLatestAPI";

export function useFeaturedBanners() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [featuredBanners, setFeaturedBanners] = useState(() => ({
    banners: [],
    bannersAreLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedBanners() {
      try {
        setFeaturedBanners({ banners: [], bannersAreLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "banner")]]'
          )}&lang=en-us&pageSize=5`,
          {
            signal: controller.signal,
          }
        );
        let jsonResult = await response.json(); 

        const data = jsonResult.results.map((banner) => {
          return {
            title: banner.data.title,
            description: banner.data.description[0].text,
            image: banner.data.main_image.url,
          };
        });

        setFeaturedBanners({ banners: data, bannersAreLoading: false });
      } catch (err) {
        setFeaturedBanners({ banners: [], bannersAreLoading: false });
        console.error(err);
      }
    }

    getFeaturedBanners();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return featuredBanners;
}
