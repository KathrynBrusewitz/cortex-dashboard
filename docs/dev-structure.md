# App Structure and Design

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack. You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`. Read instructions below for using assets from JavaScript and HTML.

Top-level directories are not included in the production build so you can use them for things like documentation and boilerplate code.

App architecture is loosely based off of:
- [Redux on highly scalable javascript applications](https://medium.com/@alexmngn/how-to-use-redux-on-highly-scalable-javascript-applications-4e4b8cb5ef38),
- [React and Redux Boilerplate with Backend](http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#private-route-jsx),
- [Scaling with Ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be), and most importantly...
- [The 100% correct way to structure a React app](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)

App design uses components from [Ant Design React UI Library](https://ant.design).

## Future Changes

TODO: Breakdown `src` structure: `actions/`, `components/`, `constants/`, `reducers/`, etc.
