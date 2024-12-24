import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getModelsByMakeAndYear(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { make, year, engine } = req.query;

  if (!make || typeof make !== 'string' || !year || typeof year !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or invalid make/year parameters' });
  }

  try {
    // Query database for engine displacement  based on `make` and `year`
    const { data, error } = await supabase
      .from('vehicle_table_and_MPG')
      .select('id', ) // Select engine displacement
      .eq('make', make) // Match make
      .eq('year', year) // Match year
      .eq('displ', engine); // Match year

    if (error) throw error;

    console.log("ROUTE DATA" , data)
    return res.status(200).json({ fuelCost08: data });
  } catch (err) {
    console.error('Error fetching models:', err);
    return res.status(500).json({ error: 'Failed to fetch models' });
  }
}
