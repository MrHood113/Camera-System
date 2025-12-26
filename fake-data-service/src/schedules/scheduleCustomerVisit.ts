import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { pushFakeCustomerVisit } from "../push/pushFakeCustomerVisit.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export function scheduleCustomerVisit() {
  const now = dayjs().tz("Asia/Ho_Chi_Minh");
  const nextMidnight = now.add(1, "day").startOf("day"); 
  const delay = nextMidnight.diff(now); 

  setTimeout(() => {
    pushFakeCustomerVisit(); 
    setInterval(pushFakeCustomerVisit, 86400000);
  }, delay);
}
