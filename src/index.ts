import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { app } from "./server/app.js";

const debug = createDebug("sneakers-api:root");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.greenBright(`Listening on port ${port}`));
});
