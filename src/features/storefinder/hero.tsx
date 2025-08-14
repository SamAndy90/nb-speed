import Container from '@/components/container';
import Image from 'next/image';
import ProductIMG from './static/product.png';

export default function Hero() {
    return (
        <section className={'bg-gradient-section'}>
            <Container>
                <div className={'flex flex-col justify-between md:flex-row'}>
                    <div
                        className={
                            'w-full flex-1 grow-[2] pb-8 pt-[130px] md:pb-[132px] md:pt-[180px]'
                        }>
                        <h3
                            className={
                                'mb-4 text-paragraph-4 font-normal uppercase md:mb-6 md:text-paragraph-1 md:font-normal'
                            }>
                            FIND US IN YOUR STORES
                        </h3>
                        <h4
                            className={
                                'mb-4 text-mobile-h1 md:mb-3 md:text-desktop-h1'
                            }>
                            <span
                                className={
                                    'text-nowrap font-medium text-[#00955F] max-[420px]:block md:inline'
                                }>
                                Find Nutriburst
                            </span>{' '}
                            near you
                        </h4>
                        <p
                            className={
                                'max-w-[635px] text-paragraph-3 md:text-paragraph-2'
                            }>
                            Discover the convenience of shopping for your
                            favorite Nutriburst products in person. Use our easy
                            Storefinder tool to locate a retailer near you.
                        </p>
                    </div>
                    <div
                        className={
                            'flex w-full flex-1 grow-[1.5] items-end justify-center md:justify-end md:pl-4'
                        }>
                        <Image
                            src={ProductIMG}
                            alt={'Nutriburst product image'}
                            className={'w-full max-w-[362px] px-7 md:px-0'}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
