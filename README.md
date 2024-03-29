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
- Structural
- No race conditions

### Supported Frameworks
- React (>=16.8.0)
- React Native (>=0.59)

### To install:

`yarn add grams`

or

`npm install grams`

## Definitions
Gram
| Name | Description | Required | Type |
| --- | ----------- | -------- | ---- |
| defaultValue | Default initial value of state | Y | any |
| type | Type of state value | Y | "string" \| "number" \| "boolean" \| "object" |
| stateType | Type of State | N | "stateful" \| "stateic" |
| produce | Modifications or mutations of state | N | - |
| actions | Actions to execute (can be promises) | N | - |
| effects | Various effects (hooks) that run based on lifecycle | N | - |
| middleware | Functions that execute before a state change | N | - |

State Types
| Name | Description |
| ---- | ----------- |
| stateful | A type of state that will cause a rerender |
| stateic | A type of state that will not cause a rerender (useful for static variables) |

Effects
| Name | Description |
| ---- | ----------- |
| onMount | Runs after the state has been initialized. (Can be a promise and can modify the state on return) |
| onUpdate | Runs after the state has been updated. Cannot modify state directly. |
| onRender | Runs after the subscribed components have been rerendered. Cannot modify state directly. |
| onUnMount | Runs after the state has been unmounted. Cannot modify state directly. |
| onError | Runs if the state has failed. Cannot modify state directly. |

## Specifications

### useStore
`useStore(key: string | ((stateKeys: StateKeys) => string)) => [state, setState]`

A hook that accepts the key of the state, subscribes the component to the state, and returns the value of the state as well as its setter function. (Works similar to `useState` found in React hooks).

### useStoreValue
`useStoreValue(key: string | ((stateKeys: StateKeys) => string)) => state`

A hook that accepts the key of the state, subscribes the component to the state and __only__ returns its value.

### useSetStore
`useSetStore(key: string | ((stateKeys: StateKeys) => string)) => setState`

A hook that accepts the key of the state and returns its setter function. *It does __not__ subscribe the component to the state.*

### useStoreProduce
`useStoreProduce(produceName: string | ((stateKeys: StateKeys) => string), key: string | ((stateKeys: StateKeys) => string)) => state`

A hook that accepts the name of the produce, the key of the state, subscribes the component to the state, and returns its mutated value.

### useStoreActions
`useStoreActions(actionName: string | ((stateKeys: StateKeys) => string), key: string | ((stateKeys: StateKeys) => string)) => setState`

A hook that accepts the name of the action, the key of the state, and returns its action function. *It does __not__ subscribe the component to the state.*

## Usage
### 1. Add the Provider to the root component
```js
...

import { Provider } from "grams";

...

root.render(
    <Provider>
      <App />
    </Provider>
);
```

### 2. Define the State
```js
...

import { gram } from "grams";

...

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

...

export const isAuthenticated = gram(
  false,
  "boolean",
  "stateful",
  {
    isUnAuthenticated: (currValue) => !currValue
  },
  {
    login: () => true,
    logout: () => false
  },
  {
    onMount: async (_, __, set) => {
      set(true, (storeKeys) => storeKeys.isLoading.key);
      await delay(1000);
      set(false, "isLoading");
      return true;
    }
  },
  {
    check: () => {
      console.log("auth middleware");
      return true;
    }
  }
);
```

### 3. Pass the State to the Provider
```js
...

import { Provider } from "grams";

...

root.render(
    <Provider models={{ isAuthenticated, isLoading }}>
      <App />
    </Provider>
);
```

### 4. Subscribe to the State or use the Actions
```js
...

import { useStoreActions, useStoreValue, useStoreProduce } from "grams";

...

const ActionComponent = () => {
  const login = useStoreActions("login", "isAuthenticated");

  return (
    <button
      onClick={() => {
        login();
      }}
    >
      Login
    </button>
  );
};

...

const ProduceComponent = () => {
  const isUnAuthenticated = useStoreProduce("isUnAuthenticated", "isAuthenticated");

  return (
    <h1>Is Unauthenticated: {String(isUnAuthenticated)}</h1>
  );
};

...

const ValueComponent = () => {
  const isAuthenticated = useStoreValue((storeKeys) => storeKeys.isAuthenticated.key);

  return (
    <h1>Is Authenticated: {String(isAuthenticated)}</h1>
  );
};

...

const Component = () => {
  const [isAuthenticated, setIsAuthenticated] = useStore((storeKeys) => storeKeys.isAuthenticated.key);

  return (
    <div>
      <h1>Is Authenticated: {String(isAuthenticated)}</h1>
      <button
        onClick={() => setIsAuthenticated(true)}
      >
        Login
      </button>
    </div>
  );
};
```

## Caveats
- In `StrictMode`, the store does not function well due to limitations. For further information regarding `StrictMode`, visit [React Docs](https://reactjs.org/docs/strict-mode.html).
  - To avoid this, the recommended approach is to add the `Provider` above `StrictMode`:
  ```js
  root.render(
    <Provider models={{ isAuthenticated, isLoading }}>
      <StrictMode>
          <App />
      </StrictMode>
    </Provider>
  );
  ```
- Poor management, could lead to infinite state cycles - example listed below.
  ```js
  const isAuthenticated = gram(
    false,
    "boolean",
    "stateful",
    {
      isUnAuthenticated: (currValue) => !currValue
    },
    {
      login: () => true,
      logout: () => false
    },
    {
      onMount: async (_, __, set) => {
        set(true, (storeKeys) => storeKeys.isAuthenticated.key);
        await delay(1000);
        set(false, (storeKeys) => storeKeys.isAuthenticated.key);
        return true;
      }
    },
    {
      check: () => {
        console.log("auth middleware");
        return true;
      }
    }
  );
  ```
- It could take time to setup the store. The store is created sequentially (one gram at a time) and if there are many grams defined, it could add overhead time.
