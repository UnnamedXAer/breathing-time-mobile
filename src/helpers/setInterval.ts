export class TimeoutHandler {
  private handlerRef: { id: NodeJS.Timer | undefined } = { id: void 0 };

  get handler(): NodeJS.Timer {
    return this.handlerRef.id!;
  }
  set handler(n: NodeJS.Timer) {
    this.handlerRef.id = n;
  }

  clear() {
    clearTimeout(this.handlerRef.id as NodeJS.Timer);
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
  };
  timeout();
  return handleWrapper;
}
