-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2021 a las 06:00:09
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hanoi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etnia`
--

CREATE TABLE `etnia` (
  `id_etnia` int(11) NOT NULL,
  `name_etnia` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `etnia`
--

INSERT INTO `etnia` (`id_etnia`, `name_etnia`) VALUES
(1, 'Mestizo'),
(2, 'Montubio'),
(3, 'Afroecuatoriano'),
(4, 'Indigena'),
(5, 'Blanco'),
(6, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `figura`
--

CREATE TABLE `figura` (
  `id_figura` int(11) NOT NULL,
  `name_figura` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `figura`
--

INSERT INTO `figura` (`id_figura`, `name_figura`) VALUES
(1, 'Rectangulo'),
(2, 'Circulo'),
(3, 'Triangulo'),
(4, 'Cuadrado'),
(5, 'Elipse');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

CREATE TABLE `genero` (
  `id_gen` int(11) NOT NULL,
  `name_gen` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genero`
--

INSERT INTO `genero` (`id_gen`, `name_gen`) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Sin Especificar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `email_user` varchar(50) NOT NULL,
  `nick_user` varchar(25) NOT NULL,
  `id_etnia` int(11) NOT NULL,
  `id_gen` int(11) NOT NULL,
  `id_figura` int(11) NOT NULL,
  `names_user` varchar(50) NOT NULL,
  `last_user` varchar(50) NOT NULL,
  `ci_user` varchar(10) NOT NULL,
  `password_user` varchar(50) NOT NULL,
  `number_user` int(11) NOT NULL,
  `country_user` varchar(25) NOT NULL,
  `province_user` varchar(35) NOT NULL,
  `sector_user` varchar(50) NOT NULL,
  `phone_user` varchar(15) NOT NULL,
  `edad_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etnia`
--
ALTER TABLE `etnia`
  ADD PRIMARY KEY (`id_etnia`);

--
-- Indices de la tabla `figura`
--
ALTER TABLE `figura`
  ADD PRIMARY KEY (`id_figura`);

--
-- Indices de la tabla `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id_gen`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`,`email_user`,`nick_user`),
  ADD KEY `etnia_usuario_fk` (`id_etnia`),
  ADD KEY `genero_usuario_fk` (`id_gen`),
  ADD KEY `figura_usuario_fk` (`id_figura`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `etnia`
--
ALTER TABLE `etnia`
  MODIFY `id_etnia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `figura`
--
ALTER TABLE `figura`
  MODIFY `id_figura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `genero`
--
ALTER TABLE `genero`
  MODIFY `id_gen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `etnia_usuario_fk` FOREIGN KEY (`id_etnia`) REFERENCES `etnia` (`id_etnia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `figura_usuario_fk` FOREIGN KEY (`id_figura`) REFERENCES `figura` (`id_figura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `genero_usuario_fk` FOREIGN KEY (`id_gen`) REFERENCES `genero` (`id_gen`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
