import { PineconeClient } from "@pinecone-database/pinecone";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../configs/index.js";
import { dirname } from "path";
import { createPineconeIndex } from "./createPineconeIndex.js";
import { updatePinecone } from "./updatePinecone.js";
import { queryPineconeVectorStoreAndQueryLLM } from "./queryPineconeAndQueryGPT.js";

// Resolve the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const question =
  "I want to buy a laptop that has light weight and price around 800 to 1000usd";
const indexName = "gpt3-5-second-shop"; // pinecone index name
const vectorDimension = 1536; // Vector dimension of Embedding

// Load the JSON File
const loader = new JSONLoader(path.join(__dirname, "../data/sample-data.json"));
const docs = await loader.load();

console.log(docs);

// Initialize Pinecone client
const client = new PineconeClient();
await client.init({
  apiKey: config.PINECONE_API_KEY,
  environment: config.PINECONE_ENVIRONMENT,
});

async function StoreEmbdeddingToPinecone() {
  // Check if Pinecone index exists and create if necessary
  await createPineconeIndex(client, indexName, vectorDimension);

  // Update Pinecone vector store with document embeddings
  updatePinecone(client, indexName, docs);

  //Query Pinecone vector store and GPT model for an answer
  await queryPineconeVectorStoreAndQueryLLM(client, indexName, question);
}

StoreEmbdeddingToPinecone();
