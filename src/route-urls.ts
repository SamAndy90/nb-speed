export const MainUrls = {
    getHome: () => '/',
    getHelpMeChoose: () => '/help-me-choose',
    getStoreFinder: () => '/storefinder',
    getBlogs: () => '/blogs',
    getBlog: (blogHandle: string, handle: string) =>
        `/blogs/${blogHandle}/${handle}`,
    getAboutUs: () => '/about-us',
    getSustainability: () => '/sustainability',
    getOurNutritionist: () => '/meet-our-nutritionist',
};

export const ShopUrls = {
    getAllProducts: () => '/collections/all-products',
    getProduct: (productId: string) => `/products/${productId}`,
};

export const DiscoveryUrls = {
    _getRoot: () => '/discovery',
    getAdvanced: () => `${DiscoveryUrls._getRoot()}/advanced`,
    getDaily: () => `${DiscoveryUrls._getRoot()}/daily`,
    getEnhancedHydration: () =>
        `${DiscoveryUrls._getRoot()}/enhanced-hydration`,
    getKidsMinions: () => `${DiscoveryUrls._getRoot()}/kids-minions`,
    getKidsTrolls: () => `${DiscoveryUrls._getRoot()}/kids-trolls`,
};
