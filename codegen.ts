import type { CodegenConfig } from '@graphql-codegen/cli';
import { getSchema, pluckConfig, preset } from '@shopify/hydrogen-codegen';
import { ApiType } from '@shopify/api-codegen-preset';
import dotenv from 'dotenv';
import { types } from 'util';

dotenv.config({ path: '.env.local' });
const STOREFRONT_SCHEMA_URL = new URL(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`
).toString();

const ADMIN_SCHEMA_URL = new URL(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`
).toString();

const config: CodegenConfig = {
    overwrite: true,

    generates: {
        'src/gql/storefront/': {
            schema: [
                {
                    [STOREFRONT_SCHEMA_URL]: {
                        headers: {
                            'X-Shopify-Storefront-Access-Token':
                                process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
                                '',
                        },
                    },
                },
            ],
            documents: 'src/features/shopify/graphql/storefront/**/*.ts?(x)',
            preset: 'client',
            plugins: [],
            config: {
                documentMode: 'string',
                extractAllFieldsToTypes: true,
                printFieldsOnNewLines: true,
                enumsAsTypes: true,
            },
            presetConfig: {
                fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
            },
        },
        './storefront-graphql.schema.json': {
            schema: [
                {
                    [STOREFRONT_SCHEMA_URL]: {
                        headers: {
                            'X-Shopify-Storefront-Access-Token':
                                process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
                                '',
                        },
                    },
                },
            ],
            documents: 'src/features/shopify/graphql/storefront/**/*.ts?(x)',
            plugins: ['introspection'],
        },
        'src/gql/admin/': {
            schema: [
                {
                    [ADMIN_SCHEMA_URL]: {
                        headers: {
                            'X-Shopify-Access-Token':
                                process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? '',
                        },
                    },
                },
            ],
            documents: 'src/features/shopify/graphql/admin/**/*.ts?(x)',
            preset: 'client',

            plugins: [],
            config: {
                documentMode: 'string',
                extractAllFieldsToTypes: true,
                printFieldsOnNewLines: true,
                enumsAsTypes: true,
            },
            presetConfig: {
                fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
            },
        },
        './admin-graphql.schema.json': {
            schema: [
                {
                    [ADMIN_SCHEMA_URL]: {
                        headers: {
                            'X-Shopify-Access-Token':
                                process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ?? '',
                        },
                    },
                },
            ],
            documents: 'src/features/shopify/graphql/admin/**/*.ts?(x)',

            plugins: ['introspection'],
        },
    },
};

export default config;
