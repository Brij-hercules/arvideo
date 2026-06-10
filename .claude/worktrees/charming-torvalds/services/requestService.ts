import { supabase } from './supabaseClient';
import { UserRequest } from '../types';

export const submitRequest = async (request: UserRequest): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('service_requests')
            .insert({
                id: request.id,
                category_id: request.categoryId,
                car_model: request.carModel,
                year: request.year,
                description: request.description,
                location: request.location,
                urgency: request.urgency,
                status: request.status || 'pending',
                user_phone: request.userPhone
            });

        if (error) {
            console.error("Error submitting request to Supabase:", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error in submitRequest:", error);
        return false;
    }
};

export const fetchRequests = async (): Promise<UserRequest[]> => {
    try {
        const { data, error } = await supabase
            .from('service_requests')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) {
            console.error("Error fetching requests from Supabase:", error);
            return [];
        }

        return data.map((item: any) => ({
            id: item.id,
            categoryId: item.category_id,
            carModel: item.car_model,
            year: item.year,
            description: item.description,
            location: item.location,
            urgency: item.urgency,
            status: item.status,
            timestamp: new Date(item.timestamp),
            userPhone: item.user_phone
        }));
    } catch (error) {
        console.error("Error in fetchRequests:", error);
        return [];
    }
};
