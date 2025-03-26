// Fungsi untuk menambahkan barang ke keranjang
document.addEventListener('DOMContentLoaded', () => {
    const tombolTambahKeranjang = document.querySelectorAll('.add-to-cart');
    const daftarKeranjang = document.getElementById('cart-items');
    const pesanKeranjangKosong = document.getElementById('empty-cart-message');
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

    // Perbarui tampilan keranjang saat halaman dimuat
    perbaruiTampilanKeranjang();

    // Tambahkan event listener untuk setiap tombol "Tambah ke Keranjang"
    tombolTambahKeranjang.forEach(tombol => {
        tombol.addEventListener('click', (event) => {
            const itemMenu = event.target.closest('.menu-item');
            const namaProduk = itemMenu.dataset.name;
            const hargaProduk = parseFloat(itemMenu.dataset.price);

            // Konfirmasi tambah ke keranjang
            if (confirm(`Apakah Anda yakin ingin menambahkan ${namaProduk} ke keranjang?`)) {
                // Cek apakah produk sudah ada di keranjang
                const produkAda = keranjang.find(item => item.nama === namaProduk);

                if (produkAda) {
                    // Tambah jumlah jika produk sudah ada
                    produkAda.jumlah += 1;
                } else {
                    // Tambah produk baru ke keranjang
                    keranjang.push({
                        nama: namaProduk,
                        harga: hargaProduk,
                        jumlah: 1
                    });
                }

                // Simpan ke localStorage
                localStorage.setItem('keranjang', JSON.stringify(keranjang));

                // Perbarui tampilan keranjang
                perbaruiTampilanKeranjang();
            }
        });
    });

    // Fungsi untuk memperbarui tampilan keranjang
    function perbaruiTampilanKeranjang() {
        if (daftarKeranjang) {
            // Kosongkan keranjang
            daftarKeranjang.innerHTML = '';

            if (keranjang.length === 0) {
                // Tampilkan pesan keranjang kosong
                pesanKeranjangKosong.style.display = 'block';
            } else {
                // Sembunyikan pesan keranjang kosong
                pesanKeranjangKosong.style.display = 'none';

                // Tampilkan item-item di keranjang
                keranjang.forEach((item, index) => {
                    const itemKeranjang = document.createElement('div');
                    itemKeranjang.classList.add('item-keranjang');
                    itemKeranjang.innerHTML = `
                        <span>${item.nama}</span>
                        <span>Rp. ${item.harga.toLocaleString()}</span>
                        <span>Jumlah: ${item.jumlah}</span>
                        <button onclick="hapusItemKeranjang(${index})">Hapus</button>
                    `;
                    daftarKeranjang.appendChild(itemKeranjang);
                });
            }
        }
    }

    // Fungsi global untuk menghapus item dari keranjang
    window.hapusItemKeranjang = function (index) {
        keranjang.splice(index, 1);
        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        perbaruiTampilanKeranjang();
    }
});

// Fungsi untuk menu hamburger (untuk layar kecil)
document.addEventListener('DOMContentLoaded', () => {
    const tombolMenu = document.querySelector('.hamburger-menu');
    const menuMobile = document.querySelector('.menu-mobile');

    if (tombolMenu && menuMobile) {
        tombolMenu.addEventListener('click', () => {
            menuMobile.classList.toggle('aktif');
            tombolMenu.classList.toggle('aktif');
        });
    }
});