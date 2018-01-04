module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "node": true
    },
    "globals": {
        "Table": true,
        "alertMsg": true,
        "Store":true,
        "NAME_EMPTY_ALERT": true,
        "USER_EXIST_ALERT": true,
        "EMAIL_EMPTY_ALERT": true,
        "WRONG_FORMAT": true,
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "always"],
        "comma-spacing" :["error"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "curly": ["error", "multi"],
        "object-curly-spacing":["error", "always"],

        "space-before-function-paren": ["error", "always"],
        "space-infix-ops":["error"],
        "brace-style": ["error"],
        "camelcase": ["error", {"properties": "always"}],
        "spaced-comment": ["error", "always", {
            "line": {
                "markers": ["/"],
                "exceptions": ["-", "+"]
            },
            "block": {
                "markers": ["!"],
                "exceptions": ["*"],
                "balanced": true
            }
        }],
        "space-before-blocks": "error",
        "keyword-spacing": ["error", { "before": true }],
        "key-spacing":["error"]
    }
};
