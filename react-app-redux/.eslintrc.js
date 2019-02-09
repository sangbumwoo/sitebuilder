module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "globals": {
        "fetch": false,
        "window": true,
        "document": true,
        "localStorage": true,
        "FormData": true,
        "alert": true
    },
    "rules": {
        // "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-filename-extension": 0,
        "comma-dangle": ["error", "never"],        
        "implicit-arrow-linebreak": 0,
        "no-console": 0,
        "jsx-a11y/label-has-for": 0,
        // "react/jsx-no-bind": 0,
        "no-underscore-dangle": ["error", { "allow": ["_id"] }]
        // "class-methods-use-this": 0
        // "react/prop-types": [2, { ignore: ['children'] }],
      }
};