module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: "airbnb",
  globals: {
    mixpanel: true,
    Stripe: true,
    profitwell: true
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  plugins: ["flowtype", "react", "sorting"],
  rules: {
    "linebreak-style": 0,
    "arrow-body-style": ["off"],
    "arrow-parens": ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "only-multiline",
        exports: "only-multiline",
        functions: "never",
        imports: "only-multiline",
        objects: "only-multiline"
      }
    ],
    "function-paren-newline": ["error", "consistent"],
    "import/extensions": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": ["off"],
    "import/prefer-default-export": [0],
    indent: ["error", 2, { SwitchCase: 1 }],
    "jsx-a11y/anchor-has-content": ["off"],
    "no-confusing-arrow": ["off"],
    "object-curly-newline": ["error", { consistent: true }],
    "prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
    quotes: ["error", "single"],
    "react/destructuring-assignment": ["off"],
    "react/forbid-prop-types": [
      "error",
      {
        forbid: ["any"]
      }
    ],
    "react/jsx-boolean-value": ["off"],
    "react/jsx-closing-bracket-location": ["off"],
    "react/jsx-curly-brace-presence": ["off"],
    "react/jsx-curly-spacing": [
      "error",
      "always",
      {
        allowMultiline: true,
        spacing: {
          objectLiterals: "never"
        }
      }
    ],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-no-bind": ["off"],
    "react/jsx-sort-props": ["error"],
    "react/no-unused-prop-types": ["off"],
    "react/require-default-prop": [0],
    "react/sort-comp": [
      "error",
      {
        groups: {
          rendering: ["/^render.+$/", "render"]
        },
        order: ["static-methods", "lifecycle", "everything-else", "rendering"]
      }
    ],
    "sorting/sort-object-props": [
      "error",
      {
        ignoreCase: true,
        ignoreMethods: false
      }
    ]
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    }
  }
};
