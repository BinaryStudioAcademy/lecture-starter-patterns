import { LogLevel } from "../../enums/log-level.enum";
import { Subscriber } from "./logger";

// PATTERN:Observer

class ConsoleLogger implements Subscriber {
  update(level: LogLevel, message: string): void {
    if (level === "error") {
      console.error(`[ERROR] ${message}`);
    }
  }
}

export { ConsoleLogger };