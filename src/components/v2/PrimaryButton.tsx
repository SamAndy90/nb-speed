import ChevronRight from '@/assets/icons/chevron-right.svg';
import { AsProps } from '@/types';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type PrimaryButtonProps<T extends React.ElementType> = AsProps<T> & {
    align?: 'left' | 'right' | 'center';
    innerClassName?: string;
    animateText?: boolean;
};
const primaryButtonVariants = cva('', {
    variants: {
        variant: {
            default:
                'relative inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold text-[#2D2F36] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            cooper_gradient: '',
        },
        size: {
            default: '',
        },
        align: {
            left: '',
            right: '',
            center: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        align: 'center',
    },
});
const primaryButtonContainerVariants = cva(
    'flex w-full flex-row items-center justify-center',
    {
        variants: {
            align: {
                left: 'relative right-1.5 -translate-x-[7px]',
                right: '',
                center: '',
            },
        },
        defaultVariants: { align: 'center' },
    }
);
export function PrimaryButton<T extends React.ElementType>({
    className,
    as = 'button',
    variant,
    size,
    align,
    animateText = false,
    children,
    innerClassName,
    ...props
}: PrimaryButtonProps<T>) {
    const Comp = as;
    const Chevron = 'div';
    return (
        <Comp
            className={cn(
                primaryButtonVariants({ variant, size, align, className })
            )}
            //ref={ref}
            {...props}>
            <div className="relative flex h-full w-full items-center justify-center">
                <div className="absolute size-[calc(100%+0.75rem)] animate-glow rounded-full bg-theme-v2" />
                <div
                    className={cn(
                        'group relative flex h-full w-full flex-row items-center justify-center gap-1 overflow-clip rounded-full font-bold *:duration-700 md:min-h-[46px]',
                        'bg-cooper-gradient',
                        innerClassName
                    )}>
                    <Chevron
                        className={cn(
                            'relative left-0 flex aspect-square h-[34px] -translate-x-full items-center justify-center rounded-full bg-gradient-2 text-black transition-all',
                            'group-hover:left-1.5 group-hover:translate-x-0'
                        )}>
                        <ChevronRight className="h-4 w-4" />
                    </Chevron>
                    <div
                        className={cn(
                            primaryButtonContainerVariants({ align }),
                            animateText && 'group-hover:translate-x-7'
                        )}>
                        {children}
                    </div>
                    <Chevron
                        className={cn(
                            'relative right-1.5 flex aspect-square h-[34px] items-center justify-center rounded-full bg-gradient-2 text-black transition-all',
                            'group-hover:right-0 group-hover:translate-x-full'
                        )}>
                        <ChevronRight className="h-4 w-4" />
                    </Chevron>
                </div>
            </div>
        </Comp>
    );
}

PrimaryButton.displayName = 'PrimaryButton';
