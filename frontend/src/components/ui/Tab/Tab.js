export default function Tab({ label, isFocus, onClick }) {
  return (
    <>
      {isFocus ? (
        <button
          type="button"
          onClick={onClick}
          className="px-5 py-2 mr-3 text-base font-medium text-center text-blue-700 bg-white border border-blue-600 rounded-full hover:text-white hover:bg-blue-700 focus:outline-none mb dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        >
          {label.toUpperCase()}
        </button>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="px-5 py-2 mr-3 text-base font-medium text-center text-gray-900 bg-white border border-white rounded-full hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:text-white dark:focus:ring-gray-800"
        >
          {label.toUpperCase()}
        </button>
      )}
    </>
  );
}
