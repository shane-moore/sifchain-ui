export function once<T>(fn: (...x: any[]) => T) {
  let called = false;
  let result: T;
  return (...x: any[]): T => {
    if (!called) {
      result = fn(...x);
      called = true;
    }
    return result;
  };
}
