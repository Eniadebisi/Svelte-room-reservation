import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export function dateFormat(dateVal, format) {return dayjs.utc(dateVal).local().format(format)}
