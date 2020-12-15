/**
 * ToastrSettings defines the properties used for a toast
 *
 * @export
 */
export class ToastrSettings {
  /**
   *  Time before animation closes
   */
  public timeOut?: number;

  /**
   * Maximum amount of toast allowed to be open
   */
  public maxOpened?: number;

  /**
   * How fast toast appears/disappears
   */
  public easeTime?: number;

  /**
   * Animation Progress increase or decrease
   */
  public progressAnimation?: string;

  /**
   * Adds a close button instead of clicking toasts body
   */
  public closeButton?: boolean;

  /**
   * close on clicking the main body 'true' by default
   */
  public tapToDismiss?: boolean;

  /**
   * Position of the toast (and possibly the width)
   */
  public positionClass?: string;

  /**
   * Time before animation closes after mouseover
   */
  public extendedTimeOut?: number;

  /**
   * Allows html use if enabled
   */
  public enableHtml?: boolean;

  /**
   * Show or hide progress bar that is display at bottom
   */
  public progressBar?: boolean;
}
