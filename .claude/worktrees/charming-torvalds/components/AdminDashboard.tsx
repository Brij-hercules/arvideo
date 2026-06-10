
import React, { useState } from 'react';
import {
    LayoutDashboard, Users, FileText, Settings, Search, Bell, LogOut,
    ChevronRight, TrendingUp, DollarSign, Activity, Eye, CheckCircle, XCircle
} from 'lucide-react';
import { MOCK_PROVIDERS, SERVICE_CATEGORIES } from '../constants';
import { UserRequest } from '../types';

interface Props {
    onLogout: () => void;
    requests: UserRequest[]; // Accept real requests from App state
}

const AdminDashboard: React.FC<Props> = ({ onLogout, requests }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'providers'>('overview');

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'quoted': return 'bg-blue-100 text-blue-700';
            case 'completed': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusLabel = (status?: string) => {
        switch (status) {
            case 'pending': return '待報價';
            case 'quoted': return '已報價';
            case 'completed': return '已完成';
            default: return '未知';
        }
    };

    // Calculate stats based on real data
    const newRequestsCount = requests.filter(r => r.timestamp && r.timestamp > new Date(Date.now() - 86400000)).length;
    const pendingCount = requests.filter(r => r.status === 'pending').length;

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-gray-300 flex flex-col fixed h-full z-20 transition-all duration-300">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">AutoPro <span className="text-orange-500">Admin</span></h1>
                    <p className="text-xs text-gray-500 mt-1">後台管理系統 v1.0</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-orange-600 text-white' : 'hover:bg-gray-800'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" /> 數據概覽
                    </button>
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'requests' ? 'bg-orange-600 text-white' : 'hover:bg-gray-800'}`}
                    >
                        <FileText className="w-5 h-5" /> 報價管理
                        {pendingCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingCount}</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('providers')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'providers' ? 'bg-orange-600 text-white' : 'hover:bg-gray-800'}`}
                    >
                        <Users className="w-5 h-5" /> 商戶管理
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        <Settings className="w-5 h-5" /> 系統設定
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" /> 登出系統
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Top Bar */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800">
                        {activeTab === 'overview' && '今日概覽'}
                        {activeTab === 'requests' && '客戶需求列表'}
                        {activeTab === 'providers' && '註冊商戶列表'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="搜尋..." className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64" />
                        </div>
                        {/* Refresh Button (Simulated since state is in App.tsx) */}
                        <button
                            onClick={() => window.location.reload()}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600"
                            title="重新整理數據"
                        >
                            <Activity className="w-5 h-5" />
                        </button>
                        <button className="relative p-2 hover:bg-gray-100 rounded-full">
                            <Bell className="w-5 h-5 text-gray-600" />
                            {pendingCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>}
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">A</div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FileText className="w-6 h-6" /></div>
                                        <span className="text-green-500 text-xs font-bold flex items-center">+12% <TrendingUp className="w-3 h-3 ml-1" /></span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">總需求數量</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 mt-1">{requests.length}</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><DollarSign className="w-6 h-6" /></div>
                                        <span className="text-green-500 text-xs font-bold flex items-center">+5% <TrendingUp className="w-3 h-3 ml-1" /></span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">待處理報價</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 mt-1">{pendingCount}</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Users className="w-6 h-6" /></div>
                                        <span className="text-gray-400 text-xs font-bold flex items-center">0%</span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">活躍商戶</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 mt-1">89</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-green-100 p-2 rounded-lg text-green-600"><Activity className="w-6 h-6" /></div>
                                        <span className="text-green-500 text-xs font-bold flex items-center">+2% <TrendingUp className="w-3 h-3 ml-1" /></span>
                                    </div>
                                    <h3 className="text-gray-500 text-sm font-medium">報價回應率</h3>
                                    <p className="text-3xl font-extrabold text-gray-900 mt-1">94%</p>
                                </div>
                            </div>

                            {/* Recent Activity Table */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900">最新即時動態</h3>
                                    <button onClick={() => setActiveTab('requests')} className="text-sm text-orange-500 hover:text-orange-600 font-medium">查看全部</button>
                                </div>
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">ID</th>
                                            <th className="px-6 py-3 font-medium">車型</th>
                                            <th className="px-6 py-3 font-medium">問題描述</th>
                                            <th className="px-6 py-3 font-medium">狀態</th>
                                            <th className="px-6 py-3 font-medium">時間</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {requests.slice(0, 5).map((req) => (
                                            <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">#{req.id}</td>
                                                <td className="px-6 py-4 text-gray-600">{req.carModel} ({req.year})</td>
                                                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{req.description}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(req.status)}`}>
                                                        {getStatusLabel(req.status)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400">{req.timestamp?.toLocaleTimeString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'requests' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
                            {/* Similar table structure but more detailed for Requests tab */}
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">所有需求 ({requests.length})</h3>
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">ID</th>
                                        <th className="px-6 py-3 font-medium">客戶電話</th>
                                        <th className="px-6 py-3 font-medium">地區</th>
                                        <th className="px-6 py-3 font-medium">類別</th>
                                        <th className="px-6 py-3 font-medium">車型</th>
                                        <th className="px-6 py-3 font-medium">緊急程度</th>
                                        <th className="px-6 py-3 font-medium">狀態</th>
                                        <th className="px-6 py-3 font-medium">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {requests.map((req) => (
                                        <tr key={req.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">#{req.id}</td>
                                            <td className="px-6 py-4 text-gray-600">{req.userPhone}</td>
                                            <td className="px-6 py-4 text-gray-600">{req.location || '全港'}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {SERVICE_CATEGORIES.find(c => c.id === req.categoryId)?.name || req.categoryId}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{req.carModel}</td>
                                            <td className="px-6 py-4">
                                                {req.urgency === 'high' && <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">緊急</span>}
                                                {req.urgency === 'medium' && <span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-0.5 rounded">正常</span>}
                                                {req.urgency === 'low' && <span className="text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded">不急</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(req.status)}`}>
                                                    {getStatusLabel(req.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 flex gap-2">
                                                <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"><Eye className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'providers' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">商戶列表</h3>
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">商戶名稱</th>
                                        <th className="px-6 py-3 font-medium">地區</th>
                                        <th className="px-6 py-3 font-medium">評分</th>
                                        <th className="px-6 py-3 font-medium">認證狀態</th>
                                        <th className="px-6 py-3 font-medium">起始價格</th>
                                        <th className="px-6 py-3 font-medium">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {MOCK_PROVIDERS.map((provider) => (
                                        <tr key={provider.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <img src={provider.imageUrl} className="w-8 h-8 rounded-full object-cover" alt="" />
                                                <span className="font-bold text-gray-900">{provider.name}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{provider.location}</td>
                                            <td className="px-6 py-4 font-bold text-orange-500">{provider.rating} ★</td>
                                            <td className="px-6 py-4">
                                                <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold flex items-center w-fit gap-1">
                                                    <CheckCircle className="w-3 h-3" /> 已認證
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">HK${provider.startPrice} 起</td>
                                            <td className="px-6 py-4">
                                                <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded">
                                                    <Settings className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
