import { notFound } from 'next/navigation';

import { getCollectionByHandleAction } from '@/features/collections/actions';
import { CollectionPageContent } from '@/features/collections/components/CollectionPageContent';
import { getFragmentData } from '@/gql/storefront';
import { productFragment } from '@/features/shopify/graphql/storefront/fragments/product';
import { parseProduct } from '@/features/product/utils';
import { getProducts } from '@/features/shopify/api/product';
import { CollectionFragment } from '@/gql/storefront/graphql';
import { Product } from '@/features/product/types';
import { CollectionHelpLinks } from '@/features/collections/components/CollectionHelpLinks';
import Container from '@/components/container';
import reviewsService from '@/lib/reviews/reviews-service';

// export const dynamic = 'force-dynamic';

export default async function CollectionPage(props: {
    params: Promise<{ handle: string }>;
    searchParams: Promise<{ query: string }>;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const { query } = searchParams;
    const { handle } = params;

    let products: Product[] = [];
    let collection: Pick<
        CollectionFragment,
        'handle' | 'description' | 'title'
    >;

    if (handle === 'all-products' && !query) {
        products = await getProducts();
        collection = {
            handle: 'all-products',
            description:
                'All Nutriburst Products that help you look & feel your best.',
            title: 'All Products',
        };
    } else if (handle === 'all-products' && query) {
        products = await getProducts();
        collection = {
            handle: 'all-products',
            description: 'All Nutriburst products connected to your search',
            title: 'Search Results',
        };
    } else if (handle === 'best_sellers') {
        products = await getProducts();
        collection = {
            handle: 'best_sellers',
            description:
                'Nutriburst Products that help you look & feel your best.',
            title: 'Best Sellers',
        };
    } else {
        const res = await getCollectionByHandleAction(params.handle);

        if (!res.success) return notFound();
        collection = res.data;
        products = res.data.products.edges.map((edge) =>
            parseProduct(getFragmentData(productFragment, edge.node))
        );
    }

    const skus = products
        .map((product) => product.selectedOrFirstAvailableVariant?.sku)
        .filter((item) => Boolean(item))
        .join(';');
    const productRatingBatch =
        await reviewsService.retrieveProductRatingBatch(skus);

    return (
        <Container className="pb-[50px] pt-10 lg:pb-[120px] lg:pt-[83px]">
            <CollectionPageContent
                collection={collection}
                initialCollectionProducts={products}
                ratings={productRatingBatch || []}
            />
            <CollectionHelpLinks />
        </Container>
    );
}
