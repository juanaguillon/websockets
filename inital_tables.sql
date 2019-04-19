
CREATE TABLE `users` (
  `id` int(15) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `registerat` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE `products` (
  `id_prod` int(15) NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  `name_prod` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `price_prod` int(11) DEFAULT NULL,
  `desc_prod` text COLLATE utf8_spanish2_ci,
  `registerat_prod` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;