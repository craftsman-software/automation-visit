import { NextResponse } from 'next/server';
import { saveVisitorInfo } from '@/utils/sheets';
import { generateTicketNumber } from '@/utils/sheets';
import type { FormData } from '@/types';

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();
    const now = new Date().toISOString();
    
    const visitorInfo = {
      ...data,
      visitDate: now.split('T')[0],
      ticketNumber: generateTicketNumber(),
      hasAgreedToTerms: false,
      createdAt: now,
      updatedAt: now,
    };

    await saveVisitorInfo(visitorInfo);

    return NextResponse.json({ 
      success: true, 
      ticketNumber: visitorInfo.ticketNumber 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to register visitor' },
      { status: 500 }
    );
  }
}
