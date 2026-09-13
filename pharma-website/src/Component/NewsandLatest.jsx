import React from "react";
import NewsCard from "./Newcard";

import news2 from "../assets/slide2.jpg";

const newsData = [
  {
    id: 1,
    image: news2,
    category: "Award",
    title:
      "Pharmexa Wins Global Excellence Award in Pharmaceutical Manufacturing",
    description:
      "Recognized for outstanding achievements in quality assurance, production standards, and innovative manufacturing practices on an international level.",
    date: "December 10, 2025",
  },
  {
    id: 2,
    image: news2,
    category: "Innovation",
    title: "Expansion of New R&D Facility for Advanced Formulation",
    description:
      "We have launched a new research and development center dedicated to accelerating the development of next-generation healthcare and therapeutic solutions.",
    date: "January 18, 2026",
  },
  {
    id: 3,
    image: news2,
    category: "Partnership",
    title: "Strategic Partnership to Enhance Global Medicine Supply Chains",
    description:
      "Joining forces with leading healthcare providers to broaden access to essential pharmaceutical products across emerging international markets.",
    date: "February 24, 2026",
  },
];

const LatestNews = () => {
  return (
    <section className="py-20 bg-slate-50/60">
      <div className="container mx-auto px-4">
        {/* رأس السيكشن Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-primary font-bold text-3xl md:text-5xl mb-3">
            LATEST NEWS & UPDATES
          </h2>
          <span className="block text-gray-600 text-base md:text-lg font-medium">
            Stay informed about our recent achievements, breakthroughs, and
            corporate milestones.
          </span>
        </div>

        {/* شبكة الكروت (Grid of 3 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <NewsCard
              key={item.id}
              image={item.image}
              category={item.category}
              title={item.title}
              description={item.description}
              date={item.date}
              onReadMore={() => console.log(`Opening news ID: ${item.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
