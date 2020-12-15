/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { environment } from "environments/environment";
import { NgModuleRef } from "@angular/core";

/**
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from "./app";
import { ROOT_SELECTOR } from "./app/app.component";

/**
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  let modulePromise: Promise<NgModuleRef<AppModule>> = null;

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      // Before restarting the app, we create a new root element and dispose the old one
      const oldRootElem = document.querySelector(ROOT_SELECTOR);
      const newRootElem = document.createElement(ROOT_SELECTOR);
      oldRootElem.parentNode.insertBefore(newRootElem, oldRootElem);
      if (modulePromise != null) {
        void modulePromise.then((appModule) => {
          appModule.destroy();
          if (oldRootElem !== null) {
            oldRootElem.parentNode.removeChild(oldRootElem);
          }
          return appModule;
        });
      }
    });
  }

  modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);

  // ignoring environment unbound stuff (dev use only)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return modulePromise.then(environment.decorateModuleRef).catch((err) => console.error(err));
}

export const domReadyHandler: () => void = () => {
  document.removeEventListener("DOMContentLoaded", domReadyHandler, false);
  void main();
};

/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
  case "loading":
    document.addEventListener("DOMContentLoaded", domReadyHandler, false);
    break;
  case "interactive":
  case "complete":
  default:
    void main();
}
