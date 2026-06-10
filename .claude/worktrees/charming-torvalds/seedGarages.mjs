
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const garages = [
    {
        registration_number: 'RN1001',
        name: '錦田強記車房',
        name_en: 'Keung Kee Garage',
        district: '元朗',
        phone: '2477 1234',
        services: '定期保養, 汽車維修, 政府驗車',
        service_tags: ['maintenance', 'repair', 'inspection'],
        rating: 4.8,
        review_count: 124,
        image_url: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193b?auto=format&fit=crop&w=800&q=80'
    },
    {
        registration_number: 'RN1002',
        name: 'Top Gear Motors',
        name_en: 'Top Gear Motors',
        district: '九龍灣',
        phone: '2345 6789',
        services: '汽車美容, 噴油焗油',
        service_tags: ['detailing', 'bodywork'],
        rating: 4.9,
        review_count: 89,
        image_url: 'https://images.unsplash.com/photo-1563720223185-11003d516905?auto=format&fit=crop&w=800&q=80'
    },
    {
        registration_number: 'RN1003',
        name: '順利輪胎電池',
        name_en: 'Shun Lee Battery',
        district: '土瓜灣',
        phone: '2711 0000',
        services: '更換電池, 汽車維修',
        service_tags: ['battery', 'repair'],
        rating: 4.5,
        review_count: 210,
        image_url: 'https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&w=800&q=80'
    },
    {
        registration_number: 'RN1004',
        name: 'German Auto Expert',
        name_en: 'German Auto Expert',
        district: '荃灣',
        phone: '2611 2233',
        services: '定期保養, 改裝升級',
        service_tags: ['maintenance', 'tuning'],
        rating: 4.7,
        review_count: 56,
        image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80'
    }
];

async function seed() {
    console.log('Seeding garages...');
    // Try to delete existing garages first (ignoring errors if table doesn't support delete without filter)
    await supabase.from('garages').delete().filter('registration_number', 'neq', 'NONE');

    const { data, error } = await supabase.from('garages').insert(garages);
    if (error) {
        if (error.message.includes('image_url')) {
            console.error('Column image_url missing. Attempting without it...');
            const garagesNoImg = garages.map(({ image_url, ...rest }) => rest);
            const { error: error2 } = await supabase.from('garages').insert(garagesNoImg);
            if (error2) console.error('Error seeding even without image_url:', error2);
            else console.log('Successfully seeded garages (without image_url).');
        } else {
            console.error('Error seeding garages:', error);
        }
    } else {
        console.log('Successfully seeded garages.');
    }
}

seed();
