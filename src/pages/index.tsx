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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-16">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-4">
            CalmFlow
          </h1>
          <motion.div 
            className="w-40 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
          <motion.p 
            className="text-gray-500 mt-8 text-xl max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Your personal sanctuary for relaxation and focus. Find your inner peace with our guided breathing exercises, calming scenes, and soothing music.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link href="/breathing" passHref>
              <button className="mt-12 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Begin Your Journey
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}