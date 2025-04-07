import React, { Suspense } from 'react';
import GetAccredited from '@/components/GetAccredited/GetAccredited';
import SectionHeader from '@/components/Common/SectionHeader';


const GetAccreditedpage = () => {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <SectionHeader
        imgURL="/assets/about/headerimage1.jpg"
        title="Get Accredited"
      />
      <GetAccredited />
    </Suspense>
  );
};

export default GetAccreditedpage;
