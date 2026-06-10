
import React, { useState } from 'react';
import { X, Smartphone, Mail, Facebook, KeyRound } from 'lucide-react';
import { AppView } from '../types';

interface Props {
  onCancel: () => void;
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<Props> = ({ onCancel, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-fadeIn">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors z-10">
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 pb-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{isLogin ? '歡迎回來 AutoPro' : '註冊新帳號'}</h2>
                <p className="text-gray-500 text-sm">全港 No.1 汽車服務配對平台</p>
            </div>

            <div className="space-y-4">
                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all text-sm font-bold text-gray-600">
                        <Facebook className="w-5 h-5 text-blue-600" /> Facebook
                    </button>
                    <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-sm font-bold text-gray-600">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Google
                    </button>
                </div>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">或使用手機登入</span></div>
                </div>

                {/* Phone Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">手機號碼</label>
                    <div className="flex">
                        <div className="bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg px-3 py-3 flex items-center text-gray-500 font-medium text-sm">
                            +852
                        </div>
                        <input 
                            type="tel" 
                            className="flex-1 border border-gray-300 rounded-r-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" 
                            placeholder="9123 4567"
                        />
                    </div>
                </div>

                {!isLogin && (
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">驗證碼</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" 
                                placeholder="輸入 6 位數字"
                            />
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap">
                                獲取驗證碼
                            </button>
                        </div>
                    </div>
                )}
                
                {isLogin && (
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">密碼</label>
                        <input 
                            type="password" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none" 
                            placeholder="輸入您的密碼"
                        />
                         <div className="text-right mt-1">
                            <a href="#" className="text-xs text-orange-500 hover:underline">忘記密碼？</a>
                        </div>
                    </div>
                )}

                <button 
                    onClick={onLoginSuccess}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-100 transition-all active:scale-95 text-lg mt-2"
                >
                    {isLogin ? '立即登入' : '註冊帳號'}
                </button>
            </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
                {isLogin ? '還沒有帳號？' : '已有帳號？'} 
                <button onClick={() => setIsLogin(!isLogin)} className="text-orange-500 font-bold ml-1 hover:underline">
                    {isLogin ? '免費註冊' : '立即登入'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
