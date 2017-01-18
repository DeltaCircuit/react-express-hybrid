# react-express-hybrid
This is a highly-opinionated project architecture for handling multiple React front-end apps and single API backend server on the same server. 
This project has pre-built configuration settings that will allow you to create a production-ready build for the server and the client on a single command.

### Getting Started
1. Clone the repository
2. Do an NPM install `npm i`
3. Done!

### Folder Structure
* All the source codes for the app should reside in the `src` directory.
* There's two separate folders for client and server source codes.
* The `dist` folder will have your final production code.
* The `bin` directory will have all your server codes which is transpiled to _ES5_
* There's two files in the `public` folder. `template.html` is used as a template for generating HTML pages for your React modules. The `index.html` can be used by you to create a welcome-page for your entire app. This `index.html` would be the page displayed to the user when he first accesses the website.  

### React
* Your React source codes should reside on the `src/client` folder.
* Now in this folder, you can create as many sub-react apps you want. For example, if you want to create separate React apps for Login and Register, you can do that. Just create a subfolder in the `client` directory and you're done. It's better to modularize the React apps since it'll reduce the JS bundle size drastically on production.
* If you created two modules Login and Register, the source codes for both modules will reside in `src/client/login` and `src/client/register`.
* So, to access the _login_ module, the url would be like this: `http://localhost:1234/login` and for _register_ it'd be `http://localhost:!234/register`.
* This project has a built-in entry-point generator which helps the `webpack` to work. It works on _convention_ more than _configuration_. So, it'll assume and `index.js` file will be your entry file to your module and will create the `webpack` bundle configuration.
* If you didn't create any sub-react apps, this entry-point generator will search for `index.js` in the `src/client` folder. This is required. And the user can access your module via `http://localhost:1234/main`'.
* Also, this project is equipped with a HTML generator for all the React apps you create. These HTML pages will have only the reference to the respective module bundle. This will reduce the dependency of scripts referred.  

### Express
* The source codes for the server side should reside in the `src/server` folder.
* The backend runs on `express` server.
* This `express` server instance is configured to run `WebpackDevServer` on development environment.
* `server.js` is the main entry point for your express server.
* The server is equipped with **Hot-Module-Replacement** by default.
* You can further modularize further by creating subfolders/files in this `src/server` directory.  

### Coding Guidelines
* This project strictly follows Airbnb’s styling guide. Except _one rule_. The `react/jsx-filename-extension` rule. So, that you can add `JSX` codes to your `JS` files.
* Babel is configured to this project with the `latest` preset. So, you can write your source JS in `ES6` or even in `ES7` (it's recommended)
