import { cn } from '@/lib/utils';

export default function ColoursPage() {
    const colours = [
        'text-accent-pink',
        'text-accent-ocean-blue',
        'text-accent-tech-blue',
        'text-accent-orange',
        'text-accent-green',
    ];
    return colours.map((colour) => (
        <div key={colour} className="flex items-center space-x-2">
            <h2 className={cn(colour)}>{colour}</h2>
        </div>
    ));
}
