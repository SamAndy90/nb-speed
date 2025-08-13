export class RechargeAPIError extends Error {
    status: number;
    errors: Record<string, string[]>;

    constructor(
        status: number,
        statusText: string,
        errors: Record<string, string[]> = {}
    ) {
        // Create a readable message from the errors
        console.log('errors', errors);
        let errorMessages = '';
        if (typeof errors === 'string') {
            errorMessages = errors;
        } else {
            errorMessages = Object.entries(errors)
                .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                .join('; ');
        }

        super(errorMessages || `Recharge API error: ${status} ${statusText}`);

        this.name = 'RechargeAPIError';
        this.status = status;
        this.errors = errors;
    }

    static fromResponse(
        status: number,
        statusText: string,
        errorData: any
    ): RechargeAPIError {
        // Handle various error response formats
        const errors = errorData?.errors || {};
        return new RechargeAPIError(status, statusText, errors);
    }

    // Helper to get a user-friendly message for a specific field
    getFieldError(field: string): string | undefined {
        return this.errors[field]?.[0];
    }

    // Get all error messages as a flat array
    getAllMessages(): string[] {
        return Object.values(this.errors).flat();
    }

    // Get a user-friendly message
    getFriendlyMessage(): string {
        const messages = this.getAllMessages();
        if (messages.length > 0) {
            return messages.join('. ');
        }

        // Fallback messages based on status code
        switch (this.status) {
            case 400:
                return 'The provided information is invalid. Please check your input and try again.';
            case 401:
                return 'Your session has expired. Please log in again.';
            case 403:
                return "You don't have permission to perform this action.";
            case 404:
                return 'The requested resource was not found.';
            case 422:
                return "The provided information couldn't be processed. Please check your input and try again.";
            default:
                return 'An unexpected error occurred. Please try again later.';
        }
    }
}
