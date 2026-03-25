import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LogLevel = "DEBUG" | "INFO" | "SOTA-WARN" | "ERROR";

export type LogLine = { ts: string; level: LogLevel; message: string };

type LoggerCtx = {
  lines: LogLine[];
  append: (level: LogLevel, message: string) => void;
  clear: () => void;
};

const Ctx = createContext<LoggerCtx | null>(null);

function stamp(): string {
  return new Date().toISOString().slice(11, 23);
}

export function LoggerProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<LogLine[]>([]);

  const append = useCallback((level: LogLevel, message: string) => {
    setLines((prev) => [...prev, { ts: stamp(), level, message }].slice(-400));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, append, clear }),
    [lines, append, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLogger() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLogger outside LoggerProvider");
  return c;
}
