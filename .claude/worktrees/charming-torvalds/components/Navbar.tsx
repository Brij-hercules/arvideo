
import React from 'react';
import { Menu, Wrench, Bell, User } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center py-3">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer gap-2" onClick={() => onNavigate(AppView.HOME)}>
            <div className="bg-orange-500 p-2 rounded-lg shadow-sm">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-gray-900 leading-none tracking-tight">AutoPro</span>
              <span className="text-[10px] text-gray-500 tracking-wider font-medium">全港最大汽車服務平台</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate(AppView.REQUEST_WIZARD)} className="text-gray-600 hover:text-orange-500 text-sm font-medium transition-colors">發布需求</button>
            <button onClick={() => onNavigate(AppView.YELLOW_PAGES)} className="text-gray-600 hover:text-orange-500 text-sm font-medium transition-colors">搵車房</button>
            <button onClick={() => onNavigate(AppView.HOW_IT_WORKS)} className="text-gray-600 hover:text-orange-500 text-sm font-medium transition-colors">如何運作</button>
            <button onClick={() => onNavigate(AppView.PRO_JOIN)} className="text-gray-600 hover:text-orange-500 text-sm font-medium transition-colors">專家加盟</button>

            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
              <button className="text-gray-500 hover:text-orange-500">
                <Bell className="w-5 h-5" />
              </button>
              <button onClick={() => onNavigate(AppView.LOGIN)} className="text-gray-600 font-bold hover:text-gray-900 flex items-center gap-2 text-sm">
                登入
              </button>
              <button onClick={() => onNavigate(AppView.LOGIN)} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md shadow-orange-100 hover:shadow-orange-200 transform hover:-translate-y-0.5">
                免費註冊
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => onNavigate(AppView.LOGIN)} className="text-gray-600 font-medium text-sm">登入</button>
            <button className="text-gray-500 hover:text-gray-900 p-1">
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
