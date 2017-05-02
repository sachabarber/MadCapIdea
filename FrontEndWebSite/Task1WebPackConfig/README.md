# INSTALLATION

1. Install node : https://nodejs.org/en/download/
2. Install web pack globally from command line "npm install --g webpack"
3. Install react through NPM
	- npm install --save react react-dom @types/react @types/react-dom
4. Install babel through NPM
	- npm install --save-dev webpack (babel-loader needs this)
	- npm install --save-dev babel-core
	- npm install --save-dev babel-loader
	- npm install --save-dev babel-preset-es2015-native-modules
5. Install Lodash (the new underscore-esq library)
	- npm install --save Lodash
	- npm install --save-dev @types/lodash
6. Install webpack-dev-server 
	- npm install --save webpack-dev-server  -g

		
	
	

# RUNNING

from command line "webpack" or if you want to minify your final Js bundle "webpack -d"

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
