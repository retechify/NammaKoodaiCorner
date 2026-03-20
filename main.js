import './style.css';

// Product Data
const products = [
  {
    id: 1,
    name: "Classic Heritage Tote",
    category: "wire",
    price: 1895,
    image: "/images/p1.png",
    description: "A vibrant wire koodai reimagined as a modern tote. Handcrafted with precision in terracotta and cream, it's the perfect blend of tradition and trend.",
    benefits: ["Handwoven", "Durable", "Water Resistant", "Customizable"]
  },
  {
    id: 2,
    name: "Vibrant Grocery Basket",
    category: "plastic",
    price: 850,
    image: "/images/p2.png",
    description: "The ultimate daily companion. Built to carry heavy groceries while looking absolutely stunning. Easy to clean and incredibly sturdy.",
    benefits: ["BPA Free", "Large Capacity", "Washable", "Eco-friendly"]
  },
  {
    id: 3,
    name: "Golden Weave Gift Box",
    category: "gift",
    price: 1250,
    image: "/images/p3.png",
    description: "Make your gifts special with our golden weave basket. Reusable, premium finish, and perfect for storage after use as well.",
    benefits: ["Premium Finish", "Multi-purpose", "Artisan Made", "Secure Base"]
  },
  {
    id: 4,
    name: "Modern Storage Cube",
    category: "storage",
    price: 650,
    image: "/images/p4.png",
    description: "Organize your living space with these modern geometric koodais. Minimalist design with a traditional touch.",
    benefits: ["Space Saving", "Stackable", "Lightweight", "Decorative"]
  },
  {
      id: 5,
      name: "Pastel Picnic basket",
      category: "wire",
      price: 1550,
      image: "/images/p5.png",
      description: "Elegant pastel tones for your weekend getaways. A spacious and stylish picnic companion.",
      benefits: ["Lid Included", "Strong Handle", "Easy Carry", "Vibrant"]
  },
  {
      id: 6,
      name: "Eco-Friendly Tiffin Bag",
      category: "plastic",
      price: 450,
      image: "/images/p1.png", // Fallback for missing p6.png
      description: "The perfect size for your tiffin boxes. Compact yet spacious enough for all your lunch needs.",
      benefits: ["Compact", "Spill-proof", "Daily Use", "Colorful"]
  }
];

// Courses Data
const courses = [
  {
    id: 1,
    title: "Beginner Koodai Making",
    level: "Beginner",
    duration: "4 Weeks",
    price: 999,
    image: "/images/p1.png",
    overview: "Learn the fundamental knots and weaving techniques of traditional Koodai making from scratch.",
    syllabus: ["Introduction to Materials", "Basic Knots", "Base Weaving", "Finishing Edges"],
    instructor: "Lakshmi M."
  },
  {
    id: 2,
    title: "Advanced Design Patterns",
    level: "Advanced",
    duration: "6 Weeks",
    price: 1499,
    image: "/images/p2.png",
    overview: "Master complex geometric patterns, multi-color weaving, and custom handle designs.",
    syllabus: ["Complex Geometry", "Multi-color Blending", "Handle Braiding", "Custom Shapes"],
    instructor: "Meenakshi K."
  },
  {
    id: 3,
    title: "Start Your Koodai Business",
    level: "All Levels",
    duration: "2 Weeks",
    price: 1999,
    image: "/images/p3.png",
    overview: "A comprehensive guide to pricing, marketing, and selling your handcrafted Koodais online and offline.",
    syllabus: ["Costing & Pricing", "Branding Basics", "Social Media Marketing", "Packaging & Shipping"],
    instructor: "Ashok Sundari"
  }
];

// Formatting helpers
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Router Logic
const initRouter = () => {
    const handleRoute = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#/product/')) {
            const productId = parseInt(hash.replace('#/product/', ''));
            const product = products.find(p => p.id === productId);
            if (product) {
                showProductPage(product);
            } else {
                showHomePage();
            }
        } else if (hash.startsWith('#/course/')) {
            const courseId = parseInt(hash.replace('#/course/', ''));
            const course = courses.find(c => c.id === courseId);
            if (course) {
                showCoursePage(course);
            } else {
                showLearnPage();
            }
        } else if (hash === '#/learn') {
            showLearnPage();
        } else if (hash.startsWith('#/shop')) {
            const params = new URLSearchParams(hash.split('?')[1]);
            const category = params.get('category') || 'all';
            showShopPage(category);
        } else {
            showHomePage();
        }
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Initial call
};

const showHomePage = () => {
    document.getElementById('home-view').style.display = 'block';
    document.getElementById('shop-view').style.display = 'none';
    document.getElementById('product-view').style.display = 'none';
    const learnView = document.getElementById('learn-view');
    if (learnView) learnView.style.display = 'none';
    const courseView = document.getElementById('course-view');
    if (courseView) courseView.style.display = 'none';
    window.scrollTo(0, 0);
};

const showShopPage = (category = 'all') => {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('shop-view').style.display = 'block';
    document.getElementById('product-view').style.display = 'none';
    const learnView = document.getElementById('learn-view');
    if (learnView) learnView.style.display = 'none';
    const courseView = document.getElementById('course-view');
    if (courseView) courseView.style.display = 'none';
    
    renderProducts(category);
    
    // Update category filter button active state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    window.scrollTo(0, 0);
};

const showProductPage = (product) => {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('shop-view').style.display = 'none';
    const learnView = document.getElementById('learn-view');
    if (learnView) learnView.style.display = 'none';
    const courseView = document.getElementById('course-view');
    if (courseView) courseView.style.display = 'none';
    
    const productView = document.getElementById('product-view');
    productView.style.display = 'block';
    renderProductPage(product);
    window.scrollTo(0, 0);
};

// Rendering Functions
const renderProductCard = (product) => {
  return `
    <div class="product-card animate-on-scroll" data-category="${product.category}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-badge">${product.category}</div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <div class="product-actions" style="margin-top: 20px;">
          <a href="#/product/${product.id}" class="btn btn-primary btn-sm">View Details</a>
          <a href="https://wa.me/919360378656?text=I'm interested in ${product.name}" target="_blank" class="btn btn-outline btn-sm"><i class="fab fa-whatsapp"></i> Buy</a>
        </div>
      </div>
    </div>
  `;
};

const renderProducts = (filter = 'all') => {
  const container = document.getElementById('main-product-grid');
  if (!container) return;
  
  if (filter === 'all') {
    // Group products by category
    const categories = [...new Set(products.map(p => p.category))];
    container.innerHTML = categories.map(cat => {
      const catProducts = products.filter(p => p.category === cat);
      if (catProducts.length === 0) return '';
      return `
        <div class="category-group" data-category="${cat}">
          <h3 class="category-title">${cat.charAt(0).toUpperCase() + cat.slice(1)} koodai</h3>
          <div class="product-grid">
            ${catProducts.map(product => renderProductCard(product)).join('')}
          </div>
        </div>
      `;
    }).join('');
    
    // Add grid-column-span to category-group if needed for layout
  } else {
    const filtered = products.filter(p => p.category === filter);
    if (filtered.length === 0) {
      container.innerHTML = '<p class="no-products">No products available in this category right now</p>';
    } else {
      container.innerHTML = `
        <div class="category-group">
          <h3 class="category-title">${filter.charAt(0).toUpperCase() + filter.slice(1)} koodai</h3>
          <div class="product-grid">
            ${filtered.map(product => renderProductCard(product)).join('')}
          </div>
        </div>
      `;
    }
  }
  
  // Re-observe new elements for animations
  initAnimations();
};

const renderRecommendations = () => {
    const container = document.getElementById('ai-products-list');
    if (!container) return;
    container.innerHTML = products.slice(0, 4).map(product => renderProductCard(product)).join('');
};


const renderProductPage = (product) => {
    const productView = document.getElementById('product-view');
    productView.innerHTML = `
        <div class="product-page">
            <header class="product-page-header">
                <div class="container" style="display: flex; align-items: center; justify-content: space-between; padding: 15px 16px;">
                    <a href="#" class="back-btn"><i class="fas fa-arrow-left"></i> Back to Shop</a>
                    <div class="logo-mini">
                        <span class="logo-text">Namma<span>Koodai</span></span>
                    </div>
                </div>
            </header>

            <main class="container product-page-content">
                <section class="product-hero-section">
                    <div class="product-main-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-main-info">
                        <div class="product-tag">${product.category} koodai</div>
                        <h1 class="product-title">${product.name}</h1>
                        <p class="product-page-price">${formatPrice(product.price)}</p>
                        
                        <div class="product-description-block">
                            <h3>Description</h3>
                            <p>${product.description}</p>
                        </div>

                        <div class="product-features-block">
                            <h3>Product Features</h3>
                            <ul class="features-list">
                                ${product.benefits.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </section>

                <section class="delivery-details-section">
                    <div class="section-card">
                        <h3><i class="fas fa-truck"></i> Delivery Details</h3>
                        <p>Tell us where to deliver your handcrafted koodai.</p>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="pg-name">Your Full Name *</label>
                                <input type="text" id="pg-name" placeholder="e.g. Priya Sharma">
                            </div>
                            <div class="form-group">
                                <label for="pg-address">Delivery Address *</label>
                                <textarea id="pg-address" rows="3" placeholder="Full delivery address (Street, Area, City)"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="pg-pincode">Pincode *</label>
                                <input type="text" id="pg-pincode" placeholder="e.g. 641001" maxlength="6">
                            </div>
                        </div>
                        <p id="pg-form-error" class="error-text" style="display:none; color: #d32f2f; margin-top: 15px;">
                            <i class="fas fa-exclamation-circle"></i> Please fill in all details before ordering.
                        </p>
                    </div>
                </section>

                <section class="product-visuals-section">
                    <div class="section-card">
                        <h3>Craft in Motion</h3>
                        <div class="video-responsive-wrapper">
                            <iframe src="https://www.youtube.com/embed/aZ-1vK9H9jY" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </section>

                <section class="product-reviews-section">
                    <div class="section-card">
                        <h3>Customer Reviews</h3>
                        <div class="reviews-vertical-stack">
                            <div class="review-item">
                                <div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                <p>"The quality is exceptional. Best wire basket in Gobi!"</p>
                                <small>- Meera R.</small>
                            </div>
                            <div class="review-item">
                                <div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                                <p>"So vibrant and sturdy. Perfect for my market trips."</p>
                                <small>- Anjali S.</small>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="ai-recommendation-section section-padding" style="padding-top: 10px; padding-bottom: 20px;">
                    <div class="section-card" style="background: linear-gradient(135deg, var(--yellow-light) 0%, #fff 100%);">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                            <i class="fas fa-sparkles text-yellow" style="font-size: 1.5rem;"></i>
                            <h3 style="margin: 0;">AI Suggestion</h3>
                        </div>
                        <p style="margin-bottom: 15px;">Love this design? You can learn to make it yourself! Check out our related craft course.</p>
                        <a href="#/course/1" class="btn btn-outline"><i class="fas fa-graduation-cap"></i> View Course: Beginner Koodai Making</a>
                    </div>
                </section>

                <section class="other-products-section">
                    <h3>Explore More Styles</h3>
                    <div class="products-carousel horizontal-scroll">
                        ${products.filter(p => p.id !== product.id).slice(0, 4).map(p => `
                            <a href="#/product/${p.id}" class="mini-prod-card">
                                <img src="${p.image}" alt="${p.name}">
                                <h5>${p.name}</h5>
                                <p>${formatPrice(p.price)}</p>
                            </a>
                        `).join('')}
                    </div>
                </section>
            </main>

            <div class="sticky-action-bar">
                <div class="container action-bar-grid">
                    <button id="pg-whatsapp-btn" class="btn btn-primary btn-lg action-btn main-btn">
                        <i class="fab fa-whatsapp"></i> Order via WhatsApp
                    </button>
                    <a href="tel:+919360378656" class="btn btn-outline btn-lg action-btn sec-btn">
                        <i class="fas fa-phone-alt"></i> Book a Call
                    </a>
                </div>
            </div>
        </div>
    `;

    // Attach order handler for the page
    document.getElementById('pg-whatsapp-btn').addEventListener('click', () => {
        const name = document.getElementById('pg-name').value.trim();
        const address = document.getElementById('pg-address').value.trim();
        const pincode = document.getElementById('pg-pincode').value.trim();
        const errorEl = document.getElementById('pg-form-error');

        if (!name || !address || !pincode) {
            errorEl.style.display = 'block';
            return;
        }
        errorEl.style.display = 'none';

        const whatsappMsg = `🛒 *New Order from NammaKoodaiCorner*
  
📦 *Product:* ${product.name}
💰 *Price:* ${formatPrice(product.price)}
📂 *Category:* ${product.category} koodai

👤 *Customer Name:* ${name}
📍 *Delivery Address:* ${address}
📮 *Pincode:* ${pincode}

Please confirm availability and delivery charges. Thank you! 🙏`;

        const whatsappUrl = `https://wa.me/919360378656?text=${encodeURIComponent(whatsappMsg)}`;
        window.open(whatsappUrl, '_blank');
    });
};

const showLearnPage = () => {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('shop-view').style.display = 'none';
    document.getElementById('product-view').style.display = 'none';
    const courseView = document.getElementById('course-view');
    if (courseView) courseView.style.display = 'none';
    
    const learnView = document.getElementById('learn-view');
    if (learnView) {
        learnView.style.display = 'block';
        renderCourses();
        window.scrollTo(0, 0);
    }
};

const showCoursePage = (course) => {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('shop-view').style.display = 'none';
    document.getElementById('product-view').style.display = 'none';
    const learnView = document.getElementById('learn-view');
    if (learnView) learnView.style.display = 'none';
    
    const courseView = document.getElementById('course-view');
    if (courseView) {
        courseView.style.display = 'block';
        renderCoursePage(course);
        window.scrollTo(0, 0);
    }
};

const renderCourses = () => {
    const container = document.getElementById('main-course-grid');
    if (!container) return;
    container.innerHTML = courses.map(course => `
        <div class="product-card">
            <div class="product-image">
                <img src="${course.image}" alt="${course.title}">
                <div class="product-badge" style="background:var(--pink);">${course.level}</div>
            </div>
            <div class="product-info">
                <h3>${course.title}</h3>
                <p class="price">${formatPrice(course.price)}</p>
                <div class="course-meta" style="margin-bottom: 15px; color: var(--gray); font-size: 0.9rem;">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                </div>
                <div class="card-actions">
                    <a href="https://wa.me/919360378656?text=${encodeURIComponent(`Hi, I want to join the ${course.title} course`)}" class="btn btn-primary" target="_blank" style="flex:1;"><i class="fab fa-whatsapp"></i> Enroll</a>
                    <a href="#/course/${course.id}" class="btn btn-outline" style="flex:1;">Details</a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Check if initAnimations is defined before calling
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
};

const renderCoursePage = (course) => {
    const courseView = document.getElementById('course-view');
    if (!courseView) return;
    courseView.innerHTML = `
        <div class="product-page">
            <header class="product-page-header">
                <div class="container" style="display: flex; align-items: center; justify-content: space-between; padding: 15px 16px;">
                    <a href="#/learn" class="back-btn"><i class="fas fa-arrow-left"></i> Back to Courses</a>
                    <div class="logo-mini">
                        <span class="logo-text">Namma<span>Koodai</span></span>
                    </div>
                </div>
            </header>

            <main class="container product-page-content">
                <section class="product-hero-section">
                    <div class="product-main-image">
                        <img src="${course.image}" alt="${course.title}">
                    </div>
                    <div class="product-main-info">
                        <div class="product-tag">${course.level}</div>
                        <h1 class="product-title">${course.title}</h1>
                        <p class="product-page-price">${formatPrice(course.price)}</p>
                        
                        <div class="product-description-block">
                            <h3>Course Overview</h3>
                            <p>${course.overview}</p>
                        </div>

                        <div class="product-features-block" style="margin-top: 20px;">
                            <h3>Course Details</h3>
                            <ul class="features-list" style="margin-bottom: 15px;">
                                <li><i class="fas fa-clock"></i> Duration: ${course.duration}</li>
                                <li><i class="fas fa-user-tie"></i> Instructor: ${course.instructor}</li>
                            </ul>
                            <h3>What you will learn</h3>
                            <ul class="features-list">
                                ${course.syllabus.map(s => `<li><i class="fas fa-check-circle"></i> ${s}</li>`).join('')}
                            </ul>
                            <div class="desktop-actions" style="margin-top: 30px; display: flex; gap: 15px; flex-wrap: wrap;">
                                <a href="https://wa.me/919360378656?text=${encodeURIComponent(`Hi, I want to join the ${course.title} course`)}" class="btn btn-primary" target="_blank"><i class="fab fa-whatsapp"></i> Enroll via WhatsApp</a>
                                <a href="tel:+919360378656" class="btn btn-outline"><i class="fas fa-phone-alt"></i> Book a Call</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <div class="sticky-action-bar">
                <div class="container action-bar-grid">
                    <a href="https://wa.me/919360378656?text=${encodeURIComponent(`Hi, I want to join the ${course.title} course`)}" class="btn btn-primary btn-lg action-btn main-btn" target="_blank">
                        <i class="fab fa-whatsapp"></i> Enroll via WhatsApp
                    </a>
                    <a href="tel:+919360378656" class="btn btn-outline btn-lg action-btn sec-btn">
                        <i class="fas fa-phone-alt"></i> Book a Call
                    </a>
                </div>
            </div>
        </div>
    `;
};

// --- Animations ---
let animationObserver;

const initAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    if (animationObserver) {
        animationObserver.disconnect();
    }

    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // We don't unobserve here if we want items to re-animate or if we handle them dynamically
                // But for standard scroll reveal, unobserving is fine
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .product-card').forEach(el => {
        animationObserver.observe(el);
    });
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Render static content on home
    renderRecommendations();

    // Init Router (This will call initial render for active view)
    initRouter();

    // Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.querySelector('i').classList.toggle('fa-bars');
            menuBtn.querySelector('i').classList.toggle('fa-times');
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.querySelector('i').classList.add('fa-bars');
                menuBtn.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // Filter Buttons (for Shop page)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;
            // Instead of direct render, update URL to trigger router
            window.location.hash = `#/shop?category=${category}`;
        });
    });

    // Category Cards (on Home page or Footer)
    document.querySelectorAll('.category-card, .cat-link').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = card.dataset.category;
            if (category) {
                // Navigate to shop with category
                window.location.hash = `#/shop?category=${category}`;
            }
        });
    });

    // Scroll Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Initial call for animations
    initAnimations();
});
