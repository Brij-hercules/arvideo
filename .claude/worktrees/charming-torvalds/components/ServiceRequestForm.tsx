
import React, { useState } from 'react';
import { HK_DISTRICTS, SERVICE_CATEGORIES } from '../constants';
import { analyzeCarIssue } from '../services/geminiService';
import { UserRequest } from '../types';
import { Loader2, Sparkles, AlertCircle, X, ChevronRight, Check, ShieldCheck } from 'lucide-react';

interface Props {
  initialCategory?: string;
  initialQuery?: string;
  onSubmit: (data: UserRequest) => void;
  onCancel: () => void;
}

const ServiceRequestForm: React.FC<Props> = ({ initialCategory, initialQuery, onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{ analysis: string, suggestedCategory: string, estimatedCostRange: string } | null>(null);

  const [formData, setFormData] = useState<UserRequest>({
    categoryId: initialCategory || SERVICE_CATEGORIES[0].id,
    carModel: '',
    year: '',
    description: initialQuery || '',
    location: '',
    urgency: 'medium',
    userPhone: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = (s: number) => {
    const newErrors: { [key: string]: string } = {};
    if (s === 1) {
      if (!formData.carModel.trim()) newErrors.carModel = '請輸入車輛型號';
      if (!formData.description.trim()) newErrors.description = '請描述遇到的問題';
      if (formData.year) {
        const yearNum = parseInt(formData.year);
        const currentYear = new Date().getFullYear();
        if (isNaN(yearNum) || yearNum < 1980 || yearNum > currentYear + 1) {
          newErrors.year = `年份須介於 1980 - ${currentYear + 1}`;
        }
      }
    } else if (s === 2) {
      if (!formData.location) newErrors.location = '請選擇地區';
      const phoneRegex = /^[2-9]\d{7}$/; // Simple HK phone regex (8 digits, starts with 2-9)
      const cleanPhone = formData.userPhone.replace(/\s/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.userPhone = '請輸入有效的 8 位香港電話號碼';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAiAnalyze = async () => {
    if (!formData.description || !formData.carModel) return;
    setIsAnalyzing(true);
    const result = await analyzeCarIssue(formData.description, formData.carModel);
    setIsAnalyzing(false);
    if (result) {
      setAiAnalysis(result);
      const foundCat = SERVICE_CATEGORIES.find(c => c.name === result.suggestedCategory);
      if (foundCat) {
        setFormData(prev => ({ ...prev, categoryId: foundCat.id }));
      }
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
    }
  };
  const prevStep = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const getCategoryName = (id: string) => SERVICE_CATEGORIES.find(c => c.id === id)?.name;

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl min-h-screen md:min-h-0 md:rounded-2xl shadow-2xl flex flex-col relative animate-fadeIn">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 md:rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-gray-900">免費獲取報價</h2>
            <p className="text-xs text-gray-500 mt-0.5">已有 12 位師傅在線準備為您報價</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1.5">
          <div
            className="bg-orange-500 h-1.5 transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[calc(100vh-140px)]">

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">您想解決什麼問題？</h3>
                <p className="text-gray-500 text-sm mt-1">越詳細的描述能讓師傅報價更準確</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">服務類別</label>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICE_CATEGORIES.slice(0, 6).map(c => (
                    <button
                      key={c.id}
                      onClick={() => setFormData({ ...formData, categoryId: c.id })}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all text-left flex items-center gap-2 ${formData.categoryId === c.id
                        ? 'border-orange-500 bg-orange-50 text-orange-700 ring-1 ring-orange-500'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${formData.categoryId === c.id ? 'bg-orange-500' : 'bg-gray-200'}`}></span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700">具體情況描述</label>
                    <button
                      onClick={handleAiAnalyze}
                      disabled={!formData.carModel || !formData.description || isAnalyzing}
                      className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isAnalyzing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      不懂形容？AI 幫手分析
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="請簡單描述狀況，例如：車底漏油、冷氣不冷、驗車前檢查..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-gray-900 placeholder:text-gray-400 text-sm shadow-sm"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {aiAnalysis && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 animate-fadeIn">
                    <div className="flex gap-3">
                      <div className="mt-0.5"><Sparkles className="w-4 h-4 text-blue-600" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-blue-900 mb-1">AutoPro 智能分析建議</h4>
                        <p className="text-sm text-blue-800 mb-2 leading-relaxed">{aiAnalysis.analysis}</p>
                        <div className="text-xs text-blue-600 bg-white/50 inline-block px-2 py-1 rounded">
                          參考費用: <span className="font-bold">{aiAnalysis.estimatedCostRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">車輛型號</label>
                    <input
                      type="text"
                      placeholder="e.g. Alphard"
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm text-gray-900 shadow-sm"
                      value={formData.carModel}
                      onChange={e => setFormData({ ...formData, carModel: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-bold mb-2 ${errors.year ? 'text-red-500' : 'text-gray-700'}`}>年份</label>
                    <input
                      type="text"
                      placeholder="e.g. 2018"
                      className={`w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm text-gray-900 shadow-sm ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                      value={formData.year}
                      onChange={e => {
                        setFormData({ ...formData, year: e.target.value });
                        if (errors.year) setErrors({ ...errors, year: '' });
                      }}
                    />
                    {errors.year && <p className="text-[10px] text-red-500 mt-1">{errors.year}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">服務地點及時間</h3>
                <p className="text-gray-500 text-sm mt-1">我們會配對該區最優質的車房</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">偏好地區</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none bg-white appearance-none text-gray-900 text-sm shadow-sm"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  >
                    <option value="">請選擇地區</option>
                    {HK_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${errors.userPhone ? 'text-red-500' : 'text-gray-700'}`}>聯絡電話 (師傅將以此與您聯絡)</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="例如: 9876 5432"
                    className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 text-sm shadow-sm ${errors.userPhone ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.userPhone}
                    onChange={e => {
                      setFormData({ ...formData, userPhone: e.target.value });
                      if (errors.userPhone) setErrors({ ...errors, userPhone: '' });
                    }}
                  />
                  {errors.userPhone && <p className="text-[10px] text-red-500 mt-1">{errors.userPhone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">您有多急？</label>
                <div className="space-y-3">
                  {[
                    { val: 'high', label: '非常緊急', sub: '車動不了 / 影響安全 (建議立即處理)' },
                    { val: 'medium', label: '正常', sub: '希望 3 天內處理' },
                    { val: 'low', label: '不急', sub: '先格價，一週內處理' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgency: opt.val as any })}
                      className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-all bg-white shadow-sm ${formData.urgency === opt.val
                        ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500'
                        : 'border-gray-200 hover:border-orange-200 hover:bg-gray-50'
                        }`}
                    >
                      <div>
                        <div className={`font-bold text-sm ${formData.urgency === opt.val ? 'text-orange-700' : 'text-gray-900'}`}>{opt.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{opt.sub}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.urgency === opt.val ? 'border-orange-500 bg-orange-500' : 'border-gray-300'
                        }`}>
                        {formData.urgency === opt.val && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">最後一步！</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">請核對您的需求，提交後將即時發送給合適的專家。</p>

              <div className="bg-gray-50 rounded-xl p-5 text-left border border-gray-100 space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-500 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">服務</div>
                    <div className="text-gray-900 font-medium">{getCategoryName(formData.categoryId)}</div>
                    <div className="text-gray-600 text-sm mt-1">{formData.carModel} ({formData.year})</div>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200"></div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-500 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">詳情</div>
                    <div className="text-gray-900 font-medium">{formData.location || '全港'}</div>
                    <div className="text-gray-600 text-sm mt-1 bg-white p-2 rounded border border-gray-200 inline-block">"{formData.description}"</div>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200"></div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-500 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">聯絡人</div>
                    <div className="text-gray-900 font-medium">{formData.userPhone}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4" />
                <span>您的資料將絕對保密，僅供報價使用</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 border-t border-gray-100 bg-white sticky bottom-0 md:rounded-b-2xl">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                上一步
              </button>
            )}

            <button
              onClick={step === 3 ? handleSubmit : nextStep}
              disabled={
                (step === 1 && (!formData.carModel || !formData.description)) ||
                (step === 2 && (!formData.location || !formData.userPhone))
              }
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-lg shadow-orange-100 flex items-center justify-center gap-2 text-lg"
            >
              {step === 3 ? '提交並獲取報價' : '下一步'}
              {step < 3 && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestForm;
