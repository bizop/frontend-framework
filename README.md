
# Simple SPA Web App Documentation

Welcome to the Simple SPA Web App framework. This documentation will guide you through creating single-page applications (SPAs) with ease, using basic HTML, CSS, and JavaScript.

## Overview

This framework is built to allow for:
- Easy addition of new screens and components.
- Use of components within screens and other components.
- Efficient routing for single page applications.

## Directory Structure

```
- app.js
+ assets
  + css
    - styles.css
+ components
- index.html
+ screens
```

### Descriptions:

- **app.js**: Core application logic, including routing and component/screen loading.
- **assets**: Contains subdirectories for various assets, such as CSS, images, etc.
- **components**: Contains pairs of `.html` and `.js` files for each UI component. Components are reusable UI pieces.
- **screens**: Contains pairs of `.html` and `.js` files representing full screens/pages of the application.

## Getting Started

### 1. Adding a New Screen

To add a new screen:

1. Create two new files in the `screens` directory: `[screenName].html` for the screen's HTML and `[screenName].js` for its JavaScript logic.
2. Update the `routes` object in `app.js` to include the new screen's route and its associated HTML file path.

```javascript
var routes = {
  '#/': 'screens/home.html',
  '#/page': 'screens/page.html',
  // Add your new route here
  '#/[yourRoute]': 'screens/[screenName].html',
};
```

3. Implement your screen's logic in `[screenName].js`. Ensure any functions or elements you want to interact with are defined and properly initialized.

### 2. Adding a New Component

To add a new component:

1. Create two new files in the `components` directory: `[componentName].html` for the component's HTML structure and `[componentName].js` for its logic.
2. In the place where you want to use the component (either in a screen or another component), add the following HTML:

```html
<div data-component="[componentName]"></div>
```

The framework will automatically fetch and render the component's HTML and execute its associated JS.

### 3. Interactivity Between Components

To implement interactivity between components:

1. Ensure the functions or elements you want to interact with are globally accessible. This is achieved by defining them in the component's `.js` file without any encapsulating functions or closures.
2. Call or interact with these functions or elements from other components or screens as needed.

## Advanced

### Using LocalStorage

The `todoList` component demonstrates how to utilize the browser's `localStorage` for persistent data storage across sessions. You can use the same pattern:

1. Fetch data from `localStorage` when initializing:
   ```javascript
   var data = JSON.parse(localStorage.getItem('dataKey'));
   ```

2. Update `localStorage` whenever the data changes:
   ```javascript
   localStorage.setItem('dataKey', JSON.stringify(data));
   ```

### Handling Events

To handle events such as clicks or input changes:

1. Add an event listener directly in the HTML, e.g., `onclick="functionName()"`.
2. Define the event handling function in the associated `.js` file.

## Conclusion

This simple SPA framework allows for efficient and organized development of web applications without the overhead of larger frameworks. By understanding its structure and conventions, developers can quickly create and expand web applications.
