---
title: "Learn Basics of Javascript"
date: "june 10, 2023"
desc: "In this article you will learn basics of javascript like datatypes ,objects etc."
cover_image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
slug: basics-of-javascript
keyword:
  [
    "javascript",
    "Basics",
  ]
---

## What is Javascript?

#### JavaScript is a powerful programming language that can add interactivity to a website. It was invented by Brendan Eich.

If we consider html to be skeleton of website then Javascript will be brain of website. Developers have written a variety of tools on top of the core JavaScript language, unlocking a vast amount of functionality with minimum effort. These includes library like react js,next js etc also we can use backend with the help of node js which uses javascript. Lets learn the Basics of this amazing programming language.

### How to add Javascript to your page ?

1. First create `index.js` and `index.html` file in your page folder

2. In your `index.html` file, enter this code on a new line, just before the closing `</body>` tag (or you can add this on `head` tag)
```html
<script src="index.js"></script>
```
3. Thats All ! Now you write your Javascript code in `index.js` file
```js
console.log('Hello World)
```

### Declaring variables

+ we can declare variables using three keywords.
```js
var variableName; // allow to declare same variable many time
let variableName; // don't allow to declare same variable more then one time
const variableName; // can not change value of variable
```

### Data Types

+ A value in JavaScript is always of a certain type. For example, a string or a number.
+ We can put any type in a variable. For example, a variable can at one moment be a string and then store a number:

```js
// no error
let message = "hello";
message = 123456;
```

1. **Number**
```js
let n = 123;
n = 12.345;
```
+ The number type represents both integer and floating point numbers.
+ Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: `Infinity`, `-Infinity` and `NaN`.
```js
alert( 1 / 0 ); // Infinity
alert( "not a number" / 2 ); // NaN, such division is erroneous
```

2. **String**
+ A string in JavaScript must be surrounded by quotes.
```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```
+ In JavaScript, there are 3 types of quotes.
  1. Double quotes: "Hello".
  2. Single quotes: 'Hello'.
  3. Backticks:  `Hello`  .

3. **boolean**
+ The boolean type has only two values: true and false.

```js
let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")
```

4. NULL Value
+ The special null value does not belong to any of the types described above.
```js
let age = null;
```

5. undefined value
+ The special value undefined also stands apart. It makes a type of its own, just like null.
+ The meaning of undefined is “value is not assigned”.
+ If a variable is declared, but not assigned, then its value is undefined:
```js
let age;

alert(age); // shows "undefined"
```
+ Technically, it is possible to explicitly assign undefined to a variable but we don’t recommend doing that.

```js
let age = 100;

// change the value to undefined
age = undefined;

alert(age); // "undefined"
```

6. Objects

+ Objects are used to store keyed collections of various data and more complex entities.
+ An object can be created with figure brackets {…} with an optional list of properties. A property is a “key: value” pair, where key is a string (also called a “property name”), and value can be anything.
+ An empty object (“empty cabinet”) can be created using one of two syntaxes:

```js
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```
+ We can immediately put some properties into {...} as “key: value” pairs:
```js
let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};
```
+ We can add, remove and read files from it at any time.
+ Property values are accessible using the dot notation:
```js
// get property values of the object:
alert( user.name ); // John
alert( user.age ); // 30
```
+ we can also add value by dot operator
```js
user.isAdmin = true;
```
+ To remove a property, we can use the delete operator:
```js
delete user.age;
```
+ we can also access value by square bracket
```js
let user = {};
// set
user["likes birds"] = true;
// get
alert(user["likes birds"]); // true
// delete
delete user["likes birds"];
```
+ The typeof operator returns the type of the argument. It’s useful when we want to process values of different types differently or just want to do a quick check.
```js
typeof 0 // "number"
typeof "foo" // "string"
typeof true // "boolean"
```