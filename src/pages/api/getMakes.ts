// src/pages/api/getMakeNames.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getMake(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase.from('vehicle_table_and_MPG').select('make'); // Fetch 'make'

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data) {
    // Extract unique 'make' values
    const uniqueMakes = Array.from(new Set(data.map((item: any) => item.make))); // Deduplicate
    return res.status(200).json({ uniqueMakes }); // Return unique values
  }
}
