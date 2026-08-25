import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Portfolio, Comment } from '@/lib/models';
import { moderateContent } from '@/lib/ai-service';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const portfolioId = searchParams.get('portfolioId');

    if (!portfolioId) {
      return NextResponse.json(
        { error: 'Portfolio ID is required' },
        { status: 400 }
      );
    }

    const comments = await Comment.find({
      portfolioId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // Moderate content
    const isApproved = await moderateContent(body.content);

    const comment = await Comment.create({
      ...body,
      isApproved,
      isSpam: !isApproved,
    });

    return NextResponse.json(
      { 
        comment,
        message: isApproved ? 'Comment posted successfully' : 'Comment pending review',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
