import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Settings, HelpCircle, LogOut } from 'lucide-react';
import { HiroWalletContext } from './HiroWalletProvider';

interface UserModalProps {
  onClose: () => void;
}

export default function UserModal({ onClose }: UserModalProps) {
  const { disconnect, mainnetAddress, testnetAddress } = useContext(HiroWalletContext);
  const [balance, setBalance] = useState<string | null>(null);

  // Try to get the first available address if both are missing
  const currentAddress = mainnetAddress || testnetAddress || null;

  // Fetch balance from Hiro API (recommended endpoint)
  useEffect(() => {
    if (!currentAddress) {
      setBalance(null);
      return;
    }
    const apiUrl = `https://api.hiro.so/extended/v1/address/${currentAddress}/balances?unanchored=false`;
    const fetchBalance = async () => {
      try {
        const res = await fetch(apiUrl, { method: "GET" });
        const data = await res.json();
        // STX balance is in microstacks, convert to STX
        setBalance(
          data.stx && data.stx.balance
            ? (Number(data.stx.balance) / 1e6).toLocaleString()
            : '0'
        );
      } catch {
        setBalance('--');
      }
    };
    fetchBalance();
  }, [currentAddress]);

  const truncateMiddle = (str: string | null) => {
    if (!str) return '';
    if (str.length <= 12) return str;
    return `${str.slice(0, 4)}~${str.slice(-4)}`;
  };

  const handleDisconnect = async () => {
    if (disconnect) {
      await disconnect();
    }
    onClose();
  };

  return (
    <div className="fixed top-4 right-4 z-[200] bg-black/40">
      <div className="relative bg-[#f5f5f5] text-[#000] rounded-3xl p-4 w-[340px] flex flex-col items-center shadow-xl pointer-events-auto z-[201]">
        <div className="flex items-center w-full mb-6">
          <Link
            href="/profile"
            className="title mr-4 text-right text-black text-xl font-bold tracking-wider flex-1"
            onClick={onClose}
          >
            {truncateMiddle(currentAddress)}
          </Link>
          <div className='flex'>
            <button
              type="button"
              className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full p-4 cursor-pointer select-none"
              onClick={onClose}
              aria-label="Profile"
            >
            </button>
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="flex items-center justify-between bg-white rounded-xl px-6 py-4 mb-2">
            <span className="title text-2xl font-bold">
              {balance ?? '--'} <span className="text-lg">STX</span>
            </span>
            <span className="text-base text-gray-500 select-none">Balance</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full mb-2 font-sans text-base">
          <button onClick={onClose} className="flex flex-col items-center justify-center bg-white rounded-xl py-4 text-sm hover:bg-gray-100 cursor-pointer select-none">
            <Bell className="mb-2" size={20} />
            Notifications
          </button>
          <button onClick={onClose} className="flex flex-col items-center justify-center bg-white rounded-xl py-4 text-sm hover:bg-gray-100 cursor-pointer select-none">
            <Settings className="mb-2" size={20} />
            Settings
          </button>
          <button onClick={onClose} className="flex flex-col items-center justify-center bg-white rounded-xl py-4 text-sm hover:bg-gray-100 cursor-pointer select-none">
            <HelpCircle className="mb-2" size={20} />
            Help
          </button>
          <button
            className="flex flex-col items-center justify-center bg-white rounded-xl py-4 text-black text-sm hover:bg-gray-100 cursor-pointer select-none"
            onClick={handleDisconnect}
          >
            <LogOut className="text-black mb-2" size={20} />
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
