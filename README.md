# Gardening Calendar

## Tech Stack

- [Next.js](https://nextjs.org/) - the [React](https://react.dev/) framework for the web that provides server-side rendering, automatic code splitting, and easy configuration for building performant web applications. Bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- [Typescript](https://www.npmjs.com/package/typescript) - a typed version of JavaScript that improves code quality and maintenance
- [Redux](https://redux.js.org/) - a state management library for JavaScript applications
- [Redux Toolkit](https://redux-toolkit.js.org/) - an official opinionated package that simplifies the use of Redux
- [Firebase](https://firebase.google.com/) - an application development platform that provides backend services, authentication, cloud storage, hosting, and more
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - a set of server libraries that lets you interact with Firebase from privileged environments
- [MongoDB](https://www.mongodb.com/) - open-source NoSQL database that is well-suited for storing data in JSON-like documents
- [Mongoose](https://mongoosejs.com/) - an object data modeling (ODM) library for MongoDB

## Features

#### Authentication

Users can securely sign in to the application, backed by the robust security and reliability of Firebase Authentication. Supported methods:

- Sign up and sign in with email and password. Users are required to verify their email before signing in.
- Sign in with Google account.
- Sign in with GitHub account.

#### Plants API

- Authenticated users are allowed to access the Plants API routes.
- Users can view their plant collection, add new plants, edit existing plants, move plants to trash, restore plants and delete plants.
