
import React from 'react';
import { Clock, UserCheck, ShieldCheck, ChevronDown, CheckCircle2, Search } from 'lucide-react';
import { AppView } from '../types';

interface Props {
    onNavigate: (view: AppView) => void;
}

const HowItWorksPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-900 py-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">服務流程簡單透明</h1>
              <p className="text-gray-300 text-lg">只需 3 分鐘，AutoPro 助您輕鬆解決汽車疑難雜症</p>
          </div>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

              <div className="text-center bg-white p-4">
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                      <Clock className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">1. 提交需求</h3>
                  <p className="text-gray-500 leading-relaxed">回答幾條簡單問題，系統會即時分析您的需求。如有需要，我們的 AI 顧問會協助您描述問題。</p>
              </div>

              <div className="text-center bg-white p-4">
                  <div className="w-24 h-24 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-orange-100">
                      <Search className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">2. 比較報價</h3>
                  <p className="text-gray-500 leading-relaxed">您會收到最多 4 間經認證車房的報價。您可以查看他們的過往評分、用戶評價及價格詳情。</p>
              </div>

              <div className="text-center bg-white p-4">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                      <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">3. 預約服務</h3>
                  <p className="text-gray-500 leading-relaxed">選擇最合適的專家，直接透過平台預約。完成服務後，款項才會正式轉交給商戶，保障雙方。</p>
              </div>
          </div>
          
          <div className="text-center mt-12">
               <button onClick={() => onNavigate(AppView.REQUEST_WIZARD)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-orange-200 transition-transform active:scale-95 text-lg">
                   立即免費發布需求
               </button>
          </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">AutoPro 四大信心保證</h2>
              <div className="grid md:grid-cols-2 gap-6">
                  {[
                      { title: "嚴格商戶審核", desc: "所有加盟車房均需通過實名認證及商業登記審查，確保服務質素。" },
                      { title: "價格透明承諾", desc: "報價單清晰列明細項，絕無隱藏收費，未經同意絕不加價。" },
                      { title: "爭議仲裁機制", desc: "若出現服務糾紛，平台會介入協調，並提供最高 HK$2,000 服務保障。" },
                      { title: "真實用戶評價", desc: "只有完成服務的用戶才能撰寫評價，杜絕打手，確保參考價值。" }
                  ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                          <div className="mt-1"><CheckCircle2 className="w-6 h-6 text-green-500" /></div>
                          <div>
                              <h4 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h4>
                              <p className="text-gray-500 text-sm">{item.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">常見問題</h2>
          <div className="space-y-4">
              {[
                  { q: "使用 AutoPro 需要收費嗎？", a: "完全免費！車主發布需求、獲取報價及預約服務均不收取任何費用。我們只會向成功接單的商戶收取行政費。" },
                  { q: "提交需求後多久會收到報價？", a: "一般情況下，您會在 15-30 分鐘內收到首個報價。對於緊急維修，我們會有專人優先處理。" },
                  { q: "如果不滿意報價可以取消嗎？", a: "當然可以。這是一個免費的配對服務，如果您覺得報價不合適，無需承擔任何責任。" },
                  { q: "如何確保車房質素？", a: "我們建議您參考商戶的過往評分及「Toby 認證」標籤。所有經平台預約的服務均受我們的保障計劃保護。" }
              ].map((faq, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors">
                          <span className="font-bold text-gray-900">{faq.q}</span>
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                      </button>
                      <div className="p-5 bg-gray-50 border-t border-gray-200 text-gray-600 text-sm leading-relaxed">
                          {faq.a}
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
