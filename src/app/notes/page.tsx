import { get } from 'http';
import { createClient } from '../../../utils/supabase/server';

type Make = {
  MakeId: number;
  MakeName: string;
};

export default async function FetchVehicleData() {
  const supabase = await createClient();

  try {
    const response = await fetch(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );
    if (!response.ok) {
      throw new Error('Could not fetch resource');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

//const { data: users } = await supabase.from('users').select();
