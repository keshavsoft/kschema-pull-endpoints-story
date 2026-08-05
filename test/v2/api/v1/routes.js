import express from 'express';
import { router as routerFromdoctors } from "./doctors/end-points.js";
import { router as routerFromtests } from "./tests/end-points.js";
import { router as routerFrombills } from "./bills/end-points.js";

const router = express.Router()
router.use("/bills", routerFrombills);;

router.use("/tests", routerFromtests);
router.use("/doctors", routerFromdoctors);;

export { router };