'use server';

import { createClient } from '../../../utils/supabase/server';

export default async function FetchVehicleModels() {
  const supabase = await createClient();

  // Fetch the count of unique years
  let { data: vehicleData, error } = await supabase
    .from('vehicle_table_and_MPG')
    .select('baseModel'); // head: true means no rows are returned, only the count

  if (error) {
    console.error('Error fetching year count:', error.message);
    return [];
  } else if (vehicleData) {
    const baseModels = vehicleData.map(
      (item: { baseModel: string }) => item.baseModel
    );

    return baseModels;
  }
}
