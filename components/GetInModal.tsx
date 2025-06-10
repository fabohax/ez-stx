import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { HiroWalletContext } from './HiroWalletProvider';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleHelp, X } from 'lucide-react';
import { createStacksAccount } from '@/lib/stacksWallet';
import walletEmailHtml from '@/lib/walletEmailHtml';
import { useRouter } from 'next/navigation';
import { SeedPhraseInput } from '@/components/SeedPhraseInput';
import { validateAndGenerateWallet } from '@/lib/walletHelpers';

export default function GetInModal({ onClose }: { onClose?: () => void }) {
  const { authenticate, isWalletConnected } = useContext(HiroWalletContext);
  const router = useRouter();

  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [walletError, setWalletError] = useState<string | null>(null);
  const [showSeedInput, setShowSeedInput] = useState(false);
  const [seedValue, setSeedValue] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Close modal after connecting wallet
  useEffect(() => {
    if (isWalletConnected && onClose) {
      onClose();
    }
  }, [isWalletConnected, onClose]);

  // Wrap authenticate to suppress "User canceled the request" error
  const handleAuthenticate = async () => {
    setWalletError(null);
    try {
      await authenticate();
    } catch (err: unknown) {
      // Only show error if it's not a user cancel
      const errorMessage =
        typeof err === "object" && err !== null && "message" in err && typeof (err as { message?: unknown }).message === "string"
          ? (err as { message: string }).message
          : "";
      if (
        !errorMessage.toLowerCase().includes('user canceled') &&
        !errorMessage.toLowerCase().includes('user cancelled')
      ) {
        setWalletError(errorMessage || 'Failed to connect wallet.');
      }
      // Otherwise, ignore the error
    }
  };

  const handleEmailSignIn = () => {
    setShowEmailInput(true);
    setEmailSent(false);
    setEmailError(null);
  };

  const handleSendSeed = async () => {
    try {
      const { privateKey, address } = await validateAndGenerateWallet(seedValue.trim());
      if (!privateKey || !address) throw new Error();
      if (typeof window !== "undefined") {
        localStorage.setItem('ezstx_session', JSON.stringify({ stxPrivateKey: privateKey, address, createdAt: Date.now() }));
        window.dispatchEvent(new Event('ezstx-session-update'));
      }
      router.push(`/${address}`);
      if (onClose) onClose();
    } catch {
      alert('Invalid seed phrase.');
    }
  };

  const handleSendEmail = async () => {
    setEmailError(null); setEmailSent(false);
    try {
      const { mnemonic, stxPrivateKey } = await createStacksAccount();
      const message = walletEmailHtml({
        mnemonic,
        stxPrivateKey,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://ez-stx.vercel.app',
      });
      const result: { error?: string } = await fetch('/api/send-wallet-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: emailValue, subject: 'Your Stacks Wallet Credentials', html: message }),
      }).then(async res => {
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed to send email');
        return {};
      }).catch(e => ({ error: e.message }));
      if (result.error) setEmailError(result.error || 'Failed to send email.');
      else setEmailSent(true);
    } catch (err: unknown) {
      setEmailError(
        err && typeof err === "object" && "message" in err && typeof (err as { message?: unknown }).message === "string"
          ? (err as { message: string }).message
          : "Failed to generate wallet."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] select-none">
      <div className="bg-[#181818] rounded-[21px] w-[360px] pt-8 pb-0 px-0 shadow-2xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full grid grid-cols-3 gap-0 relative mb-6 px-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="justify-start bg-none border-none text-[#555] text-sm cursor-pointer" aria-label="Help" type="button">
                  <CircleHelp className="h-[18px]"/>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs text-sm z-100">
                <div>
                  Sign in or create your account using your wallet, seed phrase, or email.<br />
                  <span className="text-[#2563eb] underline">
                    <a href="/support" target="_blank" rel="noopener noreferrer">Need help? Visit Support</a>
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="title text-center font-semibold text-lg text-white tracking-wider flex items-center justify-center select-none">
            Get In
          </div>
          <div className="flex items-center justify-end">
            <button onClick={onClose} className="bg-none border-none text-[#555] text-xl cursor-pointer" aria-label="Close" type="button">
              <X className="h-[18px]"/>
            </button>
          </div>
        </div>
        {/* Switch Button */}
        <div className="w-full px-6 mb-3">
          <div className="flex w-full rounded-full bg-[#232323] p-0">
            <button
              className={`flex-1 py-1 rounded-full font-semibold text-[12px] transition-all duration-150 cursor-pointer select-none ${tab === 'login' ? 'bg-white text-black shadow' : 'bg-transparent text-[#aaa] hover:bg-[#272727]'}`}
              onClick={() => setTab('login')}
              type="button"
            >Log In</button>
            <button
              className={`flex-1 py-1 rounded-full font-semibold text-[12px] transition-all duration-150 cursor-pointer select-none ${tab === 'signup' ? 'bg-white text-black shadow' : 'bg-transparent text-[#aaa] hover:bg-[#272727]'}`}
              onClick={() => setTab('signup')}
              type="button"
            >Sign Up</button>
          </div>
        </div>
        {/* Auth Options */}
        {tab === 'login' ? (
          <>
            {/* Connect Wallet */}
            <div className="mb-3 w-full px-6">
              <TooltipProvider>
                {isWalletConnected ? (
                  <div className="flex items-center gap-2 p-3 rounded-[9px] bg-gray-200 w-full justify-center font-semibold text-black">
                    - Wallet Connected -
                  </div>
                ) : (
                  <Button
                    onClick={handleAuthenticate}
                    className="bg-white text-black w-full h-12 rounded-[9px] font-semibold text-base cursor-pointer hover:bg-white hover:text-black flex items-center justify-center shadow-none"
                  >
                    <span className="flex items-center w-full">
                      <Image src="/wallet-ico.svg" alt="Wallet" width={18} height={18} className="absolute"/>
                      <span className="flex-1 text-center">Connect Wallet</span>
                    </span>
                  </Button>
                )}
              </TooltipProvider>
              {walletError && (
                <div className="text-red-500 text-xs mt-2 text-center">{walletError}</div>
              )}
            </div>
            {/* Use Seed Phrase */}
            <SeedPhraseInput
              showSeedInput={showSeedInput}
              setShowSeedInput={setShowSeedInput}
              seedValue={seedValue}
              setSeedValue={setSeedValue}
              handleSendSeed={handleSendSeed}
            />
          </>
        ) : (
          <>
            {/* Connect Wallet */}
            <div className="mb-3 w-full px-6">
              <TooltipProvider>
                {isWalletConnected ? (
                  <div className="flex items-center gap-2 p-3 rounded-[9px] bg-gray-200 w-full justify-center font-semibold text-black">
                    - Wallet Connected -
                  </div>
                ) : (
                  <Button
                    onClick={handleAuthenticate}
                    className="bg-white text-black w-full h-12 rounded-[9px] font-semibold text-base cursor-pointer hover:bg-white hover:text-black flex items-center justify-center shadow-none"
                  >
                    <span className="flex items-center w-full">
                      <Image src="/wallet-ico.svg" alt="Wallet" width={18} height={18} className="absolute"/>
                      <span className="flex-1 text-center">Connect Wallet</span>
                    </span>
                  </Button>
                )}
              </TooltipProvider>
              {walletError && (
                <div className="text-red-500 text-xs mt-2 text-center">{walletError}</div>
              )}
            </div>
            {/* Email Input */}
            <div className="w-full px-6 mb-3">
              {!showEmailInput ? (
                <button
                  className="w-full h-12 rounded-[9px] bg-[#232323] text-white font-semibold text-base border border-[#333] cursor-pointer flex items-center px-4 hover:bg-[#272727]"
                  type="button"
                  onClick={handleEmailSignIn}
                >
                  <Image src="/mail-ico.svg" alt="Mail" width={18} height={18}/>
                  <span className="text-center flex-1">Use Email</span>
                </button>
              ) : (
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <input
                    type="email"
                    className="col-span-3 w-full rounded-[9px] bg-[#232323] text-white font-mono text-md border border-[#333] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#444]"
                    placeholder="Insert email"
                    value={emailValue}
                    onChange={e => setEmailValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSendEmail();
                      }
                    }}
                  />
                  <button
                    className="col-span-1 flex-1 items-center gap-2 px-0 py-3 rounded-[9px] bg-[#232323] text-white font-semibold border border-[#333] cursor-pointer hover:bg-[#272727]"
                    type="button"
                    onClick={handleSendEmail}
                    disabled={!emailValue}
                  >
                    <Image src="/send-ico.svg" alt="Send" width={18} height={18} className="mx-auto"/>
                  </button>
                  {emailSent && (
                    <div className="col-span-4 text-green-500 text-xs mt-1 text-center">Email sent! Check your inbox.</div>
                  )}
                  {emailError && (
                    <div className="col-span-4 text-red-500 text-xs mt-1 text-center">{emailError}</div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {/* Terms */}
        <div className="w-full bg-[#232323] rounded-b-2xl text-center text-xs text-[#aaa] tracking-wider p-6 px-8">
          By Signing In, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}
