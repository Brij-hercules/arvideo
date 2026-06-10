import React from 'react';
import { Garage } from '../types';
import { MapPin, Phone, Star, Wrench, ShieldCheck, Clock } from 'lucide-react';

interface Props {
    garage: Garage;
    onClick?: () => void;
}

const GarageCard: React.FC<Props> = ({ garage, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5 flex flex-col h-full ${onClick ? 'cursor-pointer hover:border-blue-200 active:scale-[0.99] transition-all' : ''}`}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">{garage.name}</h3>
                {garage.rating && (
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-orange-400 fill-current" />
                        <span className="text-sm font-bold text-orange-700">{garage.rating}</span>
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-4 flex-grow">
                <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{garage.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <div className="w-4 h-4 flex items-center justify-center">
                        <span className="text-xs font-bold bg-gray-100 px-1 rounded text-gray-500">區</span>
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{garage.district}</span>
                </div>

                {garage.openingHours && (
                    <div className="flex items-start gap-2 text-gray-500 text-xs">
                        <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{garage.openingHours}</span>
                    </div>
                )}

                {garage.phone && (
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a href={`tel:${garage.phone}`} className="hover:underline">{garage.phone}</a>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-100 pt-3 mt-auto">
                {garage.registrationNumber && (
                    <div className="flex items-center gap-1.5 text-xs text-green-600 mb-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>註冊編號: {garage.registrationNumber}</span>
                    </div>
                )}
                <div className="flex items-start gap-1.5 text-xs text-gray-500">
                    <Wrench className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2" title={garage.services}>{garage.services || "一般維修服務"}</span>
                </div>
            </div>
        </div>
    );
};

export default GarageCard;
