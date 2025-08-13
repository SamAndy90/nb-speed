'use client';

import Container from '@/components/container';
import React, { useState } from 'react';
import { SUPPORT_EMAIL, SUPPORT_OPTIONS } from '../consts';
import SupportOption from './support-option';
import { ContactFormDialog } from '@/features/contact-form-dialog/contact-form-dialog';

const ContactSection = () => {
    const [isOpenContactForm, setIsOpenContactForm] = useState<boolean>(false);

    const openLiveChat = () => {
        // Check if live chat widget exists
        // TODO
    };

    const handleEmailSupport = () => {
        window.location.href = `mailto:${SUPPORT_EMAIL}?subject=Support Request`;
    };

    const handleOnClick = (type: string) => {
        switch (type) {
            case 'form':
                setIsOpenContactForm(true);
                break;
            case 'live-chat':
                openLiveChat();
                break;
            case 'email':
                handleEmailSupport();
                break;
            default:
                console.warn(`Unhandled support option type: ${type}`);
        }
    };

    return (
        <section id='support' className="pb-[3.125rem] lg:pb-[7.5rem]">
            <Container className="flex flex-col gap-8 lg:gap-[60px]">
                <div className="flex flex-col items-center gap-4 lg:gap-6">
                    <div className="text-paragraph-4 font-bold lg:text-paragraph-1">
                        SUPPORT IN 1-24 HOURS
                    </div>
                    <h2 className="text-center">
                        Couldn’t find a{' '}
                        <span className="font-medium text-accent-tech-blue">
                            solution?
                        </span>{' '}
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {SUPPORT_OPTIONS.map((option) => (
                        <SupportOption
                            {...option}
                            key={option.type}
                            onClick={handleOnClick}
                        />
                    ))}
                </div>
            </Container>

            <ContactFormDialog
                open={isOpenContactForm}
                onOpenChange={setIsOpenContactForm}
            />
        </section>
    );
};

export default ContactSection;
