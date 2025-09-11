import { pushFakeData } from "./push/pushFakeData.js";
import dotenv from "dotenv";
import { pushFakeSnapshots } from "./push/pushFakeSnapshots.js";
import { pushFakeShortages } from "./push/pushFakeShortages.js";
dotenv.config();
pushFakeData();
pushFakeSnapshots();
pushFakeShortages();
setInterval(() => {
    pushFakeSnapshots();
    pushFakeShortages();
}, 1000);
//# sourceMappingURL=index.js.map