import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getModelsByMakeAndYear(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { make, year, model} = req.query;

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
    
    if (error) throw error;

    // Ensure `data` exists and is valid
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found for the given parameters' });
    }

    //Grabbing length
    const length = data.length

    // Calculate the total
    const total = data
    .map((item) => parseFloat(item.co2TailpipeGpm))
    .reduce((acc, value) => acc + value, 0);

    const average = (total / length) ; //Finding the average
    average.toFixed(2) //triming the number to make it easier

    //Math for miles driven

    return res.status(200).json({co2TailpipeGpm: average });
  } catch (err) {
    console.error('Error fetching models:', err);
    return res.status(500).json({ error: 'Failed to fetch models' });
  }
}