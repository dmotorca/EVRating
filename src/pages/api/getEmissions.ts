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
      .select('co2TailpipeGpm') //Select emissions
      .eq('make', make) // Match make
      .eq('year', year) // Match year
      .eq('baseModel', model) // Match model
      .eq('displ', engine)
    
    if (error) throw error;

    // Ensure `data` exists and is valid
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found for the given parameters' });
    }

      console.log("DATAAAA: " ,data)
    // Extract `fuelCost08` values and filter out null/undefined values
    const emissionsPerMile = data
      .map((item: any) => item.co2TailpipeGpm)
      .filter((value) => value !== null && value !== undefined);

    // Calculate the average
    const total = emissionsPerMile.reduce((sum, value) => sum + value, 0);
    console.log("TOTAL, ", total)
    console.log("LENGTH: ", emissionsPerMile.length)
    const average = total / emissionsPerMile.length;
    console.log("AVERAGE", average)
    // Return the average and original data
    return res.status(200).json({co2TailpipeGpm: average });
  } catch (err) {
    console.error('Error fetching models:', err);
    return res.status(500).json({ error: 'Failed to fetch models' });
  }
}