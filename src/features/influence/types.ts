type InfluenceActiveStatus = 'Active' | 'Disabled';
export type InfluenceCustomerRedeemResponse = {
    success: boolean;
    couponCode: string;
};
export type InfluenceCustomer = {
    id: string;
    email: string;
    referralLink: string;
    referralsCompleted: number;
    pointBalance: number;
    currentLoyaltyTierProgress: number;
    currentLoyaltyTierId: string;
};

export type InfluenceCustomerActiveReward = {
    id: string;
    customerId: string;
    couponCode: string;
    title: string;
    pointsSpent: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    rewardType: string;
};

export type InfluenceReward = {
    id: string;
    title: string;
    pointCost: number;
    discountValue: number;
    templateName: string;
    redeemType: string;
    maxRedeemablePoints: number;
    minRedeemablePoints: number;
    minSpendAmount: null;
    status: InfluenceActiveStatus;
};

export type InfluenceEarnRule = {
    id: string;
    title: string;
    status: InfluenceActiveStatus;
    earnType: string;
    earnValue: number;
    templateName: 'placeOrder' | 'birthday';
};

export type InfluenceLoyaltyTier = {
    id: string;
    title: string;
    threshold: number;
    perks: [];
};

/*
{
  lastName: 'Test',
  email: 'marzipant.e@gmail.com',
  totalOrders: 0,
  name: 'Test Test',
  likeFacebook: false,
  firstName: 'Test',
  externalId: '8532878557507',
  customerType: 'Guests',
  shareFacebook: false,
  pointBalance: 0,
  owner: 'd1868e96-e2ea-4e82-b6b2-76a0bbd61b6d',
  id: '07d32094-bd8c-4a17-a376-b96525714e45',
  externalCreatedAt: '2024-11-11T16:16:59.000Z',
  __typename: 'Customer',
  shopifyCustomerId: '8532878557507',
  shareTwitter: false,
  followTwitter: false,
  shopId: '9d2fc1c8-3bfb-4251-bb23-7edf1feb0206',
  averageOrderValue: 0,
  createdAt: '2024-11-11T16:17:01.631Z',
  followTikTok: false,
  lastSeenAt: '2024-11-11T16:17:01.631Z',
  updatedAt: '2024-11-11T16:17:01.631Z',
  shopifyCreatedAt: '2024-11-11T16:16:59.000Z',
  currentLoyaltyTierProgress: 0,
  followInstagram: false,
  referralsCompleted: 0,
  referralLink: 'ubRcwR2jW',
  shop: {
    id: '9d2fc1c8-3bfb-4251-bb23-7edf1feb0206',
    shopUrl: 'ixw1ck-sa.myshopify.com',
    shopDomain: 'ixw1ck-sa.myshopify.com'
  }
}
*/
