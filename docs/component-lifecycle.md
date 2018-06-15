# Component Lifecycle

Refresh yourself on with the [latest changes and deprecations](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes) to React's [Component Lifecycle](https://reactjs.org/docs/react-component.html).

Avoid using `componentWillMount` at all. It will be deprecated in React 17.

## State Rehydration

`componentDidMount` is the best place to call actions making an API calls that hydrate the Redux state.

> componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.

## State Rehydration for Tables

Table Components, e.g. `ListPodcasts`, `ListArticles`, follow a pattern for rehydrating the state in order to stay up-to-date with contents from the database.

```
rehydrateState() {
  this.props.getContents({ type: 'podcast' })
}

componentDidMount() {
  this.rehydrateState();
}

componentDidUpdate(prevProps, prevState, snapshot) {
  if (prevProps.isDeletingContent) {
    this.rehydrateState();
  }
}
```
Following DRY principles, the action(s) that <i>get</i> content for the Component to render are in one reusable function called `rehydrateState()`. When the Component first mounts, it calls `rehydrateState()` to make the appropriate API calls (see "Component Lifecycle" notes to understand why `componentDidMount()` is used). When content is deleted, we rehydrate the state again when the state of `isDeletingContent` is updated from `true` (is awaiting a response) to `false` (has received response).

The reason for this pattern is that actions which change the state of contents on the database do not, by design, change the state of contents in the store. This is because the action `getContents` requires a filter for the type of contents; otherwise, it will retrieve contents of all types. If the action `deleteContent` also calls `getContents` upon successful response to update the state, it will update the state with all contents. As `deleteContent` only requires an `id`, it is unaware of any query to use for `getContents`.

In the future, we can consider:
- Add actions specific to content types, e.g. `deletePodcast`
- Add a `filters` state, e.g. `state.content.filters: {}`
- Restructure actions and reducers some other way
