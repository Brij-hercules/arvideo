
import { supabase } from './supabaseClient';
import { Provider } from '../types';

export const fetchGarages = async (): Promise<Provider[]> => {
    try {
        const { data, error } = await supabase
            .from('garages')
            .select('*');

        if (error) {
            console.error('Error fetching garages:', error);
            return [];
        }

        return data.map((item: any) => ({
            id: item.id.toString(),
            name: item.name || item.name_en,
            rating: item.rating || 0,
            reviews: item.review_count || 0,
            location: item.district || '全港',
            categories: item.service_tags || [],
            badges: [], // Could be expanded later
            imageUrl: item.image_url || `https://picsum.photos/400/300?seed=${item.id}`,
            startPrice: 800 // Default or could be added to schema
        }));
    } catch (err) {
        console.error('Unexpected error in fetchGarages:', err);
        return [];
    }
};
