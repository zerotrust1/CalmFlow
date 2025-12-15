export default function Home() {
  return (
    <>
      {/* Top Divider */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-gray-900">CalmFlow</h1>
          <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto rounded-full"></div>
        </div>
      </div>
    </>
  );
}