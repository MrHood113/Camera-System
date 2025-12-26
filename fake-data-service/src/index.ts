import dotenv from "dotenv";
import cron from "node-cron";
import { pushFakeCustomerVisit, pushFakeData, pushFakeRecovery, pushFakeShortages, pushFakeSnapshots } from "./push/index.js";

dotenv.config();

pushFakeData();
pushFakeCustomerVisit();
pushFakeSnapshots();
pushFakeShortages();
pushFakeRecovery();

setInterval(() => {
  pushFakeSnapshots();
  pushFakeShortages();
  pushFakeRecovery();
}, 1000);

cron.schedule("0 0 * * *", () => {
  pushFakeCustomerVisit();
}, {
  timezone: "Asia/Ho_Chi_Minh",
});




