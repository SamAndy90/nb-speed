import { Button } from '@/components/ui/button';
import { CartItem } from '@/features/shopify/types';

export function UpgradeToSubscriptionButton({
    discountPercentage = 20,
    item,
    onClick,
}: {
    item: CartItem;
    discountPercentage?: number;
    onClick: () => void;
}) {
    return (
        <Button
            onClick={onClick}
            className="mb-8 h-9 w-full shrink-0 rounded-full text-xs font-bold sm:text-base md:h-11"
            size="lg"
            variant="dark"
            type="submit">
            Upgrade to Subscription & Save {discountPercentage}%
        </Button>
    );
}
