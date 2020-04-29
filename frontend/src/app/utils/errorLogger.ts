declare namespace _LTracker {
  function push(log: any): void;
}

export function logError(error: Error, info: any) {
  try {
    _LTracker.push({ error, info });
  } catch (_err) {
    return;
  }
}
