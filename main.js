// Product Data
const products = [
  {
    id: 1,
    name: "Classic Heritage Tote",
    category: "wire",
    price: 1895,
    image: "/images/p1.png",
    badge: "Bestseller",
    description: "A vibrant wire koodai reimagined as a modern tote. Handcrafted with warm terracotta and cream, it's the perfect blend of tradition and trend."
  },
  {
    id: 2,
    name: "Modern Storage Trio",
    category: "storage",
    price: 2220,
    image: "/images/p2.png",
    badge: "Organize in Style",
    description: "A set of three vibrant storage baskets in warm ochre tones. Durable, stackable, and perfect for organizing anything from toys to pantry items."
  },
  {
    id: 3,
    name: "Artisan Plant Holder",
    category: "wire",
    price: 550,
    image: "/images/p3.png",
    badge: "New Release",
    description: "A delicate wire basket designed in earthy sage and brown. Perfect for bringing a touch of nature and craft to your living space."
  },
  {
    id: 4,
    name: "Gifting Hamper Set",
    category: "gift",
    price: 1800,
    image: "/images/p4.png",
    badge: "Festive Pick",
    description: "A ceremonial set of warm-colored koodais, specifically crafted for wedding gifting and grand ethnic celebrations."
  },
  {
    id: 5,
    name: "Traditional Market Basket",
    category: "plastic",
    price: 850,
    image: "/images/p5.png",
    badge: "Daily Essential",
    description: "Sturdy and spacious in warm earthy brown, this traditional plastic koodai is designed for heavy-duty heritage living."
  },
  {
    id: 6,
    name: "Emerald Green Large",
    category: "storage",
    price: 1550,
    image: "/images/collection.png", // Reusing for now but could be filtered
    badge: "Few Left",
    description: "A large, deep koodai in fresh emerald green. Ideal for kitchen storage or as a beautiful laundry basket."
  }
];

// Helper Functions
const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

const createProductCard = (product) => {
  return `
    <div class="product-card animate-on-scroll" data-id="${product.id}">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <p class="product-category">${product.category} koodai</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="btn btn-primary btn-sm open-product" data-id="${product.id}">View Details</button>
        </div>
      </div>
    </div>
  `;
};

// UI Rendering Logic
const renderProducts = (category = 'all') => {
  const productGrid = document.getElementById('main-product-grid');
  if (!productGrid) return;
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);
  
  productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
  setupIntersectObserver();
};

const renderAIRecommendations = () => {
  const aiList = document.getElementById('ai-products-list');
  if (!aiList) return;
  
  const recs = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
  aiList.innerHTML = recs.map(createProductCard).join('');
  setupIntersectObserver();
};

const renderTrending = () => {
  const trendingList = document.getElementById('trending-products-list');
  if (!trendingList) return;
  
  const trending = products.slice(0, 3);
  trendingList.innerHTML = trending.map(createProductCard).join('');
  setupIntersectObserver();
};

// Intersect Observer for scroll animations
const setupIntersectObserver = () => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
};

// Global Events Handlers
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderAIRecommendations();
  renderTrending();
  setupIntersectObserver();

  // Scroll Event for Header
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      e.target.classList.add('active');
      renderProducts(e.target.dataset.filter);
    });
  });

  // Open Product Modal
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-product')) {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === productId);
      openModal(product);
    }
  });

  // Close Modal
  const closeModalBtn = document.querySelector('.close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      document.getElementById('product-modal').style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('product-modal')) {
      document.getElementById('product-modal').style.display = 'none';
    }
  });



  // Story Button
  const learnMoreBtn = document.getElementById('learn-more-btn');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
      document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        mobileMenuBtn.style.zIndex = '1000';
        mobileMenuBtn.style.position = 'fixed';
        mobileMenuBtn.style.top = '20px';
        mobileMenuBtn.style.right = '20px';
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileMenuBtn.style.zIndex = '';
        mobileMenuBtn.style.position = '';
        mobileMenuBtn.style.top = '';
        mobileMenuBtn.style.right = '';
      }
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileMenuBtn.style.zIndex = '';
        mobileMenuBtn.style.position = '';
        mobileMenuBtn.style.top = '';
        mobileMenuBtn.style.right = '';
      });
    });
  }
});

const openModal = (product) => {
  if (!product) return;
  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-product-details');

  modalBody.innerHTML = `
    <div class="modal-product-img">
      <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
    </div>
    <div class="modal-product-info">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h2 style="font-size: 2.5rem; margin-bottom: 5px;">${product.name}</h2>
          <p style="color: var(--text-gray); text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; margin-bottom: 20px;">${product.category} koodai</p>
        </div>
        <p style="color: var(--primary); font-size: 2rem; font-weight: 800; font-family: var(--font-headings);">${formatPrice(product.price)}</p>
      </div>
      
      <p style="font-size: 1.1rem; color: var(--text-gray); margin-bottom: 20px; line-height: 1.8;">${product.description}</p>
      
      <div style="margin-bottom: 30px;">
        <h4 style="margin-bottom: 15px; font-size: 1.2rem;">Why you'll love it:</h4>
        <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <li style="background: var(--pink-light); padding: 12px 20px; border-radius: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle text-pink"></i> Handwoven
          </li>
          <li style="background: var(--yellow-light); padding: 12px 20px; border-radius: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle text-yellow"></i> Durable
          </li>
          <li style="background: var(--green-light); padding: 12px 20px; border-radius: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle text-green"></i> Water Resistant
          </li>
          <li style="background: var(--orange-light); padding: 12px 20px; border-radius: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle text-orange"></i> Customizable
          </li>
        </ul>
      </div>

      <!-- Delivery Details Form -->
      <div class="delivery-form-section" style="background: linear-gradient(135deg, #FFF8F0, #FFF3E6); border-radius: 16px; padding: 28px; margin-bottom: 25px; border: 1px solid #F0E0D0;">
        <h4 style="margin-bottom: 18px; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-truck" style="color: var(--primary);"></i> Delivery Details
        </h4>
        <div style="display: grid; gap: 14px;">
          <div>
            <label for="order-name" style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Your Name *</label>
            <input type="text" id="order-name" placeholder="e.g. Priya Sharma" style="width: 100%; padding: 12px 16px; border-radius: 10px; border: 1.5px solid #E0D0C0; font-family: var(--font-main); font-size: 1rem; background: #fff; transition: border-color 0.3s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#E0D0C0'">
          </div>
          <div>
            <label for="order-address" style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Delivery Address *</label>
            <textarea id="order-address" rows="2" placeholder="Full delivery address (Street, Area, City)" style="width: 100%; padding: 12px 16px; border-radius: 10px; border: 1.5px solid #E0D0C0; font-family: var(--font-main); font-size: 1rem; resize: vertical; background: #fff; transition: border-color 0.3s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#E0D0C0'"></textarea>
          </div>
          <div>
            <label for="order-pincode" style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem; color: var(--text-dark);">Pincode *</label>
            <input type="text" id="order-pincode" placeholder="e.g. 600001" maxlength="6" style="width: 100%; padding: 12px 16px; border-radius: 10px; border: 1.5px solid #E0D0C0; font-family: var(--font-main); font-size: 1rem; background: #fff; transition: border-color 0.3s;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#E0D0C0'">
          </div>
        </div>
        <p id="delivery-form-error" style="color: #D32F2F; font-size: 0.85rem; margin-top: 10px; display: none;">
          <i class="fas fa-exclamation-circle"></i> Please fill in all delivery details before ordering.
        </p>
      </div>

      <div class="modal-actions" style="display: flex; gap: 20px;">
        <button id="order-whatsapp-btn" class="btn btn-primary btn-lg whatsapp-btn" style="width: 100%; cursor: pointer; border: none; font-size: 1.1rem;">
          <i class="fab fa-whatsapp"></i> Order via WhatsApp
        </button>
      </div>

      <div style="margin-top: 50px; border-top: 1px solid #EEE; padding-top: 30px;">
         <h4 style="margin-bottom: 20px; font-size: 1.2rem;">AI Recommended for you:</h4>
         <div style="display: flex; gap: 20px; overflow-x: auto; padding-bottom: 15px; scrollbar-width: none;">
            ${products.slice(0, 4).map(p => `
              <div style="min-width: 140px; cursor: pointer;" onclick="window.dispatchEvent(new CustomEvent('open-new-product', {detail: ${p.id}}))">
                <img src="${p.image}" style="width:100%; border-radius: 16px; height: 100px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <p style="font-size: 0.85rem; margin-top: 8px; font-weight: 600; text-align: center;">${p.name}</p>
              </div>
            `).join('')}
         </div>
      </div>
    </div>
  `;

  // Attach order button handler
  const orderBtn = document.getElementById('order-whatsapp-btn');
  orderBtn.addEventListener('click', () => {
    const name = document.getElementById('order-name').value.trim();
    const address = document.getElementById('order-address').value.trim();
    const pincode = document.getElementById('order-pincode').value.trim();
    const errorEl = document.getElementById('delivery-form-error');

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

  modal.style.display = 'block';
};

// Handle product changes within modal
window.addEventListener('open-new-product', (e) => {
  const product = products.find(p => p.id === e.detail);
  openModal(product);
});
