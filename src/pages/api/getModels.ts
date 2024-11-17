import type { NextApiRequest, NextApiResponse } from 'next';

type ApiResponse = {
  error?: string;
  data?: any; // You can type this more specifically if you know the API's structure
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const make = 'honda';
  const modelYear = '2015';
  const vehicleType = 'truck';

  const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${modelYear}/?format=json`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({ data });
  } catch (error: unknown) {
    console.error('Error in vehicleModels API:', error);

    // Ensure error messages are properly handled
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    res.status(500).json({ error: errorMessage });
  }
}
