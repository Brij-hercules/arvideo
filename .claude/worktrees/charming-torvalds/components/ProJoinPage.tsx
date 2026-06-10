
import React from 'react';
import { TrendingUp, Users, Smartphone, ShieldCheck, Check } from 'lucide-react';

const ProJoinPage: React.FC = () => {
  return (
    <div className="bg-white font-sans">
      {/* Hero */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-20 grid md:grid-cols-2 gap-12 items-center">
            <div>
                <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6">致：車房、維修中心、汽車美容店</div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    加入 AutoPro<br/>
                    接觸全港 <span className="text-orange-400">50,000+</span> 潛在客戶
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-lg">
                    無需高昂廣告費，直接將您的服務推廣給有需要的車主。專注您的專業，推廣交給我們。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-lg text-lg transition-colors shadow-lg shadow-orange-900/20">
                        立即免費登記
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-8 py-3.5 rounded-lg text-lg transition-colors backdrop-blur-sm">
                        了解收費模式
                    </button>
                </div>
            </div>
            
            {/* Form Card */}
            <div className="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 max-w-md ml-auto">
                <h3 className="text-2xl font-bold mb-6">成為合作夥伴</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">公司/車房名稱</label>
                        <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="輸入名稱" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">聯絡電話</label>
                        <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" placeholder="+852 9123 4567" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">主要服務類別</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                            <option>一般維修</option>
                            <option>汽車美容</option>
                            <option>輪胎電池</option>
                            <option>拖車救援</option>
                        </select>
                    </div>
                    <button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-lg mt-2 transition-colors">
                        提交申請
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-4">提交即代表同意服務條款。我們的團隊會在 24 小時內聯絡您。</p>
                </div>
            </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-orange-50 py-12 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">HK$2000+</div>
                  <div className="text-gray-600 font-medium">平均訂單金額</div>
              </div>
              <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">150+</div>
                  <div className="text-gray-600 font-medium">每日新需求</div>
              </div>
              <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">30%</div>
                  <div className="text-gray-600 font-medium">合作夥伴生意增長</div>
              </div>
              <div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">0元</div>
                  <div className="text-gray-600 font-medium">加盟上架費</div>
              </div>
          </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">為什麼選擇 AutoPro？</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">我們不僅僅是一個配對平台，更是您的生意夥伴。提供全方位的數碼工具，助您轉型升級。</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
              <div className="p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                      <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">精準客源配對</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">系統會根據地區、車型及服務類型，只將合適的訂單推送給您。告別盲目推廣，提升成交率。</p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                      <Smartphone className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">手機接單管理</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">專用商戶 App，隨時隨地接收新訂單通知、即時報價及與車主溝通。生意盡在掌握。</p>
              </div>
              <div className="p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                      <TrendingUp className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">品牌形象提升</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">獲得「AutoPro 認證商戶」標籤，展示您的專業資格及過往好評，建立網上信譽，贏取車主信任。</p>
              </div>
          </div>
      </div>

      {/* Pricing / Steps */}
      <div className="bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4">
               <div className="text-center mb-12">
                   <h2 className="text-3xl font-bold mb-4">簡單 3 步，開始接單</h2>
               </div>
               <div className="space-y-8">
                   <div className="flex gap-6 items-start">
                       <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                       <div>
                           <h4 className="text-xl font-bold mb-2">提交基本資料</h4>
                           <p className="text-gray-400">填寫網上表格，上載商業登記證 (BR) 及店鋪照片。我們會在一個工作天內審核。</p>
                       </div>
                   </div>
                   <div className="flex gap-6 items-start">
                       <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                       <div>
                           <h4 className="text-xl font-bold mb-2">設定服務檔案</h4>
                           <p className="text-gray-400">登入商戶後台，設定您的服務範圍、收費標準及營業時間。完善的檔案能吸引更多車主。</p>
                       </div>
                   </div>
                   <div className="flex gap-6 items-start">
                       <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                       <div>
                           <h4 className="text-xl font-bold mb-2">開始報價接單</h4>
                           <p className="text-gray-400">當有符合您條件的需求時，系統會即時通知。您只需報價，車主確認後即可開始工作。</p>
                       </div>
                   </div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default ProJoinPage;
