# grams
[![NPM Version](https://img.shields.io/npm/v/grams.svg)](https://npmjs.org/package/grams)
[![NPM Downloads](https://img.shields.io/npm/dm/grams.svg)](https://npmjs.org/package/grams)
[![Commit Activity](https://img.shields.io/github/commit-activity/m/HamzaKV/grams)](https://npmjs.org/package/grams)
<!-- [![Build](https://img.shields.io/github/workflow/status/HamzaKV/react-web-worker-hook/npm-publish)](https://npmjs.org/package/react-web-worker-hooks) -->
[![Code Size](https://img.shields.io/github/languages/code-size/HamzaKV/grams)](https://npmjs.org/package/grams)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
## Granular ReActive Management of State

## Description
A robust, granular, and well defined state management compatible with SOLID principles. A state manager that is reliable and consistent.

Define state once and utilize it throughout the app without much boilerplate.

Benefits:
- Atomic state
- Compatible with async actions
- Middleware compatibility
- Protected state
- Effect handling
- Structural state management

### Supported Frameworks
- React (>=16.8.0)
- React Native (>=0.59)

### To install:

`yarn add grams`

or

`npm install grams`

or

`pnpm install grams`

or

`bun install grams`

## Definitions
#### Gram
| Name | Description | Required | Type |
| --- | ----------- | -------- | ---- |
| defaultValue | Default initial value of state | Y | any |
| type | Type of state value | Y | "string" \| "number" \| "boolean" \| "object" \| "other" |
| stateType | Type of State | N | "stateful" \| "stateic" |
| produce | Modifications or mutations of state | N | - |
| actions | Actions to execute (can be promises) | N | - |
| effects | Various effects (hooks) that run based on lifecycle | N | - |
| middleware | Functions that execute before a state change | N | - |

#### State Types
| Name | Description |
| ---- | ----------- |
| stateful | A type of state that will cause a rerender |
| stateic | A type of state that will not cause a rerender (useful for static variables) |

#### Effects
| Name | Description |
| ---- | ----------- |
| onMount | Runs after the state has been initialized. (Can be a promise and can modify the state on return) |
| onUpdate | Runs after the state has been updated. Cannot modify state directly. |
| onRender | Runs after the subscribed components have been rerendered. Cannot modify state directly. |
| onListenerSubscribed | Runs after a listener is subscribed. Cannot modify state directly. |
| onListenerUnSubscribed | Runs after a listener is unsubscribed. Cannot modify state directly. |
| onError | Runs if the state has failed. Cannot modify state directly. |

#### Internal Functions
| Name | Description |
| ---- | ----------- |
| subscribe | A function that subscribes a listener to the state. (Components or functions can be subscribed.) |
| getState | A function that returns the current state. |
| setState | A function that sets the state and will execute all listeners. (Functions that are registered will rerender.) |
| getStateProduce | A function that returns a subset of the state. |
| action | A function that executes an action. (Can be used to execute actions without the need of hooks. Functions that are registered will rerender.) |

## Specifications

### useStore
`useStore() => [state, setState]`

A hook that subscribes the component to the state, and returns the value of the state as well as its setter function. (Works similar to `useState` found in React hooks).

### useStoreValue
`useStoreValue() => state`

A hook that subscribes the component to the state and __only__ returns its value.

### useSetStore
`useSetStore() => setState`

A hook that returns its setter function. *It does __not__ subscribe the component to the state.*

### useStoreProduce
`useStoreProduce(produceName: string) => state`

A hook that accepts the name of the produce, subscribes the component to the produce (subset) of the state, and returns its mutated value.

### useStoreAction
`useStoreAction(actionName: string) => setState`

A hook that accepts the name of the action, and returns its action function. *It does __not__ subscribe the component to the state.*

### internal
```

{
    subscribe: (listener) => () => void;
    getState: () => state;
    setState: (newValue | ((prev) => newValue)) => void;
    getStateProduce: (key: string) => value;
    action: (key: string) => (newValue) => void;
}

```

State internal actions that can be used to manipulate the state without the need of hooks. These can be used to create custom hooks or actions or to run in instances where hooks cannot be used (i.e. query (fetch) functions, side effects etc).

## Usage

### 1. Define the State
```js
...

import { gram } from "grams";

...

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

...

export const isAuthenticated = gram({
  defaultValue: false,
  type: "boolean",
  stateType: "stateful",
  produce: {
    isUnAuthenticated: (currValue) => !currValue,
  },
  actions: {
    login: () => true,
    logout: () => false,
  },
  effects: {
    onMount: async () => {
      isLoading.internal.setState(true);
      await delay(1000);
      isLoading.internal.setState(false);
      return true;
    },
  },
  middleware: {
    check: () => {
      console.log("auth middleware");
      return true;
    },
  },
});
```

### 2. Subscribe to the State or use the Actions
```js
...

import { isAuthenticated } from "./store";

...

const ActionComponent = () => {
  const action = isAuthenticated.useStoreAction("logout");

  return <button onClick={action}>
    Logout
  </button>;
};

...

const ProduceComponent = () => {
  const isUnAuthenticated = isAuthenticated.useStoreProduce("isUnAuthenticated");

  return (
    <h1>Is Unauthenticated: {String(isUnAuthenticated)}</h1>
  );
};

...

const ValueComponent = () => {
  const isAuth = isAuthenticated.useStoreValue();

  return (
    <h1>Is Authenticated: {String(isAuth)}</h1>
  );
};

...

const Component = () => {
  const [isAuth, setIsAuth] = isAuthenticated.useStore();

  return (
    <div>
      <h1>Is Authenticated: {String(isAuth)}</h1>
      <button
        onClick={() => setIsAuth(true)}
      >
        Login
      </button>
    </div>
  );
};
```

## Caveats
- Poor management, could lead to infinite state cycles - example listed below.
  ```js
  const isAuthenticated = gram({
    defaultValue: false,
    type: "boolean",
    stateType: "stateful",
    ...
    effects: {
      ...
      onUpdate: async () => {
        isAuthenticated.internal.setState(true);
      }
    },
    ...
  });
  ```
