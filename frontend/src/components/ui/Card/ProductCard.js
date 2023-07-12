export default function ProductCard({ product }) {
  return (
    <>
      {product && (
        <div className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
          <a
            className="relative flex mx-3 mt-3 overflow-hidden h-60 rounded-xl"
            href={product._id}
          >
            <img
              className="object-cover"
              src={product.images[0]}
              alt="product image"
            />
            <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-black bg-yellow-300 rounded-full">
              {product.condition}% New
            </span>
          </a>
          <div className="px-5 pb-5 mt-4">
            <a href={product._id}>
              <h5 className="text-xl tracking-tight text-slate-900">
                {product.name}
              </h5>
            </a>
            <div className="flex items-center justify-between mt-2 mb-5">
              <p>
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price}
                </span>
              </p>
              <div className="flex items-center">
                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  In Stock {product.stock}
                </span>
              </div>
            </div>
            <a
              href={product._id}
              className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              More Info
              <span className="mr-2" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z"
                  data-name="arrow-forward"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
