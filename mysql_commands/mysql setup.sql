CREATE DATABASE IF NOT EXISTS master_sheets
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE master_sheets;

-- =========================================================
-- USERS
-- =========================================================
CREATE TABLE users (
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username          VARCHAR(100) NOT NULL,
    email             VARCHAR(255) NULL,
    password_hash     VARCHAR(255) NOT NULL,
    employee_id       INT UNSIGNED NULL,
    is_active         TINYINT NOT NULL DEFAULT 1,
    soft_delete       TINYINT NOT NULL DEFAULT 0,
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_users_username UNIQUE (username),
    CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- CORP DATA
-- =========================================================
CREATE TABLE corp_data (
    id                           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name                         VARCHAR(255) NOT NULL,
    is_foreign                   TINYINT NOT NULL DEFAULT 0,
    current_balance              DECIMAL(16,4) NOT NULL DEFAULT 0.0000,
    current_foreign              DECIMAL(16,4) NOT NULL DEFAULT 0.0000,
    last_verified_date           DATE NULL,
    last_verified_balance        DECIMAL(16,4) NULL,
    last_verified_total_foreign  DECIMAL(16,4) NULL,
    start_day                    TINYINT UNSIGNED NOT NULL DEFAULT 1,
    inverse                      TINYINT NOT NULL DEFAULT 0,
    display_order                INT NOT NULL DEFAULT 0,
    corp_category_id             INT UNSIGNED NULL,
    soft_delete                  TINYINT NOT NULL DEFAULT 0,
    created_at                   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at                   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_corp_data_name UNIQUE (name)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- GLOBAL TREE
-- Shared across all corporations
-- =========================================================
CREATE TABLE global_tree (
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    burmese_name      VARCHAR(255) NULL,
    parent_id         INT UNSIGNED NULL,
    soft_delete       TINYINT NOT NULL DEFAULT 0,
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_global_tree_parent
        FOREIGN KEY (parent_id) REFERENCES global_tree(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- LOCAL TREE
-- Per corporation
-- global_parent_id is required
-- parent_id points to another local_tree row
-- =========================================================
CREATE TABLE local_tree (
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    corp_id           INT UNSIGNED NOT NULL,
    global_parent_id  INT UNSIGNED NOT NULL,
    parent_id         INT UNSIGNED NULL,
    name              VARCHAR(255) NOT NULL,
    burmese_name      VARCHAR(255) NULL,
    leaf              TINYINT NOT NULL DEFAULT 0,
    soft_delete       TINYINT NOT NULL DEFAULT 0,
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_local_tree_corp
        FOREIGN KEY (corp_id) REFERENCES corp_data(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_local_tree_global_parent
        FOREIGN KEY (global_parent_id) REFERENCES global_tree(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_local_tree_parent
        FOREIGN KEY (parent_id) REFERENCES local_tree(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- EMPLOYEE TABLE
-- corp_id nullable for flexible employees
-- =========================================================
CREATE TABLE employee (
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    corp_id           INT UNSIGNED NULL,
    name              VARCHAR(255) NOT NULL,
    soft_delete       TINYINT NOT NULL DEFAULT 0,
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee_corp
        FOREIGN KEY (corp_id) REFERENCES corp_data(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- Now that employee exists, connect users.employee_id
ALTER TABLE users
ADD CONSTRAINT fk_users_employee
    FOREIGN KEY (employee_id) REFERENCES employee(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL;


-- =========================================================
-- ASSETS TABLE
-- No corp_id for now
-- =========================================================
CREATE TABLE assets (
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    type              VARCHAR(100) NULL,
    soft_delete       TINYINT NOT NULL DEFAULT 0,
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- TRANSACTIONS
-- global_tree_id required for fast lookup
-- local_tree_id optional
-- =========================================================
CREATE TABLE transactions (
    id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    corp_id           INT UNSIGNED NOT NULL,
    tx_date           DATE NOT NULL,
    description       VARCHAR(500) NOT NULL,
    amount            DECIMAL(16,4) NOT NULL DEFAULT 0.0000,
    rate              DECIMAL(16,4) NOT NULL DEFAULT 0.0000,
    adjustment        DECIMAL(16,6) NOT NULL DEFAULT 0.000000,
    global_tree_id    INT UNSIGNED NOT NULL,
    local_tree_id     INT UNSIGNED NULL,
    employee_id       INT UNSIGNED NULL,
    asset_id          INT UNSIGNED NULL,
    soft_delete       TINYINT NOT NULL DEFAULT 0,
    tx_status         TINYINT NOT NULL DEFAULT 1,
    created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_transactions_corp
        FOREIGN KEY (corp_id) REFERENCES corp_data(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_transactions_global_tree
        FOREIGN KEY (global_tree_id) REFERENCES global_tree(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_transactions_local_tree
        FOREIGN KEY (local_tree_id) REFERENCES local_tree(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_transactions_employee
        FOREIGN KEY (employee_id) REFERENCES employee(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_transactions_asset
        FOREIGN KEY (asset_id) REFERENCES assets(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- AUDIT LOG
-- publish exists only here
-- changed_data stores only changed columns:
-- { "old": {...}, "new": {...} }
-- clients replay by audit log id
-- =========================================================
CREATE TABLE audit_log (
    id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    table_name        VARCHAR(100) NOT NULL,
    row_id            BIGINT UNSIGNED NOT NULL,
    action_type       ENUM('INSERT', 'UPDATE', 'PUBLISH') NOT NULL,
    corp_id           INT UNSIGNED NULL,
    old_data          JSON NULL,
    new_data          JSON NULL,
    changed_by        INT UNSIGNED NULL,
    changed_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_log_changed_by
        FOREIGN KEY (changed_by) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_audit_log_corp
        FOREIGN KEY (corp_id) REFERENCES corp_data(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;


-- =========================================================
-- INDEXES
-- =========================================================

-- Corp
CREATE INDEX idx_corp_data_soft_delete ON corp_data (soft_delete);
CREATE INDEX idx_corp_data_category ON corp_data (corp_category_id);
CREATE INDEX idx_corp_data_display_order ON corp_data (display_order);

-- Global tree
CREATE INDEX idx_global_tree_parent_id ON global_tree (parent_id);
CREATE INDEX idx_global_tree_soft_delete ON global_tree (soft_delete);
CREATE INDEX idx_global_tree_name ON global_tree (name);

-- Local tree
CREATE INDEX idx_local_tree_corp_id ON local_tree (corp_id);
CREATE INDEX idx_local_tree_global_parent_id ON local_tree (global_parent_id);
CREATE INDEX idx_local_tree_parent_id ON local_tree (parent_id);
CREATE INDEX idx_local_tree_leaf ON local_tree (leaf);
CREATE INDEX idx_local_tree_soft_delete ON local_tree (soft_delete);
CREATE INDEX idx_local_tree_corp_parent ON local_tree (corp_id, parent_id);
CREATE INDEX idx_local_tree_corp_global_parent ON local_tree (corp_id, global_parent_id);

-- Employee
CREATE INDEX idx_employee_corp_id ON employee (corp_id);
CREATE INDEX idx_employee_soft_delete ON employee (soft_delete);
CREATE INDEX idx_employee_name ON employee (name);

-- Assets
CREATE INDEX idx_assets_name ON assets (name);
CREATE INDEX idx_assets_type ON assets (type);
CREATE INDEX idx_assets_soft_delete ON assets (soft_delete);

-- Users
CREATE INDEX idx_users_employee_id ON users (employee_id);
CREATE INDEX idx_users_soft_delete ON users (soft_delete);
CREATE INDEX idx_users_is_active ON users (is_active);

-- Transactions
CREATE INDEX idx_transactions_corp_id ON transactions (corp_id);
CREATE INDEX idx_transactions_tx_date ON transactions (tx_date);
CREATE INDEX idx_transactions_global_tree_id ON transactions (global_tree_id);
CREATE INDEX idx_transactions_local_tree_id ON transactions (local_tree_id);
CREATE INDEX idx_transactions_employee_id ON transactions (employee_id);
CREATE INDEX idx_transactions_asset_id ON transactions (asset_id);
CREATE INDEX idx_transactions_soft_delete ON transactions (soft_delete);

-- Very useful for common reads
CREATE INDEX idx_transactions_corp_date ON transactions (corp_id, tx_date);
CREATE INDEX idx_transactions_corp_global_date ON transactions (corp_id, global_tree_id, tx_date);
CREATE INDEX idx_transactions_corp_local_date ON transactions (corp_id, local_tree_id, tx_date);

-- Audit log: most important table for sync
CREATE INDEX idx_audit_log_changed_at ON audit_log (changed_at);
CREATE INDEX idx_audit_log_corp_id ON audit_log (corp_id);
CREATE INDEX idx_audit_log_table_row ON audit_log (table_name, row_id);
CREATE INDEX idx_audit_log_action_type ON audit_log (action_type);

-- Optional but useful for corp-scoped replay
CREATE INDEX idx_audit_log_corp_id_id ON audit_log (corp_id, id);