import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Inspiration } from '@/lib/models';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get('authorization')?.split(' ')[1];
    const verified = token ? verifyToken(token) : null;

    if (!verified) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const inspirations = await Inspiration.find({ userId: verified.userId });
    return NextResponse.json({ inspirations }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inspirations' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get('authorization')?.split(' ')[1];
    const verified = token ? verifyToken(token) : null;

    if (!verified) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const inspiration = await Inspiration.create({
      userId: verified.userId,
      ...body,
    });

    return NextResponse.json(
      { inspiration },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create inspiration error:', error);
    return NextResponse.json(
      { error: 'Failed to create inspiration' },
      { status: 500 }
    );
  }
}
