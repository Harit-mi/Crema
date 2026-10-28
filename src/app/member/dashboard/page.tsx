'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MemberDashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account');
  }, [router]);

  return (
    <div className="max-w-md mx-auto py-20 text-center text-xs text-espresso-600">
      Redirecting to member account...
    </div>
  );
}
