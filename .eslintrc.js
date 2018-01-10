module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    "rules":{
        "no-underscore-dangle": 0,
        "no-alert":0,
        "no-plusplus":0,
        "class-methods-use-this":0,
        "radix":["error", "as-needed"],
        "no-restricted-syntax":0,
        "guard-for-in":0
    }
};
