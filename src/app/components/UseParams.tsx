'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ParamListener({ onGetParam }: { onGetParam: (value: string | null) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const param = searchParams.get('Param');
    onGetParam(param);
  }, [searchParams, onGetParam]); // เพิ่ม onGetParam เพื่อป้องกัน warning

  return null;
}
