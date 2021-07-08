import { Radar } from 'react-chartjs-2';

const data = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    scale: {
      ticks: { beginAtZero: true },
    },
  };
  
const Grafico = () => {
    return (
        <div>
            <h2>Grafico del GAP Análisis</h2>
            <Radar data={data} options={options} />
        </div>
    )
}

export default Grafico
