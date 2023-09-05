// app.js

var routes = {
  '#/': 'screens/home.html',
  '#/page': 'screens/page.html',
};

function loadHTML(url, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      callback(data);
    });
}

function navigateTo(route) {
  window.location.hash = route;
}

function loadRoute(route) {
  var container = document.querySelector('[data-screen="main"]');
  var screenName = route.replace('#/', ''); // Extract screen name from route
  if (!screenName) screenName = 'home'; // Default to 'home' if root route

  loadHTML(routes[route], (html) => {
    container.innerHTML = html;
    loadComponents(container);

    // Load and execute the screen's JS
    var scriptPath = 'screens/' + screenName + '.js';
    fetch(scriptPath)
      .then((response) => response.text())
      .then((data) => {
        var script = document.createElement('script');
        script.textContent = data;
        document.body.appendChild(script);
      });
  });
}

function loadComponents(container) {
  var components = container.querySelectorAll('[data-component]');
  components.forEach((component) => {
    var componentName = component.getAttribute('data-component');

    // Load the component's HTML
    loadHTML('components/' + componentName + '.html', (html) => {
      component.innerHTML = html;

      // Now, load and execute the component's JS
      var scriptPath = 'components/' + componentName + '.js';
      fetch(scriptPath)
        .then((response) => response.text())
        .then((data) => {
          // Dynamically create a script tag and execute the script
          var script = document.createElement('script');
          script.textContent = data;
          document.body.appendChild(script);
        });
    });
  });
}

// Listen for hash changes
window.addEventListener('hashchange', function () {
  loadRoute(window.location.hash);
});

// Initial load
if (window.location.hash) {
  loadRoute(window.location.hash);
} else {
  navigateTo('#/');
}
