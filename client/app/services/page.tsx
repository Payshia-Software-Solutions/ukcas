import React from 'react';
import SectionHeader from '@/components/Common/SectionHeader';
import ServiceCard from '@/components/ServiceCard';

// Define service item structure
interface ServiceItem {
  id: number;
  category: string;
  title: string;
  imageUrl: string;
  description : string;
}

const Page: React.FC = () => {
  // Sample data for services
  const services: ServiceItem[] = [
    {
      id: 1,
      category: 'ASSESSMENTS',
      title: 'Skill Assessments',
      imageUrl: '/assets/services/Bosa-finance-img1.jpg',
      description: 'Evaluate the skills of your team or candidates through comprehensive assessments tailored to industry standards and job roles.'
    },
    {
      id: 2,
      category: 'STANDARDIZATION',
      title: 'Research & Publications',
      imageUrl: '/assets/services/Bosa-finance-img2.jpg',
      description: 'Access in-depth research and expertly curated publications that provide valuable insights and data to enhance your business decisions.'
    },
    {
      id: 3,
      category: 'CERTIFICATIONS',
      title: 'Skill Certifications',
      imageUrl: '/assets/services/Bosa-finance-img3.jpg',
      description: 'Boost your professional credibility with recognized certifications that validate your expertise and skills in various domains.'
    },
    {
      id: 4,
      category: 'STANDARDIZATION',
      title: 'Accreditation',
      imageUrl: '/assets/services/Bosa-finance-img4.jpg',
      description: 'Gain formal recognition for your organization through our accreditation services, ensuring compliance with international standards.'
    },
    {
      id: 5,
      category: 'STANDARDIZATION',
      title: 'Quality Control',
      imageUrl: '/assets/services/Bosa-finance-img5.jpg',
      description: 'Ensure the highest quality in your products and services with our robust quality control processes, aligned with industry best practices.'
    },
    {
      id: 6,
      category: 'ADVISORY',
      title: 'Consultancy',
      imageUrl: '/assets/services/Bosa-finance-img6.jpg',
      description: 'Receive expert guidance and strategic advice tailored to your business needs, helping you navigate complex challenges and achieve your goals.'
    }
  ];
  

  return (
    <div className='mt-20'>
      <SectionHeader
        imgURL="/assets/about/headerimage.jpg"   
        title='Our Services'
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-slate-800 mb-2">What We Can Do</h2>
          <div className="flex items-center justify-center">
            <div className="h-px bg-red-400 w-20"></div>
            <p className="mx-4 text-slate-600 uppercase font-medium tracking-wider">Our Services</p>
            <div className="h-px bg-red-400 w-20"></div>
          </div>
        </div>
        
        {/* Grid with maximum 4 cards per column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              category={service.category}
              title={service.title}
              imageUrl={service.imageUrl}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;