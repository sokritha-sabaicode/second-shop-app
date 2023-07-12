import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductDetail({ product }) {
  const { data } = product;

  return (
    <>
      <main className="min-h-screen">
        <Navbar />(
        <section className="overflow-hidden text-gray-700 bg-white body-font">
          <div className="container px-5 py-24 mx-auto">
            <div>
              <div className="flex flex-wrap mx-auto lg:w-4/5">
                <div className="lg:w-1/2 lg:min-h-[128]">
                  <ImageGallery
                    showThumbnails={true}
                    showPlayButton={false}
                    items={data.images.map((image) => {
                      return {
                        original: image,
                        thumbnail: image,
                      };
                    })}
                  />
                </div>

                <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 class="text-sm title-font text-gray-500 tracking-widest">
                        BRAND NAME
                      </h2>
                      <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                        {data.name}
                      </h1>
                    </div>
                    <span class="bg-blue-300 text-blue-900 text-xs font-medium mr-2 px-3 py-1 rounded dark:bg-blue-900 dark:text-blue-300 h-fit">
                      {data.condition}% New
                    </span>
                  </div>
                  <hr className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700" />
                  <div>
                    <span className="font-medium">Model: </span>
                    <span>{data.model}</span>
                  </div>
                  <div>
                    <span className="font-medium">Type: </span>
                    <span>
                      {data.type === '""' || data.type == ""
                        ? data.model
                        : data.type}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">In Stock: </span>
                    <span>{data.stock}</span>
                  </div>
                  <div>
                    <span className="font-medium">Issue & Repair: </span>
                    <span>{data.issueAndRepair}</span>
                  </div>

                  <p className="font-medium ">Details</p>
                  <ul class="list-disc list-inside ml-8">
                    {data.details.map((detail) => (
                      <li>{detail}</li>
                    ))}
                  </ul>

                  <div class="flex justify-between my-4">
                    <span class="title-font font-medium text-2xl text-gray-900">
                      ${data.price}
                    </span>

                    <div class="flex items-center  space-x-4">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="images/user.webp"
                        alt="profile_seller"
                      />
                      <div class="font-medium dark:text-white">
                        <div>{data.sellerName}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                          {data.sellerContact}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )
      </main>

      <Footer />
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { params } = context;
    console.log(params);

    const ProductEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${params.pid}`;

    const fetchingProduct = await fetch(ProductEndpoint);
    const productResult = await fetchingProduct.json();

    return { props: { product: productResult } };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // you might want to return an error state here, or default data
    return { props: { product: {} } };
  }
};
