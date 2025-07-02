import { ConsoleLogger } from "./logger/console-logger";
import { FileLogger } from "./logger/file-logger";
import { Logger } from "./logger/logger";

// PATTERN:Observer

const logger = new Logger();
logger.subscribe(new FileLogger());
logger.subscribe(new ConsoleLogger());

export { logger };