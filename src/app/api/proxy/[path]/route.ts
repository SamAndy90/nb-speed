import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { path: string } }) {
    const { path } = params;
    const url = `https://www.nutriburstvitamins.com/pages/${path}`;


    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0', // Some servers block non-browser requests
            },
        });
        const html = await response.text();
        return NextResponse.json({ html });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
    }
}