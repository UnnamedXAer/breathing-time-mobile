export const allSettled = <T>(promises: (Promise<T> | T)[]) => {
  return Promise.all(
    promises.map((promise) => {
      if (promise instanceof Promise) {
        return promise
          .then((value) => ({ status: 'fulfilled' as const, value: value }))
          .catch((reason) => ({ status: 'rejected' as const, reason: reason as Error }));
      }
      return promise;
    }),
  );
};
