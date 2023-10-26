-- Bu artık bir yorum satırıdır. SingleLine.

/*
	MultiLine
	Comment
*/

-- SELECT 1 AS one -- Tek block işlemler için noktalı-virgül zorunlu değildir.

-- SELECT 1 AS one; -- Bundan sonrası yorumdur. SELECT 2 AS one;

-- SELECT 1 AS One, /* Araya yorum ekleyebilirim. */ 2 AS Two;

-- NOT Case-Sensitive (Case-Insensitive):
-- select 1 AS one; -- Piyasa standardına uygun değildir.
-- SELECT 2 AS TWO;

-- * Piyasa Standartları:
-- * * SQL Temel komutları BÜYÜK harfle yazılır. SELECT * FROM Album WHERE AlbumID=1;
-- * * String verilerde tek-çift tırnak kullanabilirsiniz. Standart olan tek tırnaktır.  SELECT 'string' AS yazi;
-- * * Her bir temel komut yeni bir satıra yazılır:
/*
SELECT	* 
FROM	Album 
WHERE	AlbumID=1;
*/

--- --- --- SQL --- --- ---

-- * SELECT - Seç getir.
-- * FROM - Hangi tablodan?
-- SELECT * FROM Album; -- '*' = Tüm sutunlar.
-- SELECT AlbumId, Title FROM Album; -- İstediğim sutunları getir. -- Tavsiye edilen yöntem ayrı-ayrı yazmaktır.

-- * AS -- Tablo veya Sutunları geçici adlandırmak için kullanılır. -- Lakap Takma
-- SELECT 'data' AS baslik; -- Data gönder.
-- SELECT 1+2  AS sonuc; -- Matematiksel ifade yazdır.
-- SELECT AlbumId AS numara, Title AS baslik FROM Album; -- Sutun isimlendirme
-- SELECT AlbumId+3 AS numara, Title AS baslik FROM Album;
-- SELECT Album.AlbumId, Album.Title FROM Album;
-- SELECT a.AlbumId, a.Title FROM Album AS a; -- Tablo isimlendirme
-- SELECT a.AlbumId AS Numara, a.Title AS Baslik FROM Album AS a;
-- SELECT a.AlbumId Numara, a.Title Baslik FROM Album a; -- AS kullanmadan da isimlendirme yapabiliriz.

-- * DISTINCT - Tekrar edilen kayıtarın tekrar edilmesini engeller (tek kayıt olarak getirir)
-- SELECT DISTINCT City FROM Customer;
-- SELECT DISTINCT City, Country FROM Customer; -- Bütün sutunlardaki ortak olanları 1 kere getirir.

-- * WHERE - Filtreleme
-- SELECT * FROM Customer WHERE Country = 'USA' -- Eşit olanları getir.
-- SELECT * FROM Customer WHERE Country != 'USA' -- Eşit olMAanları getir.
-- SELECT * FROM Customer WHERE Country <> 'USA' -- Eşit olMAanları getir.
-- SELECT * FROM Customer WHERE CustomerId > 20 -- Büyük olanları getir.
-- SELECT * FROM Customer WHERE CustomerId >= 20 -- BüyükEşit olanları getir.
-- SELECT * FROM Customer WHERE CustomerId < 20 -- Küçük olanları getir.
-- SELECT * FROM Customer WHERE CustomerId <= 20 -- KüçükEşit olanları getir.
-- SELECT * FROM Customer WHERE CustomerId BETWEEN 10 AND 20 -- 10 ile 20 arasında olanları getir. (her ikiside dahil)

-- * WHERE - AND/OR/NOT
-- * SELECT * FROM table WHERE True OR NOT True
-- SELECT * FROM Customer WHERE NOT Country = 'USA'
-- SELECT * FROM Customer WHERE Country = 'USA' AND Company NOT NULL
-- SELECT * FROM Customer WHERE Country = 'USA' OR Country = 'Brazil' OR Country='Denmark';
-- SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Brazil' OR Country='Denmark') AND CustomerId > 25;
-- SELECT * FROM Customer WHERE (Country = 'USA' OR Country = 'Brazil' OR Country='Denmark') AND (CustomerId BETWEEN 25 AND 27)

-- * WHERE - IN / NOT IN
-- SELECT * FROM Customer WHERE Country IN ('USA', 'Brazil', 'Denmark');
-- SELECT * FROM Customer WHERE Country NOT IN ('USA', 'Brazil', 'Denmark');
-- SELECT * FROM Customer WHERE CustomerID IN (2,3,4,10,11);

-- * WHERE - LIKE (SpecialChars: % = JokerChar, _ = SingleChar)
-- SELECT * FROM Customer WHERE Country LIKE 'USA'; -- "USA" olanlar.
-- SELECT * FROM Customer WHERE Address LIKE '627 Broadway'; -- "627 Broadway" olanlar.
-- SELECT * FROM Customer WHERE Address LIKE '1498%';  -- "1498" ile başlayan kayıtlar.
-- SELECT * FROM Customer WHERE Address LIKE '%langer';  -- "langer" ile biten kayıtlar.
-- SELECT * FROM Customer WHERE Address LIKE '%rue%';  -- içinde "rue" geçen kayıtlar.
-- SELECT * FROM Customer WHERE Phone LIKE '_55 %'; -- 2. ve 3. karakteri 55 olan kayıtlar.
-- SELECT * FROM Customer WHERE Address LIKE '_a_%'; -- 2 karakteri "a" olan ve en az 3 karakter olan.
-- SELECT * FROM Customer WHERE Phone LIKE '+__ 030%'; -- Ülke kodu bilinmeyen 030 ile başlaya telefonlar.
-- SELECT * FROM Customer WHERE Phone LIKE '+__ 030%' AND FirstName = 'Niklas'; -- Niklas isimli 030 ile başlayan numaralı kayıtlar.

-- * ORDER BY - Sıralama
-- * ASC - A-Z Sıralama
-- * DESC - Z-A Sıralama
-- SELECT * FROM Customer ORDER BY Country ASC; -- Normal Sıralama
-- SELECT * FROM Customer ORDER BY Country; -- Default: ASC
-- SELECT * FROM Customer ORDER BY Country DESC; -- Ters Sıralama
-- SELECT * FROM Customer ORDER BY Country ASC, City ASC, LastName ASC; -- Sırasıyla ülke - şehir ve soyisim sırala.
-- SELECT * FROM Customer ORDER BY Country, City, LastName; -- Sırasıyla ülke - şehir ve soyisim sırala.
-- SELECT * FROM Customer WHERE Country IN ('USA', 'Brazil') AND CustomerId > 12 AND Company NOT NULL ORDER BY Company ASC
/* 
-- Piyasada standartı her satıra ayrı ayrı yazmaktır:
SELECT * 
FROM Customer 
WHERE Country IN ('USA', 'Brazil') 
	AND CustomerId > 12
	AND Company NOT NULL 
ORDER BY Company ASC 
*/

-- * LIMIT - Belli sayıda kayıt getir.
-- SELECT * FROM Customer LIMIT 0, 10;  -- LIMIT kaçıncı kayıttan itibaren, kaç ADET kayıt.
-- SELECT * FROM Customer LIMIT 5 -- Başlangıç default: 0
-- SELECT * FROM Customer LIMIT 10, 5;  -- 10. kayıttan sonraki (yani 11. kayıttan itibaren) 5 adet kaydı getir.
-- SELECT * FROM Customer ORDER BY LastName ASC, FirstName DESC LIMIT 0, 5; -- Sıralamaya göre ilk 5 kayıt.
-- SELECT * FROM Customer ORDER BY LastName ASC, FirstName DESC LIMIT 5, 5; -- Sıralamaya göre ikinci 5 kayıt.
