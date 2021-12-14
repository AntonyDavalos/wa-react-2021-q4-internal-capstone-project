import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://wizeline-academy.cdn.prismic.io/api/v2/documents/search",
    (req, res, ctx) => {
      console.log("search");
      return res(
        ctx.status(200),
        ctx.json([
          {
            title: "banner 1",
            description: "description 1",
            image: "https://image1.jpg",
          },
          {
            title: "banner 2",
            description: "description 2",
            image: "https://image2.jpg",
          },
          {
            title: "banner 3",
            description: "description 3",
            image: "https://image3.jpg",
          },
        ])
      );
    }
  ),
  // Handles banners request
  rest.get(
    "https://wizeline-academy.cdn.prismic.io/api/v2",
    (req, res, ctx) => {
      console.log("v2");
      return res(ctx.status(200), ctx.json({ refs: [{  ref: 'test'}]}));
    }
  ),
];

// return banners
// return res(
//   ctx.json([
//     {
//       title: "banner 1",
//       description: "description 1",
//       image: "https://image1.jpg",
//     },
//     {
//       title: "banner 2",
//       description: "description 2",
//       image: "https://image2.jpg",
//     },
//     {
//       title: "banner 3",
//       description: "description 3",
//       image: "https://image3.jpg",
//     },
//   ])
// );
// return categories
// return res(
//   ctx.json([
//     {
//       name: "category 1",
//       slug: "category-1",
//       id: "1",
//       url: "https://category-1.jpg",
//       selected: false,
//     },
//     {
//       name: "category 2",
//       slug: "category-2",
//       id: "2",
//       url: "https://category-2.jpg",
//       selected: false,
//     },
//     {
//       name: "category 3",
//       slug: "category-3",
//       id: "3",
//       url: "https://category-3.jpg",
//       selected: false,
//     },
//   ])
// );
// // return featured products
// return res(
//   ctx.json([
//     {
//       id: "1",
//       name: "product 1",
//       url: "https;//product-1.jpg",
//       price: "1.00",
//       categoryId: "1",
//       stock: "1",
//     },
//     {
//       id: "2",
//       name: "product 2",
//       url: "https;//product-2.jpg",
//       price: "2.00",
//       categoryId: "2",
//       stock: "2",
//     },
//     {
//       id: "3",
//       name: "product 3",
//       url: "https;//product-3.jpg",
//       price: "3.00",
//       categoryId: "3",
//       stock: "3",
//     },
//   ])
// );
