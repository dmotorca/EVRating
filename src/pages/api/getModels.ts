const fetchVehicleModels = async (make:string, year:any, vehicleType = 'all') => {
    try {
      const response = await fetch(
        `/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${vehicleType}?format=json`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data); // Handle the API response
      return data;
    } catch (error) {
      console.error('Failed to fetch vehicle models:', error);
    }
  };
  

  