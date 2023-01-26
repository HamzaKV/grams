module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        semi: 'error',
        quotes: [
            2,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        indent: ['error', 4, { SwitchCase: 1 }],
        'max-len': [
            'error',
            {
                code: 80,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'linebreak-style': 0,
        'keyword-spacing': ['error', { before: true, after: true }],
        'eol-last': ['error', 'always'],
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
        'object-curly-spacing': ['error', 'always'],
        'react-hooks/exhaustive-deps': 'error',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 0,
        'no-console': 'error',
        '@typescript-eslint/no-empty-interface': 'off'
    },
    env: {
        browser: true,
        node: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
