export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-gray-600">
      <div className="flex flex-wrap items-center justify-between w-2/3 p-4 mx-auto">
        <a href="/?category=all" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            2Shop
          </span>
        </a>
        <div className="flex md:order-2">
          <a
            type="button"
            href="/sell"
            className="px-4 py-2 mr-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sell Your Product Now
          </a>
        </div>
      </div>
    </nav>
  );
}
