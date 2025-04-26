"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PromotionCard from "@/components/PromotionCard";
import { motion } from "framer-motion";
import SectionHeader from "@/components/Common/SectionHeader";
import Breadcrumb from "@/components/Breadcrumb";
import config from "@/config";

// Interface for mapped promotion data
interface PromotionItem {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

// Interface for raw API response data
interface InstituteAPIResponse {
  id: number;
  img_url: string;
  name: string;
  description: string;
  slug: string;
}

const PromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<PromotionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<InstituteAPIResponse[]>(`${config.API_BASE_URL}/institute`)
      .then((res) => {
        const data: PromotionItem[] = res.data.map((item) => ({
          id: item.id.toString(),
          imageSrc: item.img_url,
          title: item.name,
          description: item.description,
          link: item.slug,
        }));
        setPromotions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching promotions:", err);
        setError("Failed to load promotions.");
        setLoading(false);
      });
  }, []);

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
      <div>
        <SectionHeader
          imgURL="/assets/about/headerimage.jpg"
          title="Our Partnerships"
        />
      </div>
      <div className="min-h-screen bg-gradient-to-br mt-0 from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/Partnerships", label: "Partnerships" },
            ]}
            fontColor=""
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover our latest offers and promotions just for you.
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {promotions.map((promotion) => (
                <motion.div key={promotion.id} variants={itemVariants}>
                  <PromotionCard
                    imageSrc={`/assets/services/${promotion.imageSrc}`}
                    title={promotion.title}
                    description={promotion.description}
                    link={`/${promotion.link}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionsPage;
