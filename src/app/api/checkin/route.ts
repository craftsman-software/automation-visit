import { NextResponse } from 'next/server';
import { findVisitorByTicketNumber } from '@/utils/sheets';
import type { TicketFormData } from '@/types';

export async function POST(request: Request) {
  try {
    const data: TicketFormData = await request.json();
    
    // 発券番号で来客情報を検索
    const visitor = await findVisitorByTicketNumber(data.ticketNumber);
    
    if (!visitor) {
      return NextResponse.json(
        { success: false, error: '無効な発券番号です' },
        { status: 400 }
      );
    }

    // 来客情報を更新（本来はここで更新処理を行う）
    // この例では簡略化のため、更新は省略しています

    return NextResponse.json({ 
      success: true,
      visitor: {
        visitorName: visitor.visitorName,
        hostName: visitor.hostName,
        purpose: visitor.purpose,
        duration: visitor.duration,
      }
    });
  } catch (error) {
    console.error('Checkin error:', error);
    return NextResponse.json(
      { success: false, error: 'チェックインに失敗しました' },
      { status: 500 }
    );
  }
}
