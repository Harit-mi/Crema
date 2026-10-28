'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MemberPassRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/my-membership');
  }, [router]);

  return (
    <div className="max-w-md mx-auto py-20 text-center text-xs text-espresso-600">
      Redirecting to digital member pass...
    </div>
  );
}
