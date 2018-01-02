module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "node": true
    },
    "globals": {
        "Table": true,
        "alertMsg": true
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "always"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
        "curly": ["error", "multi"],
        "object-curly-spacing":["error", "always"],

        "space-before-function-paren": ["error", "always"],
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
    }
};
