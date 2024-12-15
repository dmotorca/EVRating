import React from 'react';
import Selector from '@/components/Selector';

import makesData from '../JSON/Makes.json';
import years from '../JSON/Years.json';

const VehicleSelectorPage = () => {
  const makes = [
    'AM General',
    'Acura',
    'Alfa Romeo',
    'American Motors Corporation',
    'Audi',
    'BMW',
    'Buick',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'CX Automotive',
    'Dodge',
    'E. P. Dutton, Inc.',
    'Eagle',
    'Ferrari',
    'Ford',
    'Genesis',
    'Geo',
    'GMC',
    'Grumman Olson',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Isuzu',
    'Jaguar',
    'Jeep',
    'Kia',
    'Land Rover',
    'Lexus',
    'Lincoln',
    'Lotus',
    'Lucid Motors',
    'Mazda',
    'Mercedes-Benz',
    'Mercury',
    'Mitsubishi',
    'Nissan',
    'Oldsmobile',
    'PAS, Inc',
    'Plymouth',
    'Polestar',
    'Pontiac',
    'Porsche',
    'Ram',
    'Rolls-Royce',
    'Saab',
    'Saturn',
    'Subaru',
    'Suzuki',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo',
    'Rivian',
  ];

  const years = [
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
  ];

  return (
    <div>
      <h1>SELECTOR </h1>
      <Selector optionsYears={years} optionsMakes={makes} />
    </div>
  );
};

export default VehicleSelectorPage;
