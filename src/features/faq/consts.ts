import GradientCommentsIcon from '@/components/icons/fi-rr-comments';
import GradientDocumentIcon from '@/components/icons/fi-rr-document';
import GradientMailPlusIcon from '@/components/icons/fi-rr-envelope-plus';
export const FAQ_TABS = [
    { id: 'general', label: 'General' },
    { id: 'billing', label: 'Billing' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'my-order', label: 'My Order' },
    { id: 'rewards', label: 'Rewards' },
];

export const FAQ_QUESTIONS = [
    {
        question: 'Here is space for a good question?',
        answer: 'Most Gummies are loaded with sugar (6g/10g/15g). With just a hint of natural sweeteners, our gummies offer essential nutrients helping.',
        category: 'general',
    },
    {
        question: 'What does Ashwagandha do for your body?',
        answer: `Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since
                    the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                    remaining essentially unchanged.`,
        category: 'general',
    },
    {
        question: 'Can I take my Ashwagandha gummies on an empty stomach?',
        answer: `  Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since
                    the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                    remaining essentially unchanged.`,
        category: 'general',
    },
    {
        question:
            'What makes Ashwagandha KSM-66® the best Ashwagandha supplement?',
        answer: `  Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since
                    the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                    remaining essentially unchanged.`,
        category: 'general',
    },
    {
        question: 'Is Ashwagandha suitable for women and men?',
        answer: `Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since
                the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen
                book. It has survived not only five centuries,
                but also the leap into electronic typesetting,
                remaining essentially unchanged.`,
        category: 'general',
    },
    // billing
    {
        question: 'Here is space for a good question?',
        answer: 'Most Gummies are loaded with sugar (6g/10g/15g). With just a hint of natural sweeteners, our gummies offer essential nutrients helping.',
        category: 'billing',
    },
    {
        question: 'What does Ashwagandha do for your body?',
        answer: `Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since
                    the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                    remaining essentially unchanged.`,
        category: 'billing',
    },
    // shipping
    {
        question: 'Here is space for a good question?',
        answer: 'Most Gummies are loaded with sugar (6g/10g/15g). With just a hint of natural sweeteners, our gummies offer essential nutrients helping.',
        category: 'shipping',
    },
    {
        question: 'What does Ashwagandha do for your body?',
        answer: `Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since
                    the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                    remaining essentially unchanged.`,
        category: 'shipping',
    },
    // my-order
    {
        question: 'Here is space for a good question?',
        answer: 'Most Gummies are loaded with sugar (6g/10g/15g). With just a hint of natural sweeteners, our gummies offer essential nutrients helping.',
        category: 'my-order',
    },
    {
        question: 'What does Ashwagandha do for your body?',
        answer: `Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since
                    the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                    remaining essentially unchanged.`,
        category: 'my-order',
    },
    // rewards
    {
        question: 'Here is space for a good question?',
        answer: 'Most Gummies are loaded with sugar (6g/10g/15g). With just a hint of natural sweeteners, our gummies offer essential nutrients helping.',
        category: 'rewards',
    },
    {
        question: 'What does Ashwagandha do for your body?',
        answer: `Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since
                    the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries,
                    but also the leap into electronic typesetting,
                    remaining essentially unchanged.`,
        category: 'rewards',
    },
];

export const SUPPORT_OPTIONS = [
    {
        icon: GradientDocumentIcon,
        type: 'form',
        title: 'Contact Form',
        description: `Use our contact form to tell us about your problem.`,
        buttonText: 'Contact us',
    },
    {
        icon: GradientCommentsIcon,
        title: 'Live Chat Support',
        type: 'live-chat',
        description: 'Instant help. Chat to our support and get it sorted.',
        buttonText: 'Open Chat Window',
    },
    {
        icon: GradientMailPlusIcon,
        type: 'email',
        title: 'E-Mail Support',
        description: 'Get help via E-Mail. We usually reply in 24 - 48 Hours.',
        buttonText: 'Write us an email',
    },
];

export const SUPPORT_EMAIL = 'support@yourcompany.com'; //Todo: Replace email
export const LIVE_CHAT_FUNCTION = 'openLiveChat'; // TODO: Replace with your actual live chat function name
