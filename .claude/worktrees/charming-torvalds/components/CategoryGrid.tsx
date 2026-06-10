import React from 'react';
import { SERVICE_CATEGORIES } from '../constants';
import * as Icons from 'lucide-react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
             <div>
                 <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">熱門服務分類</h2>
                 <p className="text-gray-500 mt-2 text-sm md:text-base">超過 50 種專業汽車服務，滿足您所有需求</p>
             </div>
             <a href="#" className="hidden md:flex items-center text-orange-500 font-bold hover:text-orange-600 transition-colors text-sm">
                 查看全部 <ArrowRight className="w-4 h-4 ml-1" />
             </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
          {SERVICE_CATEGORIES.map((category) => {
            const IconComponent = (Icons as any)[category.icon] as LucideIcon;
            
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="flex flex-col items-center group p-3 hover:bg-orange-50 rounded-xl transition-all duration-300 border border-transparent hover:border-orange-100"
              >
                <div className="w-14 h-14 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm group-hover:shadow-orange-200">
                  {IconComponent ? 
                    <IconComponent className="w-6 h-6 transition-colors" /> : 
                    <Icons.Wrench className="w-6 h-6" />
                  }
                </div>
                <h3 className="text-sm font-bold text-gray-700 text-center group-hover:text-orange-600 transition-colors">{category.name}</h3>
              </button>
            );
          })}
        </div>
        
        {/* Promotion / SEO Text Area */}
        <div className="grid md:grid-cols-2 gap-8 bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AutoPro 全港最大汽車服務配對平台</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    AutoPro 致力於為香港車主解決所有汽車奇難雜症。無論您需要日常保養、緊急維修、還是汽車美容，我們都能為您配對最合適的車房。
                    <br/><br/>
                    我們嚴格審核每一間加盟車房，確保價格透明、服務優質。透過 AutoPro，您可以輕鬆比較不同師傅的報價及過往評價，做個精明車主。
                </p>
                <button className="text-orange-500 font-bold text-sm hover:underline">了解更多關於我們 &rarr;</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-extrabold text-gray-900 mb-1">2,000+</div>
                    <div className="text-xs text-gray-500">認證車房及師傅</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-extrabold text-gray-900 mb-1">5萬+</div>
                    <div className="text-xs text-gray-500">每月活躍車主</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-extrabold text-gray-900 mb-1">98%</div>
                    <div className="text-xs text-gray-500">用戶滿意度</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-3xl font-extrabold text-gray-900 mb-1">0元</div>
                    <div className="text-xs text-gray-500">完全免費使用</div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;