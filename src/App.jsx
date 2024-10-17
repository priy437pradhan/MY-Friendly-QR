import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [qrCode, setQrCode] = useState('');
  const [menu, setMenu] = useState([]);
  const [discount, setDiscount] = useState(false);

  useEffect(() => {
    
    axios.get('https://your-backend-domain/generate-qr')
      .then(response => setQrCode(response.data.qrCode))
      .catch(err => console.error('Error fetching QR code:', err));
  }, []);

  const handleScan = () => {
    const customerId = '12345'; 
    axios.get(`https://your-backend-domain/menu?customerId=${customerId}`)
      .then(response => {
        setMenu(response.data.menu);
        setDiscount(response.data.eligibleForDiscount);
      })
      .catch(err => console.error('Error fetching menu:', err));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Scan QR to View Menu</h1>
        
        {qrCode ? (
          <div className="flex justify-center">
            <img src={qrCode} alt="QR Code" className="w-48 h-48 object-contain" />
          </div>
        ) : (
          <p className="text-red-500">Loading QR Code...</p>
        )}
        
        <button 
          onClick={handleScan}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Scan Menu
        </button>

        <div className="mt-8">
          {menu.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">Menu:</h2>
              <ul className="space-y-2 text-gray-600">
                {menu.map((item, index) => (
                  <li key={index} className="bg-gray-100 rounded-lg p-3 shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {discount && (
            <p className="mt-4 text-green-600 font-bold text-lg">You are eligible for a discount!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
