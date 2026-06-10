
import React, { useState } from 'react';
import { Wrench, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
    onNavigate?: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center mb-6 text-white">
              <div className="bg-orange-500 p-1.5 rounded mr-2">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">AutoPro</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 pr-4">
              AutoPro 是香港領先的汽車服務配對平台。我們的使命是讓每一位車主都能享受到透明、優質、可靠的汽車服務。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-base">熱門服務</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-400 transition-colors">汽車維修報價</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">上門換油服務</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">政府驗車代辦</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">汽車美容及鍍膜</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">24小時拖車服務</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">汽車保險比較</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-base">公司資訊</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-orange-400 transition-colors">關於 AutoPro</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">加入成為專家</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">企業合作</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">服務條款</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">私隱政策</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">常見問題 (FAQ)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-base">聯絡我們</h4>
            <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>support@autopro.hk<br/><span className="text-xs text-gray-500">一般查詢及客戶服務</span></span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>+852 3123 4567<br/><span className="text-xs text-gray-500">週一至週日 9:00 - 18:00</span></span>
                </li>
                 <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span>香港九龍觀塘道 123 號<br/>創紀之城一期 8 樓</span>
                </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} AutoPro Technology Limited. 版權所有。</p>
            <div className="flex gap-4 mt-4 md:mt-0 items-center">
                <a href="#" className="hover:text-white">網站地圖</a>
                <a href="#" className="hover:text-white">免責聲明</a>
                {onNavigate && (
                    <button 
                        onClick={() => onNavigate(AppView.ADMIN_DASHBOARD)}
                        className="flex items-center gap-1 hover:text-white text-gray-600 transition-colors"
                    >
                        <Lock className="w-3 h-3" /> 管理員專用入口
                    </button>
                )}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
