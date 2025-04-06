"use client";
import React from "react";
import PromotionCard from "@/components/PromotionCard";
import { motion } from "framer-motion";
import SectionHeader from "@/components/Common/SectionHeader";
import Breadcrumb from "@/components/Breadcrumb";
// Define the type for our promotion items
interface PromotionItem {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const PromotionsPage: React.FC = () => {
  // Sample promotion items (in a real app, you might fetch these from an API)
  const promotions: PromotionItem[] = [
    {
      id: "1",
      imageSrc: "/assets/services/Bosa-finance-img1.jpg",
      title: "Summer Special Offer",
      description:
        "Get 20% off on all summer products until the end of the month.",
      link: "/offers-summer-special",
    },
    {
      id: "2",
      imageSrc: "/assets/services/Bosa-finance-img2.jpg",
      title: "New Collection Launch",
      description:
        "Explore our latest collection of premium products now available.",
      link: "/collectionsnew-arrivals",
    },
    {
      id: "3",
      imageSrc: "/assets/services/Bosa-finance-img3.jpg",
      title: "Exclusive- Membership",
      description:
        "Join our exclusive membership program and enjoy special benefits.",
      link: "/membership",
    },
    {
      id: "4",
      imageSrc: "/assets/services/Bosa-finance-img4.jpg",
      title: "Limited Edition Products",
      description: "Discover our limited edition products before they're gone.",
      link: "/productslimited-edition",
    },
    {
      id: "5",
      imageSrc: "/assets/services/Bosa-finance-img5.jpg",
      title: "Discount on Electronics",
      description: "Up to 30% off on selected electronics for a limited time.",
      link: "/offers-electronics",
    },
    {
      id: "6",
      imageSrc: "/assets/services/Bosa-finance-img6.jpg",
      title: "Free Shipping Worldwide",
      description: "Enjoy free shipping on all international orders over $50.",
      link: "/shippingfree",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="mt-20">
      <Breadcrumb
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/Partnerships", label: "Partnerships" },
          
        ]}
        fontColor=""
      />
      <div>
        <SectionHeader
          imgURL="/assets/about/headerimage.jpg"
          title="Our Partnerships"
        />
      </div>
      <div className="min-h-screen bg-gradient-to-br mt-0 from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {/* <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Partnerships
            </h1> */}
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover our latest offers and promotions just for you.
            </p>
          </motion.div>

          {/* Promotions grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {promotions.map((promotion) => (
              <motion.div key={promotion.id} variants={itemVariants}>
                <PromotionCard
                  imageSrc={promotion.imageSrc}
                  title={promotion.title}
                  description={promotion.description}
                  link={promotion.link}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsPage;
