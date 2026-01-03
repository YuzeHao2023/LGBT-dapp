import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { connectMetaMask, connectWalletConnect, generateDID, getEncryptionPublicKey } from '../utils/walletUtils';
import { setEncryptionPublicKeyOnChain } from '../lib/socialContract';

const LoginPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleWalletConnect = async (provider) => {
    setIsConnecting(true);
    try {
      let result;
      if (provider === 'MetaMask') {
        result = await connectMetaMask();
      } else {
        result = await connectWalletConnect();
      }

      if (result.success) {
        const did = generateDID(result.address);
        login({
          walletAddress: result.address,
          did,
          provider: result.provider,
          avatar: null,
          tags: [],
          privacy: {
            dataVisibility: 'friends',
            anonymousMode: false
          }
        });        // 尝试获取并登记用户的加密公钥（若钱包支持并且用户允许）
        try {
          const pub = await getEncryptionPublicKey(result.address);
          if (pub) {
            await setEncryptionPublicKeyOnChain(pub);
          }
        } catch (err) {
          console.warn('无法注册加密公钥:', err?.message || err);
        }
        navigate('/home');
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('连接失败，请重试');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            LGBTQ+ 社交空间
          </h1>
          <p className="text-gray-600">
            安全、包容的去中心化社交平台
          </p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleWalletConnect('MetaMask')}
            disabled={isConnecting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
          >
            <Wallet className="h-5 w-5" />
            <span>{isConnecting ? '连接中...' : '连接 MetaMask'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleWalletConnect('WalletConnect')}
            disabled={isConnecting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
          >
            <Wallet className="h-5 w-5" />
            <span>{isConnecting ? '连接中...' : 'WalletConnect'}</span>
          </motion.button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>您的数据受到端到端加密保护</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          </div>
          <p className="text-xs text-gray-500">
            为LGBTQ+群体打造的包容性社交平台
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
