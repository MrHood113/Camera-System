import { pushFakeData } from "./pushFakeData.js";
import dotenv from "dotenv";

dotenv.config();

pushFakeData();

// setInterval(pushFakeData, 30 * 60 * 1000);

