# Project Title

MetaGym Web Forum (FrontEnd)

## Demo link:

To be deployed soon.

## Table of Content:

- [About The App](#about-the-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Status / Features](#status)
- [Credits](#credits)
- [License](#license)

## About The App

**[MetaGym Web Forum]** is a Single Page Application (SPA) that provides a platform for the fitness community to discuss fitness related topics and build a cohesive community. Individuals who are planning to start a healthy lifestyle could ask experienced members on the platform for tips. For instance, they could ask for ideal workout routines be it in weight-lifting or calisthenics. Moreover, experienced individuals would be able to expand their knowledge from other users as well. An example would be, one could start a discussion about the best and most efficient tricep exercise for hypertrophy. All these are possible through the platform where users could simply create an account and start a discussion or thread and other users could input their opinions respectively. The application also caters to various topics or categories such as body weight exercise, running, weight lifting, power lifting and more.

## Screenshots

_(Work in progress)_

## Technologies

**Language:**\
Typescript

**SPA Framework & Libraries:**\
React.js\
Redux Toolkit\
Reach Hook Form\
Material UI\
Axios

## Setup

- Note: Make sure to set up and run **[MetaGym Web Forum Backend API]** first. Check the [MetaGym Backend API Repository](https://github.com/jmsandiegoo/metagym_web_forum_backend)
- After setting up and running the backend api download or clone this repository
- run `yarn` to install the project's dependencies
- create a `.env` file in the root project directory and add `REACT_APP_API_ENDPOINT="<backend-url>"` (if backend is ran locally, the url would be `"http://localhost:8080"` port can vary depening on your local configuration when starting the backend)
- run `yarn start` assuming the backend is already running.

## Status / Features

**[MetaGym Web Forum Frontend]** currently has the following features:

**Authentication System (JWT)**\
&emsp;- Login / Signup\
&emsp;- Forgot Password (In development...)

**Thread Feature**\
&emsp;- View Thread\
&emsp;- Create Thread\
&emsp;- Delete Thread

**Comment Feature**\
&emsp;- View Thread Comment\
&emsp;- Create Thread Comment\
&emsp;- Edit Thread Comment\
&emsp;- Delete Thread Comment

**Interests Feature**\
&emsp;- Thread Categorised into Interests

**Search Feature**\
&emsp;- Search a Thread w/ Interests & Title Keyword

**Upvote Feature**\
&emsp;- Upvote Thread\
&emsp;- Downvote Thread\
&emsp;- Upvote Comment\
&emsp;- Downvote Comment

**Profile Feature**\
&emsp;- View User Profile\
&emsp;- View User Threads\
&emsp;- View User Comments (In development...)\
&emsp;- Edit Profile and Account (In development...)

`More features` will be out in the future like:\
&emsp;- Profile Photos\
&emsp;- Thread Body Formatting and Image support\
&emsp;- Pagination & Sorting of Thread and Comment List\
&emsp;- Search Users

## Credits

List of contriubutors:

- [Jm San Diego](https://github.com/jmsandiegoo)

## License

MIT license
