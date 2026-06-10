
import React, { useState } from 'react';
import { Search, MapPin, ChevronRight, Star, ShieldCheck, TrendingUp } from 'lucide-react';
import { HK_DISTRICTS } from '../constants';

interface HeroProps {
  onSearch: (query: string, district: string) => void;
  onOpenAdvisor: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, onOpenAdvisor }) => {
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState('');

  const handleSearch = () => {
    onSearch(query, district);
  };

  return (
    <div className="relative bg-white pb-12">
      {/* Background Image Container */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop" 
          alt="Hong Kong Car Workshop" 
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pt-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/30 shadow-lg">
                <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?img=12" alt="User" />
                    <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?img=33" alt="User" />
                    <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?img=59" alt="User" />
                </div>
                <span className="text-white text-xs font-bold tracking-wide">每分鐘有 3 位車主成功配對</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
                全港 No.1 汽車服務平台
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium mb-10 max-w-2xl drop-shadow-md">
                回答幾條問題，即時獲取 <span className="text-orange-300 font-bold border-b-2 border-orange-300">3-4 間車房報價</span>。
                <br className="hidden md:block"/> 價格透明，絕無隱藏收費。
            </p>

            {/* Search Box Card */}
            <div className="bg-white p-3 md:p-4 rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all hover:scale-[1.01] flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <div className="pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all h-full flex flex-col justify-center text-left">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">您需要什麼服務？</label>
                        <input 
                            type="text" 
                            className="w-full bg-white outline-none text-gray-900 font-bold placeholder-gray-300 text-lg"
                            placeholder="例如：換油、驗車、冷氣..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="md:w-1/3 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <div className="pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100 transition-all h-full flex flex-col justify-center text-left">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">地區</label>
                        <select 
                            className="w-full bg-white outline-none text-gray-900 font-bold appearance-none cursor-pointer"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        >
                            <option value="">全香港</option>
                            {HK_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                <button 
                    onClick={handleSearch}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-orange-200 flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
                >
                    獲取報價 <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Quick Suggestions */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-medium text-white/90">
                <span className="drop-shadow-md">熱門搜尋:</span>
                <button onClick={() => onSearch('換機油', '')} className="hover:text-orange-300 hover:underline decoration-orange-300 underline-offset-4 transition-all drop-shadow-md">換機油</button>
                <span className="opacity-50">•</span>
                <button onClick={() => onSearch('政府驗車', '')} className="hover:text-orange-300 hover:underline decoration-orange-300 underline-offset-4 transition-all drop-shadow-md">政府驗車</button>
                <span className="opacity-50">•</span>
                <button onClick={() => onSearch('汽車冷氣', '')} className="hover:text-orange-300 hover:underline decoration-orange-300 underline-offset-4 transition-all drop-shadow-md">汽車冷氣</button>
                <span className="opacity-50">•</span>
                <button onClick={() => onSearch('24小時拖車', '')} className="hover:text-orange-300 hover:underline decoration-orange-300 underline-offset-4 transition-all drop-shadow-md">24小時拖車</button>
            </div>
            
            <div className="mt-4 md:hidden">
                 <button onClick={onOpenAdvisor} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> 唔識揀？AI 幫手
                 </button>
            </div>
        </div>
      </div>
      
      {/* Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
              <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600"><ShieldCheck className="w-5 h-5" /></div>
                  <div className="text-left">
                      <div className="font-bold text-gray-900 text-sm md:text-base">100% 免費</div>
                      <div className="text-xs text-gray-500">絕無中介費</div>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Star className="w-5 h-5" /></div>
                  <div className="text-left">
                      <div className="font-bold text-gray-900 text-sm md:text-base">真實評價</div>
                      <div className="text-xs text-gray-500">過萬宗真實交易</div>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-600"><ShieldCheck className="w-5 h-5" /></div>
                  <div className="text-left">
                      <div className="font-bold text-gray-900 text-sm md:text-base">嚴格審核</div>
                      <div className="text-xs text-gray-500">認證車房師傅</div>
                  </div>
              </div>
              <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-full text-orange-600"><TrendingUp className="w-5 h-5" /></div>
                  <div className="text-left">
                      <div className="font-bold text-gray-900 text-sm md:text-base">極速報價</div>
                      <div className="text-xs text-gray-500">平均 15 分鐘回覆</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Hero;
