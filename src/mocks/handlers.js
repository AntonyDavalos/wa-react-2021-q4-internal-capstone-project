import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search",
    (req, res, ctx) => {
      let selector = "none";

      if (req.url.href.includes("%22banner%22")) {
        selector = "banner";
      }

      if (req.url.href.includes("%22category%22")) {
        selector = "category";
      }

      if (req.url.href.includes("%22Featured%22")) {
        selector = "featured";
      }

      if (req.url.href.includes("my.product.category")) {
        selector = "filtered-products";
      }

      if (
        !req.url.href.includes("%22Featured%22") &&
        !req.url.href.includes("fulltext") &&
        req.url.href.includes("%22product%22")
      ) {
        selector = "all-products";
      }

      if (req.url.href.includes("fulltext")) {
        selector = "search";
      }

      if (req.url.href.includes("document.id")) {
        selector = "product";
      }
      switch (selector) {
        // Handles Banners request
        case "banner":
          return res(ctx.json(returnBanners()));
        case "category":
          return res(ctx.json(returnCategories()));
        case "featured":
          return res(ctx.json(returnFeaturedProducts()));
        case "all-products":
          const page = req.url.searchParams.get("page");
          return res(ctx.json(returnProductsList(page)));
        case "filtered-products":
          return res(ctx.json(returnFilteredProducts()));
        case "search":
          if (req.url.href.includes("%22nothing%22")) {
            return res(ctx.json({}));
          } else {
            return res(ctx.json(returnSearchedProducts()));
          }
        case "product":
          return res(ctx.json(returnProduct()));
        default:
          return res(
            ctx.json({
              results: [{}],
            })
          );
          break;
      }
    }
  ),
  rest.get(
    "https://wizeline-academy.cdn.prismic.io/api/v2",
    (req, res, ctx) => {
      return res(
        ctx.json({
          refs: [
            {
              ref: "YZaBvBIAACgAvnOP",
            },
          ],
        })
      );
    }
  ),
];

function returnBanners() {
  return {
    results: [
      {
        data: {
          title: "banner 1 title",
          description: [
            {
              type: "paragraph",
              text: "banner 1 description",
              spans: [],
            },
          ],
          main_image: {
            alt: "banner 1",
            url: "https://img-1.jpg",
          },
        },
      },
      {
        data: {
          title: "banner 2 title",
          description: [
            {
              type: "paragraph",
              text: "banner 2 description",
              spans: [],
            },
          ],
          main_image: {
            alt: "banner 2",
            url: "https://img-2.jpg",
          },
        },
      },
      {
        data: {
          title: "banner 3 title",
          description: [
            {
              type: "paragraph",
              text: "banner 3 description",
              spans: [],
            },
          ],
          main_image: {
            alt: "banner 3",
            url: "https://img-3.jpg",
          },
        },
      },
    ],
  };
}

function returnCategories() {
  return {
    results: [
      {
        id: "1",
        slugs: ["category-1"],
        data: {
          name: "Category 1",
          main_image: {
            url: "https://category-1.jpg",
          },
        },
      },
      {
        id: "2",
        slugs: ["category-2"],
        data: {
          name: "Category 2",
          main_image: {
            url: "https://category-2.jpg",
          },
        },
      },
      {
        id: "3",
        slugs: ["category-3"],
        data: {
          name: "Category 3",
          main_image: {
            url: "https://category-3.jpg",
          },
        },
      },
    ],
  };
}

function returnFeaturedProducts() {
  return {
    results: [
      {
        id: "1",
        data: {
          name: "Product 1",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-1.jpg",
          },
          stock: 5,
          price: 1,
        },
      },
      {
        id: "2",
        data: {
          name: "Product 2",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-2.jpg",
          },
          stock: 2,
          price: 2,
        },
      },
      {
        id: "3",
        data: {
          name: "Product 3",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-3.jpg",
          },
          stock: 3,
          price: 3,
        },
      },
      {
        id: "4",
        data: {
          name: "Product 4",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-4.jpg",
          },
          stock: 4,
          price: 4,
        },
      },
      {
        id: "5",
        data: {
          name: "Product 5",
          category: {
            id: "3",
          },
          mainimage: {
            url: "https://product-5.jpg",
          },
          stock: 5,
          price: 5,
        },
      },
    ],
  };
}

function returnFilteredProducts() {
  return {};
}

function returnProductsList(page) {
  return {
    page: Number(page),
    results_per_page: 12,
    results_size: 12,
    total_results_size: 88,
    total_pages: 8,
    results: [
      {
        id: "1",
        data: {
          name: "Product 1",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-1.jpg",
          },
          stock: 1,
          price: 1,
        },
      },
      {
        id: "2",
        data: {
          name: "Product 2",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-2.jpg",
          },
          stock: 2,
          price: 2,
        },
      },
      {
        id: "3",
        data: {
          name: "Product 3",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-3.jpg",
          },
          stock: 3,
          price: 3,
        },
      },
      {
        id: "4",
        data: {
          name: "Product 4",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-4.jpg",
          },
          stock: 4,
          price: 4,
        },
      },
      {
        id: "5",
        data: {
          name: "Product 5",
          category: {
            id: "3",
          },
          mainimage: {
            url: "https://product-5.jpg",
          },
          stock: 5,
          price: 5,
        },
      },
      {
        id: "6",
        data: {
          name: "Product 6",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-6.jpg",
          },
          stock: 6,
          price: 6,
        },
      },
      {
        id: "7",
        data: {
          name: "Product 7",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-7.jpg",
          },
          stock: 4,
          price: 4,
        },
      },
      {
        id: "8",
        data: {
          name: "Product 8",
          category: {
            id: "3",
          },
          mainimage: {
            url: "https://product-8.jpg",
          },
          stock: 8,
          price: 8,
        },
      },
    ],
  };
}

function returnProduct() {
  return {
    results: [
      {
        id: "1",
        tags: ["Tag 1", "Tag 2", "Tag 3"],
        data: {
          name: "Product 1",
          sku: "123",
          category: {
            id: "1",
          },
          mainimage: {
            dimensions: {
              width: 696,
              height: 900,
            },
            alt: "Product 1",
            copyright: null,
            url: "https://product-1.jpg",
          },
          short_description: "Flavour Text Product 1",

          specs: [
            {
              spec_name: "Spec 1",
              spec_value: "Spec 1 Description",
            },
            {
              spec_name: "Spec 2",
              spec_value: "Spec 2 Description",
            },
          ],
          images: [
            {
              image: {
                dimensions: {
                  width: 696,
                  height: 900,
                },
                alt: null,
                copyright: null,
                url: "https://product-1.jpg",
              },
            },
          ],
          stock: 1,
          price: 40,
        },
      },
    ],
  };
}

function returnSearchedProducts() {
  return {
    page: 1,
    results_per_page: 12,
    results_size: 12,
    total_results_size: 88,
    total_pages: 8,
    results: [
      {
        id: "1",
        data: {
          name: "Product 1",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-1.jpg",
          },
          stock: 1,
          price: 1,
        },
      },
      {
        id: "2",
        data: {
          name: "Product 2",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-2.jpg",
          },
          stock: 2,
          price: 2,
        },
      },
      {
        id: "3",
        data: {
          name: "Product 3",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-3.jpg",
          },
          stock: 3,
          price: 3,
        },
      },
      {
        id: "4",
        data: {
          name: "Product 4",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-4.jpg",
          },
          stock: 4,
          price: 4,
        },
      },
      {
        id: "5",
        data: {
          name: "Product 5",
          category: {
            id: "3",
          },
          mainimage: {
            url: "https://product-5.jpg",
          },
          stock: 5,
          price: 5,
        },
      },
      {
        id: "6",
        data: {
          name: "Product 6",
          category: {
            id: "2",
          },
          mainimage: {
            url: "https://product-6.jpg",
          },
          stock: 6,
          price: 6,
        },
      },
      {
        id: "7",
        data: {
          name: "Product 7",
          category: {
            id: "1",
          },
          mainimage: {
            url: "https://product-7.jpg",
          },
          stock: 4,
          price: 4,
        },
      },
      {
        id: "8",
        data: {
          name: "Product 8",
          category: {
            id: "3",
          },
          mainimage: {
            url: "https://product-8.jpg",
          },
          stock: 8,
          price: 8,
        },
      },
    ],
  };
}
