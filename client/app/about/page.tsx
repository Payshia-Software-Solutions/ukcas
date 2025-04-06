
import SectionHeader from '@/components/Common/SectionHeader';
import WhyChooseUs from '@/components/WhyChooseUs';
import React from 'react'
import CounterSection from '@/components/Counter';
import AboutSection from '@/components/AboutSection';
import TrustedClients from '@/components/AboutPage/TrustedClients';
import Breadcrumb from '@/components/Breadcrumb';

const Page: React.FC = () => {
  return (
    <div className='mt-20'>
         <Breadcrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About Us" },
      
          
        ]}
        fontColor=""
      />
        <SectionHeader
         imgURL="/assets/about/headerimage.jpg"   
         title='About Us '
        />
        {/* <WelcomeMessage/> */}

        <AboutSection/>
        <CounterSection/>
        <TrustedClients/>
        <WhyChooseUs/>
       
        
    </div>
  )
}

export default Page;
