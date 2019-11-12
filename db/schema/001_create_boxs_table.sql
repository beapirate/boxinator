CREATE TABLE IF NOT EXISTS boxes (
    `box_id` INT AUTO_INCREMENT,
    `recipient_name` TEXT,
    `box_weight` FLOAT,
    `color` CHAR(7),
    `destination_country` TEXT,
    PRIMARY KEY(box_id)
);