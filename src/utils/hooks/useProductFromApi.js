import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants";
import { useLatestAPI } from "./useLatestAPI";

export function useProductFromApi(productId) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [foundProduct, setFoundProduct] = useState(() => ({
    productData: {},
    productIsLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFoundProduct() {
      try {
        setFoundProduct({ productData: {}, productIsLoading: true });
        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            `[[at(document.id, "${productId}")]]`
          )}`,
          {
            signal: controller.signal,
          }
        );
        let jsonResult = await response.json();

        const data = jsonResult.results.map((product) => {
          return {
            id: product.id,
            sku: product.data.sku,
            name: product.data.name,
            url: product.data.mainimage.url,
            price: product.data.price,
            categoryId: product.data.category.id,
            tags: product.tags,
            flavourText: product.data.short_description,
            specs: product.data.specs,
            gallery: product.data.images,
            stock: product.data.stock
          };
        });

        jsonResult.results = data;
        
        setFoundProduct({ productData: jsonResult, productIsLoading: false });
      } catch (err) {
        setFoundProduct({ productData: {}, productIsLoading: false });
        console.error(err);
      }
    }

    getFoundProduct();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, productId]);

  return foundProduct;
}
