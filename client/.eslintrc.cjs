/* eslint-env node */
module.exports = {
    root: true,
    extends: ["plugin:react-hooks/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "eslint-plugin-import",
        "eslint-plugin-react-hooks",
        "react-hooks",
    ],
    rules: {
        "import/no-duplicates": "warn",
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: true,
                destructuredArrayIgnorePattern: "[A-Z, _]",
            },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
        "react-hooks/rules-of-hooks": "warn",
    },
}
