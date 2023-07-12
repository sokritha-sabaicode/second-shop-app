import Product from "../database/models/Product.js";
import connect from "../database/index.js";

// Define the function to remove products created more than 15 days ago
async function removeExpiredProducts() {
  await connect();
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

  // Find products created before fifteenDaysAgo
  const expiredProducts = await Product.find({
    createdAt: { $lt: fifteenDaysAgo },
  });

  // Delete each expired product
  for (const product of expiredProducts) {
    await product.remove();
  }

  console.log(`${expiredProducts.length} products removed.`);
  process.exit(); // Exit the script after completion
}

// Run the function to remove expired products
removeExpiredProducts().catch((error) => {
  console.error("Error removing expired products:", error);
  process.exit(1); // Exit the script with an error code
});
