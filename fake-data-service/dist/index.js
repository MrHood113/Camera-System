import { pushFakeData } from "./push/pushFakeData.js";
import dotenv from "dotenv";
import { pushFakeSnapshots } from "./push/pushFakeSnapshots.js";
dotenv.config();
pushFakeData();
pushFakeSnapshots();
setInterval(pushFakeSnapshots, 1000);
//# sourceMappingURL=index.js.map