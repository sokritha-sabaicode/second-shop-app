export const createPineconeIndex = async (
  client,
  indexName,
  vectorDimension
) => {
  // Get list of existing indexes
  const exisitingIndexes = await client.listIndexes();
  // if doesn't exist, create it
  if (!exisitingIndexes.includes(indexName)) {
    const createClient = await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
      },
    });
    console.log(
      "🚀 ~ file: createPineconeIndex.js:17 ~ createClient:",
      createClient
    );
    // await new Promise((resolve) => setTimeout(resolve, 60000));
  }
};
