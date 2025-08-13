import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { getCollections } from '@/features/shopify/api/collection';

import { collectionFragment } from '@/features/shopify/graphql/storefront/fragments/collection';
import { getFragmentData } from '@/gql/storefront';
import Link from 'next/link';

export default async function CollectionsPage() {
    const collections = await getCollections();

    return (
        <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-4">
            {collections.edges.map((collection) => {
                const data = getFragmentData(
                    collectionFragment,
                    collection.node
                );
                return (
                    <Card key={data.handle} className="w-96">
                        <CardHeader>
                            <CardTitle>{data.title}</CardTitle>
                        </CardHeader>
                        <CardContent
                            className="prose prose-sm"
                            dangerouslySetInnerHTML={{
                                __html: data.descriptionHtml,
                            }}
                        />
                        <CardFooter>
                            <Link href={`/collections/${data.handle}`}>
                                <Button variant={'cooper_gradient'}>
                                    View Collection
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
