# Setup for Development

## 1. Dashboard Setup

Clone this repo to get started:
```
git clone https://github.com/KathrynBrusewitz/cortex-dashboard.git
```

Then inside the project directory, you can run:

```
# Installs all dependencies
yarn install

# Runs the app in development mode
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

## 2. API Setup

Because the API is already hosted, you do not necessarily need a local instance of the database and the API for CRUD operations executed by the Dashboard.

If you **are not** working with the API at all, you may ignore this section and continue working. However, ensure you are using the hosted API by checking the configuration file `/src/constants/index.js`:

```
// Ensure this line exists. `1.0` refers to version 1.0
export const baseURL = 'https://cortexapi.com/1.0/';
```

Additionally, remember the API *is live* and the database it operates *is live*. As far as validation and authorization goes, there are safeguards in place to protect the database as much as possible. However, you still risk publishing development material not intended for real-world audiences.

If you **are** working with the API, say, building and testing new routes and features, just update the `baseURL` appropriately to refer to wherever you are running it. To work with a local instance of the API, then go to the [Cortex API](https://github.com/KathrynBrusewitz/cortex-api.git) project and follow the README for directions on getting it up and running.

## 3. Next Steps

That's all you need to get started. I recommend you next read the rest of the docs for general tips, workflow, and patterns.

## 4. Future Changes

In my opinion, it would be nice to utilize Docker for continuous integration and deploy separate Production and Development builds.

TODO: Explore benefits of integrating Docker for Cortex. Put together build and deploy workflow.
