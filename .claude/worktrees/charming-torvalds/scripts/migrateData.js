
import { createClient } from '@supabase/supabase-js'
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// ES Module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrate() {
    console.log('Starting migration...');

    const csvPath = path.resolve(__dirname, '../public/garages.csv');
    let fileContent = fs.readFileSync(csvPath, 'utf-8');

    // Strip BOM
    if (fileContent.charCodeAt(0) === 0xFEFF) {
        fileContent = fileContent.slice(1);
    }

    // Parse CSV
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    console.log(`Found ${records.length} records. Processing...`);

    const batchSize = 100;
    let processed = 0;

    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);

        const upsertData = batch.map(record => {
            // Map CSV columns to Supabase table columns
            // Simple mapping based on known columns
            return {
                registration_number: record['Registration Number'],
                name: record['Name of Company (Traditional Chinese)'],
                name_en: record['Name of Company (English)'],
                branch_name_en: record['Branch Name (English)'],
                branch_name: record['Branch Name (Traditional Chinese)'],
                address: record['Business Address (Traditional Chinese)'],
                address_en: record['Business Address (English)'],
                district: record['District (Traditional Chinese)'],
                district_en: record['District (English)'],
                phone: record['Telephone Number'],
                services: record['Types of Services Provided by the Workshop (Traditional Chinese)'],
                services_en: record['Types of Services Provided by the Workshop (English)'],
                vehicle_types: record['Types of Vehicles Serviced (Traditional Chinese)'],
                opening_hours: record['Opening Hours'],
                // Add tag generation logic if strictly needed in DB, or do it on client side
            };
        });

        const { error } = await supabase
            .from('garages')
            .upsert(upsertData, { onConflict: 'registration_number' });

        if (error) {
            console.error('Error inserting batch:', error);
        } else {
            processed += batch.length;
            console.log(`Processed ${processed}/${records.length}`);
        }
    }

    console.log('Migration complete!');
}

migrate();
