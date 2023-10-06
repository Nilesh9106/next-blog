---
title: "Learn Basics of Angular"
date: "October 6, 2023"
desc: "In this article, you will learn the basics of Angular like main files and binding in angular."
cover_image: "https://repository-images.githubusercontent.com/314186076/79a18fff-1aeb-4a12-9340-db81b383b5e7"
slug: basics-of-angular
keyword:
  [
  'angular',
  'typescript',  
  ]
---

# Basics of Angular

Let's start by creating an Angular project
1. first install angular cli
```
npm i -g @angular/cli
```
2. now create a project using ng command
```
ng new project-name
```
---
### what is NgModule?
- NgModule is a decorator function that takes a single metadata object whose properties describe the module. The most important properties are as follows.
- declarations: The components, directives, and pipes that belong to this NgModule.
- exports: The subset of declarations that should be visible and usable in the component templates of other NgModules.
- imports: Other modules whose exported classes are needed by component templates declared in this NgModule.
- providers: Creators of services that this NgModule contributes to the global collection of services; they become accessible in all parts of the app. (You can also specify providers at the component level, which is often preferred.)
- bootstrap: The main application view, called the root component, which hosts all other app views. Only the root NgModule should set the bootstrap property.
---
### Understanding main.ts file.
- main.ts is the entry point of the application.
- it is responsible for bootstrapping the AppModule.
- it is responsible for importing the required browser modules.
- it is responsible for importing the AppModule.
- it is responsible for enabling the production mode.
- it is responsible for rendering the AppModule.

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; // importing AppModule
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) // bootstrapping AppModule
  .catch(err => console.error(err));
```
---
### Understanding app.module.ts file.
- app.module.ts is the root module of the application.
- it is responsible for exporting the required components, services, directives, and pipes.
- it is responsible for bootstrapping the root component.
- it is responsible for defining the application level dependency injection container.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'; // importing AppComponent

@NgModule({
  declarations: [
    AppComponent // declaring AppComponent
  ],
  imports: [
    BrowserModule // importing BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent] // bootstrapping AppComponent
})
export class AppModule { }
```
---
### Understanding app.component.ts file.
- app.component.ts is the root component of the application.
- it is responsible for rendering the application.
- it is responsible for defining the application level dependency injection container.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // selector
  templateUrl: './app.component.html', // template
  styleUrls: ['./app.component.css'] // styles
})
export class AppComponent {
  title = 'my-first-app';
}
```
- selector: it is used to render the component in the application.It can be used as a custom HTML tag or a custom attribute or a class. It is a mandatory property. It is a string value. It must be unique in the application. It must be in lowercase. It must be in kebab-case. It must not contain any special characters except hyphen(-). It must not start with a number. It must not be a reserved keyword. It must not be a predefined HTML tag. 
---

### Services in Angular.
how to create a service in angular?
- create a service using ng command
```bash
ng g s service-name
```
- it will create a service file with the name service-name.service.ts
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {

  constructor() { }
}
```
#### what is use of Injectable decorator?
- it is used to inject the service in the component.
- it can have a single property providedIn. It is used to provide the service in the application. It can have three values.
  - root: It is used to provide the service in the application.
  - any: It is used to provide the service in the lazy loaded modules.
  - specific module: It is used to provide the service in the specific module.

- import the service in the component
```ts
import { ServiceNameService } from './service-name.service';
```

- inject the service in the constructor
```ts
constructor(private _serviceName: ServiceNameService) { }
```

- use the service in the component
```ts
this._serviceName.methodName();
```
---
### How to create a component in angular?
- create a component using ng command
```bash
ng g c component-name
```
- it will create a component file with the name component-name.component.ts
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-name', // selector
  templateUrl: './component-name.component.html', // template
  styleUrls: ['./component-name.component.css'] // styles
})
export class ComponentNameComponent implements OnInit {
  constructor() { }
}
```
---
## understanding binding in angular.
- binding is a process of communication between the component and the view.
- there are four types of binding in angular.
  - interpolation
  - property binding
  - event binding
  - two way binding
### what is Interpolation?
- Interpolation is a process of communication from the component to the view.
- it is represented by double curly braces {{}}.
- it can be used to display the component property value in the view.
- it can be used to display the component method return value in the view.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolation',
  template: `
    <h1>Interpolation</h1>
    <h2>{{ title }}</h2>
    <h2>{{ getTitle() }}</h2>
  `,
  styles: []
})
export class InterpolationComponent {
  title = 'Interpolation';
  getTitle() {
    return this.title;
  }
}
```
### what is Property Binding?
- Property Binding is a process of communication from the component to the view.
- it is represented by square brackets [].
- it can be used to set the property or attribute value of the HTML element.
- **it only accept the string value.**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  template: `
    <h1>Property Binding</h1>
    <h2 [title]="title">Property Binding</h2>
    <h2 [attr.title]="title">Property Binding</h2>
    <h2 [ngClass]="title">Property Binding</h2>
  `,
  styles: []
})
export class PropertyBindingComponent {
  title = 'Property Binding';
}
```
- binding class using property binding.
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  template: `
    <h1>Property Binding</h1>
    <h2 [class]="resClass">DDU</h2>  <== class = "success"
    <h2 [class.failure]="hasError">DDU</h2> <== class = "failure" if hasError = true else class = ""
    <h2 [ngClass]="textClasses">DDU</h2> <== class = "success" if textClasses.success = true else class = "failure" if textClasses.failure = true else class = "italic" if textClasses.italic = true else class = "" 
  `,
  styles: [`
    .success {
      color: green;
    }
    .failure {
      color: red;
    }
    .italic {
      font-style: italic;
    }
  `]
})

export class PropertyBindingComponent {
  resClass = 'success';
  hasError = true;
  isItalic = true;
  textClasses = {
    success: !this.hasError,
    failure: this.hasError,
    italic: this.isItalic
  };
}
```
- Binding to a Single Style using property binding.
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  template: `
    <h1>Property Binding</h1>
    <h2 [style.color]="'orange'">DDU</h2> <== style = "color: orange"
    <h2 [style.color]="hasError ? 'red' : 'green'">DDU</h2> <== style = "color: red" if hasError = true else style = "color: green"
    <h2 [style.color]="resColor">DDU</h2> <== style = "color: red" 
    <h2 [ngStyle]="styleClasses">DDU</h2> <== style = "color: red; font-style: italic;"
  `,
  styles: []
})

export class PropertyBindingComponent {
    resColor = 'red';
    hasError = true;
    styleClasses = {
        color: "red",
        fontStyle: "italic"
    };
}
```


### what is Event Binding?
- Event Binding is a process of communication from the view to the component.
- it is represented by round brackets ().
- it can be used to bind the event of the HTML element to the component method.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  template: `
    <h1>Event Binding</h1>
    <button (click)="onClick()">Click</button>
    <button on-click="onClick()">Click</button>
    <button (click)="oncClick($event)">Click</button>
  `,
  styles: []
})
export class EventBindingComponent {
    onClick() {
        console.log('Event Binding');
    }
    oncClick(event) {
        console.log(event);
    }
}
```

- Template Reference Variable
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  template: `
    <h1>Event Binding</h1>
    <input #myInput type="text">
    <button (click)="logName(myInput)">
        Log Element
    </button>
    <button (click)="logName(myInput.value)">
        Log Value
    </button>
  `,
  styles: []
})
export class EventBindingComponent {
    logName(element) {
        console.log(element);
    }
}
```
### what is Two Way Binding?
- Two Way Binding is a process of communication from the component to the view and from the view to the component.
- it is represented by square brackets [] and round brackets ().
- it can be used to bind the event of the HTML element to the component method.
- **NgModule must import FormsModule.**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-two-way-binding',
  template: `
    <h1>Two Way Binding</h1>
    <input [(ngModel)]="title" /> <== [value]="title" (input)="title = $event.target.value" when input event is fired then set the value of title property to the value of input element.
    <h2>{{ title }}</h2>
  `,
  styles: []
})
export class TwoWayBindingComponent {
  title = 'Two Way Binding';
}
```
---

