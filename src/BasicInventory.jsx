import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEYS = {
  activeItems: 'activeItems_v3',
  savedSnapshots: 'savedSnapshots',
}

const sampleItems = [
  { id: 'INV-001', itemName: 'Chicken – Breast, BL/SL', itemCode: 1, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-002', itemName: 'Chicken – Tenders, Jumbo Clipped', itemCode: 2, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-003', itemName: 'Chicken – Thighs BL/SL', itemCode: 3, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-004', itemName: 'Chicken – Wings, Jumbo Party', itemCode: 4, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-005', itemName: 'Hot Dog – 6/1 (2.7oz ea)', itemCode: 5, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-006', itemName: 'Cabbage – Green', itemCode: 6, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-007', itemName: 'Cabbage – Red', itemCode: 7, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-008', itemName: 'Fruit – Blueberries', itemCode: 8, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-009', itemName: 'Fruit – Peaches', itemCode: 9, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-010', itemName: 'Fruit – Raspberries', itemCode: 10, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-011', itemName: 'Fruit – Strawberries', itemCode: 11, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-012', itemName: 'Flowers – Edible (Mix Flowers)', itemCode: 12, category: 'Beverage', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-013', itemName: 'Flowers – Lavender Flowers', itemCode: 13, category: 'Beverage', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-014', itemName: 'Lettuce – Iceberg', itemCode: 14, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-015', itemName: 'Peppers – Mixed Color Bell', itemCode: 15, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-016', itemName: 'Onion – Red Jumbo', itemCode: 16, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-017', itemName: 'Bread – Brioche Buns', itemCode: 17, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-018', itemName: 'Bread – Grissini Canes', itemCode: 18, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-019', itemName: 'Bread – Sliced Rustic', itemCode: 19, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-020', itemName: 'Bread – Whole Wheat Loaf', itemCode: 20, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-021', itemName: 'Tortilla – Flour, 10"', itemCode: 21, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-022', itemName: 'Butter – Unsalted', itemCode: 22, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-023', itemName: 'Buttermilk', itemCode: 23, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-024', itemName: 'Cheese – Cheddar, Cut', itemCode: 24, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-025', itemName: 'Cheese – Cheddar, Fancy Shredded', itemCode: 25, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-026', itemName: 'Cheese – Cheddar & Monterey Jack Blend', itemCode: 26, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-027', itemName: 'Heavy Cream – Silk', itemCode: 27, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-028', itemName: 'Ice Cream – Vanilla', itemCode: 28, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-029', itemName: 'Milk, Whole', itemCode: 29, category: 'Beverage', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-030', itemName: 'Corn Nuggets', itemCode: 30, category: 'Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-031', itemName: 'Onion Rings', itemCode: 31, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-032', itemName: 'Fries – Excelior 3/8', itemCode: 32, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-033', itemName: 'Waffles – Belgian', itemCode: 33, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-034', itemName: 'Hashbrown Patties', itemCode: 34, category: 'Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-035', itemName: 'Cornstarch', itemCode: 35, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-036', itemName: 'Dressing – Blue Cheese Gallon', itemCode: 36, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-037', itemName: 'Dressing – Honey Mustard Gallon', itemCode: 37, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-038', itemName: 'Dressing – Buttermilk Ranch Gallon', itemCode: 38, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-039', itemName: 'Flour – All Purpose', itemCode: 39, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-040', itemName: 'Fry shortening', itemCode: 40, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-041', itemName: 'Honey Mild 1', itemCode: 41, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-042', itemName: 'Iced Tea Bags – 1 gallon', itemCode: 42, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-043', itemName: 'Lemonade Mix', itemCode: 43, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-044', itemName: 'Mayonnaise – Extra Heavy', itemCode: 44, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-045', itemName: 'Pan Spray, All Purpose', itemCode: 45, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-046', itemName: 'Pasta – Elbows', itemCode: 46, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-047', itemName: 'Relish – Hamburger Dill', itemCode: 47, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-048', itemName: 'Pimentos, #10 Can', itemCode: 48, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-049', itemName: 'Sauce – Palm Salt', itemCode: 49, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-050', itemName: 'Sauce – BBQ Sauce Cups', itemCode: 50, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-051', itemName: 'Sauce – Honey BBQ', itemCode: 51, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-052', itemName: 'Sauce – Buffalo Sub-Sauce', itemCode: 52, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-053', itemName: 'Sauce – Hot Fish Peppers', itemCode: 53, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-054', itemName: 'Sauce – Worcestershire', itemCode: 54, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-055', itemName: 'Spices – Drop Pecan', itemCode: 55, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-056', itemName: 'Spices – Rainbow Powder', itemCode: 56, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-057', itemName: 'Spices – Pepper Corn', itemCode: 57, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-058', itemName: 'Spices – Oregano Powder', itemCode: 58, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-059', itemName: 'Spices – Chili Powder Light', itemCode: 59, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-060', itemName: 'Spices – Garlic Granules', itemCode: 60, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-061', itemName: 'Spices – Lemon Pepper', itemCode: 61, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-062', itemName: 'Spices – Onion Granulated', itemCode: 62, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-063', itemName: 'Spices – Paprika', itemCode: 63, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-064', itemName: 'Sugar – Dark Brown', itemCode: 64, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-065', itemName: 'Sugar – Granulated White', itemCode: 65, category: 'Beverage', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-066', itemName: 'Sugar – Light Brown', itemCode: 66, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-067', itemName: 'Syrup – Chocolate', itemCode: 67, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-068', itemName: 'Syrup – Pancake', itemCode: 68, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-069', itemName: 'Syrup – Strawberry', itemCode: 69, category: 'Beverage', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-070', itemName: 'Vinegar – Apple Cider Vinegar', itemCode: 70, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-071', itemName: 'Vinegar – Malt 1', itemCode: 71, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-072', itemName: 'Vinegar – White Distilled', itemCode: 72, category: 'Food', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-073', itemName: 'Hot – Habenero Mix', itemCode: 73, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-074', itemName: 'Salsa – Habanero', itemCode: 74, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-075', itemName: 'Salsa – Ghost Pepper', itemCode: 75, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-076', itemName: 'Salsa – Scorpion Pepper', itemCode: 76, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-077', itemName: 'Salsa – Carolina Reaper', itemCode: 77, category: 'Food', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-078', itemName: 'Aluminum Foil – Standard Roll', itemCode: 78, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-079', itemName: 'Aluminum Foil – Heavy Duty', itemCode: 79, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-080', itemName: 'Aluminum Tray – 9 Size Medium', itemCode: 80, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-081', itemName: 'Bags – Foil Quart (Sandwich)', itemCode: 81, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-082', itemName: 'Bags – Paper 5 x 5 x 3.5 (Fried)', itemCode: 82, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-083', itemName: 'Bags – Paper 20#', itemCode: 83, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-084', itemName: 'Bags – Paper 200', itemCode: 84, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-085', itemName: 'Bags – Plastic 8x4x18', itemCode: 85, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-086', itemName: 'Box – Catering Half Pan Corrugated', itemCode: 86, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-087', itemName: 'Box – Catering Full Pan Tube', itemCode: 87, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-088', itemName: 'Box – Paper Takeout, large (8x5x3)', itemCode: 88, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-089', itemName: 'Box – Paper Takeout, small (4.5x3)', itemCode: 89, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-090', itemName: 'Container – 32/24 oz', itemCode: 90, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-091', itemName: 'Cups – 16 oz', itemCode: 91, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-092', itemName: 'Cups – 20 oz', itemCode: 92, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-093', itemName: 'Cups – Lids', itemCode: 93, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-094', itemName: 'Cutlery – Forks, Heavy Weight', itemCode: 94, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-095', itemName: 'Cutlery – KFC, 4 piece', itemCode: 95, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-096', itemName: 'Cutlery – Knives, Heavy Weight', itemCode: 96, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-097', itemName: 'Cutlery – Teaspoons', itemCode: 97, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-098', itemName: 'Cutlery – Tablespoons', itemCode: 98, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-099', itemName: 'Deli Container – 8oz', itemCode: 99, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-100', itemName: 'Deli Container – 16oz', itemCode: 100, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-101', itemName: 'Deli Container – 32 oz', itemCode: 101, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-102', itemName: 'Deli Container – Lids', itemCode: 102, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-103', itemName: 'Deli Wrap – 12x12 Black Check', itemCode: 103, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-104', itemName: 'Deli Wrap – 12x12 Red Check', itemCode: 104, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-105', itemName: 'Drink Carrier – 4 cup Compostable', itemCode: 105, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-106', itemName: 'Foil Wrap – 9x9x3 (1 piece)', itemCode: 106, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-107', itemName: 'Napkins – Kraft', itemCode: 107, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-108', itemName: 'Paper Towel Roll – Kraft Hardwound', itemCode: 108, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-109', itemName: 'Paper Towel – 2 Fold', itemCode: 109, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-110', itemName: 'Plastic Wrap – 12"x2000\'', itemCode: 110, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-111', itemName: 'Ramekin lids – 1.5 oz (1.5 oz/2 oz)', itemCode: 111, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-112', itemName: 'Ramekin lids – 4 oz (3.25 oz/4 oz)', itemCode: 112, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-113', itemName: 'Ramekin – 1.5 oz', itemCode: 113, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-114', itemName: 'Ramekin – 4 oz', itemCode: 114, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-115', itemName: 'Receipt Paper – Small CC Thermal', itemCode: 115, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-116', itemName: 'Receipt Paper – 3 1/8" Thermal', itemCode: 116, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-117', itemName: 'Straws – 7.75" Wrapped', itemCode: 117, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-118', itemName: 'Straws – 10" Jumbo Shake', itemCode: 118, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-119', itemName: 'Tray – Hot/Dog Checkerboard', itemCode: 119, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-120', itemName: 'Tray – 1lb, checkerboard', itemCode: 120, category: 'Non-Food', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-121', itemName: 'Tray – 2lb, checkerboard', itemCode: 121, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-122', itemName: 'Tray – 3lb, checkerboard', itemCode: 122, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-123', itemName: 'Tray – 5lb, checkerboard', itemCode: 123, category: 'Non-Food', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-124', itemName: 'Mesh', itemCode: 124, category: 'Cleaning Supplies', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-125', itemName: 'Degreaser – Heavy', itemCode: 125, category: 'Cleaning Supplies', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-126', itemName: 'Degreaser, Slash', itemCode: 126, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-127', itemName: 'Degreaser, Oven and Grill Aerosol', itemCode: 127, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-128', itemName: 'Degreaser Wipes', itemCode: 128, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-129', itemName: 'Dish Soap – Emerald', itemCode: 129, category: 'Cleaning Supplies', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-130', itemName: 'Floor Cleaner – Degreasing cleaner', itemCode: 130, category: 'Cleaning Supplies', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-131', itemName: 'Gloves – Poly, Large', itemCode: 131, category: 'Cleaning Supplies', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-132', itemName: 'Gloves – Vinyl, Large', itemCode: 132, category: 'Cleaning Supplies', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-133', itemName: 'Gloves – Vinyl, XL', itemCode: 133, category: 'Cleaning Supplies', isPriority: true, unitType: 'Case', count: 0 },
  { id: 'INV-134', itemName: 'Hard Soap – Softcare', itemCode: 134, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-135', itemName: 'Mop – #22', itemCode: 135, category: 'Cleaning Supplies', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-136', itemName: 'Sanitizer Tablets', itemCode: 136, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-137', itemName: 'MaintenanceOil – Heavy Duty', itemCode: 137, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-138', itemName: 'Stainlesssteel Polish', itemCode: 138, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-139', itemName: 'Stainless Steel Scourboxes', itemCode: 139, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-140', itemName: 'Toilet Paper', itemCode: 140, category: 'Cleaning Supplies', isPriority: true, unitType: 'Piece', count: 0 },
  { id: 'INV-141', itemName: 'Wood Cleaner – Murphy Oil Soap', itemCode: 141, category: 'Cleaning Supplies', isPriority: false, unitType: 'Piece', count: 0 },
  { id: 'INV-142', itemName: 'Coca-Cola', itemCode: 142, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-143', itemName: 'Diet Coke', itemCode: 143, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-144', itemName: 'Dr. Pepper', itemCode: 144, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-145', itemName: 'Sprite', itemCode: 145, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-146', itemName: 'Orange Soda', itemCode: 146, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-147', itemName: 'Root Beer', itemCode: 147, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-148', itemName: 'Hal’s Seltzer – Lime', itemCode: 148, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-149', itemName: 'Hal’s Seltzer – Black Cherry', itemCode: 149, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
  { id: 'INV-150', itemName: 'Poland Spring 20 oz', itemCode: 150, category: 'Beverage', isPriority: false, unitType: 'Case', count: 0 },
]

const categoryOptions = ['All', 'Food', 'Beverage', 'Non-food', 'Cleaning Supplies', 'Priority']

function readStoredValue(key, fallback) {
  if (typeof window === 'undefined') return fallback
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function writeStoredValue(key, value) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function sortItems(items) {
  return [...items].sort((a, b) => {
    const aCode = typeof a.itemCode === 'number' ? a.itemCode : null
    const bCode = typeof b.itemCode === 'number' ? b.itemCode : null

    if (aCode === null && bCode === null) return a.itemName.localeCompare(b.itemName)
    if (aCode === null) return 1
    if (bCode === null) return -1
    return aCode - bCode || a.itemName.localeCompare(b.itemName)
  })
}

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function formatTimestamp(date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export default function BasicInventory() {
  const [activeItems, setActiveItems] = useState(() => readStoredValue(STORAGE_KEYS.activeItems, sampleItems))
  const [savedSnapshots, setSavedSnapshots] = useState(() => readStoredValue(STORAGE_KEYS.savedSnapshots, []))
  const [view, setView] = useState('active')
  const [filter, setFilter] = useState('All')
  const [formState, setFormState] = useState({
    itemName: '',
    itemCode: '',
    category: 'Food',
    case: false,
    unit: false,
  })
  const [formError, setFormError] = useState('')
  const [expandedSnapshot, setExpandedSnapshot] = useState(null)

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.activeItems, activeItems)
  }, [activeItems])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.savedSnapshots, savedSnapshots)
  }, [savedSnapshots])

  const visibleItems = useMemo(() => {
    const sortedItems = sortItems(activeItems)
    if (filter === 'All') return sortedItems
    if (filter === 'Priority') {return sortedItems.filter((item) => item.isPriority === true)
    }
    return sortedItems.filter((item) => item.category === filter)
  }, [activeItems, filter])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleAddItem = (event) => {
    event.preventDefault()
    if (!formState.itemName.trim()) {
      setFormError('Add an item name before saving.')
      return
    }
    if (!formState.case && !formState.unit) {
      setFormError('Choose at least one unit type.')
      return
    }

    const newItems = []
    if (formState.case) {
      newItems.push({
        id: createId(),
        itemName: formState.itemName.trim(),
        itemCode: formState.itemCode ? Number(formState.itemCode) : '',
        category: formState.category,
        unitType: 'Case',
        count: 0,
      })
    }
    if (formState.unit) {
      newItems.push({
        id: createId(),
        itemName: formState.itemName.trim(),
        itemCode: formState.itemCode ? Number(formState.itemCode) : '',
        category: formState.category,
        unitType: 'Unit',
        count: 0,
      })
    }

    setActiveItems((prev) => sortItems([...prev, ...newItems]))
    setFormState({ itemName: '', itemCode: '', category: 'Food', case: false, unit: false })
    setFormError('')
  }

  const updateCount = (id, change) => {
    setActiveItems((prev) =>
      sortItems(
        prev.map((item) => (item.id === id ? { ...item, count: Math.max(0, item.count + change) } : item))
      )
    )
  }

  const handleSaveSnapshot = () => {
    const label = window.prompt('Name this count session', 'Kitchen Evening Run')?.trim() || 'Untitled Count'
    const timestamp = new Date().toISOString()

    const snapshot = {
      id: createId(),
      label,
      timestamp,
      items: activeItems.map((item) => ({ ...item })),
    }

    const nextSnapshots = [snapshot, ...savedSnapshots].slice(0, 7)
    setSavedSnapshots(nextSnapshots)
    setActiveItems((prev) => prev.map((item) => ({ ...item, count: 0 })))
    setView('history')
  }

  const toggleSnapshot = (snapshotId) => {
    setExpandedSnapshot((prev) => (prev === snapshotId ? null : snapshotId))
  }

  return (
    <div className="w-full min-h-screen bg-stone-100 p-3 sm:p-6 text-stone-800">
      <div className="w-full max-w-3xl mx-auto space-y-4">
        
        {/* HEADER */}
        <header className="rounded-2xl bg-zinc-900 p-4 text-stone-100 shadow-md border-b-4 border-red-700">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-stone-600 bg-stone-200 text-[9px] font-bold text-zinc-900 text-center leading-tight">
              LOGO<br />HERE
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-600">Restaurant Operations</p>
              <h1 className="text-xl font-bold tracking-wide">Inventory Tally Sheet</h1>
            </div>
          </div>
        </header>

        {/* VIEW NAVIGATION */}
        <nav className="flex rounded-2xl border border-stone-200 bg-stone-200/60 p-1.5 shadow-inner">
          {['active', 'history'].map((tab) => {
            const label = tab === 'active' ? 'Active List' : 'Saved History'
            const isActive = view === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setView(tab)}
                className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                  isActive ? 'bg-red-700 text-stone-100 shadow-md' : 'text-zinc-700 hover:text-zinc-900'
                }`}
              >
                {label}
              </button>
            )
          })}
        </nav>

        {view === 'active' ? (
          <section className="space-y-4">
            
            {/* ADD ITEM FORM */}
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">Quick Setup</p>
                  <h2 className="text-base font-bold text-zinc-900">Add New Inventory Item</h2>
                </div>
                <span className="rounded-full bg-stone-100 border border-stone-300 px-3 py-1 text-xs font-bold text-zinc-700">
                  {activeItems.length} items
                </span>
              </div>

              <form onSubmit={handleAddItem} className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    name="itemName"
                    value={formState.itemName}
                    onChange={handleChange}
                    placeholder="Item Name (e.g. Ribeye)"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-3 text-sm outline-none focus:border-red-700 focus:bg-white"
                  />
                  <input
                    name="itemCode"
                    type="number"
                    inputMode="numeric"
                    value={formState.itemCode}
                    onChange={handleChange}
                    placeholder="Item Code / Shelf # (optional)"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-3 text-sm outline-none focus:border-red-700 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <select
                    name="category"
                    value={formState.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-3 text-sm font-medium outline-none focus:border-red-700"
                  >
                    <option value="Food">Food</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Supplies">Supplies</option>
                  </select>

                  <div className="flex items-center gap-4 rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Units:</span>
                    <label className="flex items-center gap-2 text-sm font-semibold text-zinc-800 cursor-pointer">
                      <input
                        type="checkbox"
                        name="case"
                        checked={formState.case}
                        onChange={handleChange}
                        className="h-4 w-4 rounded accent-red-700"
                      />
                      Case
                    </label>
                    <label className="flex items-center gap-2 text-sm font-semibold text-zinc-800 cursor-pointer">
                      <input
                        type="checkbox"
                        name="unit"
                        checked={formState.unit}
                        onChange={handleChange}
                        className="h-4 w-4 rounded accent-red-700"
                      />
                      Unit
                    </label>
                  </div>
                </div>

                {formError && <p className="text-xs font-bold text-red-700">{formError}</p>}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-bold text-stone-100 shadow transition hover:bg-zinc-800 active:scale-[0.99]"
                >
                  + Create Item Rows
                </button>
              </form>
            </div>

            {/* LIST AREA */}
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">Floor Tally</p>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFilter(option)}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                        filter === option
                          ? 'bg-red-700 text-stone-100 shadow-sm'
                          : 'bg-stone-100 text-zinc-600 hover:bg-stone-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* ITEM CARDS */}
              <div className="space-y-2.5">
                {visibleItems.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-900 p-3.5 text-stone-100 shadow-md border-l-4 border-red-700"
                  >
                    {/* LEFT INFO */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {item.itemCode && (
                          <span className="rounded bg-stone-800 px-2 py-0.5 text-[10px] font-bold text-stone-300">
                            #{item.itemCode}
                          </span>
                        )}
                        <span className="rounded bg-red-950/80 border border-red-800/50 px-2 py-0.5 text-[10px] font-bold text-red-300">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="mt-1 text-base font-bold text-stone-100 truncate">{item.itemName}</h3>
                      <p className="text-xs font-semibold text-stone-400">{item.unitType}</p>
                    </div>

                    {/* RIGHT COUNTER CONTROLS */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateCount(item.id, -1)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-700 text-2xl font-bold text-stone-100 shadow transition active:scale-90 hover:bg-red-800"
                      >
                        −
                      </button>
                      
                      <div className="flex h-11 min-w-[54px] flex-col items-center justify-center rounded-xl bg-stone-100 px-2 text-zinc-900 shadow-inner">
                        <span className="text-lg font-black leading-none">{item.count}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => updateCount(item.id, 1)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-700 text-2xl font-bold text-stone-100 shadow transition active:scale-90 hover:bg-red-800"
                      >
                        +
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* SAVE BUTTON */}
            <button
              type="button"
              onClick={handleSaveSnapshot}
              className="w-full rounded-2xl bg-red-700 py-4 text-base font-bold text-stone-100 shadow-lg transition hover:bg-red-800 active:scale-[0.99]"
            >
              Save Count Snapshot
            </button>
          </section>
        ) : (
          /* SAVED HISTORY VIEW */
          <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm space-y-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">Audit Trail</p>
              <h2 className="text-base font-bold text-zinc-900">Saved Count Sessions</h2>
            </div>

            {savedSnapshots.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center text-sm font-semibold text-zinc-500">
                No saved sessions yet. Run a count and hit "Save Count Snapshot".
              </div>
            ) : (
              <div className="space-y-2.5">
                {savedSnapshots.map((snapshot) => {
                  const isExpanded = expandedSnapshot === snapshot.id
                  return (
                    <article key={snapshot.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3.5">
                      <button
                        type="button"
                        onClick={() => toggleSnapshot(snapshot.id)}
                        className="flex w-full items-center justify-between text-left"
                      >
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{snapshot.label}</p>
                          <p className="text-xs font-medium text-zinc-500">{formatTimestamp(new Date(snapshot.timestamp))}</p>
                        </div>
                        <span className="text-lg font-bold text-red-700">{isExpanded ? '▲' : '▼'}</span>
                      </button>

                      {isExpanded && (
                        <div className="mt-3 space-y-1.5 border-t border-stone-200 pt-3">
                          {snapshot.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-semibold">
                              <span className="text-zinc-800">{item.itemName} ({item.unitType})</span>
                              <span className="rounded bg-red-100 px-2 py-0.5 font-bold text-red-700">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}