# INSTALLATION

1. Install node : https://nodejs.org/en/download/
2. Install web pack globally from command line "npm install --g webpack"
3. Install react through NPM
	- npm install --save react react-dom 
	- npm install --save-dev @types/react @types/react-dom
4. Install babel through NPM
	- npm install --save-dev webpack (babel-loader needs this)
	- npm install --save-dev babel-core
	- npm install --save-dev babel-loader
	- npm install --save-dev babel-preset-es2015-native-modules
	- npm install --save-dev babel-preset-react
5. Install Lodash (the new underscore-esq library)
	- npm install --save Lodash
	- npm install --save-dev @types/lodash
6. Install webpack-dev-server 
	- npm install --save webpack-dev-server  -g
7. Install on-build-webpack (to unlink files on build)
	- npm install --save-dev on-build-webpack
8. Install webpack-merge 
    - npm install webpack-merge -g
	- npm install webpack-merge --save
9. Install webpack-merge 
    - npm install webpack -g
	- npm install webpack --save		
10. Install SASS loaders
    - npm install --save-dev css-loader
    - npm install --save-dev node-sass	
    - npm install --save-dev sass-loader	
	- npm install --save-dev extract-text-webpack-plugin
11. Install JQuery
    - npm install --save jquery 
	- npm install --save-dev @types/jquery 
12. Install bootstrap
    - npm install bootstrap --save
	- npm install react-bootstrap --save
	- npm install url-loader
	- npm install file-loader
	- npm install --save react-bootstrap


# RUNNING IT ALL

from command line "webpack" or if you want to minify your final Js bundle "webpack -d"

DEVELOP
webpack --config webpack.develop.js -d

PROD
webpack --config webpack.production.js -p







# WHAT DOES IT DEMONSTRATE

- TypeScript loader
- Using react with TypeScript
- Using typings for JS libraries through NPM
- Creating an image bundle
- Create a less/sass bundle
- ES6 modules
- Babel
- SourceMap
- Production webpack vs develop webpack
- How to get around strip-loader loader issues with WebPack2 to remove things like console.log(..)
  where we use Uglify to the job instead
