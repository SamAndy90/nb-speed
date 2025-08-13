import { ProductRatingBatch, ProductReviewsResponse } from './types';

class ReviewsService {
    private storeId: string | undefined;
    private apiKey: string | undefined;
    private baseUrl: string;

    constructor() {
        this.storeId = process.env.REVIEWS_IO_STORE_ID;
        this.apiKey = process.env.REVIEWS_IO_API_KEY;
        this.baseUrl = process.env.REVIEWS_API_URL ?? 'https://api.reviews.io';
    }

    /**
     * Fetch product reviews
     * @param productId - The product SKU
     * @param page - Page number (starts at 1)
     * @param perPage - Number of reviews per page
     */
    async getProductReviews(
        productId: string,
        page: number = 1,
        perPage: number = 10
    ): Promise<ProductReviewsResponse | null> {
        const url = `${this.baseUrl}/product/review?store=${this.storeId}&sku=${productId}&page=${page}&per_page=${perPage}`;

        try {
            const response = await fetch(url);
            if (!response.ok)
                throw new Error('Failed to fetch product reviews');
            return (await response.json()) as ProductReviewsResponse;
        } catch (error) {
            console.error('Error fetching product reviews:', error);
            return null;
        }
    }
    async retrieveProductRatingBatch(skus: string) {
        const url = `${this.baseUrl}/product/rating-batch?store=${this.storeId}&sku=${skus}`;
        try {
            const response = await fetch(url);
            if (!response.ok)
                throw new Error('Failed to fetch product reviews');
            return (await response.json()) as ProductRatingBatch[];
        } catch (error) {
            console.error('Error fetching product reviews:', error);
            return null;
        }
    }
}

export default new ReviewsService();
