import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Bitcoin, Copy, Check, ExternalLink } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

const BTCControl = () => {
  const [copied, setCopied] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  // Example BTC address - replace with your actual address
  const btcAddress = "3HNwWbBdAEAvuWTT4KYuTQcSQf4E3kNcpY";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(btcAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="inline-block">
      {!showAddress ? (
        <button
          onClick={() => setShowAddress(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Bitcoin size={20} />
          <span>Send BTC</span>
        </button>
      ) : (
        <Card className="bg-black/20 backdrop-blur-lg border-orange-500/20 p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-orange-200 font-semibold">BTC Address</span>
              <button
                onClick={() => setShowAddress(false)}
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="flex items-center gap-2 bg-black/30 rounded-lg p-3 border border-orange-500/10">
              <code className="text-orange-200 text-sm font-mono flex-1 overflow-x-auto">
                {btcAddress}
              </code>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-white/5 rounded-md transition-colors"
                title="Copy address"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} className="text-orange-300" />
                )}
              </button>
              <a
                href={`bitcoin:${btcAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:bg-white/5 rounded-md transition-colors"
                title="Open in wallet"
              >
                <ExternalLink size={16} className="text-orange-300" />
              </a>
            </div>

            {copied && (
              <Alert className="bg-green-900/20 border-green-500/30 text-green-200 py-2 text-sm">
                Address copied to clipboard!
              </Alert>
            )}

            <p className="text-orange-200/70 text-xs text-center mt-1">
              Click the link icon to open in your wallet
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BTCControl;