import Koa from "koa";
import cors from "@koa/cors";
import { router } from "./routes/router";

const app = new Koa();
app.use(cors());
app.use(router.routes());
app.listen(4000);
