import React, { useState } from "react";
import { Download, RefreshCw } from "lucide-react";

const DrinksGenerator = () => {
  const [drinks, setDrinks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = {
    "Hot Drinks": [
      {
        name: "Americano",
        desc: "Espresso diluted with hot water",
        price: "2-3",
      },
      {
        name: "Cappuccino",
        desc: "Espresso with steamed milk and foam",
        price: "3-4",
      },
      {
        name: "Latte",
        desc: "Espresso with steamed milk and light foam",
        price: "3.5-4.5",
      },
      { name: "Mocha", desc: "Latte with chocolate syrup", price: "4-5" },
      {
        name: "Espresso",
        desc: "Strong concentrated Italian coffee",
        price: "2-3",
      },
      {
        name: "Flat White",
        desc: "Espresso with micro-foam milk",
        price: "3.5-4.5",
      },
      {
        name: "Cortado",
        desc: "Espresso with small amount of milk",
        price: "3-4",
      },
      {
        name: "Turkish Coffee",
        desc: "Traditional Turkish style coffee",
        price: "2-2.5",
      },
      { name: "Black Tea", desc: "Classic black tea", price: "1.5-2.5" },
      { name: "Green Tea", desc: "Healthy green tea", price: "2-3" },
      {
        name: "Mint Tea",
        desc: "Refreshing tea with fresh mint",
        price: "2-3",
      },
      {
        name: "Karak Tea",
        desc: "Indian spiced tea with milk",
        price: "2.5-3.5",
      },
      { name: "Salep", desc: "Creamy winter milk drink", price: "3-4" },
      { name: "Hot Chocolate", desc: "Creamy hot chocolate", price: "3.5-4.5" },
      {
        name: "French Coffee",
        desc: "French style coffee with milk",
        price: "3.5-4.5",
      },
    ],
    "Cold Drinks": [
      { name: "Iced Coffee", desc: "Refreshing cold coffee", price: "3-4" },
      { name: "Frappuccino", desc: "Blended iced coffee drink", price: "4-5" },
      { name: "Iced Latte", desc: "Cold latte with ice", price: "3.5-4.5" },
      { name: "Cold Brew", desc: "Slow-steeped cold coffee", price: "3.5-4.5" },
      { name: "Iced Mocha", desc: "Refreshing cold mocha", price: "4-5" },
      { name: "Iced Americano", desc: "Cold americano with ice", price: "3-4" },
      { name: "Iced Tea", desc: "Refreshing cold tea", price: "2.5-3.5" },
      { name: "Lemon Mint", desc: "Fresh lemon juice with mint", price: "3-4" },
      {
        name: "Mojito",
        desc: "Refreshing lemon and mint drink",
        price: "3.5-4.5",
      },
      {
        name: "Fresh Orange Juice",
        desc: "100% natural orange juice",
        price: "3-4",
      },
    ],
    "Fresh Juices": [
      {
        name: "Strawberry Juice",
        desc: "Fresh natural strawberry juice",
        price: "3.5-4.5",
      },
      { name: "Mango Juice", desc: "Tropical mango juice", price: "4-5" },
      { name: "Apple Juice", desc: "Fresh apple juice", price: "3-4" },
      { name: "Kiwi Juice", desc: "Refreshing kiwi juice", price: "4-5" },
      {
        name: "Pineapple Juice",
        desc: "Tropical pineapple juice",
        price: "3.5-4.5",
      },
      {
        name: "Pomegranate Juice",
        desc: "Natural healthy pomegranate juice",
        price: "4-5",
      },
      { name: "Guava Juice", desc: "Fresh guava juice", price: "3-4" },
      {
        name: "Lemon Juice",
        desc: "Refreshing natural lemon juice",
        price: "2.5-3.5",
      },
      {
        name: "Watermelon Juice",
        desc: "Summer refreshing watermelon juice",
        price: "3-4",
      },
      { name: "Grape Juice", desc: "Natural grape juice", price: "3.5-4.5" },
    ],
    Smoothies: [
      {
        name: "Mixed Berry Smoothie",
        desc: "Fresh mixed berries with yogurt",
        price: "4.5-5.5",
      },
      {
        name: "Banana Strawberry Smoothie",
        desc: "Banana and strawberry with milk",
        price: "4-5",
      },
      {
        name: "Mango Smoothie",
        desc: "Fresh mango with yogurt",
        price: "4.5-5.5",
      },
      {
        name: "Avocado Smoothie",
        desc: "Healthy avocado with honey",
        price: "5-6",
      },
      {
        name: "Banana Oat Smoothie",
        desc: "Banana and oats with milk for energy",
        price: "4.5-5.5",
      },
      {
        name: "Watermelon Smoothie",
        desc: "Fresh watermelon with mint",
        price: "4-5",
      },
      {
        name: "Pineapple Coconut Smoothie",
        desc: "Pineapple with coconut milk",
        price: "5-6",
      },
      {
        name: "Green Smoothie",
        desc: "Healthy spinach and apple smoothie",
        price: "4.5-5.5",
      },
    ],
    Milkshakes: [
      {
        name: "Vanilla Milkshake",
        desc: "Classic vanilla milkshake",
        price: "4-5",
      },
      {
        name: "Chocolate Milkshake",
        desc: "Rich chocolate milkshake",
        price: "4-5",
      },
      {
        name: "Strawberry Milkshake",
        desc: "Fresh strawberry milkshake",
        price: "4-5",
      },
      {
        name: "Caramel Milkshake",
        desc: "Milkshake with caramel sauce",
        price: "4.5-5.5",
      },
      {
        name: "Oreo Milkshake",
        desc: "Milkshake with Oreo cookies",
        price: "4.5-5.5",
      },
      {
        name: "Nutella Milkshake",
        desc: "Delicious Nutella milkshake",
        price: "5-6",
      },
      {
        name: "Banana Milkshake",
        desc: "Fresh banana milkshake",
        price: "4-5",
      },
      {
        name: "Lotus Milkshake",
        desc: "Milkshake with Lotus biscuits",
        price: "5-6",
      },
    ],
    "Specialty Drinks": [
      {
        name: "Matcha Latte",
        desc: "Japanese matcha tea with milk",
        price: "4.5-5.5",
      },
      {
        name: "Spanish Latte",
        desc: "Coffee with sweetened condensed milk",
        price: "4-5",
      },
      {
        name: "Sugarcane Juice",
        desc: "Fresh natural sugarcane juice",
        price: "2-3",
      },
      {
        name: "Tamarind Drink",
        desc: "Traditional tamarind drink",
        price: "2.5-3.5",
      },
      { name: "Carob Drink", desc: "Healthy carob drink", price: "2.5-3.5" },
      { name: "Sobya", desc: "Traditional Saudi milk drink", price: "2.5-3.5" },
      { name: "Jallab", desc: "Lebanese rose syrup drink", price: "3-4" },
      { name: "Qamar Al-Din", desc: "Dried apricot juice", price: "3-4" },
      {
        name: "Licorice Drink",
        desc: "Traditional licorice drink",
        price: "2-3",
      },
      {
        name: "Hibiscus Tea",
        desc: "Refreshing red hibiscus drink",
        price: "2.5-3.5",
      },
    ],
    "Energy Drinks": [
      {
        name: "Chocolate Protein Smoothie",
        desc: "Protein-rich smoothie",
        price: "5.5-6.5",
      },
      {
        name: "Vanilla Protein Smoothie",
        desc: "Low-calorie protein smoothie",
        price: "5.5-6.5",
      },
      {
        name: "Green Detox Juice",
        desc: "Body cleansing vegetable juice",
        price: "5-6",
      },
      {
        name: "Natural Energy Drink",
        desc: "Juices and fruits for energy",
        price: "4.5-5.5",
      },
    ],
  };

  const imageUrls = [
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
    "https://images.unsplash.com/photo-1544145945-f90425340c7e",
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
    "https://images.unsplash.com/photo-1497534547324-0ebb3f052e88",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
  ];

  const generateDrinks = () => {
    setIsGenerating(true);
    const allDrinks = [];
    let id = 1;

    Object.entries(categories).forEach(([category, items]) => {
      items.forEach((item) => {
        const priceRange = item.price.split("-");
        const price = Math.floor(
          Math.random() * (parseInt(priceRange[1]) - parseInt(priceRange[0])) +
            parseInt(priceRange[0])
        );
        const imageUrl =
          imageUrls[Math.floor(Math.random() * imageUrls.length)];

        allDrinks.push({
          id: id++,
          name: item.name,
          description: item.desc,
          category: category,
          price: parseFloat(price.toFixed(1)),
          currency: "USD",
          image: `${imageUrl}?w=400&h=400&fit=crop`,
          available: true,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        });
      });
    });

    setDrinks(allDrinks);
    setIsGenerating(false);
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(drinks, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "drinks_menu.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 text-center">
            Drinks Menu Generator
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Click "Generate Data" to create 100 drinks with complete details
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={generateDrinks}
              disabled={isGenerating}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 shadow-lg"
            >
              <RefreshCw
                className={isGenerating ? "animate-spin" : ""}
                size={20}
              />
              {isGenerating ? "Generating..." : "Generate Data"}
            </button>

            {drinks.length > 0 && (
              <button
                onClick={downloadJSON}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg"
              >
                <Download size={20} />
                Download JSON
              </button>
            )}
          </div>
        </div>

        {drinks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-900">
                Generated Drinks ({drinks.length})
              </h2>
              <div className="text-sm text-gray-600">
                Categories: {Object.keys(categories).length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
              {drinks.map((drink) => (
                <div
                  key={drink.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-3">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-amber-900 text-sm mb-1">
                        {drink.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {drink.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-bold text-sm">
                          {drink.price} {drink.currency}
                        </span>
                        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                          {drink.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-700 mb-2">
                exapmel drink object:
              </h3>
              <pre
                className="text-xs bg-gray-800 text-green-400 p-4 rounded overflow-x-auto"
                dir="ltr"
              >
                {JSON.stringify(drinks[0], null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrinksGenerator;
