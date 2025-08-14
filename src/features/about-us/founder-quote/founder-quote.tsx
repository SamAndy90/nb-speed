import SimranIMG from '@/assets/about-us/Simaran-big.jpg';
import SignatureIMG from '@/assets/about-us/Simran-signature.svg?url';
import QuoteSection from '@/features/sections/quote-section/quote-section';

const FounderQuote = () => {
    return (
        <>
            <QuoteSection
                quote="We aim to make your health & wellness a habit that you look forward to every day."
                className="pb-[3.125rem] pt-6 lg:py-[7.5rem]"
                name="Simran Kanwar"
                title="Founder & Director of Nutriburst"
                imageSrc={SimranIMG}
                signatureImageSrc={SignatureIMG}
                imageAlt="Simran Kanwar"
                signatureAlt="Simran's signature"
            />
        </>
    );
};

export default FounderQuote;
