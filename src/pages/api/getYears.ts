// src/pages/api/getYears.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getYears(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('vehicle_table_and_MPG')
    .select('year'); // Fetch all rows for 'year'

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data) {
    // Debugging: Check the raw Supabase response
    console.log('Raw data from Supabase:', data);

    // Create a distinct list of years
    const distinctYears = Array.from(new Set(data.map((item) => item.year)));

    // Debugging: Check the processed unique years
    console.log('Processed distinct years:', distinctYears);

    return res.status(200).json({ distinctYears });
  }

  return res.status(500).json({ error: 'Unexpected error occurred.' });
}
