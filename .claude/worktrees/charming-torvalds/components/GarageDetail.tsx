import React from 'react';
import { Garage } from '../types';
import { MapPin, Phone, Star, Clock, ShieldCheck, ArrowLeft, Share2, Heart, CheckCircle2 } from 'lucide-react';

interface Props {
    garage: Garage;
    onBack: () => void;
}

const GarageDetail: React.FC<Props> = ({ garage, onBack }) => {
    // Formatting logic similar to GarageCard but potentially more elaborate if needed
    const formatOpeningHours = (hoursString: string) => {
        if (!hoursString) return null;
        const parts = hoursString.split(',').map(p => p.trim());
        const timeGroups: Record<string, string[]> = {};
        parts.forEach(part => {
            const [day, time] = part.split(' ');
            if (day && time) {
                if (!timeGroups[time]) timeGroups[time] = [];
                timeGroups[time].push(day);
            }
        });
        return Object.entries(timeGroups).map(([time, days]) => {
            let dayRange = days.join(', ');
            if (days.length > 2) {
                const allDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
                const firstIdx = allDays.indexOf(days[0]);
                const lastIdx = allDays.indexOf(days[days.length - 1]);
                if (lastIdx - firstIdx === days.length - 1) {
                    dayRange = `${days[0]} - ${days[days.length - 1]}`;
                }
            }
            return { days: dayRange, time };
        });
    };

    const openingHoursFormatted = garage.openingHours ? formatOpeningHours(garage.openingHours) : null;

    // Mock reviews
    const reviews = [
        { user: "Wong Tai Sin Driver", rating: 5, text: "師傅好專業，解釋詳細，價錢公道！", date: "2日前" },
        { user: "Chan David", rating: 4, text: "換油快手，環境乾淨。", date: "1週前" },
        { user: "K.L. Lee", rating: 5, text: "值得推薦，以前去過幾間都整唔好，呢間一次搞掂。", date: "1個月前" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
            {/* Header / Nav */}
            <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>返回搜尋結果</span>
                    </button>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hero Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">政府註冊車房</span>
                                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{garage.district}</span>
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{garage.name}</h1>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                        <span>註冊編號: <span className="font-mono text-gray-700">{garage.registrationNumber}</span></span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {garage.rating && (
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-5 h-5 ${star <= Math.round(parseFloat(garage.rating || '0')) ? 'text-orange-400 fill-current' : 'text-gray-200'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-lg font-bold text-gray-900">{garage.rating}</span>
                                                <span className="text-gray-400 text-sm">({garage.reviewCount} 評論)</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 bg-gray-50 p-4 rounded-xl text-center min-w-[120px]">
                                    <span className="block text-gray-400 text-xs mb-1">綜合評分</span>
                                    <span className="block text-4xl font-bold text-blue-600">{garage.rating}</span>
                                    <span className="block text-orange-400 text-xs mt-1">★★★★★</span>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Contact Info */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    地址及聯絡
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-gray-400 block mb-1">地址</span>
                                        <p className="text-gray-700 leading-relaxed">{garage.address}</p>
                                    </div>
                                    {garage.phone && (
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-1">電話</span>
                                            <a href={`tel:${garage.phone}`} className="text-blue-600 font-bold text-lg hover:underline">{garage.phone}</a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Services */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    服務範圍
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {garage.serviceTags?.map((tag, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {garage.vehicleTypes && garage.vehicleTypes.length > 0 && (
                                    <div className="pt-4 border-t border-gray-50">
                                        <span className="text-xs text-gray-400 block mb-2">服務車輛</span>
                                        <div className="flex flex-wrap gap-2">
                                            {garage.vehicleTypes[0].split(',').map((v, i) => (
                                                <span key={i} className="px-2 py-1 bg-white border border-gray-200 text-gray-500 text-xs rounded">
                                                    {v.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">優質評論 ({garage.reviewCount})</h3>
                            <div className="space-y-6">
                                {reviews.map((review, i) => (
                                    <div key={i} className="border-b border-gray-50 last:border-0 pb-6 last:pb-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {review.user.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-gray-900">{review.user}</div>
                                                    <div className="text-xs text-gray-400">{review.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex text-orange-400">
                                                {[...Array(review.rating)].map((_, r) => <Star key={r} className="w-4 h-4 fill-current" />)}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed pl-13 ml-13">{review.text}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                                查看所有評論
                            </button>
                        </div>

                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Opening Hours Card */}
                            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50 pointer-events-none"></div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 relative z-10">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    營業時間
                                </h3>
                                <div className="space-y-3 relative z-10">
                                    {openingHoursFormatted ? (
                                        openingHoursFormatted.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm items-center py-2 border-b border-gray-50 last:border-0">
                                                <span className="font-medium text-gray-700">{item.days}</span>
                                                <span className="text-blue-600 font-bold">{item.time}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">未能提供營業時間</p>
                                    )}
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-slate-900 rounded-xl shadow-xl p-6 text-white text-center">
                                <h3 className="text-lg font-bold mb-2">需要預約維修？</h3>
                                <p className="text-slate-400 text-sm mb-6">透過 AutoPro 預約，享受更優先服務及價格保障。</p>
                                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-blue-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 mb-3">
                                    立即預約
                                </button>
                                <a
                                    href={`tel:${garage.phone}`}
                                    className="block w-full bg-transparent border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 font-bold py-3 px-6 rounded-lg transition-all"
                                >
                                    致電查詢
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GarageDetail;
