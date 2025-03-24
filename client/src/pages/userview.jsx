import { useEffect, useState } from "react";
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Register all necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement  // Register the 'point' element explicitly for Line charts
);

export default function Dashboard() {
  const [Info, setInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [priceTrend, setPriceTrend] = useState([]);
  const [mostExpensiveItem, setMostExpensiveItem] = useState(null);
  const [leastExpensiveItem, setLeastExpensiveItem] = useState(null);

  // Fetch data and calculate total price and total length
  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/iget`);
        const data = await res.json();
        if (res.ok) {
          setInfo(data);
          calculateTotal(data);
          setMostExpensiveItem(getMostExpensiveItem(data));
          setLeastExpensiveItem(getLeastExpensiveItem(data));
          calculateAveragePrice(data);
          calculatePriceTrend(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const calculateTotal = (data) => {
      let price = 0;
      let length = data.length;
      data.forEach(item => {
        price += item.price * item.quantity;
      });
      setTotalPrice(price);
      setTotalLength(length);
    };

    const calculateAveragePrice = (data) => {
      const totalPrice = data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const totalCount = data.reduce((acc, item) => acc + item.quantity, 0);
      setAveragePrice((totalPrice / totalCount).toFixed(2));
    };

    const calculatePriceTrend = (data) => {
      const trendData = data.map(item => item.price); // Example: Track price of items over time
      setPriceTrend(trendData);
    };

    const getMostExpensiveItem = (data) => {
      return data.reduce((max, item) => (item.price > max.price ? item : max), data[0]);
    };

    const getLeastExpensiveItem = (data) => {
      return data.reduce((min, item) => (item.price < min.price ? item : min), data[0]);
    };

    fetchinfo();
  }, []);

  // Pie chart data
  const pieChartData = {
    labels: ['In Stock', 'Out of Stock'],
    datasets: [
      {
        label: 'Inventory Status',
        data: [
          Info.filter(item => item.quantity > 0).length, 
          Info.filter(item => item.quantity === 0).length
        ],
        backgroundColor: ['#36a2eb', '#ff6384'],
      },
    ],
  };

  // Bar chart data
  const barChartData = {
    labels: Info.map(item => item.name),
    datasets: [
      {
        label: 'Inventory Quantity',
        data: Info.map(item => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Line chart data (Price Trend)
  const lineChartData = {
    labels: Info.map(item => item.name),
    datasets: [
      {
        label: 'Item Price Trend',
        data: priceTrend,
        borderColor: '#ff5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        fill: true,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="h-[1000px] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/18966875/pexels-photo-18966875/free-photo-of-machine-on-a-construction.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")' }}>
      <div className="relative min-h-full bg-black bg-opacity-50 p-8">
        <div className="max-w-screen-xl mx-auto">

          {/* Dashboard Header */}
          <div className="flex justify-between items-center text-slate-400  mb-8">
            <h1 className="text-4xl font-extrabold">Dashboard</h1>
            <div className="text-xl">
              <p className="mb-2">Total Inventory Price: <span className="font-semibold">${totalPrice}</span></p>
              <p>Total Items: <span className="font-semibold">{totalLength} items</span></p>
              <p className="mt-4">Average Item Price: <span className="font-semibold">${averagePrice}</span></p>
            </div>
          </div>

          {/* Most Expensive and Least Expensive Item - Horizontally */}
          <div className="flex space-x-6 mb-12">
            <div className="bg-black bg-opacity-90 text-slate-400  p-6 rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-semibold mb-4 text-center">Most Expensive Item</h2>
              <p className="text-center">{mostExpensiveItem ? `${mostExpensiveItem.name} - $${mostExpensiveItem.price}` : 'Loading...'}</p>
            </div>

            <div className="bg-black bg-opacity-90 text-slate-400  p-6 rounded-lg shadow-lg flex-1">
              <h2 className="text-2xl font-semibold mb-4 text-center">Least Expensive Item</h2>
              <p className="text-center">{leastExpensiveItem ? `${leastExpensiveItem.name} - $${leastExpensiveItem.price}` : 'Loading...'}</p>
            </div>
          </div>

          {/* Pie Chart, Bar Chart, and Line Chart - Horizontally */}
          <div className="flex space-x-6 mb-12">
            {/* Pie Chart Section */}
            <div className="w-1/3 bg-black bg-opacity-90 text-slate-400  p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Inventory Status</h2>
              <div className="w-full h-[300px]">
                <Pie data={pieChartData} />
              </div>
            </div>

            {/* Bar Chart Section */}
            <div className="w-1/3 bg-black bg-opacity-90 text-slate-400  p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Inventory Quantity per Item</h2>
              <div className="w-full h-[400px]">
                <Bar data={barChartData} />
              </div>
            </div>

            {/* Line Chart Section (Price Trend) */}
            <div className="w-1/3 bg-black bg-opacity-90 text-slate-400  p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Price Trend of Items</h2>
              <div className="w-full h-[300px]">
                <Line data={lineChartData} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
