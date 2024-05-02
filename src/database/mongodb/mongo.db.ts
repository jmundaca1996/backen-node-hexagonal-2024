import { MongoClient } from "mongodb"
import { config } from "../../config/config"

const uri = config.databaseUrl
export const client: MongoClient = new MongoClient(uri)

export async function main() {
	await client.connect();
	const db = client.db(config.databaseName);
	return db;
  }
