const mongoose = require('mongoose');
const { Product, Review } = require('./models');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ranveerrajpal19:Cessna206h%23@cluster0.7bssk6o.mongodb.net/';

const products = [
  {
    name: 'Oud Noir Absolu',
    brand: 'Maison Éclat',
    tagline: 'The darkness that seduces',
    description: 'A mesmerizing journey into the heart of rare agarwood. Oud Noir Absolu opens with a burst of smoky incense and dark rose petals, settling into a warm embrace of aged oud, amber, and earthy vetiver. This is a fragrance for those who command attention without seeking it — mysterious, powerful, unforgettable.',
    price: 285,
    category: 'Oriental',
    notes: {
      top: ['Black Pepper', 'Saffron', 'Pink Pepper'],
      middle: ['Bulgarian Rose', 'Oud', 'Incense'],
      base: ['Amber', 'Vetiver', 'Musk', 'Sandalwood']
    },
    sizes: [{ ml: 30, price: 185 }, { ml: 50, price: 245 }, { ml: 100, price: 285 }],
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600'
    ],
    badge: 'Bestseller',
    rating: 4.8,
    reviewCount: 142
  },
  {
    name: 'Lumière Blanche',
    brand: 'Atelier Soleil',
    tagline: 'Morning light on white flowers',
    description: 'Lumière Blanche captures the ephemeral beauty of dawn — crisp air, dew-kissed petals, and the promise of a perfect day. This delicate floral-musky composition weaves white gardenia, jasmine sambac, and peony into a sheer, luminous trail that lasts from morning to midnight.',
    price: 195,
    category: 'Floral',
    notes: {
      top: ['Bergamot', 'White Peach', 'Dewy Greens'],
      middle: ['Gardenia', 'Jasmine Sambac', 'Peony'],
      base: ['White Musk', 'Cedarwood', 'Cashmere']
    },
    sizes: [{ ml: 30, price: 115 }, { ml: 50, price: 155 }, { ml: 100, price: 195 }],
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600',
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600'
    ],
    badge: 'New Arrival',
    rating: 4.6,
    reviewCount: 87
  },
  {
    name: 'Forêt Sauvage',
    brand: 'Terra Noire',
    tagline: 'Ancient woods, wild heart',
    description: 'Deep in a primeval forest, after the rain. Forêt Sauvage is an earthy, verdant composition that transports you to mossy undergrowth and towering pines. Pine resin and fresh fern open into a heart of oakmoss and birch tar, grounding in a rich base of patchouli, dark musk, and smoky woods.',
    price: 220,
    category: 'Woody',
    notes: {
      top: ['Pine Resin', 'Juniper Berry', 'Green Fern'],
      middle: ['Oakmoss', 'Birch Tar', 'Geranium'],
      base: ['Patchouli', 'Dark Musk', 'Smoked Woods']
    },
    sizes: [{ ml: 50, price: 175 }, { ml: 100, price: 220 }],
    images: [
      'https://images.unsplash.com/photo-1567443024551-f3e3a7b9114f?w=600',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600',
      'https://images.unsplash.com/photo-1581683705068-a329440c1fcc?w=600'
    ],
    badge: 'Limited Edition',
    rating: 4.7,
    reviewCount: 63
  },
  {
    name: 'Velvet Iris',
    brand: 'Maison Éclat',
    tagline: 'Powder-soft, eternally chic',
    description: 'An ode to the timeless elegance of iris root — earthy, powdery, and hauntingly beautiful. Velvet Iris opens with a whisper of violet and green carrot seed, blooming into a lush heart of Florentine iris absolute supported by violet leaf. The dry-down is a masterclass in sophistication: warm suede, sandalwood, and a breath of white truffle.',
    price: 310,
    category: 'Floral',
    notes: {
      top: ['Violet', 'Carrot Seed', 'Aldehydes'],
      middle: ['Iris Absolute', 'Violet Leaf', 'Orris Root'],
      base: ['Suede', 'Sandalwood', 'White Truffle', 'Tonka']
    },
    sizes: [{ ml: 30, price: 195 }, { ml: 50, price: 255 }, { ml: 100, price: 310 }],
    images: [
      'https://images.unsplash.com/photo-1549049950-48d5887197a0?w=600',
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600',
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600',
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600'
    ],
    badge: 'Collector\'s Pick',
    rating: 4.9,
    reviewCount: 211
  },
  {
    name: 'Ambre Solaire',
    brand: 'Atelier Soleil',
    tagline: 'Warm as the Mediterranean sun',
    description: 'Close your eyes and feel the warmth of the sun on golden sands. Ambre Solaire is a rich, gourmand-oriental built around real ambergris accord, labdanum, and vanilla-infused benzoin. Citrus sparkle fades into a hypnotic heart of heliotrope and neroli before the deep, resinous base takes over for hours of warmth.',
    price: 175,
    category: 'Oriental',
    notes: {
      top: ['Mandarin', 'Neroli', 'Cardamom'],
      middle: ['Heliotrope', 'Ylang Ylang', 'Benzoin'],
      base: ['Ambergris', 'Labdanum', 'Vanilla', 'Civet']
    },
    sizes: [{ ml: 30, price: 105 }, { ml: 50, price: 140 }, { ml: 100, price: 175 }],
    images: [
      'https://images.unsplash.com/photo-1610461888750-10bfc601b4a6?w=600',
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      'https://images.unsplash.com/photo-1605217613423-0aea4fb32906?w=600'
    ],
    badge: null,
    rating: 4.5,
    reviewCount: 98
  },
  {
    name: 'Citrus Kyoto',
    brand: 'Terra Noire',
    tagline: 'Zen precision in a bottle',
    description: 'A minimalist ode to Japanese aesthetics. Citrus Kyoto strips fragrance down to its essential beauty: a precisely calibrated blend of yuzu, shiso leaf, and hinoki cypress bark. Clean and meditative, this is a fragrance that disappears into your skin and becomes part of you — quietly radiant.',
    price: 155,
    category: 'Fresh',
    notes: {
      top: ['Yuzu', 'Grapefruit', 'Shiso Leaf'],
      middle: ['Hinoki Cypress', 'White Tea', 'Bamboo'],
      base: ['Skin Musk', 'Rice Powder', 'Light Woods']
    },
    sizes: [{ ml: 50, price: 120 }, { ml: 100, price: 155 }],
    images: [
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600',
      'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600',
      'https://images.unsplash.com/photo-1602928298849-325cec8771c0?w=600',
      'https://images.unsplash.com/photo-1564436872-f6d81182df12?w=600'
    ],
    badge: 'Staff Favorite',
    rating: 4.6,
    reviewCount: 74
  }
];

const reviewTemplates = [
  { author: 'Sophie L.', rating: 5, title: 'Absolutely divine', body: 'I have been searching for a signature scent for years and this is finally it. The longevity is incredible — 12+ hours on my skin. Every compliment I receive points back to this.' },
  { author: 'Marcus T.', rating: 4, title: 'Complex and intriguing', body: 'This fragrance reveals itself slowly, like a great novel. What starts as one thing transforms beautifully over 4-5 hours. Sophisticated without being stuffy.' },
  { author: 'Aisha K.', rating: 5, title: 'Worth every penny', body: 'I was hesitant about the price point, but the quality of ingredients is immediately apparent. Rich, full, and utterly unique. My partner cannot stop complimenting it.' },
  { author: 'James R.', rating: 4, title: 'Unique and memorable', body: 'Not for the faint-hearted, but if you want to smell like nobody else in the room, this is your answer. Projection is fantastic without being overwhelming.' },
  { author: 'Elena M.', rating: 5, title: 'A masterpiece', body: 'I work in the fragrance industry and this is genuinely one of the best compositions I have encountered this year. Balanced, original, and beautifully made.' },
  { author: 'Priya S.', rating: 3, title: 'Lovely but expected more', body: 'The opening is spectacular but it fades quickly on my skin. Beautiful nonetheless, and the bottle is stunning. May repurchase in the larger size.' },
  { author: 'David W.', rating: 5, title: 'My new obsession', body: 'Received three compliments the first time I wore this. People kept asking what I was wearing. Instantly became my everyday scent despite the price.' },
  { author: 'Camille B.', rating: 4, title: 'Perfectly balanced', body: 'The balance between the notes is impeccable. Nothing overpowers, everything harmonizes. It feels like a perfectly tailored suit — just right in every way.' }
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Product.deleteMany({});
  await Review.deleteMany({});

  const savedProducts = await Product.insertMany(products);
  console.log(`Seeded ${savedProducts.length} products`);

  const reviews = [];
  for (const product of savedProducts) {
    const numReviews = 3 + Math.floor(Math.random() * 3);
    const shuffled = [...reviewTemplates].sort(() => Math.random() - 0.5);
    for (let i = 0; i < numReviews; i++) {
      reviews.push({
        ...shuffled[i % shuffled.length],
        productId: product._id,
        date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      });
    }
  }
  await Review.insertMany(reviews);
  console.log(`Seeded ${reviews.length} reviews`);

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch(console.error);
