document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'EXPRESSO', img: '1.png', price: 25000 },
      { id: 2, name: 'Caramel Coffee', img: '2.png', price: 27000 },
      { id: 3, name: 'Americano', img: '3.png', price: 35000 },
      { id: 4, name: 'Fruit Fresh', img: '4.png', price: 15000 },
      { id: 5, name: 'Spesial Mix', img: '5.png', price: 100000 },
    ],
  }))

  Alpine.store('cart', {
    items: [],
    quantity: 0,
    total: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id)

      // jika belum ada / cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price })
        this.quantity++
        this.total += newItem.price
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++
            item.total = newItem.price * item.quantity
            this.quantity++
            this.total += item.price
            return item
          }
        })
      }
    },
    remove(id) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id)

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika burang bakan yang diclick
          if (item.id !== id) {
            return item
          } else {
            item.quantity--
            item.total = item.price * item.quantity
            this.quantity--
            this.total -= item.price
            return item
          }
        })
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id)
        this.quantity--
        this.total -= cartItem.price
      }
    },
  })
})

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}