import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getModelsByMake(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the `make` parameter from the query string
  const { make } = req.query;


  if (!make || typeof make !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid make parameter' });
  }

  try {
    // Query database for models based on the `make`
    const { data, error } = await supabase
      .from('vehicle_table_and_MPG')
      .select('baseModel')
      .eq('make', make);

    if (error) throw error;

    // Extract unique models
    const uniqueModels = Array.from(new Set(data.map((item) => item.baseModel)));
    return res.status(200).json({ uniqueModels });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch models' });
    console.log(error)
  }
}
