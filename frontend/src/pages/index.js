import ProductCardList from "@/components/ui/Card/ProductCardList";
import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";
import TabList from "@/components/ui/Tab/TabList";

export default function Home({ categories, products }) {
  // error state
  if (!categories || !products) {
    return (
      <main>
        <Navbar />
        <div>Error loading categories. Please try again later.</div>
        <Footer />
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

    const CategoryEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/categories`;
    const ProductEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?category=${query.category}`;

    const fetchingCategory = await fetch(CategoryEndpoint);
    const categoryResult = await fetchingCategory.json();

    const fetchingProduct = await fetch(ProductEndpoint);
    const productResult = await fetchingProduct.json();

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
