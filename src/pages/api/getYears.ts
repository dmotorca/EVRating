
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getYears(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract the `make` parameter from the query string
  const { years } = req.query;



  if (!years || typeof years !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid make parameter' });
  }

  try {
    // Query database for models based on the `make`
    const { data, error } = await supabase
      .from('vehicle_table_and_MPG')
      .select('years')

    if (error) throw error;

    // Extract unique models
    if(data){

    return res.status(200).json({ years});
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch years' });
    console.log(error)
  }
}
