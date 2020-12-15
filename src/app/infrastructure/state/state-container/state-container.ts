import { Observable, Subscription } from "rxjs";
import { isFunction } from "app/shared/validation/functions";

/**
 * abstract foundation of a stateContainer
 */
export default abstract class StateContainer {
  protected subscriptions: Subscription[] = [];

  protected mapStateCalled = false;

  /**
   * Method to implement your state to prop bindings and events in
   * example:
   *  public mapStateToProps = () => {
   *   this.bindSelectorToProperty(this.stateLanguage, "language");
   *  };
   */
  /**
   *
   */
  public mapStateToProps(): void {}

  /**
   * Subscribe a function (/event) to a certain state change
   *
   * @param observer state observer to subscribe to
   * @param event event to fire
   */
  public bindEventToState(observer: Observable<any>, event = () => {}) {
    if (isFunction(event) && this.checkObserver(observer)) {
      this.subscriptions.push(
        observer.subscribe(() => {
          event();
        })
      );
    }
  }

  /**
   * Subscribe an observable to a class variable
   *
   * @param observer observable to subscribe to
   * @param variablePath variablePath on component (e.g this.values.first would be "value.first")
   * @param transformer function to transform selector value before setting, defaults to `val => return val`;
   */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  public bindSelectorToProperty(observer: Observable<any>, variablePath: string, transformer = (val: any) => val) {
    if (!isFunction(transformer)) {
      throw new Error("Transformer is not a valid function");
    }
    if (this.checkObserver(observer)) {
      this.subscriptions.push(
        observer.subscribe((val) => {
          if (!variablePath) {
            throw new Error("variablePath not set, can't bind property");
          }
          const arrayReverse = variablePath.split(".").reverse();
          const lastField = arrayReverse.shift();
          const result = arrayReverse.reverse().reduce((a, b) => a[b], this);
          result[lastField] = transformer(val);
        })
      );
    }
  }

  /**
   * Unsubscribe all selectors
   */
  protected unsubscribeSelectors() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Checks whether the passed observer is valid (e.g not null and has a .subscribe function)
   *
   * @param observer
   */
  private checkObserver(observer: Observable<any>) {
    if (!observer) {
      throw new Error("No selector specified");
      // eslint-disable-next-line @typescript-eslint/unbound-method
    } else if (!isFunction(observer.subscribe)) {
      throw new Error("Selector has no subscribe method");
    }
    return true;
  }
}
