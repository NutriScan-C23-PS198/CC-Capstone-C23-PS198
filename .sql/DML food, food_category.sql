USE NutriScan;

#
# Kategori
#

INSERT INTO food_category (id, name) VALUES (1, 'uncategorized');

INSERT INTO food_category (name) VALUES ('onde');

INSERT INTO food_category (name) VALUES ('esbuah');

INSERT INTO food_category (name) VALUES ('tempe');

INSERT INTO food_category (name) VALUES ('capcay');

INSERT INTO food_category (name) VALUES ('seafood');

INSERT INTO food_category (name) VALUES ('tahu');

INSERT INTO food_category (name) VALUES ('martabak');

INSERT INTO food_category (name) VALUES ('gorengan');

INSERT INTO food_category (name) VALUES ('gelas');

INSERT INTO food_category (name) VALUES ('telur');

INSERT INTO food_category (name) VALUES ('eskrim');

INSERT INTO food_category (name) VALUES ('pisang');

INSERT INTO food_category (name) VALUES ('bubur');

INSERT INTO food_category (name) VALUES ('nan');

INSERT INTO food_category (name) VALUES ('bakwan');

INSERT INTO food_category (name) VALUES ('kentang');

INSERT INTO food_category (name) VALUES ('bakso');

INSERT INTO food_category (name) VALUES ('jajanPasar');

INSERT INTO food_category (name) VALUES ('sayurbayam');

INSERT INTO food_category (name) VALUES ('steak');

INSERT INTO food_category (name) VALUES ('burger');

INSERT INTO food_category (name) VALUES ('sate');

INSERT INTO food_category (name) VALUES ('batagor');

INSERT INTO food_category (name) VALUES ('kaleng');

INSERT INTO food_category (name) VALUES ('jeruk');

INSERT INTO food_category (name) VALUES ('kue');

INSERT INTO food_category (name) VALUES ('ketoprak');

INSERT INTO food_category (name) VALUES ('pempek');

INSERT INTO food_category (name) VALUES ('mie');

INSERT INTO food_category (name) VALUES ('nugget');

INSERT INTO food_category (name) VALUES ('nasi');

INSERT INTO food_category (name) VALUES ('donat');

INSERT INTO food_category (name) VALUES ('ayam');

INSERT INTO food_category (name) VALUES ('mie, bakso');

INSERT INTO food_category (name) VALUES ('bakpia');

INSERT INTO food_category (name) VALUES ('buah');

INSERT INTO food_category (name) VALUES ('mufin');

INSERT INTO food_category (name) VALUES ('cakwe');

INSERT INTO food_category (name) VALUES ('sup');

INSERT INTO food_category (name) VALUES ('gudeg');

INSERT INTO food_category (name) VALUES ('anggur');

INSERT INTO food_category (name) VALUES ('apel');

INSERT INTO food_category (name) VALUES ('buah, jeruk');

INSERT INTO food_category (name) VALUES ('durian');

INSERT INTO food_category (name) VALUES ('ikan');

INSERT INTO food_category (name) VALUES ('gelas, cup');

#
# Food
#

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Mie', (SELECT id FROM food_category WHERE name = 'mie'), 100, 'g', 70);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pasta', (SELECT id FROM food_category WHERE name = 'mie'), 100, 'g', 110);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kentang Rebus', (SELECT id FROM food_category WHERE name = 'kentang'), 100, 'g', 70);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kentang Panggang', (SELECT id FROM food_category WHERE name = 'kentang'), 100, 'g', 140);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Nasi putih', (SELECT id FROM food_category WHERE name = 'nasi'), 100, 'g', 140);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Nasi Merah', (SELECT id FROM food_category WHERE name = 'nasi'), 100, 'g', 135);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Daging Ayam ', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 200);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kepiting', (SELECT id FROM food_category WHERE name = 'seafood'), 100, 'g', 110);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bebek Panggang', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 430);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Apel', (SELECT id FROM food_category WHERE name = 'apel'), 100, 'g', 44);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pisang', (SELECT id FROM food_category WHERE name = 'buah'), 100, 'g', 65);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Brokoli', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 32);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kubis', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 20);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Wortel', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 25);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ceri', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 50);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kurma', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 235);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Timun', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 10);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kiwi', (SELECT id FROM food_category WHERE name = 'buah'), 100, 'g', 50);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Selada', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 15);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Melon', (SELECT id FROM food_category WHERE name = 'buah'), 100, 'g', 28);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jamur Rebus', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 12);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jamur Goreng', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 145);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Onion Ring', (SELECT id FROM food_category WHERE name = 'gorengan'), 100, 'g', 155);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jeruk', (SELECT id FROM food_category WHERE name = 'jeruk'), 100, 'g', 30);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Peach', (SELECT id FROM food_category WHERE name = 'buah, jeruk'), 100, 'g', 30);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Plum', (SELECT id FROM food_category WHERE name = 'buah, jeruk'), 100, 'g', 39);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bayam', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 8);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Stroberi', (SELECT id FROM food_category WHERE name = 'buah'), 100, 'g', 30);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jagung Manis', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 130);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Keju Chedar', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 260);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Krim Keju', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 428);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Custard', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 100);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Telur', (SELECT id FROM food_category WHERE name = 'telur'), 100, 'g', 150);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Telur Goreng', (SELECT id FROM food_category WHERE name = 'telur'), 100, 'g', 180);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ice Cream', (SELECT id FROM food_category WHERE name = 'eskrim'), 100, 'g', 180);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Susu Kedelai', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 36);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Omelet Keju', (SELECT id FROM food_category WHERE name = 'telur'), 100, 'g', 266);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Yogurt', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 60);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Low Fat Yogurt', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 45);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Madu', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 280);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Coklat', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 500);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Alpukat', (SELECT id FROM food_category WHERE name = 'buah'), 1, 'piece', 150);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jambu', (SELECT id FROM food_category WHERE name = 'buah'), 1, 'piece', 24);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Mangga', (SELECT id FROM food_category WHERE name = 'buah'), 1, 'piece', 40);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pir', (SELECT id FROM food_category WHERE name = 'nan'), 1, 'piece', 45);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tomat', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 20);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Daging Babi', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 450);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Daging Kelinci', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 180);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Salmon segar', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 180);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Daging Sapi Panggang', (SELECT id FROM food_category WHERE name = 'steak'), 100, 'g', 280);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bubur', (SELECT id FROM food_category WHERE name = 'bubur'), 200, 'g', 44);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Mie Instan', (SELECT id FROM food_category WHERE name = 'mie'), 50, 'g', 168);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bihun Goreng', (SELECT id FROM food_category WHERE name = 'mie'), 150, 'g', 296);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bubur Ayam', (SELECT id FROM food_category WHERE name = 'bubur'), 200, 'g', 165);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bubur Sumsum', (SELECT id FROM food_category WHERE name = 'bubur'), 100, 'g', 178);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kentang Goreng', (SELECT id FROM food_category WHERE name = 'kentang'), 150, 'g', 211);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Mie Goreng', (SELECT id FROM food_category WHERE name = 'mie'), 200, 'g', 321);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Nasi Goreng', (SELECT id FROM food_category WHERE name = 'nasi'), 100, 'g', 267);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Spageti', (SELECT id FROM food_category WHERE name = 'mie'), 300, 'g', 642);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tape Singkong', (SELECT id FROM food_category WHERE name = 'nan'), 150, 'g', 260);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Bakar Bumbu Kuning', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 129);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Panggang', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 164);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Mas Pepes', (SELECT id FROM food_category WHERE name = 'ikan'), 200, 'g', 144);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sambal Goreng Tempe', (SELECT id FROM food_category WHERE name = 'nan'), 50, 'g', 116);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Telur Asin Rebus', (SELECT id FROM food_category WHERE name = 'telur'), 75, 'g', 97);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ati Ayam ', (SELECT id FROM food_category WHERE name = 'nan'), 50, 'g', 98);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Pop', (SELECT id FROM food_category WHERE name = 'ayam'), 200, 'g', 265);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bakso Daging Sapi', (SELECT id FROM food_category WHERE name = 'bakso'), 100, 'g', 260);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Empal Sapi', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 147);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Bandeng Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 160, 'g', 181);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Bawal Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 120, 'g', 113);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Kembung Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 80, 'g', 88);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Lele Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 60, 'g', 58);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Patin Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 200, 'g', 253);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Tenggiri Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 60, 'g', 85);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Teri Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 50, 'g', 66);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Tuna Goreng', (SELECT id FROM food_category WHERE name = 'ikan'), 60, 'g', 110);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tahu Bacem', (SELECT id FROM food_category WHERE name = 'tahu'), 100, 'g', 147);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Telur Mata Saoi', (SELECT id FROM food_category WHERE name = 'telur'), 60, 'g', 40);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tempe Bacem', (SELECT id FROM food_category WHERE name = 'tempe'), 50, 'g', 157);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tempe Goreng', (SELECT id FROM food_category WHERE name = 'tempe'), 50, 'g', 118);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tenggiri Bumbu Kuning', (SELECT id FROM food_category WHERE name = 'ikan'), 90, 'g', 94);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Udang Goreng', (SELECT id FROM food_category WHERE name = 'seafood'), 80, 'g', 68);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Kecap', (SELECT id FROM food_category WHERE name = 'ayam'), 75, 'g', 359);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sayap Ayam ', (SELECT id FROM food_category WHERE name = 'ayam'), 50, 'g', 147);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Dendeng Balado', (SELECT id FROM food_category WHERE name = 'nan'), 40, 'g', 338);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Kari', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 165);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Cumi Kari', (SELECT id FROM food_category WHERE name = 'seafood'), 100, 'g', 183);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Rendang', (SELECT id FROM food_category WHERE name = 'nan'), 75, 'g', 286);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sate Ayam', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 466);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sayap Ayam Kentucky', (SELECT id FROM food_category WHERE name = 'ayam'), 150, 'g', 195);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sop Daging Sapi', (SELECT id FROM food_category WHERE name = 'sup'), 260, 'g', 227);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tahu Goreng', (SELECT id FROM food_category WHERE name = 'tahu'), 100, 'g', 111);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Omelet ', (SELECT id FROM food_category WHERE name = 'telur'), 75, 'g', 188);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sayur Bayem', (SELECT id FROM food_category WHERE name = 'sup'), 50, 'g', 18);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Cah Labu Siam', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 42);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sayur Asem', (SELECT id FROM food_category WHERE name = 'sayurbayam'), 100, 'g', 88);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sop Ayam', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 95);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sop Telur Puyuh', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 116);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sayur Lodeh', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 61);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tumis Buncis', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 52);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tumis Daun Singkong', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 151);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Buntil', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 106);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Gudeg', (SELECT id FROM food_category WHERE name = 'gudeg'), 150, 'g', 132);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Teh Tawar', (SELECT id FROM food_category WHERE name = 'gelas'), 1, 'portion', 0);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Teh Manis', (SELECT id FROM food_category WHERE name = 'gelas'), 1, 'portion', 104);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kopi', (SELECT id FROM food_category WHERE name = 'gelas'), 1, 'cup', 18);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jus Tomat', (SELECT id FROM food_category WHERE name = 'gelas'), 1, 'glass', 20);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jus Melon', (SELECT id FROM food_category WHERE name = 'gelas, cup'), 1, 'glass', 35);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Es Kelapa Muda', (SELECT id FROM food_category WHERE name = 'gelas'), 100, 'g', 42);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Es Cendol', (SELECT id FROM food_category WHERE name = 'gelas'), 100, 'g', 168);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Coca-Cola Diet', (SELECT id FROM food_category WHERE name = 'kaleng'), 1, 'can', 1);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Asinan', (SELECT id FROM food_category WHERE name = 'nan'), 250, 'g', 208);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Gado-Gado', (SELECT id FROM food_category WHERE name = 'ketoprak'), 150, 'g', 295);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ketoprak', (SELECT id FROM food_category WHERE name = 'ketoprak'), 250, 'g', 153);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pempek', (SELECT id FROM food_category WHERE name = 'pempek'), 200, 'g', 384);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Rawon', (SELECT id FROM food_category WHERE name = 'sup'), 160, 'g', 331);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Ayam', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 101);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Padang', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 127);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Tongseng', (SELECT id FROM food_category WHERE name = 'nan'), 120, 'g', 331);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Hamburger', (SELECT id FROM food_category WHERE name = 'burger'), 125, 'g', 257);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kerupuk Udang', (SELECT id FROM food_category WHERE name = 'nan'), 20, 'g', 72);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Mie Bakso', (SELECT id FROM food_category WHERE name = 'mie, bakso'), 200, 'g', 302);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Nasi Tim Ayam', (SELECT id FROM food_category WHERE name = 'nasi'), 420, 'g', 588);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pizza', (SELECT id FROM food_category WHERE name = 'nan'), 125, 'g', 163);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sate Kambing', (SELECT id FROM food_category WHERE name = 'nan'), 180, 'g', 729);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sayur Krecek', (SELECT id FROM food_category WHERE name = 'nan'), 175, 'g', 249);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Siomay', (SELECT id FROM food_category WHERE name = 'batagor'), 100, 'g', 361);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Makasar', (SELECT id FROM food_category WHERE name = 'sup'), 150, 'g', 525);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Belimbing', (SELECT id FROM food_category WHERE name = 'nan'), 160, 'g', 80);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Duku', (SELECT id FROM food_category WHERE name = 'nan'), 200, 'g', 81);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jambu Air', (SELECT id FROM food_category WHERE name = 'nan'), 60, 'g', 35);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Jambu Biji', (SELECT id FROM food_category WHERE name = 'nan'), 320, 'g', 157);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Nanas', (SELECT id FROM food_category WHERE name = 'buah'), 200, 'g', 104);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pepaya', (SELECT id FROM food_category WHERE name = 'buah'), 100, 'g', 46);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pisang rebus', (SELECT id FROM food_category WHERE name = 'nan'), 125, 'g', 137);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Semangka', (SELECT id FROM food_category WHERE name = 'buah'), 150, 'g', 48);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Anggur', (SELECT id FROM food_category WHERE name = 'anggur'), 125, 'g', 60);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kelengkeng', (SELECT id FROM food_category WHERE name = 'anggur'), 100, 'g', 79);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pisang Ambon', (SELECT id FROM food_category WHERE name = 'pisang'), 100, 'g', 74);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pisang Barangan', (SELECT id FROM food_category WHERE name = 'pisang'), 200, 'g', 236);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pisang Mas', (SELECT id FROM food_category WHERE name = 'pisang'), 125, 'g', 120);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pisang Raja', (SELECT id FROM food_category WHERE name = 'pisang'), 150, 'g', 126);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sirsak', (SELECT id FROM food_category WHERE name = 'nan'), 125, 'g', 55);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Durian', (SELECT id FROM food_category WHERE name = 'durian'), 100, 'g', 134);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Rambutan', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 69);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sawo', (SELECT id FROM food_category WHERE name = 'buah'), 100, 'g', 92);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Arem-Arem', (SELECT id FROM food_category WHERE name = 'nan'), 75, 'g', 225);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bubur Kacang Ijo', (SELECT id FROM food_category WHERE name = 'bubur'), 100, 'g', 102);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Lemper', (SELECT id FROM food_category WHERE name = 'jajanPasar'), 70, 'g', 247);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bolu Gulung', (SELECT id FROM food_category WHERE name = 'nan'), 110, 'g', 300);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Cakwe', (SELECT id FROM food_category WHERE name = 'cakwe'), 50, 'g', 143);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Getuk', (SELECT id FROM food_category WHERE name = 'nan'), 60, 'g', 127);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kerak Telur', (SELECT id FROM food_category WHERE name = 'nan'), 120, 'g', 599);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kue Pancong', (SELECT id FROM food_category WHERE name = 'nan'), 80, 'g', 231);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Serabi', (SELECT id FROM food_category WHERE name = 'nan'), 60, 'g', 137);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Semar Mendem', (SELECT id FROM food_category WHERE name = 'nan'), 100, 'g', 247);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bakpia', (SELECT id FROM food_category WHERE name = 'bakpia'), 25, 'g', 68);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bakwan', (SELECT id FROM food_category WHERE name = 'bakwan'), 100, 'g', 270);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Bika Ambon', (SELECT id FROM food_category WHERE name = 'jajanPasar'), 50, 'g', 99);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kue Black Forrest', (SELECT id FROM food_category WHERE name = 'kue'), 200, 'g', 585);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kue Keju', (SELECT id FROM food_category WHERE name = 'kue'), 10, 'g', 281);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Donat Keju', (SELECT id FROM food_category WHERE name = 'donat'), 170, 'g', 283);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Klepon', (SELECT id FROM food_category WHERE name = 'onde'), 60, 'g', 68);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kue Cubit', (SELECT id FROM food_category WHERE name = 'jajanPasar'), 60, 'g', 183);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kue Cucur', (SELECT id FROM food_category WHERE name = 'jajanPasar'), 90, 'g', 152);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kue Lumpur', (SELECT id FROM food_category WHERE name = 'jajanPasar'), 80, 'g', 232);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kue Pukis', (SELECT id FROM food_category WHERE name = 'jajanPasar'), 40, 'g', 181);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Lapis Legit', (SELECT id FROM food_category WHERE name = 'jajanPasar'), 50, 'g', 307);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Lumpia', (SELECT id FROM food_category WHERE name = 'gorengan'), 60, 'g', 76);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Martabak Keju', (SELECT id FROM food_category WHERE name = 'martabak'), 100, 'g', 265);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Martabak Mesir', (SELECT id FROM food_category WHERE name = 'martabak'), 100, 'g', 200);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Martabak Telur', (SELECT id FROM food_category WHERE name = 'martabak'), 95, 'g', 196);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Muffin Coklat', (SELECT id FROM food_category WHERE name = 'mufin'), 80, 'g', 361);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Muffin Keju', (SELECT id FROM food_category WHERE name = 'mufin'), 80, 'g', 400);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Onde Onde', (SELECT id FROM food_category WHERE name = 'onde'), 65, 'g', 317);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pastel', (SELECT id FROM food_category WHERE name = 'gorengan'), 75, 'g', 302);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Risol', (SELECT id FROM food_category WHERE name = 'gorengan'), 100, 'g', 247);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sosis Solo', (SELECT id FROM food_category WHERE name = 'gorengan'), 50, 'g', 191);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Capcay', (SELECT id FROM food_category WHERE name = 'capcay'), 1, 'portion', 340);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kroket', (SELECT id FROM food_category WHERE name = 'gorengan'), 1, 'piece', 146);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Perkedel', (SELECT id FROM food_category WHERE name = 'gorengan'), 50, 'g', 123);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ikan Tongkol', (SELECT id FROM food_category WHERE name = 'ikan'), 100, 'g', 117);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Mie ayam', (SELECT id FROM food_category WHERE name = 'mie'), 1, 'portion', 500);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Kolak Pisang', (SELECT id FROM food_category WHERE name = 'esbuah'), 120, 'g', 196);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Nasi Uduk', (SELECT id FROM food_category WHERE name = 'nasi'), 100, 'g', 116);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Siomay Bandung', (SELECT id FROM food_category WHERE name = 'batagor'), 35, 'g', 105);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ketan Putih', (SELECT id FROM food_category WHERE name = 'nasi'), 200, 'g', 163);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pempek Kapal Selam', (SELECT id FROM food_category WHERE name = 'pempek'), 60, 'g', 226);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Pempek Lenjer Kecil', (SELECT id FROM food_category WHERE name = 'pempek'), 1, 'piece', 110);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Combro', (SELECT id FROM food_category WHERE name = 'gorengan'), 50, 'g', 105);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Cilok', (SELECT id FROM food_category WHERE name = 'bakso'), 100, 'g', 266);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Mie Aceh', (SELECT id FROM food_category WHERE name = 'mie'), 1, 'portion', 238);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Es Teler', (SELECT id FROM food_category WHERE name = 'esbuah'), 200, 'g', 219);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Nugget', (SELECT id FROM food_category WHERE name = 'nugget'), 1, 'piece', 38);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Goreng', (SELECT id FROM food_category WHERE name = 'ayam'), 1, 'piece', 190);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Goreng Kalasan (paha atas)', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 275);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Goreng Tepung (Dada)', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 298);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Goreng Tepung (Sayap)', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 297);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Ayam Goreng Tepung (Paha Atas)', (SELECT id FROM food_category WHERE name = 'ayam'), 100, 'g', 286);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Rawon', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 60);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sop Konro', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 71);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Bandung', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 42);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Banjar', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 110);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Betawi', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 135);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Kudus', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 38);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Madura', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 60);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Soto Pekalongan', (SELECT id FROM food_category WHERE name = 'sup'), 100, 'g', 94);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sate Ayam', (SELECT id FROM food_category WHERE name = 'sate'), 1, 'skewer', 34);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sate Padang', (SELECT id FROM food_category WHERE name = 'sate'), 100, 'g', 161);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('sate taichan', (SELECT id FROM food_category WHERE name = 'sate'), 1, 'skewer', 36);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sate Maranggi', (SELECT id FROM food_category WHERE name = 'sate'), 1, 'portion', 383);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sate Kambing', (SELECT id FROM food_category WHERE name = 'sate'), 100, 'g', 216);

INSERT INTO food (name, category_id, portion, unit, callories) VALUES ('Sate Usus', (SELECT id FROM food_category WHERE name = 'sate'), 1, 'skewer', 21);

#END
