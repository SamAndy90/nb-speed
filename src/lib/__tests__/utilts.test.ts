import { repeat } from '../utils';

describe('repeat', () => {
    it('should repeat the array elements n times', () => {
        const arr = [1, 2, 3];
        const n = 3;
        const result = repeat(arr, n);
        expect(result).toEqual([1, 2, 3, 1, 2, 3, 1, 2, 3]);
    });

    it('should return an empty array when n is 0', () => {
        const arr = [1, 2, 3];
        const n = 0;
        const result = repeat(arr, n);
        expect(result).toEqual([]);
    });

    it('should return an empty array when the input array is empty', () => {
        const arr: any[] = [];
        const n = 5;
        const result = repeat(arr, n);
        expect(result).toEqual([]);
    });

    it('should handle n being 1 correctly', () => {
        const arr = [1, 2, 3];
        const n = 1;
        const result = repeat(arr, n);
        expect(result).toEqual([1, 2, 3]);
    });

    it('should handle arrays with different types of elements', () => {
        const arr = [1, 'a', true];
        const n = 2;
        const result = repeat(arr, n);
        expect(result).toEqual([1, 'a', true, 1, 'a', true]);
    });
});
