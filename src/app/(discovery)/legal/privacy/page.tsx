import Container from '@/components/container';
import LegalContentComponent from '@/features/legal/LegalContent';
import { PRIVACY_POLICY_CONTENT } from '@/lib/data/tos';
import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <>
            <LegalContentComponent
                title="Privacy Policy"
                content={PRIVACY_POLICY_CONTENT}
            />

            <Container className="space-y-10 lg:space-y-20">
                <div className="space-y-3">
                    <h2>3rd Party Cookies:</h2>
                    <ul className="list-disc pl-8 text-paragraph-4 lg:text-paragraph-2">
                        <li>
                            <strong> Cookie ID:</strong> rmuid
                        </li>
                        <li>
                            <strong>Purpose:</strong> Targeting cookies used by
                            Rakuten Advertising Affiliate Network. Rakuten
                            Advertising
                        </li>
                        <li>Privacy Policy here</li>
                        <li>
                            <strong>Expiry:</strong> Expires within 365 days
                        </li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h2>How Do We Use Your Personal Information?</h2>
                    <div>
                        <p className="whitespace-pre-line text-paragraph-4 lg:text-paragraph-2">
                            {`We use the Order Information that we collect generally to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:\n\n`}
                        </p>

                        <ul className="list-disc pl-8 text-paragraph-4 lg:text-paragraph-2">
                            <li>Communicate with you;</li>
                            <li>Improve customer service;</li>
                            <li>
                                {`To personalize user experience (We may use
                            information in the aggregate to understand how our
                            Users as a group use the services and resources
                            provided on our Site);`}
                            </li>
                            <li>
                                {`To improve our Site (We may use feedback you provide
                            to improve our products and services);`}
                            </li>
                            <li>
                                Screen our orders for potential risk or fraud;
                                and
                            </li>
                            <li>
                                When in line with the preferences you have
                                shared with us, provide you with information or
                                advertising relating to our products or
                                services.
                            </li>
                        </ul>
                        <br />
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            {`We use the Device Information that we collect to help us
                        screen for potential risk and fraud (in particular, your
                        IP address), and more generally to improve and optimize
                        our Site (for example, by generating analytics about how
                        our customers browse and interact with the Site, and to
                        assess the success of our marketing, re marketing and
                        advertising campaigns).`}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Sharing Your Personal Information</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            We share your Personal Information with third
                            parties to help us use your Personal Information, as
                            described above. For example, we use Shopify to
                            power our online store--you can read more about how
                            Shopify uses your Personal Information here:{' '}
                            <Link
                                target="_blank"
                                href="https://nutriburst.vercel.app/legal/privacy"
                                className="underline">
                                https://nutriburst.vercel.app/legal/privacy
                            </Link>
                            . We also use Google Analytics to help us understand
                            how our customers use the Site--you can read more
                            about how Google uses your Personal Information
                            here:{' '}
                            <Link
                                target="_blank"
                                href="https://www.google.com/intl/en/policies/privacy/"
                                className="underline">
                                https://www.google.com/intl/en/policies/privacy/
                            </Link>{' '}
                            You can also opt-out of Google Analytics here:{' '}
                            <Link
                                target="_blank"
                                href="https://tools.google.com/dlpage/gaoptout"
                                className="underline">
                                https://tools.google.com/dlpage/gaoptout
                            </Link>
                            .
                        </p>
                        <br />
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            Finally, we may also share your Personal Information
                            to comply with applicable laws and regulations, to
                            respond to a subpoena, search warrant or other
                            lawful request for information we receive, or to
                            otherwise protect our rights.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Behavioural Advertising</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            As described above, we use your Personal Information
                            to provide you with targeted advertisements or
                            marketing communications we believe may be of
                            interest to you. For more information about how
                            targeted advertising works, you can visit the
                            Network Advertising Initiative’s (“NAI”) educational
                            page at{' '}
                            <Link
                                target="_blank"
                                href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
                                className="underline">
                                http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
                            </Link>
                            .
                        </p>
                        <br />
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            You can opt out of targeted advertising by:
                        </p>
                        <br />

                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            FACEBOOK -{' '}
                            <Link
                                target="_blank"
                                href="https://www.facebook.com/settings/?tab=ads"
                                className="underline">
                                https://www.facebook.com/settings/?tab=ads
                            </Link>
                        </p>
                        <br />

                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            GOOGLE -{' '}
                            <Link
                                target="_blank"
                                href="https://www.google.com/settings/ads/anonymous"
                                className="underline">
                                https://www.google.com/settings/ads/anonymous
                            </Link>
                        </p>
                        <br />

                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            NUTRIBURST -{' '}
                            <Link
                                target="_blank"
                                href="https://help.instagram.com/"
                                className="underline">
                                https://help.instagram.com/
                            </Link>
                        </p>
                        <br />

                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            Additionally, you can opt out of some of these
                            services by visiting the Digital Advertising
                            Alliance’s opt-out portal at:{' '}
                            <Link
                                target="_blank"
                                href="http://optout.aboutads.info/"
                                className="underline">
                                http://optout.aboutads.info/
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Do Not Track</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            Please note that we do not alter our Site’s data
                            collection and use practices when we see a Do Not
                            Track signal from your browser.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Your Rights</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            If you are a European resident, you have the right
                            to access personal information we hold about you and
                            to ask that your personal information be corrected,
                            updated, or deleted. If you would like to exercise
                            this right, please contact us through the contact
                            information below.
                        </p>
                        <br />
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            Additionally, if you are a European resident, we
                            note that we are processing your information in
                            order to fulfil contracts we might have with you
                            (for example if you make an order through the Site),
                            or otherwise to pursue our legitimate business
                            interests listed above. 
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Data Retention</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            When you place an order through the Site, we will
                            maintain your Order Information for our records
                            unless and until you ask us to delete this
                            information.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Minors</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            The Site is not intended for individuals under the
                            age of 12 years old.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Changes</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            We may update this privacy policy from time to time
                            in order to reflect, for example, changes to our
                            practices or for other operational, legal or
                            regulatory reasons.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2>Contact Us</h2>
                    <div>
                        <p className="text-paragraph-4 lg:text-paragraph-2">
                            For more information about our privacy practices, if
                            you have questions, or if you would like to make a
                            complaint, please contact us by e-mail at{' '}
                            <Link
                                target="_blank"
                                href="mailto:support@nutriburstvitamins.com"
                                className="underline">
                                support@nutriburstvitamins.com
                            </Link>
                        </p>
                    </div>
                </div>

                <div />
            </Container>
        </>
    );
};

export default PrivacyPolicy;
