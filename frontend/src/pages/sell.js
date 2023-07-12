import { useState } from "react";
import FileImport from "@/components/ui/FileImport/FileImport";
import Footer from "@/components/ui/Footer/Footer";
import Navbar from "@/components/ui/Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sell() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    productCategory: "",
    productName: "",
    productModel: "",
    productType: "",
    productCondition: "",
    issueRepair: "",
    inStock: "",
    productDetails: [""],
    productPrice: "",
    productImages: [], // Updated to an array for multiple file uploads
  });

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "productDetails") {
      setFormData((prevState) => ({
        ...prevState,
        productDetails: [...prevState.productDetails, value],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddProductDetailInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      productDetails: [...prevState.productDetails, ""],
    }));
  };

  // Remove product detail input
  const handleRemoveProductDetailInput = (index) => {
    setFormData((prevState) => {
      const updatedDetails = [...prevState.productDetails];
      updatedDetails.splice(index, 1);
      return {
        ...prevState,
        productDetails: updatedDetails,
      };
    });
  };

  // Update form data on file upload
  const handleFileUpload = (files) => {
    setFormData((prevState) => ({
      ...prevState,
      productImages: files.map((file) => file.file),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show a toast notification when starting the request
    toast.info("Creating a product...");
    // Create a new instance of FormData
    const data = new FormData();

    // Append all string data
    for (let key in formData) {
      if (key !== "productImages") {
        data.append(key, JSON.stringify(formData[key]));
      }
    }

    // Append all files
    for (let file of formData.productImages) {
      data.append("productImages", file);
    }
    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`,
        {
          method: "POST",
          body: data,
        }
      );
      const newProduct = response.json();
      // Show a toast notification when the request is completed
      toast.success("Create a product successfully!");
      setFormData({
        fullName: "",
        phoneNumber: "",
        productCategory: "",
        productName: "",
        productModel: "",
        productType: "",
        productCondition: "",
        issueRepair: "",
        inStock: "",
        productDetails: [""],
        productPrice: "",
        productImages: [], // Updated to an array for multiple file uploads
      });
    } catch (err) {
      console.error(err.message);
      // Show a toast notification when an error occurs
      toast.error("Error: ", err.message);
    }
  };

  return (
    <>
      <section className="min-h-screen">
        <Navbar />
        <ToastContainer />
        <div className="mt-40" />
        <div className="flex justify-center">
          <form className="w-1/3" onSubmit={handleSubmit}>
            {/* FullName */}
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sok David"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            {/* Telegram Number */}
            <div className="mb-6 ">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number (Telegram)
              </label>
              <input
                type="tel"
                pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                name="phoneNumber"
                id="phone_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="012345678"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            {/* Product Category */}
            <div className="mb-6">
              <label
                htmlFor="product_category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Category
              </label>
              <select
                id="product_category"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="none">Choose a category</option>
                <option value="accessories">Accessories</option>
                <option value="appliances">Appliance</option>
                <option value="laptops">Laptops</option>
              </select>
            </div>

            {/* Product Name */}
            <div className="mb-6">
              <label
                htmlFor="product_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                id="product_name"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="MacBook M1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {/* Product Model */}
            {formData.productCategory !== "none" && (
              <div className="mb-6">
                <label
                  htmlFor="product_model"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Model
                </label>
                <select
                  id="product_model"
                  name="productModel"
                  value={formData.productModel}
                  onChange={handleInputChange}
                  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="none">Choose a model</option>
                  {formData.productCategory === "accessories" && (
                    <>
                      <option value="apple">apple</option>
                      <option value="logitech">logitech</option>
                      <option value="sony">sony</option>
                      <option value="microsoft">microsoft</option>
                      {/* Add more accessory models as needed */}
                    </>
                  )}
                  {formData.productCategory === "appliances" && (
                    <>
                      <option value="samsung">Samsung</option>
                      <option value="lg">LG</option>
                      <option value="sony">Sony</option>
                      {/* Add more appliance models as needed */}
                    </>
                  )}
                  {formData.productCategory === "laptops" && (
                    <>
                      <option value="dell">Dell</option>
                      <option value="lenovo">Lenovo</option>
                      <option value="hp">HP</option>
                      <option value="mac">Mac</option>
                      {/* Add more laptop models as needed */}
                    </>
                  )}
                  {/* Add more categories and corresponding models as needed */}
                </select>
              </div>
            )}

            {/* Product Type - depend on category Accessories & Appliance */}
            {formData.productCategory !== "none" && (
              <div className="mb-6">
                <label
                  htmlFor="product_type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Type
                </label>
                <select
                  id="product_type"
                  name="productType"
                  value={formData.productType}
                  onChange={handleInputChange}
                  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="none">Choose a type</option>
                  {formData.productCategory === "accessories" && (
                    <>
                      <option value="earbud">Ear Bud</option>
                      <option value="mouse">Mouse</option>
                      <option value="camera">Camera</option>
                      <option value="keyboard">Keyboard</option>
                      {/* Add more accessory models as needed */}
                    </>
                  )}
                  {formData.productCategory === "appliances" && (
                    <>
                      <option value="kitchen">Kitchen Appliance</option>
                      <option value="cooling">Cooling Appliance</option>
                      <option value="laundry">Laundry Appliance</option>
                      <option value="electronic">Electronic Appliance</option>
                      {/* Add more accessory models as needed */}
                    </>
                  )}
                  {formData.productCategory === "laptops" && (
                    <>
                      <option value="gaming-laptop">Gaming Laptop</option>
                      <option value="business-laptop">Business Laptop</option>
                      <option value="ultrabook">Ultrabook</option>
                      {/* Add more laptop types as needed */}
                    </>
                  )}
                </select>
              </div>
            )}

            {/* Product Condition */}
            <div className="mb-6">
              <label
                htmlFor="product_condition"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Conditions (90% new)
              </label>
              <input
                type="number"
                id="product_condition"
                name="productCondition"
                value={formData.productCondition}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {/* Issue & Repair */}
            <div className="mb-6">
              <label
                htmlFor="issue"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Issue & Repair
              </label>
              <textarea
                id="issue"
                name="issueRepair"
                value={formData.issueRepair}
                onChange={handleInputChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your issue or repair of your product..."
              ></textarea>
            </div>

            {/* In Stock */}
            <div className="mb-6">
              <label
                htmlFor="product_in_stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                In Stock
              </label>
              <input
                type="number"
                name="inStock"
                value={formData.inStock}
                onChange={handleInputChange}
                id="product_in_stock"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {/* Product Details */}
            <div className="mb-6">
              <label
                htmlFor="product_detail"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Detail
              </label>
              <div className="flex flex-col mb-2">
                {formData.productDetails.map((detail, index) => (
                  <div className="flex items-center" key={index}>
                    <input
                      type="text"
                      id={`product_detail_${index}`}
                      placeholder={`Detail ${index + 1}`}
                      className="mb-2 flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={detail}
                      onChange={(e) => {
                        const updatedDetails = [...formData.productDetails];
                        updatedDetails[index] = e.target.value;
                        setFormData((prevState) => ({
                          ...prevState,
                          productDetails: updatedDetails,
                        }));
                      }}
                    />
                    <button
                      type="button"
                      className="ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 flex items-center justify-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      onClick={() => handleRemoveProductDetailInput(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="flex-shrink-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleAddProductDetailInput}
                >
                  +
                </button>
              </div>
            </div>

            {/* Product Price */}
            <div className="mb-6">
              <div>
                <label
                  htmlFor="product_price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Price
                </label>
                <div className="flex">
                  <span
                    id="dropdown-button-2"
                    data-dropdown-toggle="dropdown-search-city"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    type="button"
                  >
                    USD
                  </span>
                  <div className="relative w-full">
                    <input
                      id="product_price"
                      type="number"
                      name="productPrice"
                      onChange={handleInputChange}
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Image
              </label>
              <FileImport
                onFilesUpload={handleFileUpload}
                files={formData.productImages}
              />
            </div>

            {/* Sell Product Button */}
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sell Your Product
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
