import React from 'react'
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = () => {
  return (
    <div>
        <Line 
            data={
                {
                    labels: [1,2,3,4,5],
                    datasets: [
                        {
                            data: [6,7,8,9,10],
                            label: 'random data',
                            borderColor: 'gold'
                        },
                        {
                            data: [10,9,8,7,6],
                            label: 'random data2',
                            borderColor: 'green'
                        }
                    ]
                }
            }   
        />
    </div>
  )
}

export default Graph