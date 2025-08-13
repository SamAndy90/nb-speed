import { MetaobjectHandleInput } from '@/gql/storefront/graphql';
import { shopifyFetch } from './fetch';
import { getMetaobject } from '../graphql/storefront/queries/metaobject';

export async function getMetaobjectByHandle(handle: MetaobjectHandleInput) {
    const { body } = await shopifyFetch({
        query: getMetaobject,
        variables: { handle },
    });

    return body.metaobject;
}
