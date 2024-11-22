import { createClient } from '../../../utils/supabase/server';

export default async function FetchVehicleYearCount() {
  const supabase = await createClient();

  // Fetch the count of unique years
  const { count, error } = await supabase
    .from('vehicle_table_and_MPG')
    .select('year', { count: 'exact', head: true }); // head: true means no rows are returned, only the count

  if (error) {
    console.error('Error fetching year count:', error.message);
    return;
  }

  console.log(`Total years in database: ${count}`);
}
