import { LogLevel } from "../../enums/log-level.enum";

// PATTERN:Observer

interface Subscriber {
  update(level: LogLevel, message: string): void;
}

class Logger {
  private subscribers: Subscriber[] = [];

  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  log(level: LogLevel, message: string): void {
    this.subscribers.forEach((s) => s.update(level, message));
  }
}

export { Logger, Subscriber }