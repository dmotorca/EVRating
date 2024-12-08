//Return all model in database

// src/pages/api/getMakeNames.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function getModels(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {data, error } = await supabase
  .from("vehicle_table_and_MPG")
  .select("baseModel")
  .eq('make', make);

  if (data) {
    // Extract baseModel and filter unique values
    const uniqueModels = Array.from(new Set(data.map((item: any) => item.baseModel)));
    return res.status(200).json({ uniqueModels });
  }
  if (error) {
    return res.status(500).json({ error: error.message });
  }


}