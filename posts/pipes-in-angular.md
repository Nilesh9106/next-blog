---
title: "Learn Basics of Pipes Angular"
date: "October 7, 2023"
desc: "In this article, you will learn the basics of pips in Angular."
cover_image: "https://repository-images.githubusercontent.com/314186076/79a18fff-1aeb-4a12-9340-db81b383b5e7"
slug: pipes-in-angular
keyword:
  [
  'angular',
  'typescript',  
  ]
---

# Pipe in Angular

## Pipe

Pipe is a feature in Angular that allows us to transform data before displaying it in the view. It is represented by the pipe character `|` and followed by a pipe name. For example, `{{ name | uppercase }}` will display the name in uppercase. 

## Built-in Pipes

Angular comes with a few built-in pipes. Here are some of them:

### Uppercase

`{{ name | uppercase }}` will display the name in uppercase.

### Lowercase

`{{ name | lowercase }}` will display the name in lowercase.

### Date with example

`{{ today | date }}` will display the date in the default format. The default format is `mediumDate`. The default format can be changed by passing a parameter to the pipe. For example, `{{ today | date:'shortDate' }}` will display the date in the short format.

### Currency with example

`{{ price | currency }}` will display the price in the default format. The default format is `USD`. The default format can be changed by passing a parameter to the pipe. For example, `{{ price | currency:'INR' }}` will display the price in the Euro format.

### Decimal

`{{ price | decimal }}` will display the price in the default format. The default format is `2.0-2`. The default format can be changed by passing a parameter to the pipe. For example, `{{ price | decimal:'1.0-0' }}` will display the price in the short format.

### Percent

`{{ price | percent }}` will display the price in the default format. The default format is `2.0-0`. The default format can be changed by passing a parameter to the pipe. For example, `{{ price | percent:'1.0-0' }}` will display the price in the short format.

### JSON
    
`{{ { "name": "John", "age": 30 } | json }}` will display the JSON object in the default format. 

```html
{{ { "name": "John", "age": 30 } | json }}
```

### Slice

`{{ name | slice:0:5 }}` will display the name after slicing 0 to 5 characters.

### Async

`{{ name | async }}` will display the name after resolving the promise.

### Custom

We can also create our own custom pipe. We will learn about it in the next section.
## Custom Pipe

We can create our own custom pipe. To create a custom pipe, we need to create a class and implement the `PipeTransform` interface. The `PipeTransform` interface has a method called `transform` that takes a value and returns a value. The `transform` method is called when the pipe is used in the view. 

You also can create pipe by ng command. For example, `ng generate pipe custom` will create a pipe called `custom` in the `app` folder.

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return null;
  }
}
```

The `Pipe` decorator has a `name` property that is used to specify the name of the pipe. The `transform` method takes two parameters. The first parameter is the value that is passed to the pipe. The second parameter is the arguments that are passed to the pipe. The `transform` method returns the transformed value.

Let's create a custom pipe that will convert the name to uppercase.

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.toUpperCase();
  }
}
```

Now, we can use the custom pipe in the view.

```html
{{ name | custom }}
```

## Chaining Pipes

We can chain pipes. For example, `{{ name | uppercase | lowercase }}` will display the name in lowercase.

## Pure and Impure Pipes

Pipes are pure by default. A pure pipe is called only when the input value changes. An impure pipe is called every time the change detection runs. We can make a pipe impure by setting the `pure` property of the `Pipe` decorator to `false`.

```ts
@Pipe({
  name: 'custom',
  pure: false
})
```
