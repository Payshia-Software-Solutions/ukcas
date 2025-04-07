import React, { Suspense } from 'react';
import CertificateVerificationClient from '@/components/CertificateVerification/CertificateVerification';

const CertificateVerificationPage = () => {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <CertificateVerificationClient />
    </Suspense>
  );
};

export default CertificateVerificationPage;
