import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { HiroWalletContext } from './HiroWalletProvider';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CircleHelp, X} from 'lucide-react';

export default function GetInModal({ onClose }: { onClose?: () => void }) {
  const {
    authenticate,
    isWalletConnected,
  } = useContext(HiroWalletContext);

  // Close modal after connecting wallet
  useEffect(() => {
    if (isWalletConnected && onClose) {
      onClose();
    }
  }, [isWalletConnected, onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100]">
      <div className="bg-[#181818] rounded-2xl w-[360px] pt-8 pb-0 px-0 shadow-2xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full grid grid-cols-3 gap-0 relative mb-6 px-4">
          <button
            onClick={onClose}
            className="justify-start bg-none border-none text-[#555] text-xl cursor-pointer"
            aria-label="Help"
            type="button"
          >
            <CircleHelp/>
          </button>
          <div className="title text-center font-semibold text-lg text-white tracking-wider flex items-center justify-center">
            Get In
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="bg-none border-none text-[#555] text-xl cursor-pointer"
              aria-label="Close"
              type="button"
            >
              <X/>
            </button>
          </div>
        </div>
        {/* Connect Wallet */}
        <div className="mb-3 w-[360px] px-4">
          <TooltipProvider>
            {isWalletConnected ? (
              <div className="flex items-center gap-2 p-2 rounded-md bg-gray-200">
                - Wallet Connected -
              </div>
            ) : (
              <div>
                <Button
                  onClick={authenticate}
                  className="bg-white text-black w-full h-12 rounded-[8px] font-semibold text-base cursor-pointer hover:bg-white hover:text-black flex items-center justify-center"
                >
                  <span className="flex items-center w-full">
                    <span className="absolute items-center justify-center py-2">
                      <Image src="/wallet-ico.svg" alt="Wallet" width={21} height={21}/>
                    </span>
                    <span className="flex-1 text-center">Connect Wallet</span>
                  </span>
                </Button>
              </div>
            )}
          </TooltipProvider>
        </div>
        {/* Social Buttons */}
        <div className="px-4">
          <button
            className="w-full h-12 rounded-[8px] bg-[#232323] text-white font-semibold text-base mb-3 border-none cursor-pointer tracking-wider"
            type="button"
          >
            <span className="flex items-center w-full">
              <span className="absolute pl-4 items-center justify-center">
                <Image src="/apple-ico.svg" alt="Apple" width={21} height={21}/>
              </span>
              <span className="flex-1 text-center">
                Sign with Apple
              </span>
            </span>
          </button>
          <button
            className="w-full h-12 rounded-[8px] bg-[#232323] text-white font-semibold text-base mb-3 border-none cursor-pointer tracking-wider"
            type="button"
          >
            <span className="flex items-center w-full">
              <span className="absolute pl-4 items-center justify-center">
                <Image src="/facebook-ico.svg" alt="Facebook" width={21} height={21}/>
              </span>
              <span className="flex-1 text-center">
                Sign with Facebook
              </span>
            </span>
          </button>
          <button
            className="w-full h-12 rounded-[8px] bg-[#232323] text-white font-semibold text-base mb-3 border-none cursor-pointer tracking-wider"
            type="button"
          >
            <span className="flex items-center w-full">
              <span className="absolute pl-4 items-center justify-center">
                <Image src="/google-ico.svg" alt="Google" width={21} height={21}/>
              </span>
              <span className="flex-1 text-center">
                Sign with Google
              </span>
            </span>
          </button>
          {/* Email Input */}
          <button
            className="w-full h-12 rounded-[8px] bg-[#232323] text-white font-semibold text-base mb-3 border-none cursor-pointer tracking-wider"
            type="button"
          >
            <span className="flex items-center w-full">
              <span className="absolute pl-4 items-center justify-center">
                <Image src="/mail-ico.svg" alt="Mail" width={21} height={21}/>
              </span>
              <span className="flex-1 text-center">
                Log in with Email
              </span>
            </span>
          </button>
          {/* Phone Input */}
          <button
            className="w-full h-12 rounded-[8px] bg-[#232323] text-white font-semibold text-base mb-3 border-none cursor-pointer tracking-wider"
            type="button"
          >
            <span className="flex items-center w-full">
              <span className="absolute pl-4 items-center justify-center">
                <Image src="/phone-ico.svg" alt="Phone" width={21} height={21}/>
              </span>
              <span className="flex-1 text-center">
                Log in with Phone
              </span>
            </span>
          </button>
        </div>
        {/* Terms */}
        <div className="w-full bg-[#232323] rounded-b-2xl text-center text-xs text-[#aaa] tracking-wider p-8">
          By Signing In, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
