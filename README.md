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
  Articles: [x] List [x] Create [x] Edit [ ] View  
  Podcasts: [x] List [ ] Create [ ] Edit [ ] View  
  Videos: [x] List [ ] Create [ ] Edit [ ] View  
  Glossary: [x] List [ ] Create [ ] Edit [ ] View  
  Events: [x] List [ ] Create [ ] Edit [ ] View  
  Users: [x] List [ ] Create [ ] Edit [ ] View  
[ ] User Invite
  [ ] Form Signup
[ ] Cookies (See Api README)
  [x] Setting/Removing Token in Cookies
  [ ] Login with Token: Call server
[ ] Populate Edit Forms from Store

Middle

[ ] Host on Heroku Dynos (or Zeit or Amazon ec2)
[ ] Use `react-ga` (Google Analytics) to track page views, etc.

Backend

See Api README for more detailed todo
[x] Connect with Cortex API and MongoDB (Local Env)  
[x] Schema
[ ] Login with Token: Verify, then send back User
```

## Version control

The `master` and `development` branches are the two active branches. Master contains the live production code. Development is the demo-able, next to release code.

Other branches are created per feature. Naming convention is loose, but choose a short, understandable term that describes the feature. Use hyphens, not spaces. For example: `analytics-components`.

When finished with a feature or bug fix, create a Pull Request on the development branch.

## Setup

I like `yarn`, but `npm` is fine too. In the project directory, you can run:

### `yarn install`

Installs all dependencies.<br>
When pulling updates, it's a good idea to run this again to get changes.

### `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Cortex API

Clone the API at https://github.com/KathrynBrusewitz/cortex-api<br>
Follow the setup and run instructions in the README.

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
- Barreling components for tidy imports means an extra file (`index.js`) for every directory. I'd just deal with messy imports for now.
- Use `.js` not `.jsx`

App design uses components from [Ant Design React UI Library](https://ant.design).
