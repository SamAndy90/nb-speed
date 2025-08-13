import Container from '@/components/container';
import LegalContentComponent from '@/features/legal/LegalContent';
import { TOS_CONTENT } from '@/lib/data/tos';
import React from 'react';

const TermsOfServicePage = () => {
    return <LegalContentComponent title="Terms & Conditions" content={TOS_CONTENT} />;
};

export default TermsOfServicePage;
