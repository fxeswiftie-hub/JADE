import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Portfolio } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    const query = { isPublished: true };
    if (type) {
      (query as any).type = type;
    }

    const portfolios = await Portfolio.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}
