/**
 * Centralized logging utility for the LMS platform.
 * Follows structured logging patterns.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  message: string;
  context?: Record<string, any>;
  error?: Error | unknown;
  userId?: string;
  tenantId?: string;
}

class Logger {
  private log(level: LogLevel, payload: LogPayload) {
    const timestamp = new Date().toISOString();
    
    const formattedLog = {
      timestamp,
      level: level.toUpperCase(),
      message: payload.message,
      context: payload.context,
      user: payload.userId || 'anonymous',
      tenant: payload.tenantId || 'system',
      ...(payload.error && { error: payload.error instanceof Error ? payload.error.stack : payload.error })
    };

    // In a production environment, this would ship to Datadog / Signoz / ELK
    if (process.env.NODE_ENV !== 'production' || level === 'error') {
      const logString = JSON.stringify(formattedLog);
      switch (level) {
        case 'info':
          console.info(logString);
          break;
        case 'warn':
          console.warn(logString);
          break;
        case 'error':
          console.error(logString);
          break;
        case 'debug':
          console.debug(logString);
          break;
      }
    }
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', { message, context });
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', { message, context });
  }

  error(message: string, error?: unknown, context?: Record<string, any>) {
    this.log('error', { message, error, context });
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('debug', { message, context });
  }
}

export const logger = new Logger();
