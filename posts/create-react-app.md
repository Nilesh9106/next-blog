---
title: 'Create react app in Simple steps'
date: 'june 9, 2023'
desc: 'Here are The Simple steps to create react app '
cover_image: '/images/create-react-app.png'
slug: create-react-app
keyword: ['ReactJS','Installation']
---

## What is React js?

React.js is a front-end JavaScript framework developed by Facebook. To build composable user interfaces predictably and efficiently using declarative code, we use React. It’s an open-source and component-based framework responsible for creating the application’s view layer.  

React is a popular JavaScript library used for web development.  Today’s many large-scale companies (Netflix, Instagram, to name a few) also use React JS. There are many advantages of using this framework over other frameworks, and It’s ranking under the top 10 programming languages for the last few years under various language ranking indices.

1. first check wheather node install in your computer or not
2. open your terminal and run this line to create a project:
```bash
npx create-react-app my-app
```

3. Now you can run your app with:
```bash
cd my-app
npm start
```
4. Look at your index.js it will look like this.
```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
5. change text in your app.js you will your result !