// src/pages/api/getYears.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getYears(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('vehicle_table_and_MPG')
    .select('year'); // Fetch 'year'

    console.log(data)

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data) {
    // Extract unique 'year' values
    const uniqueYears = Array.from(new Set(data.map((item: any) => item.year)));

    return res.status(200).json({ uniqueYears }); // Return unique values
  }
}
