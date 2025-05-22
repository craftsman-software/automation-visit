import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import type { VisitorInfo } from '../types';

// 環境変数から認証情報を取得
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

// JWT認証クライアントの作成
const auth = new JWT({
  email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: SCOPES,
});

// Google Sheets APIのインスタンスを作成
const sheets = google.sheets({ version: 'v4', auth });

// 来客情報をスプレッドシートに保存
export async function saveVisitorInfo(visitorInfo: VisitorInfo): Promise<void> {
  try {
    const values = [
      [
        visitorInfo.visitorName,
        visitorInfo.hostName,
        visitorInfo.purpose,
        visitorInfo.duration,
        visitorInfo.visitDate,
        visitorInfo.ticketNumber || '',
        visitorInfo.hasAgreedToTerms ? 'Yes' : 'No',
        visitorInfo.createdAt,
        visitorInfo.updatedAt,
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Visitors!A:I',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error('Error saving visitor info:', error);
    throw new Error('Failed to save visitor information');
  }
}

// 来客情報を発券番号で検索
export async function findVisitorByTicketNumber(ticketNumber: string): Promise<VisitorInfo | null> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Visitors!A:I',
    });

    const rows = response.data.values;
    if (!rows) return null;

    // ヘッダー行をスキップして検索
    const visitorRow = rows.slice(1).find(row => row[5] === ticketNumber);
    if (!visitorRow) return null;

    return {
      visitorName: visitorRow[0],
      hostName: visitorRow[1],
      purpose: visitorRow[2],
      duration: visitorRow[3],
      visitDate: visitorRow[4],
      ticketNumber: visitorRow[5],
      hasAgreedToTerms: visitorRow[6] === 'Yes',
      createdAt: visitorRow[7],
      updatedAt: visitorRow[8],
    };
  } catch (error) {
    console.error('Error finding visitor:', error);
    throw new Error('Failed to find visitor information');
  }
}

// 発券番号の生成
export function generateTicketNumber(): string {
  const prefix = 'V';
  const randomNum = Math.floor(Math.random() * 100000);
  return `${prefix}${randomNum.toString().padStart(5, '0')}`;
}
