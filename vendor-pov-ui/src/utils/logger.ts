/*
    Custom Logger Utility

    Provides centralized logging with configurable log levels, named loggers, 
    and runtime configuration support.

    Usage:
        const logger = Logger.for("ComponentName");
        logger.debug("Debug Message", { data });
        logger.info("Info message");
        logger.error("Error occurred", error);
    
    Runtime Configuration:
        localStorage.setItem("LOG_LEVEL", "DEBUG"); // Enable debug logs
        localStorage.setItem("LOG_NAMESPACES", "AgentPage,newsAPIAgent"); // Enable specific namespaces
*/ 

export enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    SILENT = 5
}

interface LoggerConfig {
    defaultLevel: LogLevel;
    namespaceOverrides: Map<string, LogLevel>
}

export class Logger {
    private name: string;
    private static config: LoggerConfig = {
        defaultLevel: LogLevel.INFO, // INFO and above by default
        namespaceOverrides: new Map()
    }

    private constructor(name: string) {
        this.name = name;
    }

    /*
        Creates a named logger instance
        @param name - Context name (e.g. "AgentPage", "geminiService", "newsAPIAgent")
    */
    static for(name: string): Logger {
        return new Logger(name);
    }

    /*
        Configure global logger settings
        @param level - Default log level for all loggers.
    */
    static setDefaultLevel(level: LogLevel): void {
        Logger.config.defaultLevel = level;
    }

    /*
        Configure log level for a specific namespace
        @param namespace - Logger name
        @param level - Log level for this namespace
    */
    static setNamespaceLevel(namespace: string, level: LogLevel): void {
        Logger.config.namespaceOverrides.set(namespace, level);
    }

    /*
        Get effective log level for this logger instance
    */
    private getEffectiveLevel(): LogLevel {
        // 1. Check localStorage for runtime override
        const storageLevel = this.getStorageLevelOverride();
        if(storageLevel !== null) {
            return storageLevel
        }

        // 2. Check namespace-specific configuration
        if(Logger.config.namespaceOverrides.has(this.name)) {
            return Logger.config.namespaceOverrides.get(this.name)!;
        }

        // 3. Use default level
        return Logger.config.defaultLevel;
    }

    /*
        Check localStorage for runtime log level overrides
    */
    private getStorageLevelOverride(): LogLevel | null {
        try {
            // Check global level override
            const globalLevel = localStorage.getItem("LOG_LEVEL");
            if(globalLevel && globalLevel in LogLevel) {
                return LogLevel[globalLevel as keyof typeof LogLevel];
            }

            // Check namespace whitelist
            const namespaces = localStorage.getItem("LOG_NAMESPACES");
            if(namespaces) {
                const enabledNamespaces = namespaces.split(",").map(n=>n.trim());
                if(enabledNamespaces.includes(this.name)) {
                    return LogLevel.TRACE;
                }
            }
        } catch (e) {
            // localStorage might not be available (SSR, etc.)
        }

        return null;
    }

    /*
        Check if we should log at the given level
    */
    private shouldLog(level: LogLevel): boolean {
        return level >= this.getEffectiveLevel();
    }

    /*
        Format log arguments for output
    */   
    private formatArgs(args: any[]): any[] {
        return args.map(arg => {
            // Already a string or primitive
            if(typeof arg !== 'object' || arg === null) {
                return arg;
            }

            // Error objects
            if(arg instanceof Error) {
                return arg;
            }

            // For objects/arrays, check if they're small enough to inline
            try {
                const str = JSON.stringify(arg);
                if(str.length < 100) {
                    return arg; // Let console handle small objects
                }

                // Large objects - return as-is for console's expandable view
                return arg;
            } catch (e) {
                // Circular reference or other error
                return arg;
            }
        })
    }

    /*
        Internal logging implementation
    */   
    private log(level: LogLevel, method: "log" | "debug" | "info" | "warn" | "error", ...args: any[]): void {
        if(!this.shouldLog(level)) {
            return;
        }

        const prefix = `[${this.name}]`;
        const formattedArgs = this.formatArgs(args);

        // use appropriate console method
        console[method](prefix, ...formattedArgs);
    }

    /*
        TRACE level - most verbose, for detailed execution flow
    */ 
    trace(...args: any[]): void {
        this.log(LogLevel.TRACE, "debug", ...args)
    }

    /*
        DEBUG level - Detailed debugging information
    */ 
    debug(...args: any[]): void {
        this.log(LogLevel.DEBUG, "debug", ...args)
    }

    /*
        INFO level - General informational messages
    */ 
    info(...args: any[]): void {
        this.log(LogLevel.INFO, "info", ...args)
    }

    /*
        WARN level - Warning messages
    */ 
    warn(...args: any[]): void {
        this.log(LogLevel.WARN, "warn", ...args)
    }

    /*
        ERROR level - Error messages
    */ 
    error(...args: any[]): void {
        this.log(LogLevel.ERROR, "error", ...args)
    }

    /*
        Utility: Log execution time of a function
    */
    async time<T>(label: string, fn: () => Promise<T>): Promise<T> {
        if(!this.shouldLog(LogLevel.DEBUG)) {
            return fn();
        }

        const start = performance.now();
        this.debug(`${label} - started`);

        try {
            const result = await fn();
            const duration = (performance.now() - start).toFixed(2);
            this.debug(`${label} - completed in ${duration}ms`);
            return result;
        } catch (error) {
            const duration = (performance.now() - start).toFixed(2);
            this.error(`${label} - failed after ${duration}ms`, error); 
            throw(error);
        }
    }

    /*
        Utility: Create a child logger with a sub-context
    */
    child(subContext: string): Logger {
        return Logger.for(`${this.name}.${subContext}`);
    }
}

// Export convenience function for quick logger creation
export const createLogger = (name: string): Logger => Logger.for(name); 

// Export default logger for module-level logging
export default Logger;