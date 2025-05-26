// components/UseParams.tsx

'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GetParam({ onGetParam }: { onGetParam: (value: string | null) => void }) {
  const searchParams = useSearchParams();
  const Param = searchParams.get('Param');

  useEffect(() => {
    onGetParam(Param);
  }, [Param]);

  return null;
}