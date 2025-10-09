import fs from 'fs';
import path from 'path';

export function createLogger(logDir = path.resolve(process.cwd(), '..', 'evidence')) {
  // Ensure we always write to the project-level evidence directory that the frontend serves
  const file = path.resolve(logDir, 'sidecar.log.jsonl');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  return (entry: Record<string, unknown>) => {
    const line = JSON.stringify({ ts: new Date().toISOString(), ...entry });
    fs.appendFile(file, line + '\n', () => {});
  };
}
