import React, { Suspense } from 'react';
import CertificateVerification from '@/components/InstituteVerification/InstituteVerification';

const InstituteVerificationPage = () => {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <CertificateVerification />
    </Suspense>
  );
};

export default InstituteVerificationPage;
