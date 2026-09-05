const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About FoodBridge</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            FoodBridge is a food donation platform that connects food donors with NGOs and volunteers.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our mission is to reduce food waste and fight hunger by making it easy to donate surplus food.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-3xl mb-2">🍽️</div>
              <p className="font-medium text-gray-800">Donors</p>
              <p className="text-sm text-gray-500">Share surplus food</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <p className="font-medium text-gray-800">NGOs</p>
              <p className="text-sm text-gray-500">Accept and distribute</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚚</div>
              <p className="font-medium text-gray-800">Volunteers</p>
              <p className="text-sm text-gray-500">Pickup and deliver</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;