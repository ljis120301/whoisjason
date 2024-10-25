'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="mb-2">
              <span className="block">Give me Money?</span>
              <a href="#" className="hover:text-gray-300"> XMR Wallet: </a>
              <span className="break-all">48xWV6Ej4qRPZdKVEX7xQgLyWvxrSmCVXZS5pLXGpuPbMH6GhtiBjXBcHqHLxMMmEW474dkWTdLEsR6nARhhgKGRBou6nSk</span>
            </p>
            <p>
              <a href="#" className="hover:text-gray-300">BTC: </a>
              <span className="break-all">357oqN4C7czx3aQwKVwewE8UsoqpghZqTx</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
