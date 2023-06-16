DROP DATABASE NutriScan;

CREATE DATABASE NutriScan;

USE NutriScan;

CREATE TABLE `user_account` (
  `id` binary(16) UNIQUE PRIMARY KEY NOT NULL DEFAULT (uuid_to_bin(uuid(), 1)),
  `username` varchar(256) UNIQUE NOT NULL,
  `email` varchar(256) UNIQUE NOT NULL,
  `password` varchar(256) NOT NULL COMMENT 'hashed password',
  `name` varchar(256) NOT NULL,
  `photo` varchar(256) COMMENT 'Sent: Whole image data encoded with base64
Stored: Photo URL to Cloud Storage',
  `type` ENUM ('user', 'admin') DEFAULT "user",
  `token` varchar(256),
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `user_history` (
  `id` binary(16) UNIQUE NOT NULL DEFAULT (uuid_to_bin(uuid(), 1)),
  `user_id` binary(16) NOT NULL,
  `photo` varchar(256) NOT NULL COMMENT 'Sent: Whole image data as base64
Stored: Photo URL to Cloud Storage',
  `time` timestamp DEFAULT (now()),
  `food_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`, `food_id`)
);

CREATE TABLE `user_history_food` (
  `history_id` binary(16) NOT NULL,
  `food_id` binary(16) NOT NULL
);

CREATE TABLE `food` (
  `id` binary(16) UNIQUE PRIMARY KEY NOT NULL DEFAULT (uuid_to_bin(uuid(), 1)),
  `name` varchar(256) NOT NULL,
  `category_id` int DEFAULT 1,
  `photo` varchar(256) COMMENT 'Sent: Whole image data as base64
Stored: Photo URL to Cloud Storage',
  `portion` integer,
  `unit` ENUM ('g', 'ml', 'piece', 'portion', 'skewer', 'glass', 'cup', 'can') DEFAULT (portion),
  `callories` integer
);

CREATE TABLE `food_category` (
  `id` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(256) UNIQUE NOT NULL
);

CREATE TABLE `notification` (
  `id` binary(16) UNIQUE PRIMARY KEY NOT NULL DEFAULT (uuid_to_bin(uuid(), 1)),
  `type` ENUM ('info', 'reminder', 'promotion') NOT NULL DEFAULT "info",
  `title` varchar(256) NOT NULL DEFAULT "Title",
  `message` varchar(512)
);

CREATE TABLE `user_notification` (
  `notification_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `read` boolean NOT NULL DEFAULT false
);

CREATE INDEX `idx_account_id` ON `user_account` (`id`);

CREATE INDEX `idx_account_uname` ON `user_account` (`username`);

CREATE INDEX `idx_account_email` ON `user_account` (`email`);

CREATE INDEX `idx_user_history_id` ON `user_history` (`id`);

CREATE INDEX `idx_user_history_time` ON `user_history` (`time`);

CREATE INDEX `idx_food_id` ON `food` (`id`);

CREATE INDEX `idx_food_name` ON `food` (`name`);

CREATE INDEX `idx_food_category_id` ON `food_category` (`id`);

CREATE INDEX `idx_food_category_name` ON `food_category` (`name`);

CREATE INDEX `idx_notif_id` ON `notification` (`id`);

CREATE INDEX `idx_notif_title` ON `notification` (`title`);

ALTER TABLE `user_history` ADD FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_history_food` ADD FOREIGN KEY (`history_id`, `food_id`) REFERENCES `user_history` (`id`, `food_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_history_food` ADD FOREIGN KEY (`food_id`) REFERENCES `food` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `food` ADD FOREIGN KEY (`category_id`) REFERENCES `food_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_notification` ADD FOREIGN KEY (`notification_id`) REFERENCES `notification` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_notification` ADD FOREIGN KEY (`user_id`) REFERENCES `user_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
