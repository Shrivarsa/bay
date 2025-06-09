import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, ChevronDown } from 'lucide-react';
import { MenuItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../context/translations';

const menuData: MenuItem[] = [
  // Appetizers
  {
    id: "app1",
    name: "Thakkali Rasam",
    description: "A flavorful South Indian soup made from ripe tomatoes, herbs, ground spices and curry leaves.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "appetizers",
    isVegetarian: true
  },
  {
    id: "app2",
    name: "Paruppu Rasam",
    description: "A lentil soup made from mung beans, red lentils, garlic and ground spices.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "appetizers",
    isVegetarian: true
  },
  {
    id: "app3",
    name: "Kozhi Rasam",
    description: "A traditional South Indian soup seasoned with roasted spices.",
    price: 5.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "appetizers",
    isVegetarian: false
  },

  // Vegetarian Starters
  {
    id: "vs1",
    name: "Medhu Vadai",
    description: "Traditional South Indian lentil fritters served with two types of chutney.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "vs2",
    name: "Aloo Paratha",
    description: "Soft, golden-brown fried flatbread filled with a spicy potato mixture refined with aromatic herbs and spices.",
    price: 6.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "vs3",
    name: "Cauliflower Pakora",
    description: "Crispy fried cauliflower florets coated in a spicy chickpea flour batter.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "vs4",
    name: "Onion Pakora",
    description: "Crispy onion strips, marinated in a spicy chickpea flour batter and fried until golden brown.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "vs5",
    name: "Paneer Pakora",
    description: "Juicy cubes of Indian cream cheese (paneer), coated in a finely spiced chickpea flour batter and deep-fried until golden brown.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "vs6",
    name: "Mixed Vegetable Pakora",
    description: "Crispy Indian fritters made from chickpea flour, spices and herbs, served with two types of chutney.",
    price: 8.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "vs7",
    name: "Samosa",
    description: "A savory pastry filled with spiced potatoes, onions and peas, served with two types of chutney.",
    price: 6.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },

  // Non-Vegetarian Starters
  {
    id: "nvs1",
    name: "Eral Varuthathu",
    description: "Fried prawns and vegetables with Chettinad masala, garnished with onion rings and a slice of lemon.",
    price: 8.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "starters",
    isVegetarian: false
  },
  {
    id: "nvs2",
    name: "Chicken 65",
    description: "Chicken breast marinated with spices, yogurt and egg, deep-fried and garnished with onion rings and a slice of lemon.",
    price: 8.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "starters",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "nvs3",
    name: "Chicken Varuthathu",
    description: "Roast chicken and vegetables with Chettinad masala, garnished with onion rings and a slice of lemon.",
    price: 8.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "starters",
    isVegetarian: false
  },
  {
    id: "nvs4",
    name: "Mutton Kola Urundai",
    description: "Deep-fried lamb meatballs with ground spices, garnished with onion rings and a slice of lemon.",
    price: 9.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "starters",
    isVegetarian: false
  },
  {
    id: "nvs5",
    name: "Mutton Sukka",
    description: "Dry-cooked lamb seasoned with strong spices, garnished with onion rings and a slice of lemon.",
    price: 9.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "starters",
    isVegetarian: false
  },
  {
    id: "nvs6",
    name: "Beef Pepper Roast",
    description: "Tender beef marinated with pepper and shallow fried with traditional masala, garnished with onion rings and a slice of lemon.",
    price: 12.90,
    spiceLevel: 3,
    imageUrl: "",
    category: "starters",
    isVegetarian: false,
    isSpecial: true
  },

  // Dosai
  {
    id: "d1",
    name: "Plain Dosai",
    description: "Crispy, golden-brown rice pancakes, refined with a touch of ghee (clarified butter) for a rich and aromatic flavor.",
    price: 9.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "dosai",
    isVegetarian: true
  },
  {
    id: "d2",
    name: "Masala Dosai",
    description: "Crispy rice pancakes fried in ghee (clarified butter) and filled with a spicy potato masala mixture.",
    price: 11.50,
    spiceLevel: 2,
    imageUrl: "",
    category: "dosai",
    isVegetarian: true,
    isSpecial: true
  },
  {
    id: "d3",
    name: "Set Dosai",
    description: "Soft, fluffy rice pancakes served as a set of three, perfectly paired with aromatic chutneys and sambar.",
    price: 11.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "dosai",
    isVegetarian: true
  },
  {
    id: "d4",
    name: "Kari Dosai (Lamb)",
    description: "Spicy rice pancakes, perfectly fried and served with a rich, aromatic lamb curry side dish.",
    price: 13.50,
    spiceLevel: 2,
    imageUrl: "",
    category: "dosai",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "d5",
    name: "Egg Podi Dosai",
    description: "A thick, soft rice pancake with a golden brown crust, slightly crispy on the outside and fluffy on the inside.",
    price: 11.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "dosai",
    isVegetarian: false
  },
  {
    id: "d6",
    name: "Vegetable Uthappam",
    description: "A thick, soft rice pancake topped with a colorful mix of fresh vegetables like tomatoes, onions, peppers, and carrots.",
    price: 10.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "dosai",
    isVegetarian: true
  },
  {
    id: "d7",
    name: "Rava Dosai",
    description: "This golden brown, classic, thin and crispy pancake is made from semolina (rava) and seasoned with cumin, pepper and fresh herbs.",
    price: 10.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "dosai",
    isVegetarian: true
  },

  // Chaat
  {
    id: "ch1",
    name: "Aloo Channa Mango Chaat",
    description: "A refreshing snack with potatoes, chickpeas and sweet mangoes, refined with mild spices and tamarind chutney.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "ch2",
    name: "Cottage Cheese and Pineapple Chaat",
    description: "A delicious combination of tender cottage cheese and sweet, juicy pineapple, refined with mild spices and a squeeze of lemon juice.",
    price: 6.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },

  // Salads
  {
    id: "sal1",
    name: "Side Salad",
    description: "Fresh, crisp salad with a selection of seasonal vegetables, lightly seasoned and perfect as a refreshing side dish to any meal.",
    price: 5.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "sal2",
    name: "Chicken Salad",
    description: "Lettuce, grilled chicken, cherry tomatoes, corn, cucumbers, peppers, pickled chilies and house dressing.",
    price: 10.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: false
  },
  {
    id: "sal3",
    name: "Shrimp Salad",
    description: "Lettuce, burrata mozzarella, cherry tomatoes, herb shrimp, red onions and honey balsamic dressing.",
    price: 12.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: false
  },

  // Main Course - Vegetarian
  {
    id: "mv1",
    name: "Vendaikkaai Puli Kozhambu",
    description: "A sour curry specialty with sautéed okra, tamarind extract, spices and coconut milk.",
    price: 14.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv2",
    name: "Kaikari Mandi",
    description: "A Chettinad curry specialty made with mixed vegetables and aromatic masala.",
    price: 14.90,
    spiceLevel: 3,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv3",
    name: "Paruppu Keerai Masiyal",
    description: "A simple dish of mashed lentils and spinach, seasoned with coconut milk.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv4",
    name: "Sambar",
    description: "Seasonal vegetables cooked with toor dal and spices.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv5",
    name: "Kaikari Kuruma",
    description: "An aromatic curry of mixed vegetables in a coconut milk base with fennel, cashews and spices.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv6",
    name: "Kadai Paneer",
    description: "Indian cottage cheese and peppers cooked with a fragrant blend of spices.",
    price: 14.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv7",
    name: "Aloo Gobi Mother Masala",
    description: "Potatoes, green peas and cauliflower cooked in a mild, creamy tomato sauce.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv8",
    name: "Palak Paneer",
    description: "Indian cottage cheese in a smooth spinach sauce with fresh cream.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv9",
    name: "Paneer Butter Masala",
    description: "Creamy, slightly sweet sauce with paneer, cashew nuts, spices and fenugreek leaves.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true,
    isSpecial: true
  },
  {
    id: "mv10",
    name: "Aloo Palak",
    description: "A semi-liquid curry made from potatoes and spinach, seasoned with fenugreek leaves.",
    price: 14.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv11",
    name: "Paneer Dal",
    description: "Cottage cheese cooked with mung beans, red lentils and spices.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "mv12",
    name: "Channa Masala",
    description: "Chickpeas cooked in a spicy and sour tomato sauce.",
    price: 14.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },

  // Main Course - Seafood
  {
    id: "ms1",
    name: "Eral Milagu Masala",
    description: "Prawns cooked in a spicy pepper masala.",
    price: 18.90,
    spiceLevel: 3,
    imageUrl: "",
    category: "mains",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "ms2",
    name: "Chemeen Moilee",
    description: "Shrimp cooked in a coconut milk curry.",
    price: 18.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "ms3",
    name: "Meen Moilee",
    description: "Fish cooked in a coconut milk curry.",
    price: 18.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "ms4",
    name: "Meen Kozhambu",
    description: "Tamarind fish curry with a medium coconut masala.",
    price: 18.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },

  // Main Course - Chicken
  {
    id: "mc1",
    name: "Kongunaattu Kozhi Kuruma",
    description: "A traditional dish from the Kongu region of Tamil Nadu, prepared with tender country chicken, coconut, fresh herbs and a unique blend of regional spices.",
    price: 16.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "mc2",
    name: "Chettinad Chicken Masala",
    description: "An authentic, spicy curry from Tamil Nadu, prepared with tender chicken pieces, toasted coconut flakes and an aromatic blend of Chettinad spices.",
    price: 16.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "mc3",
    name: "Chicken Vindaloo",
    description: "A spicy, aromatic curry with tender chicken pieces and potatoes, cooked in a blend of garlic and traditional spices.",
    price: 16.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mc4",
    name: "Butter Chicken",
    description: "Tender chicken cooked in a creamy, rich tomato sauce, refined with butter and a blend of aromatic spices.",
    price: 16.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mc5",
    name: "Gongra Kodi",
    description: "Aromatic curry from Andhra Pradesh, which combines tender chicken with fresh spinach and tamarind with herbs and spices to create a unique taste experience.",
    price: 16.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mc6",
    name: "Chicken Pepper Masala",
    description: "A hot and spicy chicken curry prepared with black pepper and an intense blend of spices. This semi-liquid curry is enhanced with curry leaves for a bold, aromatic heat.",
    price: 16.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mc7",
    name: "Goa Mango Chicken",
    description: "A mild, fruity curry that combines tender chicken with the sweetness of ripe mangoes. This dish is prepared with creamy coconut milk, aromatic spices, and a hint of Goan flair.",
    price: 16.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mc8",
    name: "Chicken Tikka Masala",
    description: "Tender, roasted chicken pieces, marinated and cooked in a creamy, medium-spiced sauce with aromatic fenugreek leaves. This dish combines smoky tandoor flavors with a rich curry base.",
    price: 16.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },

  // Main Course - Lamb and Beef
  {
    id: "mlb1",
    name: "Chettinad Mutton Curry",
    description: "A strongly spiced curry from Tamil Nadu, spicy and robust lamb curry prepared with perfectly balanced spices, fresh herbs and roasted masala powder.",
    price: 18.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "mlb2",
    name: "Mutton Milagu Masala",
    description: "A hot and spicy lamb curry cooked with black pepper and aromatic spices in a semi-liquid sauce. Finished with curry leaves, this dish offers a bold heat and intense flavors.",
    price: 18.90,
    spiceLevel: 3,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mlb3",
    name: "Gongra Mutton",
    description: "A medium-spicy, aromatic, flavorful curry from Andhra Pradesh that combines tender lamb with fresh spinach and tamarind.",
    price: 18.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mlb4",
    name: "Mutton Kuruma",
    description: "A delicious, mild lamb curry prepared with freshly ground spices, coconut, and a creamy cashew masala.",
    price: 18.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mlb5",
    name: "Mutton Vindaloo",
    description: "An authentic, flavorful curry with tender lamb and potatoes, cooked in a spicy, specially ground masala paste.",
    price: 18.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "mlb6",
    name: "Beef Mild Masala",
    description: "A hot and spicy beef curry cooked with black pepper and an intense blend of spices in a semi-liquid gravy. Finished with curry leaves, this dish offers a bold heat and rich flavors.",
    price: 18.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },

  // Biryani
  {
    id: "b1",
    name: "Vegetable Biryani",
    description: "An aromatic, spicy rice dish with a selection of fresh vegetables, perfectly seasoned and cooked in a blend of fragrant Indian spices.",
    price: 15.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "biryani",
    isVegetarian: true
  },
  {
    id: "b2",
    name: "Chicken Biryani",
    description: "Tender chicken marinated in a blend of exotic spices, slowly cooked with fragrant basmati rice and fresh herbs.",
    price: 17.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "biryani",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "b3",
    name: "Mutton Biryani",
    description: "Tender lamb, perfectly marinated in a blend of aromatic spices, combined with fragrant basmati rice and freshly chopped herbs.",
    price: 18.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "biryani",
    isVegetarian: false,
    isSpecial: true
  },

  // Tandoori
  {
    id: "t1",
    name: "Paneer Tikka",
    description: "Spicy pieces of Indian fresh cheese (paneer), marinated in a mixture of yogurt and aromatic spices, then grilled until golden brown and slightly crispy.",
    price: 17.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "tandoori",
    isVegetarian: true
  },
  {
    id: "t2",
    name: "Tandoori Prawn",
    description: "Succulent prawns marinated in a mixture of yogurt, lemon juice and a selection of spicy tandoori spices, then grilled in a traditional tandoor oven.",
    price: 17.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "tandoori",
    isVegetarian: false
  },
  {
    id: "t3",
    name: "Tandoori Chicken",
    description: "Succulent bone-in chicken pieces marinated in a spicy blend of yogurt, lemon juice, and tandoori spices, then grilled in a traditional tandoor oven.",
    price: 16.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "tandoori",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "t4",
    name: "Murgh Malai Kebab",
    description: "Tender chicken pieces marinated in a creamy blend of yogurt, cashew nuts, saffron and aromatic spices, then grilled until golden brown and juicy.",
    price: 16.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "tandoori",
    isVegetarian: false
  },
  {
    id: "t5",
    name: "Mutton Tikka",
    description: "Tender pieces of lamb marinated in a blend of yogurt, spices, and herbs, then grilled until crispy on the outside and juicy on the inside. Served with an aromatic masala sauce.",
    price: 18.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "tandoori",
    isVegetarian: false
  },

  // Breads
  {
    id: "br1",
    name: "Naan",
    description: "Traditional Indian flatbread baked in tandoor oven.",
    price: 3.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "breads",
    isVegetarian: true
  },
  {
    id: "br2",
    name: "Garlic Naan",
    description: "Traditional naan bread topped with fresh garlic and herbs.",
    price: 4.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "breads",
    isVegetarian: true
  },
  {
    id: "br3",
    name: "Onion-Chili Naan",
    description: "Naan bread topped with caramelized onions and green chilies.",
    price: 4.50,
    spiceLevel: 2,
    imageUrl: "",
    category: "breads",
    isVegetarian: true
  },
  {
    id: "br4",
    name: "Paneer Naan",
    description: "Naan bread stuffed with spiced cottage cheese.",
    price: 5.20,
    spiceLevel: 1,
    imageUrl: "",
    category: "breads",
    isVegetarian: true
  },
  {
    id: "br5",
    name: "Parotta (2 pieces)",
    description: "Flaky, layered flatbread served in pairs.",
    price: 5.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "breads",
    isVegetarian: true
  },
  {
    id: "br6",
    name: "Poori (3 pieces)",
    description: "Deep-fried puffed bread served in sets of three.",
    price: 6.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "breads",
    isVegetarian: true
  },
  {
    id: "br7",
    name: "Chapathi (2 pieces)",
    description: "Thin, unleavened flatbread served in pairs.",
    price: 5.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "breads",
    isVegetarian: true
  },

  // Desserts
  {
    id: "des1",
    name: "Kesari",
    description: "Sweet semolina pudding with nuts and pineapple.",
    price: 5.20,
    spiceLevel: 1,
    imageUrl: "",
    category: "desserts",
    isVegetarian: true
  },
  {
    id: "des2",
    name: "Gulab Jamun with Ice Cream",
    description: "Sweet balls in syrup, served with ice cream.",
    price: 8.20,
    spiceLevel: 1,
    imageUrl: "",
    category: "desserts",
    isVegetarian: true,
    isSpecial: true
  },
  {
    id: "des3",
    name: "Carrot Halwa",
    description: "Slow-cooked grated carrots with milk and sugar, garnished with nuts.",
    price: 5.20,
    spiceLevel: 1,
    imageUrl: "",
    category: "desserts",
    isVegetarian: true
  },
  {
    id: "des4",
    name: "Paal Payasam",
    description: "A creamy, sweet rice pudding, slowly cooked with tender rice pieces, sugar and a pinch of cardamom with cashew nuts and raisins.",
    price: 5.20,
    spiceLevel: 1,
    imageUrl: "",
    category: "desserts",
    isVegetarian: true
  },
  {
    id: "des5",
    name: "Sarkarai Pongal",
    description: "A sweet, aromatic dish made from rice and yellow lentils cooked in ghee (clarified butter) and flavored with brown sugar, cashew nuts, and cardamom.",
    price: 5.20,
    spiceLevel: 1,
    imageUrl: "",
    category: "desserts",
    isVegetarian: true
  },

  // Weekend Specials
  {
    id: "ws1",
    name: "South Indian Vegetarian Meals",
    description: "A rich, traditional Tamil menu with a variety of vegetarian dishes—from aromatic curries and rasam, koottu, and poriyal to fresh raita, rice, and chapati. A perfectly balanced meal that combines all the flavors of South Indian cuisine.",
    price: 14.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: true,
    isSpecial: true
  },
  {
    id: "ws2",
    name: "South Indian Non Vegetarian Meals",
    description: "A delicious, balanced meal with a selection of succulent meat dishes - from tender chicken and lamb to fish curries, accompanied by rice, raita, chapati and dessert.",
    price: 16.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "ws3",
    name: "Bayleaf Chicken Dum Biriyani",
    description: "A delicious, flavorful rice dish from the Tamil Nadu region, it combines tender chicken in a perfectly seasoned marinade. Slow-cooked with aromatic basmati, fresh herbs, and a special blend of spices, this biryani offers a distinctive, intense flavor experience.",
    price: 17.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "biryani",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "ws4",
    name: "Bayleaf Mutton Dum Biriyani",
    description: "Tender lamb marinated in an aromatic blend of spices, combined with fragrant basmati rice and fresh herbs. This spicy biryani is slow-cooked in the traditional Tamil Nadu style for intense flavor and a perfect texture.",
    price: 19.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "biryani",
    isVegetarian: false,
    isSpecial: true
  },
  {
    id: "ws5",
    name: "Poori with Kuruma and Raitha",
    description: "These fluffy, golden-brown, deep-fried wheat flatbreads are crispy on the outside and soft on the inside. Perfect with delicious potato masala or chicken or lamb curry—a classic South Indian dish.",
    price: 14.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "ws6",
    name: "Chapathi with Kuruma and Raitha",
    description: "A sweet, aromatic dish made from rice and yellow lentils cooked in ghee (clarified butter) and flavored with brown sugar, cashew nuts, and cardamom.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "ws7",
    name: "Plain Parotta (Served with gravy and raitha)",
    description: "A soft, fluffy flatbread made from multiple layers of dough, baked in a pan until golden brown. Ideal as a side dish to curries or other dishes, it perfectly absorbs the flavors.",
    price: 14.90,
    spiceLevel: 1,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "ws8",
    name: "Vegetable Kothu Parotta",
    description: "Chopped, freshly baked parotta, fried in a hot pan with a colorful mix of vegetables, spices and herbs.",
    price: 12.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: true
  },
  {
    id: "ws9",
    name: "Chicken Kothu Parotta",
    description: "Chopped parotta combined with tender chicken, fresh vegetables and a blend of spicy herbs, all fried in a hot pan.",
    price: 14.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "ws10",
    name: "Lamb Kothu Parotta",
    description: "Chopped parotta mixed with tender lamb, fresh vegetables and an aromatic blend of spices, all fried in a hot pan.",
    price: 15.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false
  },
  {
    id: "ws11",
    name: "Idly - 3 pieces",
    description: "A soft, steamed mixture of rice and lentil cakes that are light and fluffy—a classic South Indian dish. Served with aromatic sambar and fresh chutneys.",
    price: 9.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },
  {
    id: "ws12",
    name: "Idiyappam - 3 pieces",
    description: "Fine, handcrafted rice vermicelli, lightly steamed for a tender and airy texture. This traditional South Indian dish is perfect served with aromatic curry or coconut milk—a simple yet delicious delicacy!",
    price: 9.50,
    spiceLevel: 1,
    imageUrl: "",
    category: "starters",
    isVegetarian: true
  },

  // Buffet
  {
    id: "buf1",
    name: "Weekday Buffet",
    description: "Salads, appetizers, soup, rice, 3 vegetarian dishes, 1 non-vegetarian dish, fruit platter and dessert.",
    price: 12.90,
    spiceLevel: 2,
    imageUrl: "",
    category: "mains",
    isVegetarian: false,
    isSpecial: true
  }
];

const MenuSection: React.FC = () => {
  const { language } = useLanguage();
  const categories = ["all", "appetizers", "starters", "dosai", "mains", "biryani", "tandoori", "breads", "desserts"];
  const [activeCategory, setActiveCategory] = useState("all");

  const textRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredMenu = activeCategory === "all"
    ? menuData
    : menuData.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-24" style={{ backgroundColor: '#ffd647' }}>
      <div className="container mx-auto px-4 relative z-10">
        <div ref={textRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <Menu className="mr-2 text-spice-600" size={20} />
            <span className="uppercase tracking-widest text-sm text-spice-600">
              {translations.menu.subtitle[language]}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {translations.menu.title[language]}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {translations.menu.description[language]}
          </motion.p>
        </div>

        <motion.div
          className="flex justify-center flex-wrap gap-4 my-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                activeCategory === category
                  ? 'bg-spice-600 text-white shadow'
                  : 'bg-cream-200 text-gray-700 hover:bg-spice-200'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {translations.menu.categories[category as keyof typeof translations.menu.categories]?.[language] || category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          ref={menuRef}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence>
            <div className="space-y-6">
              {filteredMenu.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        {item.isVegetarian && (
                          <span className="bg-leaf-100 text-leaf-700 text-xs px-2 py-1 rounded-full">
                            {translations.menu.labels.vegetarian[language]}
                          </span>
                        )}
                        {item.isSpecial && (
                          <span className="bg-chili-100 text-chili-700 text-xs px-2 py-1 rounded-full">
                            {translations.menu.labels.chefsSpecial[language]}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-spice-600 font-bold text-lg">
                        €{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="btn-primary mr-4"
          >
            {translations.hero.bookTable[language]}
          </Link>
          <a 
            href="/menu-pdf" 
            target="_blank"
            className="btn-outline"
          >
            {translations.menu.viewFullMenu[language]}
          </a>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
          <div className="scroll-indicator">
            <div className="scroll-indicator-progress" />
          </div>
          <Link
            to="gallery"
            spy={true}
            smooth={true}
            offset={-80}
            duration={800}
            className="text-gray-600 flex flex-col items-center cursor-pointer hover:text-spice-600 transition-colors"
          >
            <span className="text-sm uppercase tracking-wider mb-2">
              {translations.common.continue[language]}
            </span>
            <ChevronDown size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;