import Container from '@/components/container';
import { TOSContent } from '@/lib/data/tos';
import React from 'react';

const LegalContentComponent = ({
    title,
    content,
}: {
    title: string;
    content: TOSContent[];
}) => {
    return (
        <Container className="space-y-10 lg:space-y-20">
            <h1 className="font-medium">{title}</h1>

            {content.map((item, index) => (
                <div className="space-y-3" key={index}>
                    {item.title && <h2>{item.title}</h2>}
                    <div>
                        {item.description && (
                            <p className="whitespace-pre-line text-paragraph-4 lg:text-paragraph-2">
                                {item.description}
                            </p>
                        )}
                        {item.descriptions && (
                            <div>
                                {item.descriptions.map((desc, descIndex) => (
                                    <div key={`${index}-${descIndex}`}>
                                        <p
                                            key={index}
                                            className="text-paragraph-4 font-bold lg:text-paragraph-2">
                                            {desc.title}
                                        </p>
                                        {desc.description && (
                                            <>
                                                <p className="whitespace-pre-line text-paragraph-4 lg:text-paragraph-2">
                                                    {`\n${desc.description}\n\n`}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            {item.list && (
                                <ul>
                                    {item.list.map((list, listIndex) => (
                                        <li
                                            key={`${index}-list-${listIndex}`}
                                            className="text-paragraph-4 lg:text-paragraph-2">
                                            {list.title && (
                                                <>
                                                    <p className="whitespace-pre-line font-bold">
                                                        {`\n${list.title}`}
                                                    </p>
                                                    <br />
                                                </>
                                            )}
                                            <ul className="list-disc pl-8">
                                                {list.descriptions &&
                                                    list.descriptions.map(
                                                        (
                                                            description,
                                                            descriptionIndex
                                                        ) => (
                                                            <li
                                                                key={`${index}-list-${listIndex}-${descriptionIndex}`}>
                                                                {description}
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                            {list.description && (
                                                <p className="whitespace-pre-line text-paragraph-4 lg:text-paragraph-2">
                                                    {`\n${list.description}`}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <div />
        </Container>
    );
};

export default LegalContentComponent;
