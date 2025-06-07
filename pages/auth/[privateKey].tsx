import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getStxAddress } from '@stacks/wallet-sdk';

export default function AuthWithPrivateKey() {
  const router = useRouter();
  const { privateKey } = router.query;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connectAndRedirect = () => {
      if (typeof privateKey !== 'string') return;

      try {
        // Compose minimal fake Account shape
        const account = {
          stxPrivateKey: privateKey,
          dataPrivateKey: '',
          salt: '',
          appsKey: '',
          index: 0,
        };

        const address = getStxAddress(account, 'mainnet');
        router.replace(`/profile/${address}`);
      } catch (err) {
        console.error(err);
        setError('Invalid private key');
      }
    };

    connectAndRedirect();
  }, [privateKey, router]);

  return (
    <div style={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ fontSize: 18, fontWeight: 600 }}>Connecting to your account...</div>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}
