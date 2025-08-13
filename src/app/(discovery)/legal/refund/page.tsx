import LegalContentComponent from '@/features/legal/LegalContent';
import { REFUND_POLICY_CONTENT } from '@/lib/data/tos';
import React from 'react';

const RefoundPolicyPage = () => {
    return (
        <LegalContentComponent title="Refund Policy" content={REFUND_POLICY_CONTENT} />
    );
};

export default RefoundPolicyPage;
