import { graphql } from '@/gql/admin';

//gid://shopify/CheckoutProfile/4675240276
const getCheckoutProfiles = graphql(`
    query checkoutProfiles {
        checkoutProfiles(first: 1, query: "is_published:true") {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`);

//Nohemi: gid://shopify/GenericFile/50958482243924
//Area: gid://shopify/GenericFile/50958482276692
const getFiles = graphql(`
    query queryFiles {
        files(first: 10, query: "media_type:GenericFile") {
            edges {
                node {
                    ... on GenericFile {
                        id
                        url
                        fileStatus
                    }
                }
            }
        }
    }
`);

const updateFont = graphql(`
    mutation checkoutBrandingUpsert(
        $checkoutBrandingInput: CheckoutBrandingInput!
        $checkoutProfileId: ID!
    ) {
        checkoutBrandingUpsert(
            checkoutBrandingInput: $checkoutBrandingInput
            checkoutProfileId: $checkoutProfileId
        ) {
            checkoutBranding {
                designSystem {
                    typography {
                        secondary {
                            base {
                                sources
                                weight
                            }
                            bold {
                                sources
                                weight
                            }
                            name
                        }
                    }
                }
            }
            userErrors {
                code
                field
                message
            }
        }
    }
`);
