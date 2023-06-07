import Buyable from '../domain/Buyable';

export default class Cart {
  private _items: Buyable[] = [];

  // метод добавляет товар в корзину
  add(item: Buyable): void {
    const index: number = this.searchId(item.id);

    if (index === -1) { this._items.push(item) };
    if (index != -1) { this.countPlus(item.id, item.count) };
  }

  // метод для вывода товаров в корзине
  get items(): Buyable[] {
    return [...this._items];
  }

  // метод, считающий суммарную стоимость (без учёта скидки)
  sum(): number {
    if (this._items.length > 0) {
      return this.items.reduce((a, b) => {
        if (b.count) { return a + b.count * b.price };
        return a + b.price
      }, 0);
    }
    return 0;
  }

  // метод, считающий суммарную стоимость (с учётом скидки)
  sumDiscount(discount: number): number {
    try {
      if (discount < 0) { throw new Error('Скидка не может быть меньше 0%') };
      if (discount > 100) { throw new Error('Скидка не может быть больше 100%')};

      const sum: number = this.sum();
      return sum - sum / 100 * discount;
    } catch (err) {
      throw err;
    }
  }

  // метод, позволяющий удалять уже добавленный в корзину объект по полю id
  del(id: number): void {
    try {
      const index: number = this.searchId(id);

      if (index === -1) { throw new Error(`Товар c id = ${id} не найден`) };

      this._items.splice(index,1);
    } catch (err) {
      throw err;
    }
  }

  // метод находит индекс товара по его ID
  searchId(id: number): number {
    return this._items.findIndex((value: { id: number; }) => value.id === id);
  }

  // метод увеличивает количество девайсов
  countPlus(id: number, itemCount: number = 1): void {
    const index: number = this.searchId(id);
    let count: number | undefined = this._items[index]?.count;

    if (count) {
      this._items[index].count = count + itemCount;
    }
  }

  // метод уменьшает количество девайсов
  countMinus(id: number): void {
    const index: number = this.searchId(id);
    let count: number | undefined = this._items[index]?.count;

    if (count && count > 1) {
      this._items[index].count = count - 1;
    }

    if (count === 1) {
      this.del(id);
    }
  }
}