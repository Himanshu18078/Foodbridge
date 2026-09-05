const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-6xl mb-6">🍱</div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to FoodBridge</h1>
        <p className="text-xl text-gray-600 mb-6">
          Connecting food donors with NGOs and volunteers to reduce waste and fight hunger.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-3 rounded-lg font-medium transition"
          >
            Learn More
          </a>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 text-sm text-gray-500">
          <div>🍽️ Donors</div>
          <div>🤝 NGOs</div>
          <div>🚚 Volunteers</div>
        </div>
      </div>
    </div>
  );
};

export default Home;