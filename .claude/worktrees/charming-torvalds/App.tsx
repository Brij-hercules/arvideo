
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ServiceRequestForm from './components/ServiceRequestForm';
import ProviderList from './components/ProviderList';
import AIAdvisor from './components/AIAdvisor';
import Footer from './components/Footer';
import HowItWorksPage from './components/HowItWorksPage';
import ProJoinPage from './components/ProJoinPage';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';
import YellowPagesHub from './components/YellowPagesHub';
import { AppView, UserRequest, Provider } from './types';
import { MOCK_PROVIDERS, INITIAL_REQUESTS } from './constants';
import { ShieldCheck, UserCheck, Clock, Star, Loader2 } from 'lucide-react';
import { fetchRequests, submitRequest } from './services/requestService';
import { fetchGarages } from './services/garageService';
import { useEffect } from 'react';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
    const [requestData, setRequestData] = useState<Partial<UserRequest>>({});
    const [showAdvisor, setShowAdvisor] = useState(false);

    // Manage all requests state to share between RequestForm and AdminDashboard
    const [allRequests, setAllRequests] = useState<UserRequest[]>([]);
    const [isLoadingRequests, setIsLoadingRequests] = useState(true);

    const [allProviders, setAllProviders] = useState<Provider[]>([]);
    const [isLoadingProviders, setIsLoadingProviders] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoadingRequests(true);
            setIsLoadingProviders(true);

            const [requests, providers] = await Promise.all([
                fetchRequests(),
                fetchGarages()
            ]);

            if (requests && requests.length > 0) {
                setAllRequests(requests);
            } else {
                setAllRequests(INITIAL_REQUESTS);
            }

            if (providers && providers.length > 0) {
                setAllProviders(providers);
            } else {
                setAllProviders(MOCK_PROVIDERS);
            }

            setIsLoadingRequests(false);
            setIsLoadingProviders(false);
        };
        loadInitialData();
    }, []);

    // Handle category click from Home
    const handleCategorySelect = (categoryId: string) => {
        setRequestData({ categoryId });
        setCurrentView(AppView.REQUEST_WIZARD);
        window.scrollTo(0, 0);
    };

    // Handle search from Hero
    const handleSearch = (query: string, district: string) => {
        setRequestData({
            description: query,
            location: district
        });
        setCurrentView(AppView.REQUEST_WIZARD);
        window.scrollTo(0, 0);
    };

    // Handle Wizard Submit
    const handleRequestSubmit = async (data: UserRequest) => {
        // Create a new request object with ID and timestamp
        const newRequest: UserRequest = {
            ...data,
            id: `R${Date.now()}`, // Use timestamp for more unique ID
            status: 'pending',
            timestamp: new Date()
        };

        // Add to state (prepend to show first)
        setAllRequests(prev => [newRequest, ...prev]);

        // Persist to Supabase
        await submitRequest(newRequest);

        // Navigate to Provider List
        setCurrentView(AppView.PROVIDER_LIST);
        window.scrollTo(0, 0);
    };

    const handleNavigate = (view: AppView) => {
        setCurrentView(view);
        window.scrollTo(0, 0);
    }

    // If viewing admin dashboard, render it without navbar/footer for cleaner look
    if (currentView === AppView.ADMIN_DASHBOARD) {
        return (
            <AdminDashboard
                onLogout={() => handleNavigate(AppView.HOME)}
                requests={allRequests}
            />
        );
    }

    // If viewing yellow pages, render it full screen roughly like dashboard but maybe keep navbar if needed 
    // actually design shows header inside Hub so maybe full screen is better or hide navbar.
    // The YellowPagesHub has a "Back to Home" button, so we can render it conditionally.
    if (currentView === AppView.YELLOW_PAGES) {
        return <YellowPagesHub onBack={() => handleNavigate(AppView.HOME)} />;
    }

    // Render Logic
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar onNavigate={handleNavigate} />

            <main className="flex-grow relative">
                {currentView === AppView.HOME && (
                    <>
                        <Hero
                            onSearch={handleSearch}
                            onOpenAdvisor={() => setShowAdvisor(true)}
                        />
                        <CategoryGrid onSelectCategory={handleCategorySelect} />

                        {/* How it Works Section (Preview) */}
                        <section className="py-20 bg-gray-50">
                            <div className="max-w-7xl mx-auto px-4">
                                <div className="text-center mb-16">
                                    <span className="text-orange-500 font-bold tracking-wider text-sm uppercase">Easy Steps</span>
                                    <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-4">AutoPro 如何運作？</h2>
                                    <p className="text-gray-500 max-w-2xl mx-auto">無論是日常保養還是緊急維修，我們都能助您輕鬆解決。只需 3 個步驟，即可配對合適的汽車專家。</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-10">
                                    <div className="relative group">
                                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 hover:shadow-lg transition-all duration-300 relative z-10 h-full">
                                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <Clock className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-gray-900">1. 提交免費需求</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">回答幾條簡單問題，詳細描述您的汽車型號及遇到的問題。整個過程完全免費。</p>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 hover:shadow-lg transition-all duration-300 relative z-10 h-full">
                                            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                                <UserCheck className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-gray-900">2. 比較師傅報價</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">系統會為您配對最多 4 間合適的車房。您可以比較他們的報價、服務範圍及過往用戶評價。</p>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 hover:shadow-lg transition-all duration-300 relative z-10 h-full">
                                            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                                <ShieldCheck className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-gray-900">3. 預約服務</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">選擇最合適的專家，直接預約時間。服務完成後，您可以留下評價，幫助其他車主。</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <button onClick={() => setCurrentView(AppView.REQUEST_WIZARD)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-orange-200 transition-all hover:-translate-y-1">
                                        立即開始獲取報價
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Testimonials */}
                        <section className="py-20 bg-white">
                            <div className="max-w-7xl mx-auto px-4">
                                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">用戶真實評價</h2>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { name: "陳先生", car: "BMW 320i", comment: "第一次用這個平台，沒想到這麼快就有回覆。配對的車房很專業，價錢比原廠平一半！", rating: 5 },
                                        { name: "Sarah Wong", car: "Honda Jazz", comment: "驗車服務好方便，師傅上門收車，驗完送返樓下。完全不用自己煩。", rating: 5 },
                                        { name: "李小姐", car: "Tesla Model Y", comment: "主要係想搵貼膜，平台上有好多選擇，比較完價錢之後揀咗間係觀塘嘅，效果好好。", rating: 4 }
                                    ].map((review, i) => (
                                        <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <div className="flex gap-1 mb-3 text-orange-400">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                            </div>
                                            <p className="text-gray-700 italic mb-4">"{review.comment}"</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                                                    <div className="text-xs text-gray-500">{review.car}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {currentView === AppView.REQUEST_WIZARD && (
                    <ServiceRequestForm
                        initialCategory={requestData.categoryId}
                        initialQuery={requestData.description}
                        onSubmit={handleRequestSubmit}
                        onCancel={() => handleNavigate(AppView.HOME)}
                    />
                )}

                {currentView === AppView.PROVIDER_LIST && (
                    <div className="relative min-h-[400px]">
                        {isLoadingProviders ? (
                            <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
                                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">正在配對最合適的服務商...</h3>
                                <p className="text-gray-500 mt-2">請稍候片刻</p>
                            </div>
                        ) : (
                            <ProviderList
                                providers={allProviders.filter(p => {
                                    const matchLocation = !requestData.location || requestData.location === '全港' || p.location === requestData.location;
                                    const matchCategory = !requestData.categoryId || p.categories.includes(requestData.categoryId);
                                    return matchLocation && matchCategory;
                                })}
                                onBack={() => handleNavigate(AppView.HOME)}
                            />
                        )}
                    </div>
                )}

                {currentView === AppView.HOW_IT_WORKS && (
                    <HowItWorksPage onNavigate={handleNavigate} />
                )}

                {currentView === AppView.PRO_JOIN && (
                    <ProJoinPage />
                )}

                {currentView === AppView.LOGIN && (
                    <AuthPage
                        onCancel={() => handleNavigate(AppView.HOME)}
                        onLoginSuccess={() => handleNavigate(AppView.HOME)}
                    />
                )}

                {/* Floating AI Advisor */}
                {showAdvisor && (
                    <AIAdvisor onClose={() => setShowAdvisor(false)} />
                )}
            </main>

            {/* Pass navigate prop to footer so we can access admin dashboard */}
            <Footer onNavigate={handleNavigate} />
        </div>
    );
};

export default App;
