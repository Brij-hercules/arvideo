
import React, { useState } from 'react';
import { Provider } from '../types';
import { Star, MapPin, CheckCircle2, MessageCircle, Shield, Award, Filter, ChevronDown, Check, ArrowRight } from 'lucide-react';

interface Props {
  providers: Provider[];
  onBack: () => void;
}

const ProviderList: React.FC<Props> = ({ providers, onBack }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedProviderName, setSelectedProviderName] = useState('');

  const handleGetQuote = (providerName: string) => {
      setSelectedProviderName(providerName);
      setShowSuccessModal(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-[72px] z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                     <button onClick={onBack} className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center">
                        &larr; 修改需求
                     </button>
                     <div className="h-4 w-px bg-gray-300 mx-2"></div>
                     <span className="text-gray-900 font-bold">為您找到 {providers.length} 位專家</span>
                </div>
                <div className="hidden md:flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full text-sm font-medium hover:border-orange-500 hover:text-orange-500 bg-white text-gray-700">
                        <Filter className="w-3 h-3" /> 篩選
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full text-sm font-medium hover:border-orange-500 hover:text-orange-500 bg-white text-gray-700">
                        排序: 評分最高 <ChevronDown className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Notice Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start gap-3">
            <div className="bg-blue-100 p-1 rounded-full text-blue-600 mt-0.5"><Shield className="w-4 h-4" /></div>
            <div>
                <h3 className="text-sm font-bold text-blue-900">AutoPro 保障計劃</h3>
                <p className="text-xs text-blue-700 mt-0.5">透過 AutoPro 預約並完成服務，如遇糾紛可獲最高 HK$2,000 保障。請確保透過平台通訊紀錄作為憑證。</p>
            </div>
        </div>

        <div className="space-y-4">
          {providers.map((provider, idx) => (
            <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6 hover:shadow-md transition-shadow duration-300 relative group">
              {/* Trust Badges Floating */}
              {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1 z-10">
                      <Award className="w-3 h-3" /> AutoPro 優選
                  </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-56">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                        <img 
                            src={provider.imageUrl} 
                            alt={provider.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                             <span className="text-white text-xs font-medium flex items-center gap-1">
                                 <MapPin className="w-3 h-3" /> {provider.location}
                             </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900 hover:text-orange-500 cursor-pointer transition-colors flex items-center gap-2">
                                {provider.name}
                                {idx === 0 && (
                                    <span title="已實名認證" className="flex items-center">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                    </span>
                                )}
                            </h3>
                        </div>

                        <div className="flex items-center gap-3 mb-4 text-sm">
                            <div className="flex items-center text-orange-400 font-bold bg-orange-50 px-2 py-0.5 rounded">
                                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                                {provider.rating}
                            </div>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600 hover:underline cursor-pointer">{provider.reviews} 則評價</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">已服務 300+ 次</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                             {provider.categories.slice(0, 3).map(c => (
                                 <span key={c} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded border border-gray-200">
                                     #{c}
                                 </span>
                             ))}
                             {provider.badges.map(badge => (
                                <span key={badge} className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded border border-green-100 flex items-center gap-1">
                                    <Shield className="w-3 h-3" /> {badge}
                                </span>
                             ))}
                        </div>
                        
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                            擁有超過 15 年維修經驗，專營歐洲車系。本店提供原廠電腦診斷，所有更換零件保養 12 個月。誠實報價，絕無隱藏收費。
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 items-center border-t border-gray-100 pt-4 mt-auto">
                        <div className="flex-1 w-full md:w-auto text-center md:text-left">
                            <span className="text-xs text-gray-400">參考報價</span>
                            <div className="text-xl font-extrabold text-gray-900">HK${provider.startPrice} <span className="text-sm font-normal text-gray-500">起</span></div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <MessageCircle className="w-4 h-4" /> 聯絡
                            </button>
                            <button 
                                onClick={() => handleGetQuote(provider.name)}
                                className="flex-1 md:flex-none px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition-colors shadow-sm hover:shadow-md"
                            >
                                獲取詳細報價
                            </button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center pb-8">
            <button className="px-8 py-3 bg-white border border-gray-300 rounded-full text-gray-600 hover:text-orange-500 hover:border-orange-500 hover:shadow-md text-sm font-bold transition-all">
                載入更多專家
            </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center animate-fadeIn shadow-2xl">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">請求已發送！</h3>
                  <p className="text-gray-500 text-sm mb-6">
                      我們已將您的需求發送給 <span className="font-bold text-gray-900">{selectedProviderName}</span>。
                      師傅通常會在 30 分鐘內回覆詳細報價。
                  </p>
                  <button 
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
                  >
                      好的，我知道了
                  </button>
                  <button 
                    onClick={() => {setShowSuccessModal(false); onBack();}}
                    className="w-full mt-2 text-gray-400 hover:text-gray-600 text-sm font-medium py-2"
                  >
                      返回首頁
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default ProviderList;
