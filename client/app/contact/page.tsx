import SectionHeader from "@/components/Common/SectionHeader";
import React from "react";
import ContactForm from "@/components/ContactForm";

// Metadata for the Contact Us page
export const metadata = {
  title: "Contact Us | Ceylon Pharma College",
  description:
    "Get in touch with us for any inquiries or information regarding our services. Contact Ceylon Pharma College for more details about our courses, certifications, and consultancy.",
  keywords: [
    "Contact Ceylon Pharma College",
    "Contact Us",
    "Pharma College Inquiries",
    "Pharma Education",
    "Ceylon Pharma College Contact",
  ],
  openGraph: {
    title: "Contact Us | Ceylon Pharma College",
    description:
      "Reach out to Ceylon Pharma College for inquiries or support. Our contact form is ready to assist you with any questions or feedback.",
    url: "https://www.phamacollege.lk/contact", // Replace with your actual URL
    images: [
      {
        url: "https://www.phamacollege.lk/assets/contact-banner.jpg", // Replace with your image URL
        width: 1200,
        height: 630,
        alt: "Contact Ceylon Pharma College for Your Inquiries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Ceylon Pharma College",
    description:
      "Get in touch with Ceylon Pharma College for all your inquiries and service information. We’re here to assist you.",
    image: "https://www.phamacollege.lk/assets/contact-banner.jpg", // Replace with your image URL
  },
};

const Page: React.FC = () => {
  return (
    <div className="mt-20">
   
      <SectionHeader
        imgURL="/assets/about/headerimage.jpg"
        title="Contact Us"
      />
      <ContactForm />
    </div>
  );
};

export default Page;
