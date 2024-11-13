import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      const { data, error } = await supabase.from('vehicles').select('*');
      if (error) console.log('Error fetching vehicles:', error);
      else setVehicles(data);
    }
    fetchVehicles();
  }, []);

  return (
    <div>
      {vehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <h3>
            {vehicle.make} {vehicle.model}
          </h3>
        </div>
      ))}
    </div>
  );
}
