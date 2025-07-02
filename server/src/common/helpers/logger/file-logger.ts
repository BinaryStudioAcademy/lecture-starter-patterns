import { LogLevel } from "../../enums/log-level.enum";
import { Subscriber } from "./logger";
import * as fs from 'fs';

// PATTERN:Observer

class FileLogger implements Subscriber {
  update(level: LogLevel, message: string): void {
    const logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
    fs.appendFileSync("log.txt", logMessage);
  }
}

export { FileLogger };