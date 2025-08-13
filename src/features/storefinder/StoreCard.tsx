import Link from 'next/link';
import { TStore } from './tesco_stores';
import ClockIcon from './static/icons/clock-icon.svg';
import PhoneIcon from './static/icons/phone-icon.svg';
import { motion } from 'framer-motion';
import { useFindStore } from './FindStoreProvider';

type StoreCardProps = {
    data: TStore;
};

export function StoreCard({ data }: StoreCardProps) {
    const { public_name, address_line_1, city, post_code } = data;
    const { setSelectedLocation } = useFindStore();

    function handleViewOnMap() {
        setSelectedLocation(data);
    }
    return (
        <div className={'flex flex-col'}>
            <div
                className={
                    'mb-5 flex min-w-[250px] flex-1 flex-col gap-y-3 font-sans text-paragraph-4'
                }>
                <h5
                    className={
                        'font-sans text-paragraph-0 font-bold text-[#0D0D0D]'
                    }>
                    {public_name}
                </h5>
                <p>
                    {address_line_1}, {city}, {post_code}
                </p>
                <div className={'flex items-center gap-x-3'}>
                    <ClockIcon />
                    <span>Open 9am - 7pm</span>
                </div>
                {/* {phone && (
                    <div className={'flex items-center gap-x-3'}>
                        <PhoneIcon />
                        <Link
                            href={`tel:${phone.replace(/\D/g, '')}`}
                            className={'hover:underline'}>
                            {phone}
                        </Link>
                    </div>
                )} */}
            </div>
            <motion.button
                onClick={handleViewOnMap}
                whileHover={{ backgroundColor: '#2D2F36', color: '#FFFFFF' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'circInOut' }}
                className={
                    'mb-2 self-start rounded-full border border-[#2D2F36] px-[18px] py-2 text-paragraph-5 font-bold text-[##2D2F36] md:mb-0'
                }>
                View on map
            </motion.button>
        </div>
    );
}
