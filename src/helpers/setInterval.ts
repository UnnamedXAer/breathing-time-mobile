export class TimeoutHandler {
  private handlerRef: { id: NodeJS.Timer | undefined } = { id: void 0 };

  get handler(): NodeJS.Timer {
    return this.handlerRef.id!;
  }
  set handler(n: NodeJS.Timer) {
    this.handlerRef.id = n;
  }

  clear() {
    const h = this.handlerRef.id;
    clearTimeout(this.handlerRef.id as NodeJS.Timer);
    console.log('interval cleared', h);
  }
}

export default function setIntervalWithTimeout(
  callback: (clear: () => void) => unknown,
  intervalMs: number,
  handleWrapper = new TimeoutHandler(),
): TimeoutHandler {
  let cleared = false;

  const timeout = () => {
    handleWrapper.handler = setTimeout(() => {
      if (!cleared) {
        timeout();
        callback(() => {
          cleared = true;
          handleWrapper.clear();
        });
      }
    }, intervalMs);
    console.log('interval scheduled', handleWrapper.handler);
  };
  timeout();
  return handleWrapper;
}
