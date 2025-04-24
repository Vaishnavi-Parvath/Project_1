import React, { useState, useEffect } from 'react';
import { Sun, Moon, Calendar, Clock, Users, ChefHat, ShoppingCart, MapPin, Search, X, Heart } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: "The Rustic Plate",
      cuisine: "Mediterranean",
      rating: 4.8,
      price: "$$",
      description: "Experience the authentic flavors of the Mediterranean coast with our chef's special recipes passed down through generations.",
      image: "src/assets/res1.jpg",
      location: "123 Olive Street",
      availableTimes: ["17:00", "18:00", "19:00", "20:00", "21:00"],
      menu: [
        { id: 101, name: "Margherita Pizza", description: "Fresh tomatoes, mozzarella, and basil", price: 14.99, image: "src/assets/res1-1.jpg", category: "Main Course" },
        { id: 102, name: "Seafood Risotto", description: "Creamy arborio rice with fresh seafood", price: 18.99, image: "src/assets/res1-2.webp", category: "Main Course" },
        { id: 103, name: "Tiramisu", description: "Classic Italian dessert with coffee and mascarpone", price: 8.99, image: "src/assets/res1-3.jpg", category: "Dessert" },
        { id: 104, name: "Mediterranean Salad", description: "Fresh greens with feta, olives, and lemon dressing", price: 10.99, image: "src/assets/res1-4.jpg", category: "Appetizer" }
      ]
    },
    {
      id: 2,
      name: "Sakura Garden",
      cuisine: "Japanese",
      rating: 4.7,
      price: "$$$",
      description: "Traditional Japanese cuisine with a modern twist, featuring the freshest ingredients and artistic presentation.",
      image: "src/assets/res2.jpg",
      location: "456 Cherry Blossom Avenue",
      availableTimes: ["12:00", "13:00", "18:00", "19:00", "20:00"],
      menu: [
        { id: 201, name: "Assorted Sushi Platter", description: "Chef's selection of 12 sushi pieces", price: 26.99, image: "src/assets/res2-1.jpg", category: "Main Course" },
        { id: 202, name: "Ramen Bowl", description: "Rich broth with pork belly, egg, and vegetables", price: 16.99, image: "src/assets/res2-2.jpg", category: "Main Course" },
        { id: 203, name: "Matcha Ice Cream", description: "Premium green tea ice cream", price: 7.99, image: "src/assets/res2-3.jpg", category: "Dessert" },
        { id: 204, name: "Edamame", description: "Steamed soybeans with sea salt", price: 5.99, image: "src/assets/res2-4.jpg", category: "Appetizer" }
      ]
    },
    {
      id: 3,
      name: "Spice Route",
      cuisine: "Indian",
      rating: 4.6,
      price: "$$",
      description: "Journey through India's diverse culinary landscape with our aromatic spices and authentic recipes.",
      image: "src/assets/res3.jpg",
      location: "789 Spice Alley",
      availableTimes: ["12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"],
      menu: [
        { id: 301, name: "Butter Chicken", description: "Tender chicken in a creamy tomato sauce", price: 17.99, image: "src/assets/res3-1.jpg", category: "Main Course" },
        { id: 302, name: "Vegetable Biryani", description: "Fragrant rice with seasonal vegetables", price: 15.99, image: "src/assets/res3-2.jpg", category: "Main Course" },
        { id: 303, name: "Gulab Jamun", description: "Sweet milk dumplings in rose syrup", price: 6.99, image: "src/assets/res3-3.jpg", category: "Dessert" },
        { id: 304, name: "Samosa", description: "Crispy pastry filled with spiced potatoes and peas", price: 7.99, image: "src/assets/res3-4.webp", category: "Appetizer" }
      ]
    }
  ];

  // Filter restaurants by search query
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Select a restaurant
  const selectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setActiveSection('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format categories for menu
  const getMenuCategories = () => {
    if (!selectedRestaurant) return [];
    const categories = [...new Set(selectedRestaurant.menu.map(item => item.category))];
    return categories;
  };

  // Scroll to a section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChefHat size={24} className="text-orange-500" />
            <span className="text-xl font-bold">TableTreat</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('hero')}
              className={`font-medium ${activeSection === 'hero' ? 'text-orange-500' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('restaurants')}
              className={`font-medium ${activeSection === 'restaurants' ? 'text-orange-500' : ''}`}
            >
              Restaurants
            </button>
            {selectedRestaurant && (
              <button
                onClick={() => scrollToSection('reservation')}
                className={`font-medium ${activeSection === 'reservation' ? 'text-orange-500' : ''}`}
              >
                Reservation
              </button>
            )}
            {selectedRestaurant && (
              <button
                onClick={() => scrollToSection('menu')}
                className={`font-medium ${activeSection === 'menu' ? 'text-orange-500' : ''}`}
              >
                Menu
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-screen bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url('src/assets/herod.jpg')` }}
        >
          <div className="absolute inset-0 bg-grey-700 bg-opacity-100"></div>
          <div className="container mx-auto px-4 z-10 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Dining Experience</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover the best restaurants, reserve your table, and enjoy delicious meals with just a few clicks
            </p>
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="p-4 flex items-center">
                <Search size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search for restaurants or cuisines..."
                  className="w-full bg-transparent outline-none text-gray-700 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => scrollToSection('restaurants')}
              className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Explore Restaurants
            </button>
          </div>
        </section>

        {/* Restaurants Section */}
        <section id="restaurants" className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Popular Restaurants</h2>

            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 dark:text-gray-400">No restaurants found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRestaurants.map(restaurant => (
                  <div
                    key={restaurant.id}
                    className={`bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105 ${darkMode ? 'border border-gray-700' : ''}`}
                  >
                    <div className="relative h-48">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1">
                        <Heart size={16} className="text-red-500" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-300 mb-2">
                        <span>{restaurant.cuisine}</span>
                        <span className="mx-2">•</span>
                        <span>{restaurant.price}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-300 mb-4">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{restaurant.location}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{restaurant.description}</p>
                      <button
                        onClick={() => selectRestaurant(restaurant)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium transition-colors duration-300"
                      >
                        Book a Table
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Reservation Section - Conditional Rendering */}
        {selectedRestaurant && (
          <section id="reservation" className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Make a Reservation</h2>
              <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="flex flex-col md:flex-row mb-8">
                  <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <img
                      src={selectedRestaurant.image}
                      alt={selectedRestaurant.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3 md:pl-6">
                    <h3 className="text-2xl font-bold mb-2">{selectedRestaurant.name}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="mr-4">{selectedRestaurant.rating}</span>
                      <span>{selectedRestaurant.cuisine}</span>
                      <span className="mx-2">•</span>
                      <span>{selectedRestaurant.price}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-300 mb-4">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{selectedRestaurant.location}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{selectedRestaurant.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Clock size={16} className="mr-2" />
                      Select Time
                    </label>
                    <select
                      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      disabled={!reservationDate}
                    >
                      <option value="">Select a time</option>
                      {selectedRestaurant.availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <Users size={16} className="mr-2" />
                      Number of Guests
                    </label>
                    <select
                      className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!reservationDate || !reservationTime}
                    onClick={() => scrollToSection('menu')}
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Menu Section - Conditional Rendering */}
        {selectedRestaurant && (
          <section id="menu" className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">{selectedRestaurant.name} Menu</h2>

              {getMenuCategories().map(category => (
                <div key={category} className="mb-10">
                  <h3 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedRestaurant.menu
                      .filter(item => item.category === category)
                      .map(item => (
                        <div
                          key={item.id}
                          className="flex bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="w-1/3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <span className="font-semibold">${item.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                            <button
                              onClick={() => addToCart(item)}
                              className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition-colors duration-300"
                            >
                              Add to Order
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className={`w-full md:w-96 h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg p-4 overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Your Order</h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b dark:border-gray-700">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors duration-300">
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TableTreat</h3>
              <p className="mb-4 opacity-75">Making restaurant reservations simple and enjoyable. Find your perfect dining experience with just a few clicks.</p>
              <div className="flex space-x-4">
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="opacity-75 hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">For Restaurants</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="mb-4 opacity-75">Subscribe to receive updates on new restaurants and special offers.</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className={`flex-grow p-2 rounded-l-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border-r-0 focus:outline-none`}
                />
                <button 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} TableTreat. All rights reserved.</p>
            <div className="flex justify-center mt-4 space-x-6">
              <a href="#" className="text-sm hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm hover:text-orange-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default App;


