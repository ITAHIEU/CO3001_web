import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

// Accept props, including `data` as an input.
export default function BasicLineChart({ data }) {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
      series={[
        {
          data: data, 
        },
      ]}
      width={800}
      height={500}
    />
  );
}
