'use client';

import { useContext, useState } from 'react';
import { HiroWalletContext } from './HiroWalletProvider';
import { Button } from '@/components/ui/button';
import GetInModal from './GetInModal';
import UserModal from './UserModal';

interface GetInButtonProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

export const GetInButton = (buttonProps: GetInButtonProps) => {
  const { children } = buttonProps;
  const [showUserModal, setShowUserModal] = useState(false);
  const [showGetInModal, setShowGetInModal] = useState(false);
  const {
    isWalletConnected,
  } = useContext(HiroWalletContext);

  return (
    <>
      {isWalletConnected ? (
        <div className='fixed top-8 right-8'>
          <button
            type="button"
            className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full p-4 cursor-pointer select-none"
            onClick={() => setShowUserModal(true)}
            aria-label="Profile"
          >
          </button>
        </div>
      ) : (
        <div className='fixed top-6 right-6'>
          <Button
            onClick={() => setShowGetInModal(true)}
            className="title rounded-full px-9 py-6 bg-[#E9E9E9] hover:bg-[#000] text-black hover:text-white border-2 border-black hover:border-2 hover:border-white cursor-pointer select-none"
            {...buttonProps}
          >
            {children || 'GET IN'}
          </Button>
        </div>
      )}
      {showGetInModal && <GetInModal onClose={() => setShowGetInModal(false)} />}
      {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}
    </>
  );
};
