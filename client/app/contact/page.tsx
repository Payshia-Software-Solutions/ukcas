import SectionHeader from "@/components/Common/SectionHeader";

import React from "react";

import ContactForm from "@/components/ContactForm";

const Page: React.FC = () => {
  return (
    <div className="mt-20">
      <SectionHeader
        imgURL="/assets/about/headerimage.jpg"
        title="Contact Us "
      />

      <ContactForm />
    </div>
  );
};

export default Page;
