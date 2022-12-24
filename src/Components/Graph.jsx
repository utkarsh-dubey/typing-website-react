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
import { useTheme } from '../Context/ThemeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({graphData,type}) => {

    const {theme} = useTheme();

  return (
    <div>
        <Line 
            data={
                {
                    labels: graphData.map(i=>(type==='date')?(i[0].toDate().toLocaleString().split(',')[0]):(i[0]+1)),
                    datasets: [
                        {
                            data: graphData.map(i=>i[1]),
                            label: 'wpm',
                            borderColor: theme.title
                        }
                    ]
                }
            }   
        />
    </div>
  )
}

export default Graph