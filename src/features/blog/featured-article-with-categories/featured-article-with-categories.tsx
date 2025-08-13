'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Container from '@/components/container';
import InputWithButton from '@/components/input-width-button';
import { Search } from 'lucide-react';
import { Article, Blog } from '../types';
import FeaturedArticle from '../featured-article/featured-article';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const FeaturedArticleWithCategories = ({ blogs }: { blogs: Blog[] }) => {
    const [active, setActive] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>(''); // Separate state for confirmed search

    const tabs = useMemo(() => {
        return [
            { handle: 'all', title: 'All articles' },
            ...blogs.map((blog) => ({
                handle: blog.handle,
                title: blog.title,
            })),
        ];
    }, [blogs]);

    const filteredArticles: Article[] = useMemo(() => {
        const articles =
            active === 'all'
                ? blogs
                      .flatMap((blog) =>
                          blog.articles.map((a) => ({
                              ...a,
                              blogHandle: blog.handle,
                          }))
                      )
                      .sort(
                          (a, b) =>
                              new Date(b.publishedAt).getTime() -
                              new Date(a.publishedAt).getTime()
                      )
                : blogs
                      .find((blog) => blog.handle === active)
                      ?.articles.map((a) => ({ ...a, blogHandle: active }))
                      .sort(
                          (a, b) =>
                              new Date(b.publishedAt).getTime() -
                              new Date(a.publishedAt).getTime()
                      ) || [];
        // If search term is empty, return original articles; otherwise, filter based on the search term
        return searchTerm
            ? articles.filter(
                  (article) =>
                      article.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      article.contentHtml
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
              )
            : articles;
    }, [active, blogs, searchTerm]);

    // Handle search when button is clicked or Enter is pressed
    const handleSearchButtonClick = () => {
        setSearchTerm(searchQuery);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTerm(searchQuery);
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) {
            setSearchTerm('');
            setSearchQuery('');
            return;
        }
        setSearchQuery(e.target.value);
    };

    return (
        <section className="">
            <Container>
                <div className="flex flex-col justify-between gap-6 md:flex-row lg:pb-8">
                    <Tabs
                        defaultValue={active}
                        value={active}
                        onValueChange={setActive}
                        className="flex flex-col justify-center gap-10 md:gap-14">
                        <TabsList className="h-fit justify-start md:h-fit">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.handle}
                                    value={tab.handle}
                                    className="gap-1 text-paragraph-5 font-bold md:text-paragraph-4 md:font-bold">
                                    {tab.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    <InputWithButton
                        startAddon={<Search size={16} />}
                        placeholder="Search for topics"
                        value={searchQuery}
                        onChange={handleOnChange}
                        onKeyDown={handleKeyDown} // Trigger search on Enter key
                        onButtonClick={handleSearchButtonClick} // Trigger search on button click
                    />
                </div>
            </Container>

            {filteredArticles.length <= 0 && (
                <p className="my-4 text-center text-paragraph-5 font-bold md:text-paragraph-4 md:font-bold">
                    No articles found
                </p>
            )}

            <div className="w-full bg-gradient-section pt-[3.125rem] lg:pt-0">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 5,
                    }}
                    modules={[Autoplay, Pagination]}>
                    {filteredArticles.map((article) => (
                        <SwiperSlide key={article.id}>
                            <FeaturedArticle
                                isFixedRatio
                                className="pt-0 lg:pt-0"
                                article={article}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedArticleWithCategories;
