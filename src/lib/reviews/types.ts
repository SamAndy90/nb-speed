// Store information
export interface ReviewsStore {
    name: string;
    logo: string;
}

// Stats information
export interface ReviewsStats {
    average: string;
    count: number;
}

// Reviewer information
export interface Reviewer {
    first_name: string;
    last_name: string;
    verified_buyer: string;
    address: string;
    profile_picture: string;
    gravatar: string;
}

// Reply to a review
export interface ReviewReply {
    id: number;
    product_review_id: number;
    partner_id: number | null;
    comments: string;
    date_created: string;
    date_updated: string;
    recipient: string | null;
    private: number;
}

// Product information
export interface ReviewProduct {
    sku: string;
    name: string;
    description: string;
    link: string;
    image_url: string;
    mpn: string;
    brand: string;
    category: string;
    custom: string;
}

// Individual review data
export interface Review {
    votes: number | null;
    flags: number | null;
    title: string | null;
    product_review_id: number;
    review: string;
    sku: string;
    rating: number;
    date_created: string;
    ratings: any[]; // This seems to be empty in the example
    reviewer: Reviewer;
    replies: ReviewReply[];
    images: any[]; // This seems to be empty in the example
    product: ReviewProduct;
    timeago: string;
}

// Pagination data
export interface ReviewsPagination {
    current_page: number;
    data: Review[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Settings information
export interface ReviewsSettings {
    write_review_button: number;
    disable_product_seo_css: number;
    show_product_review_titles: number;
}

// Product list item
export interface ProductListItem {
    sku: string;
    name: string;
}

// Complete response structure
export interface ProductReviewsResponse {
    store: ReviewsStore;
    stats: ReviewsStats;
    reviews: ReviewsPagination;
    ratings: any[]; // This seems to be empty in the example
    settings: ReviewsSettings;
    word: string;
    products: ProductListItem[];
    write_review_link: string;
}

export interface ProductRatingBatch {
    sku: string;
    average_rating: string;
    num_ratings: number;
}
