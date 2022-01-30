-- MySQL Workbench Forward Engineering
CREATE SCHEMA `akshar` ;


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema akshar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema akshar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `akshar` DEFAULT CHARACTER SET utf8 ;
USE `akshar` ;

-- -----------------------------------------------------
-- Table `akshar`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `is_admin` INT(1) NOT NULL DEFAULT 0,
  `status` INT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `akshar`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_line_1` TEXT NOT NULL,
  `address_line_2` TEXT NULL,
  `city` VARCHAR(45) NOT NULL,
  `pincode` INT(5) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `status` INT(1) NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_address_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_address_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `akshar`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `contact` INT NOT NULL,
  `status` INT(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_company_user1_idx` (`contact` ASC),
  CONSTRAINT `fk_company_user1`
    FOREIGN KEY (`contact`)
    REFERENCES `akshar`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`image_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`image_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `status` INT(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `manufacturing_company_id` INT NOT NULL,
  `rating` INT(1) NOT NULL DEFAULT 1,
  `status` INT(1) NULL DEFAULT 1,
  `image_group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_company1_idx` (`manufacturing_company_id` ASC) ,
  INDEX `fk_product_image_group1_idx` (`image_group_id` ASC) ,
  CONSTRAINT `fk_product_company1`
    FOREIGN KEY (`manufacturing_company_id`)
    REFERENCES `akshar`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_image_group1`
    FOREIGN KEY (`image_group_id`)
    REFERENCES `akshar`.`image_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`product_feature`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`product_feature` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(450) NULL,
  `value` TEXT NOT NULL,
  `product_id` INT NOT NULL,
  `status` INT(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_product_feature_product1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_product_feature_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `akshar`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `price` INT NOT NULL DEFAULT 0,
  `user_id` INT NOT NULL,
  `date_of_order` DATETIME NULL,
  `mode_of_delivery_id` VARCHAR(10) NOT NULL,
  `address_id` INT NOT NULL,
  `order_status` VARCHAR(10) NULL DEFAULT 0,
  `status` INT(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user1_idx` (`user_id` ASC) ,
  INDEX `fk_order_address1_idx` (`address_id` ASC) ,
  CONSTRAINT `fk_order_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `akshar`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `akshar`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`order_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`order_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT(4) NOT NULL,
  `order_id` INT NOT NULL,
  `date_of_arrival` DATETIME NULL,
  `product_id` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `status` INT(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_order_item_order1_idx` (`order_id` ASC) ,
  INDEX `fk_order_item_product1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_order_item_order1`
    FOREIGN KEY (`order_id`)
    REFERENCES `akshar`.`order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_item_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `akshar`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`service` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image_group_id` INT NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `category` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_service_image_group1_idx` (`image_group_id` ASC) ,
  CONSTRAINT `fk_service_image_group1`
    FOREIGN KEY (`image_group_id`)
    REFERENCES `akshar`.`image_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `address` VARCHAR(100) NOT NULL,
  `description` VARCHAR(45) NULL,
  `status` INT(1) NULL DEFAULT 1,
  `image_group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_image_group1_idx` (`image_group_id` ASC) ,
  CONSTRAINT `fk_image_image_group1`
    FOREIGN KEY (`image_group_id`)
    REFERENCES `akshar`.`image_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`product_service_mapping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`product_service_mapping` (
  `service_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`service_id`, `product_id`),
  INDEX `fk_service_has_product_product1_idx` (`product_id` ASC) ,
  INDEX `fk_service_has_product_service1_idx` (`service_id` ASC) ,
  CONSTRAINT `fk_service_has_product_service1`
    FOREIGN KEY (`service_id`)
    REFERENCES `akshar`.`service` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_has_product_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `akshar`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `akshar`.`project`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `akshar`.`project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(45) NOT NULL,
  `owner` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `project_status` VARCHAR(10) NULL,
  `image_group_id` INT NOT NULL,
  `status` INT(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_project_image_group1_idx` (`image_group_id` ASC) ,
  CONSTRAINT `fk_project_image_group1`
    FOREIGN KEY (`image_group_id`)
    REFERENCES `akshar`.`image_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
