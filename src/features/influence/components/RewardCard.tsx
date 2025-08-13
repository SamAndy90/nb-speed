import { FC, SVGProps } from 'react';

export function RewardCard({
    icon,
    title,
    description,
}: {
    icon: FC<SVGProps<SVGElement>>;
    title: string;
    description: string;
}) {
    const Icon = icon;
    return (
        <li className="p-4 flex h-56 w-[206px] shrink-0 flex-col items-center justify-center rounded-[calc(var(--radius)-6px)] border bg-white transition-all">
            <div className="mb-4">
                <Icon className='w-10 h-10' />
            </div>
            <div className="mb-2 text-lg font-bold">{title}</div>
            <p className="text-sm text-center">{description}</p>
        </li>
    );
}
