import { supabase } from './supabaseClient';
import { Garage } from '../types';

export const fetchGarageData = async (): Promise<Garage[]> => {
    try {
        console.log("Fetching garage data from Supabase...");

        const { data, error } = await supabase
            .from('garages')
            .select('*');

        if (error) {
            console.error("Error fetching data from Supabase:", error);
            throw error;
        }

        if (!data) return [];

        console.log(`Fetched ${data.length} records from Supabase.`);

        // Transform Supabase data to Garage interface
        return data.map((item: any) => ({
            id: item.id.toString(),
            name: item.name || item.name_en,
            address: item.address || item.address_en,
            district: item.district || item.district_en || 'Other',
            phone: item.phone,
            registrationNumber: item.registration_number,
            services: item.services || item.services_en,
            serviceTags: item.service_tags || [],
            openingHours: item.opening_hours,
            vehicleTypes: item.vehicle_types ? [item.vehicle_types] : [], // stored as string in migration, wrap as array for interface
            rating: item.rating?.toFixed(1) || "4.0",
            reviewCount: item.review_count || 0
        }));

    } catch (error) {
        console.error("Error fetching garage data:", error);
        return [];
    }
};
