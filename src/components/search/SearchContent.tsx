import { useEffect, useState } from 'react';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';
import { TextInput } from './Inputs';
import { IoIosSearch } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa6';
import { TbX } from 'react-icons/tb';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { MainUrls } from '@/route-urls';

type SearchContentProps = {
    closeSearch: () => void;
};

export function SearchContent({ closeSearch }: SearchContentProps) {
    const router = useRouter();
    const [queryParams, setQueryParams] = useQueryParams(
        {
            query: withDefault(StringParam, ''),
        },
        {
            removeDefaultsFromUrl: true,
        }
    );

    const [searchQueryValue, setSearchQueryValue] = useState(queryParams.query);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setQueryParams(() => ({
                query: searchQueryValue,
            }));
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchQueryValue, setQueryParams]);

    function handleSubmit() {
        if (!searchQueryValue) return;
        router.push('/collections/all-products?query=' + searchQueryValue);
        closeSearch();
    }

    return (
        <div className={'h-full w-full'}>
            <div className={'mb-9'}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                    <TextInput
                        placeholder={'Search Nutriburst'}
                        autoFocus
                        value={searchQueryValue}
                        onChange={(e) => setSearchQueryValue(e.target.value)}
                        startAdornment={
                            <button
                                type={'submit'}
                                className={'flex items-center justify-center'}>
                                <IoIosSearch
                                    className={
                                        'size-6 cursor-pointer text-neutral-400 transition-colors hover:text-neutral-700'
                                    }
                                />
                            </button>
                        }
                        endAdornment={
                            searchQueryValue && (
                                <Button
                                    size="mini"
                                    variant="dark"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSearchQueryValue('');
                                    }}>
                                    {<TbX className="size-3 text-white" />}
                                </Button>
                            )
                        }
                    />
                </form>
            </div>
            <div>
                <h4
                    className={
                        'mb-4 text-sm font-extrabold tracking-wide text-neutral-400'
                    }>
                    Quick Links
                </h4>
                <ul className={'flex flex-col gap-y-2'}>
                    {quickLinksData.map((link) => (
                        <li
                            key={link.label}
                            className={
                                'group -mx-2 rounded-[4px] px-2 py-1 transition-colors hover:bg-neutral-100'
                            }>
                            <Link
                                href={link.url}
                                onClick={closeSearch}
                                className={'flex items-center gap-x-1.5'}>
                                <FaArrowRight
                                    className={
                                        'size-3 text-neutral-400 transition-colors group-hover:text-neutral-900'
                                    }
                                />
                                <span
                                    className={
                                        'text-sm font-bold text-[#2D2F36] group-hover:text-neutral-900'
                                    }>
                                    {link.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const quickLinksData = [
    {
        label: 'Discover Advanced Products',
        url: '/collections/all-products?benefit=advanced',
    },
    {
        label: 'What makes Nutriburst different?',
        url: MainUrls.getAboutUs(),
    },
    {
        label: 'Our Bestseller',
        url: '/products/ashwagandha-ksm-66-sugar-free-vegan-gummies',
    },
    {
        label: 'Customer Reviews',
        url: '/#reviews',
    },
];
