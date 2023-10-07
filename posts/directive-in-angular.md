---
title: "Learn Basics of Directive in Angular"
date: "October 6, 2023"
desc: "In this article, you will learn the basics of Directive in Angular."
cover_image: "https://repository-images.githubusercontent.com/314186076/79a18fff-1aeb-4a12-9340-db81b383b5e7"
slug: directive-in-angular
keyword:
  [
  'angular',
  'typescript',  
  ]
---

## Directive in Angular

### types of directive

1. Component Directive
    - directives with a template. Component is a directive with a view/template

2. Structural Directive
    - change the DOM layout by adding and removing DOM elements. Structural directives are easy to recognize. An asterisk (*) precedes the directive attribute name as shown below.
    - eg. ngIf, ngFor, ngSwitch
3. Attribute Directive
    - change the appearance or behavior of an element, component, or another directive. Attribute directives are easy to recognize. A leading bracket ([]) precedes the directive attribute name as shown below.
    - eg. ngClass, ngStyle

### Structural Directive

#### ngIf

- The `*ngIf` directive removes or recreates a portion of the DOM tree based on an expression. If the expression assigned to `*ngIf` evaluates to a truthy value then the element is displayed otherwise the element is removed from the DOM tree.
- The `*ngIf` directive is used to conditionally include a template.

```html
<div *ngIf="condition">
  ...
</div>
```

- The `*ngIf` directive can also be used to conditionally include or exclude a block of HTML statements.

```html
<div *ngIf="condition; else elseBlock">
  ...
</div>
<ng-template #elseBlock>
  ...
</ng-template>
```

- The `*ngIf` directive can also be used to conditionally include or exclude a block of HTML statements using the `then` and `else` syntax.

```html
<div *ngIf="condition; then thenBlock else elseBlock"></div>
<ng-template #thenBlock>
  ...
</ng-template>
<ng-template #elseBlock>
  ...
</ng-template>
```

#### ngFor

- The `*ngFor` directive is used to repeat a portion of HTML template once per each item from an iterable list (Collection).
- The `*ngFor` directive is used to display each item in the list.

```html
<div *ngFor="let item of list">
  ...
</div>
```

- You can also access the index of each item using the `index` keyword.

```html
<div *ngFor="let item of list; index as i">
  ...
</div>
```

#### ngSwitch

- The `ngSwitch` directive is used to conditionally swap DOM structure on your template based on a scope expression.
- The `ngSwitch` directive is used to display one element from a set of elements based on condition.
- The `ngSwitch` directive evaluates the expression and then compares the resulting value with all values sequentially.
- If there is a match, the associated element is displayed otherwise the default element is displayed.

```html
<div [ngSwitch]="condition">
  <div *ngSwitchCase="case1">...</div>
  <div *ngSwitchCase="case2">...</div>
  <div *ngSwitchDefault>...</div>
</div>
```

### Attribute Directive

#### ngClass

- The `ngClass` directive allows you to set the CSS class dynamically for a DOM element.
- The `ngClass` directive can be used in combination with the `class` attribute. If the `ngClass` expression evaluates to true then the specified CSS classes are added to the element otherwise removed.

```html
<div [ngClass]="classes">
  ...
</div>
```

```ts
classes = {
  'class1': true,
  'class2': true,
  'class3': false
}
```

#### ngStyle

- The `ngStyle` directive allows you to set the CSS style dynamically for a DOM element.

```html
<div [ngStyle]="styles">
  ...
</div>
```

```ts
styles = {
  'font-style': 'italic',
  'font-weight': 'bold'
}
```

### creating custom directive

- `ng generate directive <directive-name>`

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor() { }

}
```

- `ng generate directive <directive-name> --skipTests=true` to skip test file

- `ng generate directive <directive-name> --export` to export directive in module


```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
   }
}
```

- `ElementRef` is used to access the DOM element

```html
<p appHighlight>
  Start editing to see some magic happen :)
</p>
```
- `appHighlight` is the selector name
