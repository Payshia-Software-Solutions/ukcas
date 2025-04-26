"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import config from "@/config";

// Define a type for Promotion
interface Promotion {
  name: string;
  img_url: string;
  mini_description: string;
  description: string;
  terms?: string[];
  terms_and_conditions?: string;
}

const SinglePromotionPage: React.FC = () => {
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const fetchInstituteData = async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/institute/slug/${slug}`);
        setPromotion(res.data);
      } catch (error) {
        console.error("Failed to fetch institute:", error);
      }
    };

    if (slug) fetchInstituteData();
  }, [slug]);

  if (!promotion) return <div className="mt-20 text-center">Loading...</div>;

  // Prepare terms safely
  const terms: string[] = promotion.terms ?? (
    promotion.terms_and_conditions
      ?.split(/[.,;]\s+/)
      .filter(Boolean)
      .map((t) => t.trim()) ?? []
  );

  return (
    <section className="mt-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto mt-16">

          <Breadcrumb
            crumbs={[
              { href: "/", label: "Home" },
              { href: "/Partnerships", label: "Partnerships" },
              { href: `/Partnerships/${slug}`, label: promotion.name || "Slug" },
            ]}
            fontColor=""
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[30rem] relative"
            >
              <Image
                src={`/assets/services/${promotion.img_url}`}
                alt={promotion.name}
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="p-6 sm:p-8"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    {promotion.name}
                  </h1>
                </motion.div>
              </div>
            </motion.div>

            <div className="p-6 sm:p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="prose max-w-none mb-8"
              >
                <p className="text-lg text-gray-700">{promotion.mini_description}</p>
                <p className="mt-4 text-gray-600">{promotion.description}</p>
              </motion.div>

              {terms.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Terms & Conditions
                  </h2>
                  <ul className="bg-gray-50 rounded-lg p-4">
                    {terms.map((term, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                        className="mb-2 last:mb-0 flex items-start"
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mt-2 mr-2"></span>
                        <span>{term}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.button
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-[#7C2B33] text-white rounded-lg font-medium transition-colors"
              >
                <Link href="/get-accredited">Get Accredited</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SinglePromotionPage;
