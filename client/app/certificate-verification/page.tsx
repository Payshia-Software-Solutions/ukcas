import React, { Suspense } from 'react';
import CertificateVerification from '@/components/CertificateVerification/CertificateVerification';

const CertificateVerificationPage = () => {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <CertificateVerification />
    </Suspense>
  );
};

export default CertificateVerificationPage;
