/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * promise polyfills
 */
export class PromisePolyfills {
  public static Fulfilled = "fulfilled";

  public static Rejected = "rejected";

  /**
   * Return after all promises have been settled
   *
   * @url https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
   * @param promises
   */
  public static AllSettled(promises: Array<Promise<any>>) {
    return Promise.all(
      promises.map((promise) =>
        promise
          .then((value) => ({
            status: this.Fulfilled,
            value,
          }))
          .catch((reason) => ({
            status: this.Rejected,
            reason,
          }))
      )
    );
  }
}
