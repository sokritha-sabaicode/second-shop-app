import ProductCardList from "@/components/ui/Card/ProductCardList";
import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";
import TabList from "@/components/ui/Tab/TabList";
import { redirect } from "next/navigation";

export default function Home({ categories, products }) {
  // error state
  if (!categories.data || !products.data) {
    return (
      <main className="flex flex-col items-center min-h-screen">
        <div className="flex-shrink-0">
          <Navbar />
        </div>
        <div className="mt-20" />
        <TabList categories={categories.data} />
        <div className="flex-grow">
          <div className="flex items-center justify-center">
            <span className="text-xl text-center text-gray-500">
              No Product Found
            </span>
          </div>
        </div>
        <div className="mt-20" />
        <div className="flex-shrink-0 w-full">
          <Footer />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="mt-20" />
      <TabList categories={categories.data} />
      <div className="flex-grow">
        <ProductCardList data={products} />
      </div>
      <div className="mt-20" />
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </main>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { query } = context;

    let categoryQuery = "all";
    if (query) {
      categoryQuery = query.category;
    }

    const CategoryEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`;
    const ProductEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?category=${categoryQuery}`;
    console.log("productResult", ProductEndpoint);

    const fetchingCategory = await fetch(CategoryEndpoint);
    const categoryResult = await fetchingCategory.json();

    const fetchingProduct = await fetch(ProductEndpoint);
    const productResult = await fetchingProduct.json();
    console.log("productResult", productResult);

    return {
      props: {
        categories: categoryResult,
        products: productResult,
      },
    };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // you might want to return an error state here, or default data
    return { props: { categories: {}, products: {} } };
  }
};
