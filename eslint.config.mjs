import js from '@eslint/js';

export default [
    {
        ignores: [
            '.wrangler/',
            'node_modules/'
        ]
    },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                caches: 'readonly',
                console: 'readonly',
                crypto: 'readonly',
                fetch: 'readonly',
                Request: 'readonly',
                Response: 'readonly',
                TextEncoder: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                Uint32Array: 'readonly'
            }
        },
        rules: {
            indent: ['error', 4, { SwitchCase: 1 }],
            quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
            semi: ['error', 'always'],
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
        }
    }
];
