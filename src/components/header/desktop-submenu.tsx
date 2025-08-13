import { MenuItemFragment } from '@/gql/storefront/graphql';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React, { memo } from 'react';
import Container from '../container';
import { cn, setBenefitContextHelper } from '@/lib/utils';
import { useBenefit } from '@/features/collections/providers/BenefitProvider';
import { useRouter } from 'next/navigation';
// import maryFace from '@/assets/mary-face.png';
// import Image, { ImageProps } from 'next/image';
// import Check from '@/assets/icons/check.svg';

// const MaryBadge = ({
//     className,
//     image,
//     fullName,
//     position,
// }: {
//     className?: string;
//     image: ImageProps['src'];
//     fullName: string;
//     position: string;
// }) => {
//     return (
//         <div
//             className={cn(
//                 'flex items-center gap-2.5 rounded-full bg-white/70 p-2 pr-5 shadow-soft drop-shadow-hero-badge backdrop-blur-[29.1]',
//                 className
//             )}>
//             <div className="border-grad-2 relative inline-block aspect-[1] h-auto w-[47px] rounded-full bg-white">
//                 <Image
//                     src={image}
//                     alt={fullName}
//                     className="h-full w-full rounded-full object-cover"
//                 />

//                 <div className="absolute -right-1 -top-1 size-[17.4px] rounded-full bg-gradient-2 p-1">
//                     <Check className="size-full text-success-600" />
//                 </div>
//             </div>
//             <div className="flex flex-col">
//                 <div className="text-paragraph-5">{fullName}</div>
//                 <div className="text-paragraph-5 font-bold">{position}</div>
//             </div>
//         </div>
//     );
// };

const DesktopSubmenu = ({
    activeMenu,
    onMouseEnter,
    onMouseLeave,
    menuItems,
}: {
    menuItems: MenuItemFragment[];
    activeMenu: number | null;
    onMouseLeave: (index: null) => void;
    onMouseEnter: (index: number | null) => void;
}) => {
    const { setBenefitValue } = useBenefit();
    return (
        <AnimatePresence mode="wait">
            {activeMenu !== null && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{
                        height: {
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                        },
                    }}
                    className={cn(
                        'invisible fixed left-0 top-[58px] z-40 min-h-[300px] w-full overflow-hidden bg-white py-10 text-primary-black lg:top-[83px]',
                        { visible: activeMenu !== null }
                    )}
                    onMouseEnter={() => onMouseEnter(activeMenu)}
                    onMouseLeave={() => onMouseLeave(null)}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                        }}>
                        <div className="group w-full">
                            <Container className="flex gap-8">
                                <div className="flex flex-1 flex-col gap-4 group-has-[ul]:flex-row">
                                    {menuItems[activeMenu].items.map(
                                        (group, groupIndex) => (
                                            <motion.div
                                                key={`menu-group${groupIndex}`}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    transition: {
                                                        duration: 0.4,
                                                        ease: [0.16, 1, 0.3, 1],
                                                        delay:
                                                            0.1 +
                                                            groupIndex * 0.08,
                                                    },
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -10,
                                                    transition: {
                                                        duration: 0.2,
                                                        ease: 'easeIn',
                                                    },
                                                }}
                                                className={cn('space-y-4', {
                                                    'flex-1': groupIndex === 0,
                                                })}>
                                                {group.items.length > 0 ? (
                                                    <div
                                                        className={
                                                            'min-w-[177px] text-sm font-semibold text-secondary-foreground'
                                                        }>
                                                        {group.title}
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={group.url}
                                                        onClick={() =>
                                                            onMouseLeave(null)
                                                        }
                                                        className="block text-base font-bold transition-all hover:opacity-80">
                                                        {group.title}
                                                    </Link>
                                                )}

                                                {group.items.length > 0 && (
                                                    <ul className="space-y-3">
                                                        {group.items.map(
                                                            (
                                                                item,
                                                                itemIndex
                                                            ) => (
                                                                <motion.li
                                                                    onClick={() =>
                                                                        onMouseEnter(
                                                                            null
                                                                        )
                                                                    }
                                                                    key={`nav-group-menu${itemIndex}`}
                                                                    initial={{
                                                                        opacity: 0,
                                                                        y: 10,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                        transition:
                                                                            {
                                                                                duration: 0.3,
                                                                                ease: [
                                                                                    0.16,
                                                                                    1,
                                                                                    0.3,
                                                                                    1,
                                                                                ],
                                                                                delay:
                                                                                    0.2 +
                                                                                    groupIndex *
                                                                                        0.08 +
                                                                                    itemIndex *
                                                                                        0.05,
                                                                            },
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        y: -5,
                                                                        transition:
                                                                            {
                                                                                duration: 0.2,
                                                                                ease: 'easeIn',
                                                                            },
                                                                    }}>
                                                                    <Link
                                                                        href={
                                                                            item.url
                                                                        }
                                                                        onClick={() => {
                                                                            setBenefitContextHelper(
                                                                                item.title,
                                                                                setBenefitValue
                                                                            );
                                                                        }}
                                                                        className={cn(
                                                                            'block text-paragraph-4 font-bold transition-all hover:opacity-80',
                                                                            {
                                                                                'text-paragraph-1':
                                                                                    groupIndex ===
                                                                                    0,
                                                                            }
                                                                        )}>
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </Link>
                                                                </motion.li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                            </motion.div>
                                        )
                                    )}
                                </div>
                                <div className="min-w-[200px]" />
                                {/* <MaryBadge
                                    image={maryFace}
                                    fullName="Mary Earps"
                                    position="UK Football Player"
                                    className="h-fit shadow-soft"
                                /> */}
                            </Container>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default memo(DesktopSubmenu);
