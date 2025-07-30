// src/app/api/get-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get('filename');

  if (!filename) {
    return new NextResponse('Filename required', { status: 400 });
  }

  const sharedFolder = '\\\\192.168.120.9\\4MPicture';
  const filePath = path.join(sharedFolder, `${filename}.PNG`);

  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="${filename}.PNG"`,
      },
    });
  } catch (error) {
    console.error('Error reading image:', error);
    return new NextResponse('Image not found or access denied', { status: 500 });
  }
}
