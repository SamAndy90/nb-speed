import { RechargeSubscription } from '../types';
import testImage from '@/assets/ashwagandha-1.webp';
const mockSubscription: RechargeSubscription = {
    id: '333444',
    status: 'active',
    price: '20.00',
    scheduledAt: '',
    startedAt: ``,
    deliveryAddress: `Flora Voelcker,
Test Street 1
Berlin, 12345,
Germany`,
    externalProductId: '123',
    items: [
        {
            id: '1',
            image: {
                url: testImage.src,
                altText: 'Test Image',
            },
        },
        {
            id: '1',
            image: {
                url: testImage.src,
                altText: 'Test Image',
            },
        },
        {
            id: '1',
            image: {
                url: testImage.src,
                altText: 'Test Image',
            },
        },
        {
            id: '1',
            image: {
                url: testImage.src,
                altText: 'Test Image',
            },
        },
        {
            id: '1',
            image: {
                url: testImage.src,
                altText: 'Test Image',
            },
        },
    ],
    orderIntervalFrequency: 1,
    chargeIntervalFrequency: 1,
    orderIntervalUnit: 'month',
    chargeIntervalUnit: 'month',
    orderDayOfMonth: 1,
};
export async function getCustomerSubscriptions(
    customerId: string
): Promise<RechargeSubscription[]> {
    return [mockSubscription, mockSubscription];
}
