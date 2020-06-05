import Koa from "koa";
import cors from "@koa/cors";
import serve from "koa-static";
import { router } from "./routes/router";

const app = new Koa();
app.use(cors());
app.use(router.routes());
app.use(serve("../front-end/build"));
app.listen(4000);
