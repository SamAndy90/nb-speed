export interface TOSContent {
    title?: string;
    description?: string;
    descriptions?: {
        title?: string;
        description: string;
    }[];
    list?: {
        title?: string;
        descriptions?: string[];
        description?: string;
    }[];
}
export const TOS_CONTENT: TOSContent[] = [
    {
        title: 'Overview',
        description: `This website is operated by Nutriburst Ltd. Throughout the site, the terms “we”, “us” and “our” refer to Nutriburst Ltd. Nutriburst Ltd offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.\n 
            By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content. \n
            Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service. \n
            Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.\n
            Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.
        `,
    },
    {
        title: 'Paragraph (terms&conditions)',
        description: `By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.\n
            You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).\n
            You must not transmit any worms or viruses or any code of a destructive nature.\n
            A breach or violation of any of the Terms will result in an immediate termination of your Services.
        `,
    },
    {
        title: 'Section 2 - General Conditions',
        description: `We reserve the right to refuse service to anyone for any reason at any time.\n
            You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.\n
            You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.\n
            The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
        `,
    },
    {
        title: 'Section 3 - Accuracy, Completeness & Timeliness of Information',
        description: `We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.\n
            This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
        `,
    },
    {
        title: 'Section 4 - Modifications to the Service & Prices',
        description: `Prices for our products are subject to change without notice.\n
            We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.\n
            We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
        `,
    },
    {
        title: 'Section 5 - Products or Services (if Applicable)',
        description: `Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.\n
            We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.\n
            We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time, without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.\n
            We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
        `,
    },
    {
        title: 'Section 6 - Accuracy of Billing & Account Information',
        description: `We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.\n
            You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.\n
            For more detail, please review our Returns Policy.
        `,
    },
    {
        title: 'Section 7 – Promotions & Subscriptions',
        descriptions: [
            {
                title: 'Coupon Codes',
                description: `Coupon codes have no cash value and cannot be redeemable for cash, and cannot be combined with any other offers. Limit one coupon code per order. Coupon codes generally expire and are no longer valid for redemption after expiry date. The unauthorized reproduction, resale, modification, or trade of coupon codes is prohibited. Coupon codes are void where prohibited. Nutriburst Ltd reserves the right to change or limit coupon codes in its sole discretion.`,
            },
            {
                title: 'Auto-renewal for Subscription Services',
                description: `Unless you opt out of auto-renewal, any subscription services, such as any auto-replacing products ("Subscription Services"), you have signed up for will be automatically extended for successive renewal periods of the same duration as the subscription term originally selected, at the then-current non-promotional rate. If you terminate a Subscription Service, you may use your subscription until the end of your then-current term; your subscription will not be renewed after your then-current term expires. All fees related to Subscription Services are fully earned upon payment.`,
            },
            {
                title: 'Reaffirmation of Authorization',
                description:
                    'Your non-termination or continued use of a Paid Service (including Subscription Services) reaffirms that we are authorized to charge your Payment Method for that Paid Service. We may submit those charges for payment and you will be responsible for such charges. This does not waive our right to seek payment',
            },
        ],
    },
    {
        title: 'Section 8 - Optional Tools',
        description: `We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.\n
            You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.\n
            Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).\n
            We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service. 
        `,
    },
    {
        title: 'Section 9 - Third-party Links',
        description: `Certain content, products and services available via our Service may include materials from third-parties.\n
            Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.\n
            We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
        `,
    },
    {
        title: 'Section 10 - User Comments, Feedback & Other Submissions',
        description: `If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.\n
            We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.\n
            You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
        `,
    },
    {
        title: 'Section 11 - Personal Information',
        description: `Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.`,
    },
    {
        title: 'Section 12 - Errors, Inaccuracies & Omissions',
        description: `Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).\n
            We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.
        `,
    },
    {
        title: 'Section 13 - Prohibited Uses',
        description: `In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.`,
    },
    {
        title: 'Section 14 - Disclaimer of Warranties; Limitation of Liability',
        description: `We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.\n
            We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.\n
            You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.\n
            You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.\n
            In no case shall Nutriburst Ltd, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
        `,
    },
    {
        title: 'Section 15 - Indemnification',
        description: `You agree to indemnify, defend and hold harmless Nutriburst Ltd and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.`,
    },
    {
        title: 'Section 16 - Severability',
        description: `In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.`,
    },
    {
        title: 'Section 17 - Termination',
        description: `The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.\n
            These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.\n
            If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
        `,
    },
    {
        title: 'Section 18 - Entire Agreement',
        description: `The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.\n
            These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).\n
            Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
        `,
    },
    {
        title: 'Section 19 - Data Processing With Talkable',
        description: `Nutriburst permits Talkable to collect PII data (can include but not limited to name, email address, IP address, and shipping address through shopping cart integration) in order to successfully manage the referral program.\n
           Talkable will collect, process and store customer’s PII data.\n
            Talkable may pass customer PII data to third-party vendors only for the necessity of carrying out the referral program. Talkable will only pass PII data to third-party vendors agreed to by Nutriburst. These third-party vendors will not contact the customer and are not permitted to pass customer PII data to any other vendors.
        `,
    },
    {
        title: 'Section 20 - Governing Law',
        description: `These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of England and Wales.`,
    },
    {
        title: 'Section 21- Competition Terms & Conditions',
        description: `Please carefully review the following Terms and Conditions before participating in any Nutriburst competition. By entering our competitions, you agree to abide by the rules outlined below.`,
        list: [
            {
                title: '1. Competition Eligibility:',
                descriptions: [
                    `All Nutriburst competitions are open to residents of the United Kingdom who are 18 years of age or older. Employees of Nutriburst and their immediate family members are not eligible to participate.`,
                ],
            },
            {
                title: '2. Entry Period:',
                descriptions: [
                    `The competition's entry period is specified in the individual competition details. Entries received before or after this period will not be considered.`,
                ],
            },
            {
                title: '3. How to Enter:',
                descriptions: [
                    `To enter the competition, follow the provided instructions which may vary for each competition.`,
                    `Each competition entry is limited to one per person unless otherwise stated in the specific promotion.`,
                ],
            },
            {
                title: '4. Prize Details:',
                descriptions: [
                    `Prizes awarded in Nutriburst competitions are non-transferable, non-negotiable, and cash alternatives will not be offered.`,
                ],
            },
            {
                title: '5. Winner Notification:',
                descriptions: [
                    `Winners will be notified via email or direct message within the time frame specified or within one month after the competition ends.`,
                    `The winner must respond to the notification within five (5) business days to claim the prize. Failure to do so will result in the selection of an alternative winner.`,
                ],
            },
            {
                title: '6. Use of Personal Data:',
                descriptions: [
                    `By participating in a Nutriburst competition, you consent to the use of your personal data in accordance with our Privacy Policy.`,
                ],
            },
            {
                title: '7. Publicity:',
                descriptions: [
                    `By entering the competition, you agree to any promotional use of your information and materials resulting from your participation. Nutriburst reserves the right to use such publicity without any fee to the entrant.`,
                ],
            },
            {
                title: '8. Entry Disqualification:',
                descriptions: [
                    `Nutriburst reserves the right to disqualify any inappropriate, duplicative, incomplete, late, copied, or offensive entries.`,
                    `Any attempt to manipulate or tamper with the competition may result in disqualification.`,
                ],
            },
            {
                title: '9. Competition Modification or Cancellation:',
                descriptions: [
                    `Nutriburst reserves the right to modify or discontinue any competition in cases of unforeseen circumstances or situations beyond our control, without prior notice.`,
                ],
            },
            {
                title: '10. Liability:',
                descriptions: [
                    `Entry into any Nutriburst competition is at the entrant's sole risk, and Nutriburst accepts no responsibility for any damage or loss incurred by entrants or any third parties as a result of participating in the competition or accepting a prize.`,
                    `Nutriburst is not responsible for any network, computer, or software failures and does not accept responsibility for lost, delayed, or misdirected entries.`,
                    `Nutriburst does not accept responsibility for any infringement of third-party intellectual property rights caused by entrants in a competition.`,
                ],
            },
            {
                title: '11. Independent Competitions:',
                descriptions: [
                    `All competitions promoted by Nutriburst are not sponsored, endorsed, or administered by or associated with social media channels, including but not limited to Facebook, Instagram, or any other social media platform, unless otherwise stated.`,
                ],
                description: `By entering a Nutriburst competition promoted on our social media channels, you acknowledge that the relevant social media platform is not responsible for the competition, and, to the maximum extent permitted by law, entrants release the social media platform from any liability related to the competition. All information provided when entering the competition is provided to Nutriburst and not to the social media platform.`,
            },
            {
                title: '12. Governing Law:',
                descriptions: [
                    `All Nutriburst competitions are governed by UK law, and entrants submit to the jurisdiction of the UK courts.`,
                ],
                description:
                    'Please note that additional terms and conditions may apply to individual competitions, and participants should refer to the specific competition details for any additional requirements. Nutriburst reserves the right to refuse entry to, or refuse to award prizes to, anyone in breach of these terms and conditions.',
            },
        ],
    },
    {
        title: 'Section 22 - Changes to Terms of Service',
        description: `You can review the most current version of the Terms of Service at any time at this page.\n
            We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
        `,
    },
    {
        title: 'Section 23 - Contact Information',
        description: `Questions about the Terms of Service should be sent to us at support@nutriburstvitamins.com. Alternatively you can contact us at 02039438201.`,
    },
];

export const REFUND_POLICY_CONTENT: TOSContent[] = [
    {
        description: `We operate a returns policy for unwanted and faulty goods.\n
            To be eligible for a return, your item must be unused and in the same condition that you received it. Our refund policy is valid for 14 days only from date of purchase.\n
            To complete your return, we require a receipt or proof of purchase. It must also be in the original packaging.\n
            Should you need to return an item to us, please email us at support@nutriburstvitamins.com.
        `,
    },
    {
        title: 'Faulty Goods',
        description: `If any of the goods are faulty, email us with the details, along with proof of purchase (and photos, if possible). We may ask for you to return the goods to us for further investigation in which case, we will either refund the cost of shipping the item/s back to us, or provide a pre paid return label. \n
                In the case where a fault was identified, we will either refund the cost amount in full or send you a replacement free of charge.\n
                In the event no fault was found, we reserve the right to re-charge you for the item/s and the cost of additional shipping.
            `,
    },
    {
        title: 'Exchanges',
        description: `If you ordered goods and since changed your mind, let us know as soon as you can by emailing support@nutriburstvitamins.com. If your order has not yet been dispatched, then we will do our best to replace your goods and send you a credit / invoice for any difference.\n
            If your order has already been dispatched, then you will need to return goods back to us. Please be aware that you will be responsible for paying for the cost of shipping the unwanted goods back to us and also the shipping costs for sending out the exchanged goods.  We recommend obtaining proof of postage.
        `,
    },
    {
        title: 'Unwanted Items',
        description: `Please return your items unused, unopened and in the original packaging. You will be responsible for paying for your own shipping costs for returning unwanted goods. Shipping costs are non-refundable.\n
            We recommend obtaining proof of purchase. A full refund minus the shipping costs will be made on receipt of the returned items.
        `,
    },
];

export const PRIVACY_POLICY_CONTENT: TOSContent[] = [
    {
        description:
            'This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.nutriburstvitamins.com (the “Site”).',
    },
    {
        title: 'Personal Information We Collect',
        list: [
            {
                description:
                    'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”',
            },
            {
                description: `We collect Device Information using the following technologies:\n\n`,
            },
            {
                descriptions: [
                    `“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.`,
                    `“Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.`,
                    `“Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.`,
                ],
            },
            {
                description:
                    'Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, email address, and phone number.  We refer to this information as “Order Information.”',
            },
            {
                description:
                    'When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.',
            },
        ],
    },
];
