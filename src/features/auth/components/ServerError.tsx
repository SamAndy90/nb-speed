import { Message } from 'react-hook-form';

export type ServerErrorProps = {
    error?: string;
};

/**
 * If an error is returned from a server action, this will display the error message.
 * @returns
 */
export function ServerError({ error }: ServerErrorProps) {
    if (error) console.log('Error:', error);
    return (
        error && (
            <p className="text-center text-destructive animate-in fade-in">
                {error}
            </p>
        )
    );
}
