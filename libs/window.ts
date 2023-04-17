export const runOnClientOnly = <T>(callback: () => T): T | undefined => {
  if (typeof window !== 'undefined') return callback();
  return undefined;
};
