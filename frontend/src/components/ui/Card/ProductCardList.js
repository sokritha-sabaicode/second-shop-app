import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductCardList({ data }) {
  const router = useRouter();
  const { query } = router;
  const [products, setProducts] = useState(data.data && data.data.docs);
  const [page, setPage] = useState(data && data.data ? data.data.nextPage : 1);
  const [hasMore, setHasMore] = useState(data.data.hasNextPage);
  console.log("hasmore", hasMore);
  useEffect(() => {
    // Re-initialize products when category changes
    setProducts(data.data && data.data.docs);
    setPage(data && data.data ? data.data.nextPage : 1);
    setHasMore(true);
  }, [query.category, data]);

  const loadNextPage = async () => {
    console.log("pge", page);
    if (page === 1 || page === null) {
      return;
    }

    if (products.length >= data.data.totalDocs) {
      setHasMore(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?category=${
          query.category || "all"
        }&page=${page}`
      );
      const data = await response.json();

      // Append the new products to the existing products
      const updatedProducts = [...products, ...data.data.docs];
      console.log("nextpage", data.data.nextPage);
      console.log("nextpage", data.data.hasNextPage);

      // Update the state with the new products and pagination information
      setTimeout(() => {
        setProducts(updatedProducts);
        setPage(data.data.nextPage);
        setHasMore(data.data.hasNextPage);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch next page:", error);
    }
  };
  return (
    <React.Fragment>
      {products.length !== 0 ? (
        <InfiniteScroll
          dataLength={products.length}
          hasMore={hasMore}
          next={loadNextPage}
          endMessage={
            <h4 className="font-bold text-center">Nothing more to show</h4>
          }
        >
          <div className="flex justify-center w-full h-full">
            <div className="grid w-2/3 grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <ProductCard product={product} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      ) : (
        <div className="flex items-start justify-center w-full h-full">
          <span className="text-xl text-center text-gray-500">
            No Product Found
          </span>
        </div>
      )}
    </React.Fragment>
  );
}
