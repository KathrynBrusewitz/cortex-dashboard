<h1 align="center">
  Cortex Dashboard
</h1>

Admin Portal, Content Management, and Analytics for Grey Matters and other science content/experience creators.

More extensive documentation can be found in `/docs`. Below should give you enough instructions to get started.

## Todo

```
Frontend

[x] General Page Routing  
[x] Global Alerts  
[x] Main Landing Components  
  [x] Form Login
[ ] Main Dash Components   
  Articles: [x] List [x] Create [x] Edit [x] View  
  Podcasts: [x] List [x] Create [x] Edit [x] View  
  Videos: [x] List [x] Create [x] Edit [x] View  
  Glossary: [x] List [ ] Create [ ] Edit [ ] View  
  Events: [x] List [x] Create [x] Edit [x] View  
  Users: [x] List [ ] Create [ ] Edit [ ] View  
[ ] User Invite
  [ ] Form Signup
[x] Cookies (See Api README)
  [x] Setting/Removing Token in Cookies
  [x] Login with Token: Call server
[ ] Populate Edit Forms from Store

Middle

[ ] Host on Heroku Dynos (or Zeit or Amazon ec2)
[ ] Use `react-ga` (Google Analytics) to track page views, etc.

Backend

See Api README for more detailed todo
[x] Connect with Cortex API and MongoDB (Local Env)  
[x] Schema
[x] Login with Token: Verify, then send back User

```

## Setup and Run Dashboard

I like `yarn`, but `npm` is fine too. In the project directory, you can run:

### `yarn install`

Installs all dependencies.<br>
When pulling updates, it's a good idea to run this again to get changes.

### `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Setup and Run API

### `git clone https://github.com/KathrynBrusewitz/cortex-api.git`

Clone the [Cortex API](https://github.com/KathrynBrusewitz/cortex-api.git).<br>
Follow the README instructions and run it alongside your Dashboard instance.

## Folder structure

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

Top-level directories are not included in the production build so you can use them for things like documentation and boilerplate code.

## Resources

App architecture is loosely based off of
[Redux on highly scalable javascript applications](https://medium.com/@alexmngn/how-to-use-redux-on-highly-scalable-javascript-applications-4e4b8cb5ef38), [React and Redux Boilerplate with Backend](http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#private-route-jsx), [Scaling with Ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be), and most importantly [The 100% correct way to structure a React app](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed).

Just my opinion, but generally:
- Name your file the same as the thing you're exporting from that file.
- Barreling components for tidy imports means an extra file (`index.js`) for every directory. I'd just deal with messy imports for now. However, it can make sense for some folders. For this project, I do barrel Redux `/actions` and `/reducers`.
- Use `.js` not `.jsx`.

App design uses components from [Ant Design React UI Library](https://ant.design).

## Developer Notes

<i>To be organized into docs at a later time.</i>

`componentDidMount` is the best place to call actions making an API calls that hydrate the Redux state.

```
componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. Setting state in this method will trigger a re-rendering.
```

Avoid `componentWillMount`. It will be deprecated in React 17.

Consider [Authenticated Components](https://stackoverflow.com/questions/34624257/react-router-redux-how-can-i-update-state-on-load-of-page-for-authentication) or fallback on Authenticated Routes.
