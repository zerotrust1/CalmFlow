import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>CalmFlow</title>
        <meta name="description" content="CalmFlow - Your personal sanctuary for relaxation and focus." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold text-gray-800">
            CalmFlow
          </h1>
          <div className="flex mt-4 space-x-2">
            <span className="block w-12 h-1 bg-gray-400 rounded-full"></span>
            <span className="block w-12 h-1 bg-gray-400 rounded-full"></span>
          </div>
        </div>
      </div>
    </>
  );
}