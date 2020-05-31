import Router from "koa-router";
import { doctors } from "./doctors";
import { bookAppointment } from "./bookAppointment";

const router = new Router();

router.get('/doctors', doctors);
router.get('/book-appointment', bookAppointment);

export {
    router
};
