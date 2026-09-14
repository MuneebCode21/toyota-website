import React, { useState, useEffect } from 'react';
import { Camera, Phone, Mail, MapPin, ChevronRight, Filter, Star, Calendar, Gauge, Zap, Award, Users, TrendingUp, Shield, ArrowUp } from 'lucide-react';

// Main App Component
export default function ToyotaWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch cars
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    setTimeout(() => {
      const carsData = [
        {
          id: 1,
          name: 'Toyota Camry 2024',
          type: 'sedan',
          price: 28000,
          year: 2024,
          mileage: 25,
          horsepower: 203,
          image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop',
          description: 'Experience refined comfort and cutting-edge technology in the all-new Camry.',
          features: ['Adaptive Cruise Control', 'Lane Departure Warning', 'Apple CarPlay', 'LED Headlights']
        },
        {
          id: 2,
          name: 'Toyota RAV4 2024',
          type: 'suv',
          price: 32000,
          year: 2024,
          mileage: 28,
          horsepower: 203,
          image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop',
          description: 'Adventure-ready SUV with unmatched versatility and fuel efficiency.',
          features: ['All-Wheel Drive', 'Panoramic Sunroof', 'Smart Key', 'Power Liftgate']
        },
        {
          id: 3,
          name: 'Toyota Corolla 2024',
          type: 'sedan',
          price: 22000,
          year: 2024,
          mileage: 33,
          horsepower: 169,
          image: 'https://images.unsplash.com/photo-1627454820516-ddb0cd01b8cc?w=800&auto=format&fit=crop',
          description: 'The world\'s best-selling car, now with hybrid efficiency.',
          features: ['Hybrid Technology', 'Toyota Safety Sense', 'Wireless Charging', 'Dual-Zone Climate']
        },
        {
          id: 4,
          name: 'Toyota Highlander 2024',
          type: 'suv',
          price: 38000,
          year: 2024,
          mileage: 24,
          horsepower: 295,
          image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&auto=format&fit=crop',
          description: 'Premium family SUV with three rows of comfort and sophistication.',
          features: ['3-Row Seating', 'JBL Audio', 'Rear Entertainment', 'Hands-Free Liftgate']
        },
        {
          id: 5,
          name: 'Toyota Tacoma 2024',
          type: 'truck',
          price: 34000,
          year: 2024,
          mileage: 20,
          horsepower: 278,
          image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop',
          description: 'Legendary off-road capability meets modern refinement.',
          features: ['4x4 System', 'Crawl Control', 'Multi-Terrain Select', 'Tow Package']
        },
        {
          id: 6,
          name: 'Toyota GR Supra 2024',
          type: 'sports',
          price: 55000,
          year: 2024,
          mileage: 22,
          horsepower: 382,
          image: 'https://images.unsplash.com/photo-1552519507-0fdee870ac9d?w=800&auto=format&fit=crop',
          description: 'Pure driving exhilaration in an iconic sports car design.',
          features: ['Turbocharged Engine', 'Sport-Tuned Suspension', 'Track Mode', 'Carbon Fiber Accents']
        }
      ];
      setCars(carsData);
      setFilteredCars(carsData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (filterType === 'all') {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter(car => car.type === filterType));
    }
  }, [filterType, cars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced Navigation Component
  const Navigation = () => (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: scrolled ? 'rgba(0, 0, 0, 0.98)' : 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(20px)',
      padding: scrolled ? '1rem 5%' : '1.5rem 5%',
      zIndex: 1000,
      borderBottom: '1px solid rgba(235, 10, 30, 0.3)',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div 
          onClick={() => { setCurrentPage('home'); setSelectedCar(null); scrollToTop(); }}
          style={{
            fontSize: scrolled ? '1.5rem' : '2rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #EB0A1E, #ff4d5a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '2px',
            fontFamily: '"Rajdhani", sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          TOYOTA
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['home', 'models', 'about', 'contact'].map(page => (
            <button
              key={page}
              onClick={() => { setCurrentPage(page); setSelectedCar(null); scrollToTop(); }}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === page ? '#EB0A1E' : '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '0.5rem 0',
                fontFamily: '"Rajdhani", sans-serif'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#EB0A1E'}
              onMouseOut={e => e.currentTarget.style.color = currentPage === page ? '#EB0A1E' : '#fff'}
            >
              {page}
              {currentPage === page && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#EB0A1E'
                }} />
              )}
            </button>
          ))}
          <button
            onClick={() => { setCurrentPage('contact'); scrollToTop(); }}
            style={{
              background: 'linear-gradient(135deg, #EB0A1E, #c70919)',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.5rem',
              fontSize: '0.9rem',
              fontWeight: '700',
              cursor: 'pointer',
              borderRadius: '30px',
              fontFamily: '"Rajdhani", sans-serif',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(235,10,30,0.5)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );

  // Statistics Counter Component
  const StatsSection = () => {
    const stats = [
      { icon: <Award size={40} />, value: '50+', label: 'Years of Excellence' },
      { icon: <Users size={40} />, value: '10M+', label: 'Happy Customers' },
      { icon: <TrendingUp size={40} />, value: '200+', label: 'Models Worldwide' },
      { icon: <Shield size={40} />, value: '#1', label: 'In Reliability' }
    ];

    return (
      <div style={{
        padding: '6rem 5%',
        background: 'linear-gradient(135deg, #EB0A1E 0%, #c70919 100%)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                color: 'white',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center',
                opacity: 0.9
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '900',
                marginBottom: '0.5rem',
                fontFamily: '"Rajdhani", sans-serif'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '1rem',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontFamily: '"Poppins", sans-serif'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Testimonials Component
  const TestimonialsSection = () => {
    const testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'RAV4 Owner',
        text: 'Best car I\'ve ever owned! The reliability and fuel efficiency are unmatched. Toyota has a customer for life!',
        rating: 5
      },
      {
        name: 'Michael Chen',
        role: 'Camry Enthusiast',
        text: 'The Camry is the perfect blend of luxury and practicality. Smooth ride, advanced tech, and incredible value.',
        rating: 5
      },
      {
        name: 'Emily Rodriguez',
        role: 'Highlander Family',
        text: 'Spacious, safe, and stylish. Our Highlander is perfect for family road trips and daily commutes alike!',
        rating: 5
      }
    ];

    return (
      <div style={{
        padding: '8rem 5%',
        background: '#0a0a0a'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '900',
          marginBottom: '1rem',
          textAlign: 'center',
          fontFamily: '"Rajdhani", sans-serif',
          color: '#fff'
        }}>
          WHAT OUR CUSTOMERS SAY
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#888',
          fontSize: '1.2rem',
          marginBottom: '5rem',
          fontFamily: '"Poppins", sans-serif'
        }}>
          Join thousands of satisfied Toyota owners
        </p>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                display: index === activeTestimonial ? 'block' : 'none',
                background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
                padding: '4rem 3rem',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
              }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={24} fill="#EB0A1E" color="#EB0A1E" />
                ))}
              </div>
              <p style={{
                fontSize: '1.3rem',
                color: '#ccc',
                lineHeight: '1.8',
                marginBottom: '2rem',
                fontFamily: '"Poppins", sans-serif',
                fontStyle: 'italic'
              }}>
                "{testimonial.text}"
              </p>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '0.3rem',
                fontFamily: '"Rajdhani", sans-serif'
              }}>
                {testimonial.name}
              </h4>
              <p style={{
                color: '#EB0A1E',
                fontSize: '0.9rem',
                fontFamily: '"Poppins", sans-serif'
              }}>
                {testimonial.role}
              </p>
            </div>
          ))}

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === activeTestimonial ? '#EB0A1E' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.3)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Home Page
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1552519507-0fdee870ac9d?w=1600&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4
        }} />
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(235,10,30,0.3))'
        }} />
        
        <div style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 5%'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '900px' }}>
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: '900',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              fontFamily: '"Rajdhani", sans-serif',
              background: 'linear-gradient(135deg, #ffffff, #EB0A1E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              BUILT TO INSPIRE
            </div>
            <p style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
              marginBottom: '3rem',
              color: '#ccc',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: '300'
            }}>
              Experience innovation, reliability, and performance like never before
            </p>
            <button
              onClick={() => { setCurrentPage('models'); scrollToTop(); }}
              style={{
                background: 'linear-gradient(135deg, #EB0A1E, #c70919)',
                color: 'white',
                border: 'none',
                padding: '1.2rem 3rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                borderRadius: '50px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                transition: 'all 0.3s ease',
                fontFamily: '"Rajdhani", sans-serif',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 10px 30px rgba(235, 10, 30, 0.4)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(235, 10, 30, 0.6)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(235, 10, 30, 0.4)';
              }}
            >
              Explore Models <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Models */}
      <div style={{
        padding: '8rem 5%',
        background: '#0a0a0a'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '900',
          marginBottom: '1rem',
          textAlign: 'center',
          fontFamily: '"Rajdhani", sans-serif',
          color: '#fff'
        }}>
          FEATURED MODELS
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#888',
          fontSize: '1.2rem',
          marginBottom: '5rem',
          fontFamily: '"Poppins", sans-serif'
        }}>
          Discover our most popular vehicles
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {cars.slice(0, 3).map((car, index) => (
            <div
              key={car.id}
              style={{
                background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onClick={() => {
                setSelectedCar(car);
                setCurrentPage('details');
                scrollToTop();
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(235, 10, 30, 0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                height: '250px',
                background: `url(${car.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#EB0A1E',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  fontFamily: '"Rajdhani", sans-serif'
                }}>
                  ${car.price.toLocaleString()}
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  marginBottom: '0.5rem',
                  color: '#fff',
                  fontFamily: '"Rajdhani", sans-serif'
                }}>
                  {car.name}
                </h3>
                <p style={{
                  color: '#888',
                  marginBottom: '1.5rem',
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '0.95rem'
                }}>
                  {car.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <Gauge size={20} color="#EB0A1E" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{car.horsepower} HP</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Zap size={20} color="#EB0A1E" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{car.mileage} MPG</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Calendar size={20} color="#EB0A1E" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{car.year}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />
    </div>
  );

  // Models Page
  const ModelsPage = () => (
    <div style={{
      minHeight: '100vh',
      padding: '8rem 5% 5rem',
      background: '#0a0a0a'
    }}>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: '900',
        marginBottom: '3rem',
        textAlign: 'center',
        fontFamily: '"Rajdhani", sans-serif',
        color: '#fff'
      }}>
        OUR LINEUP
      </h1>

      {/* Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '4rem',
        flexWrap: 'wrap'
      }}>
        {['all', 'sedan', 'suv', 'truck', 'sports'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              background: filterType === type ? 'linear-gradient(135deg, #EB0A1E, #c70919)' : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: filterType === type ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
              padding: '0.8rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '30px',
              transition: 'all 0.3s ease',
              fontFamily: '"Rajdhani", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(235,10,30,0.3)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Cars Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: '#888' }}>
          Loading vehicles...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {filteredCars.map((car, index) => (
            <div
              key={car.id}
              style={{
                background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onClick={() => {
                setSelectedCar(car);
                setCurrentPage('details');
                scrollToTop();
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(235, 10, 30, 0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                height: '250px',
                background: `url(${car.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#EB0A1E',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  fontFamily: '"Rajdhani", sans-serif'
                }}>
                  {car.type}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#EB0A1E',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  fontFamily: '"Rajdhani", sans-serif'
                }}>
                  ${car.price.toLocaleString()}
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  marginBottom: '0.5rem',
                  color: '#fff',
                  fontFamily: '"Rajdhani", sans-serif'
                }}>
                  {car.name}
                </h3>
                <p style={{
                  color: '#888',
                  marginBottom: '1.5rem',
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {car.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <Gauge size={20} color="#EB0A1E" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{car.horsepower} HP</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Zap size={20} color="#EB0A1E" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{car.mileage} MPG</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Calendar size={20} color="#EB0A1E" style={{ marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{car.year}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Car Details Page
  const CarDetailsPage = () => {
    if (!selectedCar) return null;

    return (
      <div style={{
        minHeight: '100vh',
        padding: '8rem 5% 5rem',
        background: '#0a0a0a'
      }}>
        <button
          onClick={() => { setCurrentPage('models'); scrollToTop(); }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '30px',
            marginBottom: '2rem',
            fontFamily: '"Rajdhani", sans-serif',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#EB0A1E';
            e.currentTarget.style.transform = 'translateX(-5px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Back to Models
        </button>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            marginBottom: '4rem'
          }}>
            <div>
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(235, 10, 30, 0.4)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.5)';
                }}
              />
            </div>
            <div>
              <div style={{
                background: 'rgba(235, 10, 30, 0.1)',
                color: '#EB0A1E',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                fontFamily: '"Rajdhani", sans-serif'
              }}>
                {selectedCar.type}
              </div>
              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: '900',
                marginBottom: '1rem',
                fontFamily: '"Rajdhani", sans-serif',
                color: '#fff'
              }}>
                {selectedCar.name}
              </h1>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#EB0A1E',
                marginBottom: '2rem',
                fontFamily: '"Rajdhani", sans-serif'
              }}>
                ${selectedCar.price.toLocaleString()}
              </div>
              <p style={{
                fontSize: '1.1rem',
                color: '#ccc',
                lineHeight: '1.8',
                marginBottom: '3rem',
                fontFamily: '"Poppins", sans-serif'
              }}>
                {selectedCar.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}>
                {[
                  { icon: <Gauge size={32} color="#EB0A1E" />, value: selectedCar.horsepower, label: 'Horsepower' },
                  { icon: <Zap size={32} color="#EB0A1E" />, value: selectedCar.mileage, label: 'MPG' },
                  { icon: <Calendar size={32} color="#EB0A1E" />, value: selectedCar.year, label: 'Model Year' }
                ].map((stat, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = 'rgba(235, 10, 30, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{ marginBottom: '0.5rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff', marginBottom: '0.3rem', fontFamily: '"Rajdhani", sans-serif' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#888' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setCurrentPage('contact'); scrollToTop(); }}
                style={{
                  background: 'linear-gradient(135deg, #EB0A1E, #c70919)',
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem 3rem',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderRadius: '50px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  boxShadow: '0 10px 30px rgba(235, 10, 30, 0.4)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(235, 10, 30, 0.6)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(235, 10, 30, 0.4)';
                }}
              >
                Request Test Drive
              </button>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              marginBottom: '2rem',
              fontFamily: '"Rajdhani", sans-serif',
              color: '#fff'
            }}>
              Key Features
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {selectedCar.features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = 'rgba(235, 10, 30, 0.1)';
                    e.currentTarget.style.transform = 'translateX(10px)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Star size={20} color="#EB0A1E" />
                  <span style={{ color: '#ccc', fontFamily: '"Poppins", sans-serif' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div style={{
      minHeight: '100vh',
      padding: '8rem 5% 5rem',
      background: '#0a0a0a'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '900',
          marginBottom: '2rem',
          fontFamily: '"Rajdhani", sans-serif',
          color: '#fff'
        }}>
          ABOUT TOYOTA
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          marginBottom: '5rem'
        }}>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&auto=format&fit=crop"
              alt="Toyota Factory"
              style={{
                width: '100%',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 30px 80px rgba(235, 10, 30, 0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.5)';
              }}
            />
          </div>
          <div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              fontFamily: '"Rajdhani", sans-serif',
              color: '#fff'
            }}>
              Our Legacy
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ccc',
              marginBottom: '1.5rem',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Since 1937, Toyota has been at the forefront of automotive innovation, consistently delivering vehicles that blend cutting-edge technology with legendary reliability.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#ccc',
              marginBottom: '1.5rem',
              fontFamily: '"Poppins", sans-serif'
            }}>
              Our commitment to quality, innovation, and customer satisfaction has made us one of the world's most trusted automotive brands.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { title: 'Innovation', desc: 'Leading the industry in hybrid and electric technology' },
            { title: 'Quality', desc: 'Uncompromising standards in every vehicle we build' },
            { title: 'Reliability', desc: 'Vehicles engineered to last for generations' },
            { title: 'Sustainability', desc: 'Committed to a greener, cleaner future' }
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
                padding: '3rem 2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = '#EB0A1E';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(235, 10, 30, 0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                marginBottom: '1rem',
                color: '#EB0A1E',
                fontFamily: '"Rajdhani", sans-serif'
              }}>
                {item.title}
              </h3>
              <p style={{
                color: '#ccc',
                lineHeight: '1.6',
                fontFamily: '"Poppins", sans-serif'
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div style={{
      minHeight: '100vh',
      padding: '8rem 5% 5rem',
      background: '#0a0a0a'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '900',
          marginBottom: '1rem',
          textAlign: 'center',
          fontFamily: '"Rajdhani", sans-serif',
          color: '#fff'
        }}>
          GET IN TOUCH
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#888',
          fontSize: '1.2rem',
          marginBottom: '4rem',
          fontFamily: '"Poppins", sans-serif'
        }}>
          Ready to experience Toyota? Contact us today
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem'
        }}>
          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  padding: '1.2rem',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#EB0A1E';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  padding: '1.2rem',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#EB0A1E';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
                style={{
                  padding: '1.2rem',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#EB0A1E';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                style={{
                  padding: '1.2rem',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontFamily: '"Poppins", sans-serif',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#EB0A1E';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                style={{
                  background: formStatus === 'success' ? '#22c55e' : 'linear-gradient(135deg, #EB0A1E, #c70919)',
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Rajdhani", sans-serif',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
                onMouseOver={e => {
                  if (formStatus !== 'sending') {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(235, 10, 30, 0.5)';
                  }
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { icon: <Phone size={32} color="#EB0A1E" />, title: 'Phone', text: '1-800-GO-TOYOTA' },
              { icon: <Mail size={32} color="#EB0A1E" />, title: 'Email', text: 'info@toyota.com' },
              { icon: <MapPin size={32} color="#EB0A1E" />, title: 'Location', text: 'Toyota City, Japan' }
            ].map((contact, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateX(10px)';
                e.currentTarget.style.borderColor = '#EB0A1E';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
              >
                {contact.icon}
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: '#fff',
                    fontFamily: '"Rajdhani", sans-serif'
                  }}>
                    {contact.title}
                  </h3>
                  <p style={{ color: '#888', fontFamily: '"Poppins", sans-serif' }}>{contact.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Scroll to Top Button
  const ScrollToTopButton = () => (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'linear-gradient(135deg, #EB0A1E, #c70919)',
        color: 'white',
        border: 'none',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: showScrollTop ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(235, 10, 30, 0.4)',
        zIndex: 999,
        transition: 'all 0.3s ease'
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(235, 10, 30, 0.6)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(235, 10, 30, 0.4)';
      }}
    >
      <ArrowUp size={24} />
    </button>
  );

  // Main Render
  return (
    <div style={{
      fontFamily: '"Poppins", sans-serif',
      background: '#0a0a0a',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        input:focus, textarea:focus, button:focus {
          outline: 2px solid #EB0A1E;
          outline-offset: 2px;
        }
        
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Navigation />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'models' && <ModelsPage />}
      {currentPage === 'details' && <CarDetailsPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}

      <ScrollToTopButton />

      {/* Footer */}
      <footer style={{
        background: '#000',
        padding: '3rem 5%',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #EB0A1E, #ff4d5a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: '"Rajdhani", sans-serif'
          }}>
            TOYOTA
          </div>
          <p style={{ color: '#666', fontSize: '0.9rem', fontFamily: '"Poppins", sans-serif' }}>
            © 2024 Toyota Motor Corporation. All rights reserved. | Built with React, Node.js & Express
          </p>
        </div>
      </footer>
    </div>
  );
}