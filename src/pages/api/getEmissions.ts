import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getModelsByMakeAndYear(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { make, year, model, engine } = req.query;

  if (!make || typeof make !== 'string' || !year || typeof year !== 'string') {
    return res
      .status(400)
      .json({ error: 'Missing or invalid make/year parameters' });
  }

  try {
    // Query database for fuel cost based on `make`, `year`, `model`, and `engine`
    const { data, error } = await supabase
      .from('vehicle_table_and_MPG')
      .select('fuelCost08') // Select fuel cost
      .eq('make', make) // Match make
      .eq('year', year) // Match year
      .eq('baseModel', model) // Match model
      .eq('displ', engine); // Match engine displacement

    if (error) throw error;

    // Ensure `data` exists and is valid
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found for the given parameters' });
    }

    // Extract `fuelCost08` values and filter out null/undefined values
    const fuelCosts = data
      .map((item: any) => item.fuelCost08)
      .filter((value) => value !== null && value !== undefined);

    // Calculate the average
    const total = fuelCosts.reduce((sum, value) => sum + value, 0);
    const average = total / fuelCosts.length;
    // Return the average and original data
    return res.status(200).json({ averageFuelCost08: average });
  } catch (err) {
    console.error('Error fetching models:', err);
    return res.status(500).json({ error: 'Failed to fetch models' });
  }
}