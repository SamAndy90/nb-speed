import { createHmac } from 'crypto';
import { FC, SVGProps } from 'react';
import Instagram from '@/assets/icons/reward-icons/instagram.svg';

import Ticket from '@/assets/icons/reward-icons/ticket.svg';
import Birthday from '@/assets/icons/reward-icons/cake-birthday.svg';
import CartCheck from '@/assets/icons/reward-icons/cart-check.svg';
import Subscription from '@/assets/icons/reward-icons/refresh.svg';
import Facebook from '@/assets/icons/reward-icons/facebook.svg';
import TikTok from '@/assets/icons/reward-icons/tiktok.svg';
import Quote from '@/assets/icons/reward-icons/quote-right.svg';
import Photo from '@/assets/icons/reward-icons/picture.svg';
import Play from '@/assets/icons/reward-icons/play.svg';

export async function createInfluenceCustomerDigest(
    shopKey: string,
    apiKey: string,
    customerEmail: string,
    shopifyCustomerId: string
) {
    customerEmail = customerEmail.toLowerCase();

    const hmac = createHmac('sha256', apiKey)
        .update(shopKey + customerEmail + shopifyCustomerId)
        .digest('hex');

    return hmac;
}

export const pointCardIconMap: [string[], FC<SVGProps<SVGElement>>][] = [
    [['create', 'account'], Instagram],
    [['place', 'order'], CartCheck],
    [['subscription'], Subscription],
    [['birthday'], Birthday],
    [['facebook'], Facebook],
    [['tiktok'], TikTok],
    [['instagram'], Instagram],
    [['photo', 'review'], Photo],
    [['video', 'review'], Play],
    [['review'], Quote],
];
export function getIconFromDescription(description: string) {
    description = description.toLowerCase();
    //Sort the icon map by how many of the relevant words are in the description
    pointCardIconMap.sort(
        (a, b) =>
            b[0].filter((word) => description.includes(word)).length -
            a[0].filter((word) => description.includes(word)).length
    );
    //Check the top choice actually contains the words
    if (pointCardIconMap[0][0].every((word) => description.includes(word))) {
        return pointCardIconMap[0][1];
    }
    return Ticket;
}
