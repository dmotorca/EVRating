//Return all model in database

// src/pages/api/getMakeNames.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';


export default async function getModel(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {data, error } = await supabase.from("vehicle_table_and_MPG").select("baseModel")

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  console.log(data)

  return res.status(200).json({ data });
}