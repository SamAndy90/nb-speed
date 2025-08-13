import { MenuItemFragment } from '@/gql/storefront/graphql';
import { MainUrls, ShopUrls } from '@/route-urls';

export type SortFilterItem = {
    title: string;
    slug: string | null;
    sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
    reverse: boolean;
};

export const defaultSort: SortFilterItem = {
    title: 'Relevance',
    slug: null,
    sortKey: 'RELEVANCE',
    reverse: false,
};

export const sorting: SortFilterItem[] = [
    defaultSort,
    {
        title: 'Trending',
        slug: 'trending-desc',
        sortKey: 'BEST_SELLING',
        reverse: false,
    }, // asc
    {
        title: 'Latest arrivals',
        slug: 'latest-desc',
        sortKey: 'CREATED_AT',
        reverse: true,
    },
    {
        title: 'Price: Low to high',
        slug: 'price-asc',
        sortKey: 'PRICE',
        reverse: false,
    }, // asc
    {
        title: 'Price: High to low',
        slug: 'price-desc',
        sortKey: 'PRICE',
        reverse: true,
    },
];

export const TAGS = {
    collections: 'collections',
    products: 'products',
    cart: 'cart',
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_STOREFRONT_API_VERSION =
    process.env.SHOPIFY_STOREFRONT_API_VERSION ?? '2024-10';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = `/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;
export const SHOPIFY_ADMIN_GRAPHQL_API_ENDPOINT = `/admin${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

export const TOKEN_REFRESH_THRESHOLD_SECONDS = process.env
    .TOKEN_REFRESH_THRESHOLD_SECONDS
    ? parseInt(process.env.TOKEN_REFRESH_THRESHOLD_SECONDS)
    : 60 * 5; // 5 minutes

//TODO: Store the possible errors as consts in order to print a nicer message to the user, or just use the error message directly?
//export const SHOPIFY_CUSTOMER_ACCESS_TOKEN_CREATE_UNIDENTIFIED_CUSTOMER_ERROR =
//    'Unidentified customer';

const DEV_MENU: MenuItemFragment[] = [
    { title: 'Account', url: '/account', items: [] },
];

const ABOUT_US_MENU: MenuItemFragment[] = [
    { title: 'Find a store', url: MainUrls.getStoreFinder(), items: [] },
    { title: 'Our story', url: MainUrls.getAboutUs(), items: [] },
    { title: 'Sustainability', url: MainUrls.getSustainability(), items: [] },
    {
        title: 'Our Nutritionist',
        url: MainUrls.getOurNutritionist(),
        items: [],
    },
    // { title: 'Our founder', url: '/maryearps', items: [] },
    { title: 'Help me choose', url: MainUrls.getHelpMeChoose(), items: [] },
];

const MOBILE_ABOUT_US_MENU: MenuItemFragment[] = [
    { title: 'Find a store', url: MainUrls.getStoreFinder(), items: [] },
    { title: `Nutriburst's Values`, url: MainUrls.getAboutUs(), items: [] },
    { title: 'Sustainability', url: MainUrls.getSustainability(), items: [] },
    // { title: `Your benefits`, url: '/benefits', items: [] },
    {
        title: 'Our Nutritionist',
        url: MainUrls.getOurNutritionist(),
        items: [],
    },
    {
        title: 'Our Blog',
        url: MainUrls.getBlogs(),
        items: [],
    },
    { title: 'Help me choose', url: MainUrls.getHelpMeChoose(), items: [] },
];

//Shopify supports defining menus, but doesn't allow for localhost links. For now the nav is hardcoded
const SHOP_MENU_ITEMS: MenuItemFragment = {
    title: 'Shop',
    items: [
        {
            title: 'Shop',
            items: [
                { title: 'Shop all', url: '/collections/all-products' },
                { title: 'Best Sellers', url: '/collections/best_sellers' },
                // {
                //     title: 'Expert Favourites',
                //     url: '/collections/all-products',
                // },
                // { title: 'Rewards', url: '/collections/all-products' },
            ],
        },
        {
            title: 'Shop by Benefit',
            items: [
                // { title: 'General Wellness', url: '/collections/all-products' },
                { title: 'Immunity', url: '/collections/immunity' },
                { title: 'Energy', url: '/collections/energy' },
                {
                    title: 'Beauty',
                    url: '/collections/beauty',
                },
                {
                    title: 'Balance',
                    url: '/collections/balance',
                },
            ],
        },
        {
            title: 'Shop by Category',
            items: [
                {
                    title: 'Advanced Nutrition',
                    url: ShopUrls.getAllProducts(),
                },
                {
                    title: 'Daily Nutrition',
                    url: ShopUrls.getAllProducts(),
                },
                {
                    title: 'Kids Products',
                    url: ShopUrls.getAllProducts(),
                },
                {
                    title: 'Hydration',
                    url: ShopUrls.getProduct('hydration'),
                },
            ],
        },
        {
            title: 'Shop by Best Sellers',
            items: [
                {
                    title: 'Ashwagandha',
                    url: '/products/ashwagandha-ksm-66-sugar-free-vegan-gummies',
                },
                {
                    title: 'Hair, Skin & Nails',
                    url: '/products/hair-skin-nails-sugar-free-vegan-gummies',
                },
                {
                    title: 'NutriGreens',
                    url: '/products/nutrigreens',
                },
            ],
        },
    ],
};
export const MOBILE_MAIN_MENU_ITEMS: MenuItemFragment[] = [
    ...(SHOP_MENU_ITEMS.items as unknown as MenuItemFragment[]).filter(
        ({ title }) => title !== 'Shop'
    ),
    { title: 'Shop All', url: '/collections/all-products', items: [] },
    { title: 'Reviews', url: '/#reviews', items: [] },
    { title: 'FAQ', url: '/#faq', items: [] },
    { title: 'About us', items: ABOUT_US_MENU },
    { title: 'Blog', url: MainUrls.getBlogs(), items: [] },
    // { title: 'Benefits', url: '/collections/all-products', items: [] },
    // { title: 'Blog', url: '/', items: [] },
    // {
    //     title: 'About us',
    //     items: [
    //         { title: 'Account', url: '/account', items: [] },
    //         { title: 'About us', url: '/pages/about-us', items: [] },
    //         { title: 'Meet Mary Earps', url: '/pages/maryearps', items: [] },
    //         {
    //             title: 'Meet Our Nutritionist',
    //             url: '/pages/meet-our-nutritionist',
    //             items: [],
    //         },
    //         { title: 'Our Stores', url: '/apps/store-locator', items: [] },
    //     ],
    // },
    // { title: 'Discover', items: DEV_MENU },
] as const;

export const DESKTOP_MAIN_MENU_ITEMS: MenuItemFragment[] = [
    SHOP_MENU_ITEMS,
    { title: 'Reviews', url: '/#reviews', items: [] },
    { title: 'FAQ', url: '/#faq', items: [] },
    { title: 'About us', items: ABOUT_US_MENU },
    { title: 'Blog', url: MainUrls.getBlogs(), items: [] },
    // { title: 'Discover', items: DEV_MENU },
    // { title: 'Benefits', url: '/pages/benefits', items: [] },
    // {
    //     title: 'About us',
    //     items: [
    //         { title: 'Account', url: '/account', items: [] },
    //         { title: 'About us', url: '/pages/about-us', items: [] },
    //         { title: 'Meet Mary Earps', url: '/pages/maryearps', items: [] },
    //         {
    //             title: 'Meet Our Nutritionist',
    //             url: '/pages/meet-our-nutritionist',
    //             items: [],
    //         },
    //         { title: 'Our Stores', url: '/apps/store-locator', items: [] },
    //     ],
    // },
] as const;

export const SHOPIFY_MENU_MOCK_RESPONSES = {
    'desktop-main-menu': DESKTOP_MAIN_MENU_ITEMS,
    'mobile-main-menu': MOBILE_MAIN_MENU_ITEMS,
};

export const DESKTOP_FOOTER_MENU_ITEMS: MenuItemFragment[] = [
    {
        title: 'Shop',
        items: [
            {
                title: 'Shop All Products',
                url: '/collections/all-products',
                items: [],
            },
            // {
            //     title: 'Shop by Benefit',
            //     url: '/collections/all-products',
            //     items: [],
            // },
            // {
            //     title: 'Shop by Category',
            //     url: '/collections/all-products',
            //     items: [],
            // },
            {
                title: 'Shop by Best Sellers',
                url: '/collections/best_sellers',
                items: [],
            },
        ],
    },
    // {
    //     title: 'Explore',
    //     items: [
    //         {
    //             title: 'Advanced Nutrition',
    //             url: '/collections/all-products',
    //             items: [],
    //         },
    //         {
    //             title: 'Daily Nutrition',
    //             url: '/collections/all-products',
    //             items: [],
    //         },
    //         { title: 'Hydration', url: '/collections/all-products', items: [] },
    //         {
    //             title: 'Kids Minions',
    //             url: '/collections/all-products',
    //             items: [],
    //         },
    //     ],
    // },
    {
        title: 'About Us',
        items: MOBILE_ABOUT_US_MENU,
    },
    {
        title: 'Support',
        items: [
            // { title: 'Our Stores', url: '/', items: [] },
            // { title: 'Rewards', url: '/pages/rewards', items: [] },
            // { title: 'Refer a Friend', url: '/', items: [] },
            { title: 'FAQ', url: '/#faq', items: [] },
            {
                title: 'Contact Support',
                url: 'mailto:support@nutriburstvitamins.com',
                items: [],
            },
        ],
    },
    // {
    //     title: 'For Members',
    //     items: [
    //         { title: 'Log In', url: '/account/login', items: [] },
    //         { title: 'Sign Up', url: '/account/register', items: [] },
    //         { title: 'Newsletter', url: '/', items: [] },
    //     ],
    // },
];
export const MOBILE_FOOTER_MENU_ITEMS: MenuItemFragment[] = [
    {
        title: 'Shop',
        items: [
            {
                title: 'Shop All Products',
                url: '/collections/all-products',
                items: [],
            },
            // {
            //     title: 'Shop by Benefit',
            //     url: '/collections/all-products',
            //     items: [],
            // },
            // {
            //     title: 'Shop by Category',
            //     url: '/collections/all-products',
            //     items: [],
            // },
            {
                title: 'Shop by Best Sellers',
                url: '/collections/best_sellers',
                items: [],
            },
        ],
    },
    // {
    //     title: 'Explore',
    //     items: [
    //         {
    //             title: 'Advanced Nutrition',
    //             url: '/collections/all-products',
    //             items: [],
    //         },
    //         {
    //             title: 'Daily Nutrition',
    //             url: '/collections/all-products',
    //             items: [],
    //         },
    //         { title: 'Hydration', url: '/collections/all-products', items: [] },
    //         {
    //             title: 'Kids Minions',
    //             url: '/collections/all-products',
    //             items: [],
    //         },
    //     ],
    // },
    {
        title: 'About Us',
        items: MOBILE_ABOUT_US_MENU,
    },
    {
        title: 'Support',
        items: [
            // { title: 'Our Stores', url: '/', items: [] },
            // { title: 'Rewards', url: '/pages/rewards', items: [] },
            // { title: 'Refer a Friend', url: '/', items: [] },
            { title: 'FAQ', url: '/#faq', items: [] },
            {
                title: 'Contact Support',
                url: 'mailto:support@nutriburstvitamins.com',
                items: [],
            },
        ],
    },
    {
        title: 'Legal',
        items: [
            { title: 'Terms & Conditions', url: '/legal/toc', items: [] },
            { title: 'Return Policy', url: '/legal/refunds', items: [] },
            { title: 'Privacy Policy', url: '/legal/privacy', items: [] },
            // { title: 'Imprint', url: '/legal/imprint', items: [] },
        ],
    },
];
export const ESSENTIALS_TAG = 'Daily Nutrition';
export const KIDS_TAG = 'kids';
export const ADVANCED_TAG = 'Advanced Nutrition';
export const HYDRATION_TAG = 'Hydration';
export const NEW_TAG = 'New Products';
