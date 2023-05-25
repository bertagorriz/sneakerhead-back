import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { app } from "./server/app.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("sneakers-api:root");

const port = process.env.PORT ?? 4000;
const mongodbConnection = process.env.MONGODB_CONNECTION;

if (!mongodbConnection) {
  debug(chalk.red(`Missing environment variables`));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.greenBright(`Listening on port ${port}`));
});

try {
  await connectToDatabase(mongodbConnection);
} catch (error: unknown) {
  debug(
    `Error connecting to database ${chalk.redBright((error as Error).message)}`
  );
}
