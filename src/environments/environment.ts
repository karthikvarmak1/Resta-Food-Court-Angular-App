// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyABeFIRgmTo0ww80mMyyl5C6lNGOY4wfs4",
    authDomain: "resta-food-court.firebaseapp.com",
    databaseURL: "https://resta-food-court.firebaseio.com",
    projectId: "resta-food-court",
    storageBucket: "resta-food-court.appspot.com",
    messagingSenderId: "455200963484"
  },
  stripeKey : 'pk_test_xOpiSH7TtYtQWNqxF0WXI6uT',
  serverURL : 'http://localhost:3000/',
  folderURL : 'http://localhost:3000/vendor/upload/',
  socketURL : 'http://localhost:3000/',
};
