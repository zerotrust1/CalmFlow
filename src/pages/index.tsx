import Head from 'next/head';
import { motion } from 'framer-motion';
import NewNavBar from '../components/NewNavBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>CalmFlow</title>
        <meta name="description" content="CalmFlow - Your personal sanctuary for relaxation and focus." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewNavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center pt-16">
        <motion.div 
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            CalmFlow
          </h1>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          ></motion.div>
          <motion.p 
            className="text-gray-600 mt-8 text-lg text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Your personal sanctuary for relaxation and focus
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}