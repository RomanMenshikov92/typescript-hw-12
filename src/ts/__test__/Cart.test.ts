import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';
import Gadget from '../domain/Gadget';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('cart add product', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Movie(1022, 'Мстители', 'The Avengers', 2012, 'США', '«Avengers Assemble!»', 'фантастика, боевик, фэнтези, приключения', 137, 3030));
  cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000));

  const bookObj: Book = { id: 1001, name: 'War and Piece', author: 'Leo Tolstoy', price: 2000, pages: 1225 };
  const musicAlbumObj: MusicAlbum = { id: 1008, name: 'Meteora', author: 'Linkin Park', price: 900 };
  const huaweiObj: Gadget = { id: 2000, name: 'Huawei', model: 'p40 pro', price: 100000, count: 1 };
  const movieObj: Movie = {
    id: 1022,
    name: 'Мстители',
    originalName: 'The Avengers',
    year: 2012,
    country: 'США',
    taglines: '«Avengers Assemble!»',
    genres: 'фантастика, боевик, фэнтези, приключения',
    time: 137,
    price: 3030,
  };

  expect(cart.items).toEqual([bookObj, musicAlbumObj, movieObj, huaweiObj]);
});

test('cart add product count', () => {
  const cart = new Cart();
  cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000));
  cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000, 1));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));

  const huaweiObj: Gadget = { id: 2000, name: 'Huawei', model: 'p40 pro', price: 100000, count: 2 };
  const musicAlbumObj: MusicAlbum  = { id: 1008, name: 'Meteora', author: 'Linkin Park', price: 900 };

  expect(cart.items).toEqual([huaweiObj, musicAlbumObj]);
});

test('cart sum', () => {
  const cartOne = new Cart();
  const cartTwo = new Cart();
  cartTwo.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cartTwo.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));

  expect(cartOne.sum()).toEqual(0);
  expect(cartTwo.sum()).toEqual(2900);
});

test('cart sum Gadget', () => {
  const cart = new Cart();
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000, 2));

  expect(cart.sum()).toEqual(200900);
});

test('cart sumDiscount', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));

  expect(cart.sumDiscount(10)).toEqual(2610);
});

test('cart sumDiscount error', () => {
  const cart = new Cart();

  expect(() => cart.sumDiscount(-10)).toThrow('Скидка не может быть меньше 0%');
  expect(() => cart.sumDiscount(110)).toThrow('Скидка не может быть больше 100%');
});

test('cart delete', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.del(1008);

  const bookObj: Book = {
    id: 1001,
    name: 'War and Piece',
    author: 'Leo Tolstoy',
    price: 2000,
    pages: 1225
  };

  expect(cart.items).toEqual([bookObj]);
});

test('cart delete error', () => {
  const cart = new Cart();
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));

  expect(() => cart.del(1011)).toThrow(`Товар c id = 1011 не найден`);
});

test('cart countPlus', () => {
  const cart = new Cart();
  cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000));
  cart.countPlus(2000);
  cart.countPlus(2000, 2);
  cart.countPlus(2000, 0);
  cart.countPlus(3333);

  expect(cart.items).toEqual([new Gadget(2000, 'Huawei', 'p40 pro', 100000, 4)]);
});

test('cart countMinus', () => {
  const cart = new Cart();
  cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000, 2));
  cart.countMinus(2000);
  cart.countMinus(3333);

  expect(cart.items).toEqual([new Gadget(2000, 'Huawei', 'p40 pro', 100000, 1)]);
});

test('cart countMinus del', () => {
  const cart = new Cart();
  cart.add(new Gadget(2000, 'Huawei', 'p40 pro', 100000, 1));
  cart.countMinus(2000);

  expect(cart.items).toEqual([]);
});