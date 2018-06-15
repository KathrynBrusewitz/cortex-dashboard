# Style Guide

Just as Airbnb and Google have their own style guides and opinions, I have my own. I find value in establishing some semblance of standardization. They are not necessarily "correct", but consistency begets integrity and efficiency.

- Name your file the same as the thing you're exporting from that file.
- Barreling components for tidy imports means an extra file (`index.js`) for every directory. I'd just deal with messy imports for now. However, it can make sense for some folders. For this project, I do barrel Redux `/actions` and `/reducers`.
- Use `.js` not `.jsx`.
- Use the prefix `is` if variable is boolean: `gettingUsers => isGettingUsers`.
- For consistency, try sticking with action words that originate from CRUD and HTTP requests: `createX` or `postX`, `retrieveX` or `getX`, `updateX` or `putX`, and `deleteX`.
- Get familiar with the [latest changes and deprecations](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes) to React's [Component Lifecycle](https://reactjs.org/docs/react-component.html).
