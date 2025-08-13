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
                            'w-full flex-1 grow-[2] pb-[90px] pt-[130px] md:pb-[132px] md:pt-[180px]'
                        }>
                        <h3
                            className={
                                'mb-4 text-paragraph-4 font-normal uppercase md:mb-6 md:text-paragraph-1 md:font-normal'
                            }>
                            HELP ME CHOOSE
                        </h3>
                        <h4
                            className={
                                'mb-4 text-mobile-h1 md:mb-3 md:text-desktop-h1'
                            }>
                            Let’s find{' '}
                            <span
                                className={
                                    'text-ocean-blue-400 text-nowrap font-medium max-[420px]:block md:inline'
                                }>
                                your best fit
                            </span>
                        </h4>
                        <p
                            className={
                                'max-w-lg text-paragraph-3 md:text-paragraph-2'
                            }>
                            Answer a few questions to find the best product for
                            your personal wellness goals.
                        </p>
                    </div>
                    <div
                        className={
                            'hidden w-full flex-1 grow-[1.5] items-end justify-center md:flex md:justify-end md:pl-4'
                        }>
                        <Image
                            src={ProductIMG}
                            alt={'Nutriburst product image'}
                            className={'w-full max-w-[417px]'}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
