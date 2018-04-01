<h1 align="center">
  Cortex Dashboard
</h1>

Admin Portal, Content Management, and Analytics for Grey Matters and other science content/experience creators.

More extensive documentation can be found in `/docs`. Below should give you enough instructions to get started.

## Version control

The `master` and `development` branches are the two active branches. Master contains the live production code. Development is the demo-able, next to release code.

Other branches are created per feature. Naming convention is loose, but choose a short, understandable term that describes the feature. Use hyphens, not spaces. For example: `analytics-components`.

When finished with a feature or bug fix, create a Pull Request on the development branch.

## Dev Setup

I prefer using `yarn`, but you can use `npm` if you prefer.<br>
In the project directory, you can run:

### `yarn install`

Installs all dependencies.<br>
When pulling updates, it's a good idea to run this again to get changes.

### `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Folder Structure

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.
