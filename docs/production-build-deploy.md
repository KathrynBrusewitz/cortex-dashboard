# Production Building and Deployment

# Overview

Originally, the client build was deployed to [AWS S3](https://aws.amazon.com/s3/). Now, we are deploying the Dashboard to [Firebase](https://console.firebase.google.com/).

The reason for switching from S3 to Firebase is because S3 does not support hosting Single-Page Applications (SPAs) with proper URLs.

Although I followed [Keita's solution](https://keita.blog/2015/11/24/hosting-a-single-page-app-on-s3-with-proper-urls/) and [John Louros' solution](https://johnlouros.com/blog/using-CloudFront-to-serve-an-SPA-from-S3) to use CloudFront to serve an SPA hosted on S3, this process is too much a hack-y workaround with undesirable side-effects.

Because SPAs use  `pushState` to simulate URLs, it's always going to return a 404 error response when jumping to a nested url. Overwriting 404 responses is, in my opinion, a bandaid fix and a better experience is warranted.

Firebase Hosting, on the other hand, fully supports SPAs. Out of the box, Firebase Hosting provides three advantages:
- HTTPS
- Uses CDNs to deliver global fast access
- Uses URL rewriting to stop the server from throwing 404s

# Deployment Setup

You will need the Firebase CLI. Instructions can be [found here](https://firebase.google.com/docs/hosting/deploying).

In summary, run the following commands:

```
# Globally install Firebase tools
npm install -g firebase-tools

# Connect to the Firebase account
firebase login
```

You do not need to run `firebase init` because the file `firebase.json` already exists in the project directory.

# Build and Deploy

1. Make sure that you are using the hosted API by checking the configuration file `/src/constants/index.js`:

```
// Ensure this line exists. Update the version number as necessary
export const baseURL = 'https://cortexapi.com/1.0/';
```

2. Run the following commands:

```
# Build the app. This will create/update the `build/` folder
yarn build

# Deploy to Firebase
firebase deploy
```
