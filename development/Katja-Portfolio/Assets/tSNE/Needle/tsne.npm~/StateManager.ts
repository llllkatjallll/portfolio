import { Behaviour, serializable, EventList } from "@needle-tools/engine";
import { Unsubscriber, writable } from "svelte/store";
export enum AppState {
  None = "None",
  ThreeD = "ThreeD",
  TwoD = "TwoD",
}

export const CurrentState = writable(AppState.ThreeD);
let CurrentStateValue: AppState = AppState.ThreeD;


export function GetCurrentState(): AppState {
  //TODO: find out if we can also have a getter here
  return CurrentStateValue;
}

 export class StateListener extends Behaviour {
  private stateSub: Unsubscriber | undefined;

  @serializable(EventList)
  onThreeD?: EventList;

  @serializable(EventList)
  onTwoD?: EventList;

    @serializable(EventList)
  onNone?: EventList;

  awake() {
    this.stateSub = CurrentState.subscribe(this.publishState.bind(this));
  }

  onDestroy() {
    if (this.stateSub) {
      this.stateSub();
    }
  }

  publishState(state: AppState) {
    console.log(state);
    if (state === "ThreeD") this.onThreeD?.invoke();
    if (state === "TwoD") this.onTwoD?.invoke();
    if (state === "None") this.onNone?.invoke();
  }
} 

export class StateManager extends Behaviour {
  private static _initialized: boolean = false;

  awake() {


    if (StateManager._initialized) return;


    CurrentState.subscribe(this.onStateChanged.bind(this));
    StateManager._initialized = true;

    CurrentState.set(AppState.ThreeD);

  }

  onStateChanged(state: AppState) {
    CurrentStateValue = state;
    console.log("Setting state to ", state);
    this.check();
  }

  check() {

  }

}

