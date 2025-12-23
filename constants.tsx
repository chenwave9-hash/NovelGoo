
import { Novel } from './types';

export const MOCK_NOVELS: Novel[] = [
  {
    id: '1',
    title: 'Cinta di Balik Senja',
    author: 'Andini Putri',
    cover: 'https://picsum.photos/seed/novel1/400/600',
    summary: 'Kisah tentang dua insan yang dipertemukan oleh takdir di sebuah kafe kecil saat senja menyapa Jakarta. Pertemuan yang awalnya hanya kebetulan perlahan menjadi ikatan yang tak terelakkan.',
    category: 'Romance',
    rating: 4.8,
    views: '1.2M',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Pertemuan Tak Terduga', content: 'Di sore yang mendung itu, Maya sedang asyik dengan laptopnya di pojok kafe favoritnya. Aroma kopi yang kuat memenuhi ruangan. Pintu berderit, seorang pria dengan jaket kulit basah kuyup masuk. Pandangan mereka bertemu, dan waktu seolah berhenti.\n\n"Maaf, apa kursi ini kosong?" tanya pria itu dengan suara berat yang terasa familiar.\n\nMaya hanya mengangguk kaku. Dia tidak tahu bahwa pria ini adalah kunci dari masa lalunya yang terkubur rapat.' },
      { id: 2, title: 'Janji yang Terlupa', content: 'Waktu berlalu begitu cepat. Maya tidak menyangka bahwa pria yang duduk di depannya adalah cinta monyetnya saat SMA. Adrian, pria itu, kini tampak lebih dewasa dan matang. Namun, luka di matanya masih sama.\n\n"Kamu masih suka latte tanpa gula, Maya?"\n\nMaya terkesiap. Bagaimana dia bisa ingat?' },
      { id: 3, title: 'Kenangan SMA', content: 'Bayangan masa lalu mulai bermunculan. Adrian bercerita tentang kepergiannya yang mendadak sepuluh tahun lalu tanpa kabar. Maya mendengarkan dengan hati yang bergetar. Ternyata ada rahasia besar di balik kepergian itu.' },
      { id: 4, title: 'Kesempatan Kedua', content: 'Adrian mengajak Maya makan malam di tempat mereka dulu sering menghabiskan waktu. Suasana canggung mulai mencair. "Aku kembali untuk menepati janji itu, Maya," bisik Adrian.' },
      { id: 5, title: 'Akhir yang Bahagia', content: 'Setelah melewati berbagai rintangan dan kesalahpahaman masa lalu, Adrian dan Maya akhirnya memutuskan untuk memulai lembaran baru. Cinta yang sempat tertunda sepuluh tahun kini menemukan pelabuhannya.' }
    ]
  },
  {
    id: '2',
    title: 'Misteri Desa Terlarang',
    author: 'Budi Santoso',
    cover: 'https://picsum.photos/seed/horror_id/400/600',
    summary: 'Sekelompok mahasiswa tersesat di sebuah desa yang tidak ada dalam peta. Teror mulai menghantui mereka saat menyadari desa itu dihuni oleh sesuatu yang bukan manusia.',
    category: 'Horror',
    rating: 4.5,
    views: '800K',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Awal Perjalanan', content: 'Kabut mulai turun menyelimuti hutan pinus. GPS di ponsel Rian tiba-tiba mati total. "Kita harus balik," bisik Siska ketakutan. Namun jalan setapak yang mereka lalui tadi seolah menghilang ditelan kegelapan.' },
      { id: 2, title: 'Gamelan Tengah Malam', content: 'Suara denting gamelan terdengar sayup-sayup dari kejauhan. Padahal tidak ada desa tetangga dalam radius 20 kilometer. Seseorang sedang mengawasi mereka dari balik pepohonan besar.' },
      { id: 3, title: 'Warga yang Aneh', content: 'Mereka sampai di desa. Para warga hanya diam mematung dengan tatapan kosong. Tidak ada suara hewan, tidak ada tangisan bayi. Hanya kesunyian yang mencekam.' },
      { id: 4, title: 'Tumbal Desa', content: 'Rian menemukan sebuah prasasti kuno di tengah desa. Namanya tertulis di sana. Ternyata kedatangan mereka bukan karena tersesat, tapi karena diundang untuk sebuah ritual.' },
      { id: 5, title: 'Melarikan Diri', content: 'Aksi kejar-kejaran terjadi di tengah kegelapan hutan. Siska dan Rian berjuang sekuat tenaga untuk keluar dari lingkaran gaib desa tersebut sebelum matahari terbit.' }
    ]
  },
  {
    id: '3',
    title: 'Pendekar Pedang Langit',
    author: 'Li Wei',
    cover: 'https://picsum.photos/seed/china_action/400/600',
    summary: 'Di dunia di mana kekuatan pedang menentukan segalanya, seorang pemuda dari desa terpencil bangkit menantang langit untuk membalaskan dengam keluarganya.',
    category: 'Action',
    rating: 4.9,
    views: '2.5M',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Kelahiran Sang Legenda', content: 'Petir menyambar di puncak Gunung Salju. Suara tangisan bayi membelah kesunyian malam yang dingin. Di tangannya, tergenggam sebuah giok hitam kuno yang memancarkan aura membunuh.' },
      { id: 2, title: 'Teknik Napas Naga', content: 'Lin Feng berlatih di bawah bimbingan Guru Tua. Dia harus menguasai teknik napas naga untuk menembus tahap kultivasi berikutnya. Tubuhnya terasa terbakar oleh api internal.' },
      { id: 3, title: 'Ujian Sekte Pedang', content: 'Ribuan murid berkumpul untuk ujian masuk Sekte Pedang Langit. Lin Feng yang dianggap sampah oleh orang lain, mengejutkan semua orang dengan satu serangan pedang kayu.' },
      { id: 4, title: 'Lembah Kematian', content: 'Dalam pencarian obat untuk gurunya, Lin Feng memasuki lembah terlarang. Di sana ia menemukan pedang legendaris yang tertidur selama seribu tahun.' },
      { id: 5, title: 'Pertempuran Puncak', content: 'Lin Feng berhadapan dengan musuh bebuyutannya, Jenderal Han. Duel ini akan menentukan siapa yang pantas menyandang gelar Pendekar Pedang Langit sesungguhnya.' }
    ]
  },
  {
    id: '5',
    title: 'Mahkota Selir Agung',
    author: 'Zhang Min',
    cover: 'https://picsum.photos/seed/china_palace/400/600',
    summary: 'Intrik di balik tembok Kota Terlarang. Mei Ling harus menggunakan kecerdasannya untuk bertahan hidup dari persaingan kejam antar selir kaisar demi melindungi keluarganya.',
    category: 'CEO', // Menggunakan kategori CEO sebagai representasi Power/Intrigue di filter yang ada
    rating: 4.6,
    views: '1.5M',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Memasuki Istana', content: 'Mei Ling berdiri di gerbang emas yang menjulang tinggi. Ini adalah awal dari kehidupannya yang baru, atau mungkin awal dari penderitaannya. Dia tidak boleh mempercayai siapapun.' },
      { id: 2, title: 'Racun dalam Teh', content: 'Saat perjamuan malam, Mei Ling menyadari ada yang tidak beres dengan tehnya. Dengan cerdik, dia menukarnya dengan cangkir milik selir yang mencoba menjebaknya.' },
      { id: 3, title: 'Pertemuan dengan Kaisar', content: 'Kaisar terpesona bukan oleh kecantikan Mei Ling, melainkan oleh kemampuannya bermain catur dan strateginya dalam membicarakan urusan negara.' },
      { id: 4, title: 'Pengkhianatan Pelayan', content: 'Pelayan setia Mei Ling ternyata adalah mata-mata dari Permaisuri. Mei Ling harus membuat keputusan sulit sebelum rahasianya terbongkar.' },
      { id: 5, title: 'Sang Penguasa Harem', content: 'Setelah bertahun-tahun penuh intrik, Mei Ling akhirnya dinobatkan sebagai Selir Agung. Namun, tahta itu dibayar dengan harga yang sangat mahal.' }
    ]
  },
  {
    id: '6',
    title: 'The Lady of Rosewood',
    author: 'Eleanor Vance',
    cover: 'https://picsum.photos/seed/europe_romance/400/600',
    summary: 'Kisah romansa bangsawan Inggris di era Victorian. Lady Isabella menolak perjodohan demi mengejar mimpinya sebagai penulis, namun cinta datang di saat yang tidak terduga.',
    category: 'Romance',
    rating: 4.7,
    views: '900K',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Pesta Dansa London', content: 'Isabella membenci gaun korsetnya yang ketat. Dia lebih suka berada di perpustakaan daripada di lantai dansa mencari suami kaya. Namun, Duke of Ashworth terus memperhatikannya.' },
      { id: 2, title: 'Surat Rahasia', content: 'Isabella menulis artikel kritis tentang masyarakat kelas atas di bawah nama samaran. Tanpa ia sadari, Duke of Ashworth adalah penggemar berat tulisannya.' },
      { id: 3, title: 'Skandal di Taman', content: 'Seorang bangsawan licik mencoba merusak reputasi Isabella. Di saat kritis, Duke datang membela kehormatannya di depan seluruh tamu undangan.' },
      { id: 4, title: 'Pelarian ke Pedesaan', content: 'Isabella memutuskan untuk pergi ke desa terpencil di Skotlandia untuk menyelesaikan novelnya. Di sana, ia kembali bertemu dengan Duke yang mengaku sedang melakukan perjalanan bisnis.' },
      { id: 5, title: 'Pernikahan yang Sempurna', content: 'Duke melamar Isabella bukan karena harta, tapi karena ia mencintai pikiran bebas Isabella. Mereka menikah dan Isabella tetap menjadi penulis terkenal di Inggris.' }
    ]
  },
  {
    id: '7',
    title: 'Kutukan Ratu Pantai Selatan',
    author: 'Saraswati',
    cover: 'https://picsum.photos/seed/indo_fantasy/400/600',
    summary: 'Seorang arkeolog muda menemukan artefak kuno di Parangtritis yang membawanya masuk ke dalam dunia gaib penguasa laut selatan.',
    category: 'Horror',
    rating: 4.9,
    views: '2.1M',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Temuan di Pasir Hitam', content: 'Bima membersihkan debu dari kotak perunggu yang ia temukan terkubur di bawah pasir. Begitu kotak terbuka, angin kencang bertiup dan suara ombak menderu seperti suara wanita yang memanggil.' },
      { id: 2, title: 'Gerbang Kerajaan Hijau', content: 'Saat malam bulan purnama, Bima terseret ombak. Bukannya tenggelam, ia justru sampai di sebuah istana megah yang semuanya berwarna hijau giok di dasar laut.' },
      { id: 3, title: 'Pertemuan dengan Kanjeng Ratu', content: 'Sosok anggun dengan mahkota emas menyambutnya. "Kau telah membawa kembali milikku yang hilang, manusia," ucap Sang Ratu dengan suara yang menggetarkan jiwa.' },
      { id: 4, title: 'Ujian Kesetiaan', content: 'Bima diberi pilihan: tinggal di istana selamanya dengan kekayaan abadi, atau kembali ke daratan dengan membawa kutukan yang harus ia pecahkan.' },
      { id: 5, title: 'Warisan Abadi', content: 'Bima berhasil kembali ke dunia nyata. Artefak itu ia kembalikan ke tempatnya semula, namun ia kini memiliki kemampuan untuk melihat dunia yang tak terlihat oleh orang biasa.' }
    ]
  },
  {
    id: '8',
    title: 'Detektif Baker Street',
    author: 'Arthur C. Doyle Jr.',
    cover: 'https://picsum.photos/seed/europe_mystery/400/600',
    summary: 'Kasus-kasus misteri di London yang melibatkan pencurian berlian kerajaan dan konspirasi tingkat tinggi di parlemen Inggris.',
    category: 'Action',
    rating: 4.4,
    views: '650K',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Berlian Biru yang Hilang', content: 'Berlian "Blue Star" raib dari brankas terkunci di Tower of London. Tidak ada jejak kaki, tidak ada jendela yang pecah. Ini adalah kasus yang mustahil.' },
      { id: 2, title: 'Jejak Abu Cerutu', content: 'Detektif William menemukan sedikit abu cerutu di lantai. "Hanya ada satu orang di London yang menghisap merek ini," gumamnya dengan yakin.' },
      { id: 3, title: 'Pertarungan di Dermaga', content: 'Pengejaran berlanjut ke dermaga Thames yang berkabut. William harus berhadapan dengan komplotan pencuri profesional sebelum berlian itu dibawa keluar negeri.' },
      { id: 4, title: 'Dalang di Balik Layar', content: 'Ternyata pencurian ini hanyalah pengalih perhatian dari rencana pembunuhan perdana menteri. William harus berpacu dengan waktu.' },
      { id: 5, title: 'Keadilan Tercipta', content: 'Dengan deduksi yang tajam, William berhasil menangkap pelaku dan mengembalikan berlian tersebut. London kembali aman, untuk sementara waktu.' }
    ]
  },
  {
    id: '4',
    title: 'CEO Dingin dan Sekretarisnya',
    author: 'Rina Wijaya',
    cover: 'https://picsum.photos/seed/novel4/400/600',
    summary: 'Adrian adalah CEO yang kaku dan dingin, sampai dia bertemu dengan sekretaris barunya yang berani menantang aturannya dan mencairkan hatinya.',
    category: 'Romance',
    rating: 4.7,
    views: '3.1M',
    status: 'Completed',
    chapters: [
      { id: 1, title: 'Hari Pertama Kerja', content: 'Lantai 50 gedung perkantoran mewah itu terasa sangat mencekam. Sarah merapikan blusnya sebelum mengetuk pintu besar berwarna mahoni. Dia sudah mendengar reputasi buruk bos barunya.\n\n"Masuk," suara dingin terdengar dari dalam. Sarah menarik napas panjang.' },
      { id: 2, title: 'Lembur Tengah Malam', content: 'Hanya ada mereka berdua di kantor. Adrian terlihat sangat lelah. Sarah memutuskan untuk membuatkan kopi spesial. Untuk pertama kalinya, Adrian tersenyum tipis.' },
      { id: 3, title: 'Perjalanan Bisnis ke Bali', content: 'Di sela-sely rapat padat, Adrian mengajak Sarah jalan-jalan ke tepi pantai. Sifat dinginnya mulai memudar, ia mulai menceritakan masa kecilnya yang kesepian.' },
      { id: 4, title: 'Cemburu', content: 'Adrian melihat Sarah berbincang akrab dengan rekan bisnis mereka. Tanpa sadar, Adrian menunjukkan sikap protektif yang membuat seluruh karyawan kantor heboh.' },
      { id: 5, title: 'Lamaran di Atap Gedung', content: 'Di bawah bintang-bintang Jakarta, Adrian berlutut. "Aku tidak butuh sekretaris lagi, aku butuh pendamping hidup." Sarah menangis bahagia dan menerima lamarannya.' }
    ]
  }
];

export const REWARD_CONFIG = {
  POINTS_PER_MINUTE: 25,
  RUPIAH_PER_POINT: 1,
  REFERRAL_REWARD: 500,
  NEW_USER_REFERRAL_BONUS: 500, // Instant reward for referred users
  MIN_WITHDRAWAL: 500,
  REFERRAL_MIN_READ_TIME: 120 // 2 minutes in seconds
};
