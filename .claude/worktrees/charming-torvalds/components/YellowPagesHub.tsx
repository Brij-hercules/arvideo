import React, { useEffect, useState } from 'react';
import { Garage } from '../types';
import { fetchGarageData } from '../services/garageDataService';
import GarageDetail from './GarageDetail';
import GarageCard from './GarageCard';
import { Search, MapPin, Filter, Loader2 } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const CATEGORIES = ["私家車", "的士", "電單車", "一般維修", "輪胎", "電池", "冷氣", "車身/噴油"];

const YellowPagesHub: React.FC<Props> = ({ onBack }) => {
    const [garages, setGarages] = useState<Garage[]>([]);
    const [filteredGarages, setFilteredGarages] = useState<Garage[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('All');
    const [districts, setDistricts] = useState<string[]>([]);

    // New state for category filter
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // Detail view state
    const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchGarageData();
            setGarages(data);
            setFilteredGarages(data);

            // Extract unique districts
            const uniqueDistricts = Array.from(new Set(data.map(g => g.district))).sort();
            setDistricts(['All', ...uniqueDistricts]);

            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        let result = garages;

        if (selectedDistrict !== 'All') {
            result = result.filter(g => g.district === selectedDistrict);
        }

        // Filter by category tag
        if (selectedCategory) {
            result = result.filter(g => g.serviceTags?.includes(selectedCategory));
        }

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(g =>
                g.name.toLowerCase().includes(lowerTerm) ||
                g.address.toLowerCase().includes(lowerTerm) ||
                g.services.toLowerCase().includes(lowerTerm)
            );
        }

        setFilteredGarages(result);
    }, [searchTerm, selectedDistrict, selectedCategory, garages]);

    // Render Detail View if selected
    if (selectedGarage) {
        return <GarageDetail garage={selectedGarage} onBack={() => setSelectedGarage(null)} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white pt-24 pb-12 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 opacity-10 pattern-grid-lg"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <button onClick={onBack} className="text-gray-400 hover:text-white mb-4 text-sm flex items-center gap-1 transition-colors">
                        ← 返回首頁
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">AutoPro 搵車房 <span className="text-orange-500">Yellow Pages</span></h1>
                    <p className="text-gray-400 max-w-2xl text-lg">全港最齊全車房指南，收錄超過 2,000 間政府註冊維修車房。資料由 EMSD 政府數據提供。</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
                {/* Search & Filter Bar */}
                {/* Search & Filter Bar */}
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <input
                                type="text"
                                placeholder="搜尋車房名稱、地址或服務..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative md:w-1/4 min-w-[200px]">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <select
                                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all cursor-pointer"
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                            >
                                {districts.map(d => (
                                    <option key={d} value={d}>{d === 'All' ? '全港地區' : d}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Filter className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Category Chips */}
                    <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">智能篩選</span>
                            <div className="text-sm text-gray-500">
                                共搵到 <strong className="text-blue-600 font-bold">{filteredGarages.length}</strong> 間車房
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!selectedCategory ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
                            >
                                全部顯示
                            </button>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-500">正在加載車房資料...</p>
                    </div>
                ) : (
                    <>
                        {filteredGarages.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGarages.map(garage => (
                                    <GarageCard
                                        key={garage.id}
                                        garage={garage}
                                        onClick={() => setSelectedGarage(garage)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
                                <p className="text-gray-500 text-lg">找不到符合條件的車房</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedDistrict('All'); }}
                                    className="mt-4 text-blue-600 hover:underline"
                                >
                                    清除所有篩選
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default YellowPagesHub;
