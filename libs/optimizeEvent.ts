type CallbackFn = () => unknown;

export function optimizeScroll(callbackFn: CallbackFn): any {
  let tick = false;

  return () => {
    if (tick) {
      return;
    }
    tick = true;
    requestAnimationFrame(() => {
      tick = false;
      callbackFn();
    });
  };
}
