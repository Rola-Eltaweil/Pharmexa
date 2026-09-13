import React from "react";
import { Calendar, ArrowUpRight } from "lucide-react";

const NewsCard = ({
  image,
  category,
  title,
  description,
  date,
  onReadMore,
}) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* حاوية الصورة مع تأثير الزوم عند الهوفر */}
        <div className="relative overflow-hidden h-52 w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* شارة التصنيف (Category Badge) */}
          <span className="absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {category}
          </span>
        </div>

        {/* محتوى الكارت */}
        <div className="p-6">
          {/* عنوان الخبر */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {/* النص المساعد / الفقرة */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {description}
          </p>
        </div>
      </div>

      {/* أسفل الكارت: التاريخ وزر الانتقال */}
      <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between">
        {/* التاريخ */}
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{date}</span>
        </div>

        {/* زر سهم للانتقال */}
        <button
          onClick={onReadMore}
          aria-label="Read full news"
          className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
