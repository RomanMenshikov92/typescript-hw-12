/* eslint-disable no-console */
import Cart from './service/Cart';
import Book from './domain/Book';
import MusicAlbum from './domain/MusicAlbum';
import Movie from './domain/Movie';
import Gadget from './domain/Gadget';

const cart = new Cart();
console.log(cart.items);

console.log('\nДобавляем в корзину книгу и альбом');
cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
console.log(cart.items);

console.log(`Суммарная стоимость товаров в корзине ${cart.sum()}`);
console.log(`Суммарная стоимость товаров в корзине со скидкой 10% ${cart.sumDiscount(10)}`);
console.log(`Суммарная стоимость товаров в корзине со скидкой 0% ${cart.sumDiscount(0)}`);

cart.del(1008);
console.log('\nУдаления товара с id 1008');
console.log(cart.items);

cart.del(1001);
console.log('\nУдаления товара с id 1001');
console.log(cart.items);

console.log('\nДобавляем в корзину фильм');
cart.add(new Movie(1022, 'Мстители', 'The Avengers', 2012, 'США', '«Avengers Assemble!»', 'фантастика, боевик, фэнтези, приключения', 137, 3030));
console.log(cart.items);

console.log('\nДобавляем телефон Huawei по 100000');
console.log('Добавляем телефон Samsung по 80000');
cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000));
cart.add(new Gadget(2001, 'Samsung', 's21 ultra', 80000));
for (let i = 0; i < cart.items.length; i += 1) {
  console.log(cart.items[i]);
}

console.log('\nДобавляем ещё 2 телефона Huawei по 100000');
console.log('Добавляем ещё телефон Samsung по 80000');
cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000, 2));
cart.add(new Gadget(2001, 'Samsung', 's21 ultra', 80000));
for (let i = 0; i < cart.items.length; i += 1) {
  console.log(cart.items[i]);
}

console.log(`\nСуммарная стоимость товаров в корзине ${cart.sum()}`);

console.log('\nУменьшим телефон Huawei на 1 штуку');
cart.countMinus(2000);
for (let i = 0; i < cart.items.length; i += 1) {
  console.log(cart.items[i]);
}

console.log('\nУвеличим телефон Samsung на 1 штуку');
cart.countPlus(2001);
for (let i = 0; i < cart.items.length; i += 1) {
  console.log(cart.items[i]);
}

console.log('\nУменьшим телефон Huawei на 1 штуку два раза');
cart.countMinus(2000);
cart.countMinus(2000);
for (let i = 0; i < cart.items.length; i += 1) {
  console.log(cart.items[i]);
}

console.log(`\nСуммарная стоимость товаров в корзине ${cart.sum()}`);