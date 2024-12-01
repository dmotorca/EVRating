import React from 'react';
import { createClient } from '../../../utils/supabase/server';
import Selector from '@/components/Selector';
import { useState, useEffect } from 'react';

export default async function FetchVehicleData() {
  const supabase = await createClient();

  return <Selector></Selector>;
}
