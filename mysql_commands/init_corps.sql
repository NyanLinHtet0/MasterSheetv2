-- =========================================================================
-- MASTER INITIALIZATION SCRIPT
-- Generated from JSON data
-- =========================================================================

-- =============================================
-- Initialization Script for Corp: ရေခဲ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ရေခဲ', 0, 0, 0, 1, 0, 1, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 43264260, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'ရောင်းရ', 993100, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'စရိတ်', -18000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'ရုံးခန်းမီတာ', -500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'ရောင်းရ', 913800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'စရိတ်', -38400, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ရောင်းရ', 279900, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'စရိတ်', -14400, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'မောင်နိုင်ပေး', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'ရောင်းရ', 530000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'စရိတ်', -24000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', 'ရောင်းရ', 2428700, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ရောင်းရ', 364100, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'စရိတ်', -46800, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', '(2/2026) မိသားစုရေခဲ ဖိုးပေး', -14366400, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ရောင်းရ', 58000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'စရိတ်', -48000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'ရောင်းရ', 325500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'စရိတ်', -90000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 20
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'ရောင်းရ', 62000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 21
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'စရိတ်', -172000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 22
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ရောင်းရ', 604500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 23
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'စရိတ်', -66000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 24
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'ရောင်းရ', 216800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 25
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'စရိတ်', -41600, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 26
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'ရောင်းရ', 255000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 27
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'စရိတ်', -35100, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 28
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'ရောင်းရ', 119000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 29
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'စရိတ်', -15600, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 30
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'ရောင်းရ', 3234100, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 31
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'စရိတ်', -115000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 32
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'ရောင်းရ', 1238500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 33
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'စရိတ်', -78000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 34
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ရောင်းရ', 1139800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 35
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'စရိတ်', -123500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 36
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'သံဝယ် (တံတားပြင်)', -5000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 37
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'ရောင်းရ', 410500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 38
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'စရိတ်', -19500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 39
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'ရောင်းရ', 357000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 40
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'စရိတ်', -52000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 41
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', 'ရောင်းရ', 1702000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 42
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', 'စရိတ်', -130000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 43
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-19', 'ရောင်းရ', 101600, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 44
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'ရောင်းရ', 399000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 45
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'စရိတ်', -63450, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ဒီဇယ်
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ဒီဇယ်', 0, 0, 0, 1, 0, 1, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 10236779, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'ဒီဇယ်ရောင်းရငွေ ', 2054300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'ဒီဇယ်ရောင်းရငွေ', 2624200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ဒီဇယ်ရောင်းရငွေ', 417300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'ဒီဇယ်ရောင်းရငွေ', 963000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', 'ဒီဇယ်ရောင်းရငွေ', 14029800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ဒီဇယ်ရောင်းရငွေ', 11426000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ဒီဇယ်ရောင်းရငွေ', 1680000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'ဒီဇယ်ရောင်းရငွေ', 1552100, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'ဒီဇယ်ရောင်းရငွေ', 230200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'D (25 ပီပါ= 5500 li * 24.00) ဝယ် (132000 bath * 126.50)', -16698000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'D (15 ပီပါ * 1030000) ဝယ် ', -15450000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', '(2/2026)  ငါးစာရင်းသို့ပေး', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'ဒီဇယ်ရောင်းရငွေ', 334000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'ဒီဇယ်ရောင်းရငွေ', 225500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'ဒီဇယ်ရောင်းရငွေ', 59100, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'ဒီဇယ်ရောင်းရငွေ', 433400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'ဒီဇယ်ရောင်းရငွေ', 835600, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'ဒီဇယ်ရောင်းရငွေ', 2473600, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 20
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ဒီဇယ်ရောင်းရငွေ', 4657400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 21
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'ဒီဇယ်ရောင်းရငွေ', 1943300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 22
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'ဒီဇယ်ရောင်းရငွေ', 906900, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 23
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', 'ဒီဇယ်ရောင်းရငွေ', 44600, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 24
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-19', 'ဒီဇယ်ရောင်းရငွေ', 549000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 25
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'ဒီဇယ်ရောင်းရငွေ', 235000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: HOH
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('HOH', 0, 0, 0, 1, 0, 3, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 3119900, 0, 0, 3, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: NLH
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('NLH', 0, 0, 0, 1, 0, 4, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 500000, 0, 0, 3, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ငါး
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ငါး', 0, 0, 0, 1, 0, 5, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 232615171, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'နေ့ယူငွေ', -3000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'ညယူငွေ', -15000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'နေ့ယူငွေ', -3000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'ညယူငွေ', -10000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(TMT) ဝန်ထမ်းလစာ ', -8649000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'USK ‌ပေး', -4200000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ဗမ လွှဲ ငွေ', -2100000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(2/2026) ကြိုတင်ပြန်ရ', 25429300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'နေ့ယူငွေ', -25000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(1093) baht 13000 * 127.00  UZW', 1651000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', '(3K) စိုက်ရှင်းထုတ်ငွေ', -16385600, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', '(1094) Baht 237000 * 126.50 UZW ', 29980500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', '(1095) 146000 * 125.80 UZW ', 18366800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', '2/2026  အမြတ်ထုတ်ငွေ', -17466000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', '2/2026 ဘောဝန်ထမ်းပေး', -210000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ပြင်ပရောင်းရ', 1341200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', '(1096) baht 65000 * 125.5 UZW ', 8157500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', '2/2026 3K စိုက်ရှင်းထုတ်ငွေ ', -14550200, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 20
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', '2/2026 ဒီဇယ်စာရင်းမှရ ', 300000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 21
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', '2/2026 လစာရံပုံငွေမှ ', 110000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 22
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'ပြင်ပရောင်းရ ', 879200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 23
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'ပြင်ပရောင်းရ', 521200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 24
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'နေ့ယူငွေ', -3000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 25
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'ညယူငွေ', -17000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 26
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', '(1097) baht 81000 * 125.8 ', 10189800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 27
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', '(1098) baht 28000 * 126.5', 3542000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 28
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', '(1099) baht 98000 * 125.8', 12328400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 29
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'ညယူငွေ', -5000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 30
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'နေ့ယူငွေ', -5000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 31
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'နေ့ယူငွေ', -2000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 32
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', 'ပြင်ပရောင်းရ', 210000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 33
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'ပြင်ပရောင်းရ', 270400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 34
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', '(1100) baht 196000 * 127.20', 24931200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 35
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', '(1101) baht 64000 * 127.4 ', 8153600, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ရာဘာခြံဝန်ထမ်းရန်ပုံငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ရာဘာခြံဝန်ထမ်းရန်ပုံငွေ', 0, 0, 0, 1, 0, 6, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 11000000, 0, 0, 3, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: TTM
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('TTM', 0, 0, 0, 1, 0, 7, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -791301, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'အိမ်လစာ', -630000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 အိမ်သုံးပိုငွေအပ်', 10900, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026  ငါးမှရ', 14700000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 HP လစာအပ်ငွေ', 200000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 အိမ်သုံးထုတ်ငွေ', -3600000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ငါး - ဘော အခွန်သွင်းငွေ', -1045000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'APP မှ ရ ', 330000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'APP အမြတ်ခွန်ဆောင် ', -330000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', '2/2026  TTM K pay သုံးထုတ်', -7222950, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'TTM ထုတ် ', -500000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'TTM ထုတ်', -500000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', '(5/2025 မှ 2/2026)အထိ PZA လစာ ပြန်ရ ', 1343200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', '(5/2025 မှ 2/2026) အထိ CKZ လစာပြန်ရ ', 800000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', '(10/2024 မှ 2/2026) အထိ HP လစာ အစွန်းပေး', -41500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'ကြွေပြား + ကျောက်မှုန့်ဝယ် (baht 44730 * 123)', -5501790, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', '(22/2) ရုပ်တု Bkk ခရီး အလှူ', -710000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', '(22/2) UZW, HSW ရန်ကုန် ဘိတ် ခရီး လေယာဉ်လက်မှတ်ဖိုး ', -3620000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', '(22/2) သင်္ကန်းစာရင်းမှရ', 3620000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: မော်စုန်းခြံရာဘာ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('မော်စုန်းခြံရာဘာ', 0, 0, 0, 1, 0, 8, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -36873421, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '12/2025 စရိတ် ', -8896445, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '1/2026 စရိတ် ', -15968775, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(2025-2026) အစာငယ် (1) အိတ်', -168000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(2025-2026) အစာကြီး (114) အိတ်', -19152000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 ကုန်ကျစရိတ်', -7728475, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ဝန်ချောင်းခြံရာဘာ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ဝန်ချောင်းခြံရာဘာ', 0, 0, 0, 1, 0, 9, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -30791031, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '12/2025 စရိတ် ', -4388950, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '1/2026 စရိတ် ', -4192490, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(2025-2026) အစာငယ် (1) အိတ်', -168000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(2025-2026) အစာကြီး (100) အိတ်', -16800000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 ကုန်ကျစရိတ်', -6599170, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: အစာအိတ်
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('အစာအိတ်', 0, 0, 0, 1, 0, 10, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -16904165, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(2025-2026) မော်စုန်းခြံ အစာငယ်(1) အိတ်ဖိုး', 168000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(2025-2026) မော်စုန်းခြံ အစာကြီး (14) အိတ်ဖိုး ', 19152000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(2025-2026) ဝန်ချောင်းခြံ အစာငယ် (1) အိတ်ဖိုး ', 168000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(2025-2026) ဝန်ချောင်းခြံ အစာကြီး (100) အိတ်ဖိုး', 16800000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: Main cash အစွန်း
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('Main cash အစွန်း', 0, 0, 0, 1, 0, 11, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 582536, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(2/2026) လုပ်ငန်းဖြည့်ငွေ ', 1400000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: Bank ချေးငွေအတိုး
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('Bank ချေးငွေအတိုး', 0, 0, 0, 1, 0, 12, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 18670453, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-11', 'HP Wave pay မှားသွင်းပြန်ထုတ် ', -550000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', '9/2025 မှ 2/2026 အထိ AYA အတိုးရ ', 512062, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', 'AYA ဘဏ်တိုးပေး', -2610000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: သင်္ကန်းရောင်းရငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('သင်္ကန်းရောင်းရငွေ', 0, 0, 0, 1, 0, 13, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -5141556, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'ရောင်းရငွေ', 63500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ရောင်းရငွေ', 222000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'ရောင်းရငွေ', 226000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', 'ရောင်းရငွေ', 290000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ရောင်းရငွေ', 360000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ရောင်းရငွေ', 23500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'ရောင်းရငွေ', 252000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'APP အမြတ်ခွန်ဆောင် ', -330000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ရောင်းရငွေ', 587000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ဗောဓိမဏ္တိုင် သင်္ကန်းချုပ်ခငွေလွှဲ', -3154000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'ရောင်းရငွေ', 23000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'ရောင်းရငွေ', 471500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-10', 'ရောင်းရငွေ', 332500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-10', 'Tape+ဘောပင် (1) ဘူးဝယ် ', -23500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'ရောင်းရငွေ', 4482500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'သင်္ကန်းဆိုင်ပစ္စည်းဝယ် ', -315500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'ရောင်းရငွေ', 406000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'ဖလား 22'''' (5) လုံး * 225000 ', -112500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 20
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'ဖလား 24'''' (15)လုံး * 30500 ', -457500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 21
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'ရောင်းရငွေ', 209000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 22
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'ခါးပန်းကြိုး (20) ခုဝယ် ', -140000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 23
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'အပ် + Double တိပ် ဝယ် ', -31800, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 24
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'ရောင်းရငွေ', 281000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 25
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ရောင်းရငွေ', 178500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 26
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ဒုကုဒ် (15) ခဏ်း (15)စုံ * 70000 ဝယ် ', -1050000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 27
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ယပ် (15)ချောင်း * 7000', -105000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 28
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ခါးပန်းကြိုး (15) ခု *7000 ', -105000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 29
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'ရောင်းရငွေ', 24000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 30
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', 'ရောင်းရငွေ', 118500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 31
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-19', 'ရောင်းရငွေ', 100000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 34
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'Redmi Tablet ဝယ် ', -880000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: စိုက်/ချေး စာရင်း
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('စိုက်/ချေး စာရင်း', 0, 0, 0, 1, 0, 14, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 6792178, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(2/2026) ဒီဇယ် စာရင်းပိုငွေ အပ်', 338067, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-11', 'HP Wave pay ချေးငွေ ပြန်ရ ', 550000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'အိမ်သုံးထုတ်ငွေ ', -200000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'အိမ်သုံးထုတ်ငွေ', -200000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'အိမ်သုံးထုတ်ငွေ (3/2026) အစ', -500000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'ခြံသုံးထုတ်ငွေ (2/2026) ', -1200000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(12/2025) မော်စုန်းခြံစရိတ် ', 8896445, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(12/2025) ဝန်ချောင်းခြံ စရိတ်', 4388950, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '1/2026  မော်စုန်းခြံစရိတ်', 15968775, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '1/2026 ဝန်ချောင်းခြံ စရိတ်', 4192490, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', '3K စိုက်ရှင်းပိုငွေ အပ်', 300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', '2/2026 အိမ်သုံးထုတ်ငွေ ပြန်ရ', 3600000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'မအေးပြည့်အပ်ငွေ ', 150000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ခြံသုံးပိုငွေအပ်', 4270, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', '2/2026 ခြံသုံးပိုငွေအပ်', 572355, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', '2/2026 ခြံသုံးထုတ်ငွေ', -8900000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(baht 150000 * 123.30) ရုပ်တုဖိုးထုတ်ငွေ ', -18495000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 20
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 မော်စုန်းစရိတ်ပြန်ရ ', 7728475, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 21
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 ဝန်ချောင်းစရိတ်ပြန်ရ', 6599170, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 22
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ခြံသုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 23
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 24
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'baht 6000 * 128.00 မျှားဖိုးပြန်ရ ', 768000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 25
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 26
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ခြံသုံးထုတ်ငွေ ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 27
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'HP ဒီဇယ်+PD ဝယ်ရန်ချေးထားငွေ', -4240000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 28
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', '2/2026 3K စိုက်ရှင်း အပ်ငွေ ', 14550200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 29
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'အိမ်သုံးထုတ်ငွေ', -500000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 30
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-10', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 31
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-10', 'ခြံသုံးထုတ်ငွေ (CKZ + PZA) လစာအတွက် ', -2200000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 32
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 33
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'HP ဆီဝယ်ရန်ချေးငွေပြန်ဆပ်', 3960000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 34
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'HP ဆီဝယ်ရန်ချေးငွေပြန်ဆပ်', 280000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 35
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'အိမ်သုံးထုတ်ငွေ ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 36
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 37
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 38
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-19', 'အိမ်သုံးထုတ်ငွေ', -300000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 39
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'ခြံသုံးထုတ်ငွေ', -1000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 40
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'ဆီဆိုင်လုပ်ငန်းမှ အပ်ငွေ', 22519, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 41
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-22', 'ရုပ်တု Bkk ခရီးလေယာဉ်လက်မှတ်ဖိုး ပြန်ရ', 710000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 42
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-22', 'ရုပ်တုခရီးလေယာဉ်လက်မှတ်ဖိုးပြန်ရ', 2290000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 43
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-22', 'UZW, HSW ရန်ကုန် မြိတ်ခရီးစဉ် လေယာဉ်လက်မှတ်ဖိုး', 3620000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 47
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-22', 'ခြံ အလုပ်သမား (2) ဉီး လေယာဉ် လက်မှတ်ဖိုး', 1260000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ဗမချေးငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ဗမချေးငွေ', 0, 0, 0, 1, 0, 15, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -21940000, 0, 0, 3, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: အလှူရန်ပုံငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('အလှူရန်ပုံငွေ', 0, 0, 0, 1, 0, 16, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 556282, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '2/2026 ငါးမှရ', 215000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'ငါးစာရင်းမှ baht စာရင်းမှရ (100 baht * 128)', 12800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: လစာရန်ပုံငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('လစာရန်ပုံငွေ', 0, 0, 0, 1, 0, 17, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 9801000, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '2/2026 ငါးမှရ', 951000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '2/2026 ငါးစာရင်းသို့ပေး', -110000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-15', 'တရုတ်နှစ်ကူး အန်ပေါင်ပေး ', -1050000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: အင်ဂျင်ဝိုင်
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('အင်ဂျင်ဝိုင်', 0, 0, 0, 1, 0, 18, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 10826950, 0, 0, 3, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ယောလုံချည်/ပုဝါပိုင်း
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ယောလုံချည်/ပုဝါပိုင်း', 0, 0, 0, 1, 0, 19, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 1960300, 0, 0, 3, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ကွမ်း + ဒူးရင်း + ငှက်ပျော
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ကွမ်း + ဒူးရင်း + ငှက်ပျော', 0, 0, 0, 1, 0, 20, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 9216024, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'အရွက်ဖြန်းဆေးဝယ် (ကွမ်းပင်)', -9000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ကွမ်းသီးမျိုးအိတ်ဝယ်', -14800, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ခါချဉ်ဖျန်းဆေးဘူးဝယ် (ဒူးရင်းပင်)', -21400, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'ကွမ်းသီးမှည့်ရောင်းရငွေ (4900လုံး * 50) ', 245000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-10', 'ဝါးကြိုးဝယ် (ဒူးရင်းပင်)', -42000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: သမုတ်ဆီရောင်းရငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('သမုတ်ဆီရောင်းရငွေ', 0, 0, 0, 1, 0, 21, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 43818168, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-22', 'ရောင်းရငွေ ', 2539000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-23', 'ရောင်းရငွေ', 2216400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', 'ရောင်းရငွေ', 2583300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ဆလိုက်မီး + မီးကြိုးဝယ် ', -222000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '(95) 1 ပီပါဝယ် ', -590000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-21', '(92) 18 ပီပါ = 3960 li * 18.9 baht (74844 baht * 127)', -9505188, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', '(92) 10 ပီပါ = 2200 li *18.9baht (41580 baht *127.70)', -5309766, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', '(92) 23 ပီပါ = 5060li * 18.9 baht (95634 baht*127.7)', -12212461, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', 'PD 12 ပီပါ = 2640 li*20.2 baht (53328baht*127.7)', -6809985, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', 'D 12ပီပါ = 2640li*19.8baht (52272baht *127.7)', -6675134, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '3J ဆီဖိုးပြန်ရ ', 70000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'မော်စုန်းခြံ မြက်ခုတ်ဆီဖိုးပြန်ရ ', 244400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'မော်စုန်းခြံ ဆိုင်ကယ်ဆီဖိုးပြန်ရ ', 41600, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'အစေးကြိတ်စက် ဆီဖိုးပြန်ရ ', 218000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'CKZ ဆိုင်ကယ်ဆီဖိုးပြန်ရ', 31200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'HP ဆိုင်ကယ် ဆီဖိုးပြန်ရ ', 30800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'စျေးဖိုးပြန်ရ ', 444500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'ဝန်ချောင်းခြံဆီဖိုးပြန်ရ', 201700, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 20
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '3D ဆီဖိုးပြန်ရ', 301000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 21
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-25', 'ရောင်းရငွေ', 2491400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 22
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'ရောင်းရငွေ', 2724700, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 23
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'ရောင်းရငွေ', 1773500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 24
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ရောင်းရငွေ', 1777900, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 25
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'ရောင်းရငွေ', 2561100, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 26
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', 'ရောင်းရငွေ', 3591200, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 27
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', '(95) 1 ပီပါဝယ်', -590000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 28
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 ဝန်ထမ်းလစာပေး', -460000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 29
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ရောင်းရငွေ', 6459500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 30
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'ဦးစိုးညွန့် အကြွေးရ', 1190000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 31
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ရောင်းရငွေ', 17224460, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 32
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'ရောင်းရငွေ', 9200000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 33
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'ရောင်းရငွေ', 1245850, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 34
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', '(92) 25 ပီပါ = 5500 li * 22.5 (123750 baht * 126.5)', -15654375, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 35
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'PD 10ပီပါ = 2200 li * 24.3 (53460 baht *126.50)', -6762690, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 36
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'D 18 ပီပါ = 3960 li * 24.00 ( 95040 baht * 126.50 )', -12022560, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 37
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'ရောင်းရငွေ', 2839500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 38
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ရောင်းရငွေ', 2845400, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 39
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', '(92) 2ပီပါ *1020000', -2040000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 40
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'PD 2ပီပါ * 1070000', -2140000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 41
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'ရောင်းရငွေ', 3764500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 42
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'D 2ပီပါ *1050000', -2100000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 43
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'PD 2 ပီပါ *1070000', -2140000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 44
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', '(95) 2ပီပါ * 1020000', -2040000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 45
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-15', 'တရုတ်နှစ်ကူးအန်ပေါင်ပေး', -120000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 46
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'ရောင်းရငွေ', 3691865, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 47
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'D 2ပီပါ ဝယ် *1000000', -2000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 48
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-10', '(92)  2ပီပါ * 1020000', -2040000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 49
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', '(92) 2ပီပါ * 1020000', -2040000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 50
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'D  2ပီပါ ဝယ် *980000', -1960000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 51
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', '(10/2024 မှ 2/2026) အထိ HP လစာ (16 လစာ)', -5600000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 52
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-10', 'ရောင်းရငွေ', 3182300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 53
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'ရောင်းရငွေ', 2781350, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 54
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', '(92) 2ပီပါ ဝယ် * 1020000', -2040000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 55
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', '(92) 2 ပီပါ ဝယ် * 1020000', -2040000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 56
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'ရောင်းရငွေ', 2349900, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 57
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-13', 'ရောင်းရငွေ', 2390600, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 58
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', '(92) 2ပီပါ * 1020000', -2040000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 59
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'ရောင်းရငွေ', 1872800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 60
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ရောင်းရငွေ', 1360800, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 61
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', '(92) 6 ပီပါ *1100000', -6600000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 62
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'ရောင်းရငွေ', 2006000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 63
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', '(95) 1 ပီပါဝယ် ', -1150000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 64
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', '(92) 12ပီပါဝယ် *1070000', -12840000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 65
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'ရောင်းရငွေ', 3090580, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 66
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-18', 'ရောင်းရငွေ', 3357300, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 67
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-19', 'D 2 ပီပါ *1220000', -2440000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 68
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-19', 'ရောင်းရငွေ', 2915000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 69
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'ရောင်းရငွေ', 3585250, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ဆီဆိုင်လုပ်ငန်း
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ဆီဆိုင်လုပ်ငန်း', 0, 0, 0, 1, 0, 22, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 22519, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-20', 'ထုတ်ငွေ (စိုက်ချေးစာရင်းသို့ပေး)', -22519, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: လှေကပ်ခရငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('လှေကပ်ခရငွေ', 0, 0, 0, 1, 0, 23, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 2203700, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'ရငွေ', 2000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'ရငွေ', 4000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'ရငွေ', 20000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-02', 'ရငွေ', 3000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-05', 'ရေကြောင်းရဲပေးငွေ', -50000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'ရငွေ', 4000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ရငွေ', 30000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'ရငွေ', 8000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'ရငွေ', 2000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'ရငွေ', 6000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-15', 'ရငွေ', 2000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-16', 'ရငွေ', 5000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'ရငွေ', 12000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;
-- =============================================
-- Initialization Script for Corp: HP လစာ စာရင်း
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('HP လစာ စာရင်း', 0, 0, 0, 1, 0, 33, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', '(10/2024 မှ 2/2026) အထိ HP 16 လစာ ရငွေ ', 5600000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', '(10/2024 မှ 2/2026) အထိ HP လစာ အစွန်းရငွေ ', 41500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: ရာဘာရောင်းရငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('ရာဘာရောင်းရငွေ', 0, 0, 0, 1, 0, 24, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 78253828, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', '‌ဂေါ်လီချေး‌ရောင်းရငွေ (121.15 viss * 4250)', 901650, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ရာဘာထုံး (257) ထုံးရောင်းရငွေ (5544.98 viss * 10600) ', 58776788, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: (မဒဂ) အိမ်ဆောက်စာရင်း
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('(မဒဂ) အိမ်ဆောက်စာရင်း', 0, 0, 0, 1, 0, 25, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -137445000, 0, 0, 3, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: UZW, TTM ရန်ပုံငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('UZW, TTM ရန်ပုံငွေ', 0, 0, 0, 1, 0, 26, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', 7641350, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '2/2026 ဒီဇယ် စာရင်းမှရ', 800000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'မထွေးလွှဲငွေရ (မနီဆေးဖိုး) ', 120000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: Bank အပ်
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('Bank အပ်', 0, 0, 0, 1, 1, 27, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -15823253, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', 'AYA အပ်ငွေ ', -60000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', '28/2/2026 အထိ ဘဏ်တိုးရ', -512062, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: K pay
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('K pay', 0, 0, 0, 1, 1, 28, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -9333700, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ဘော ဒီဇယ်ဖိုးရ ', -4000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ဆီဆိုင်မှ ရ', -700000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-04', 'ဆီဆိုင်မှရ', -600000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'မထွေးလွှဲ ပေးငွေရ (မနီဆေးဖိုး) ဘဏ်အပ်', -120000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '2/2026 TTM Kpay သုံးထုတ်', 7222950, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-07', 'ဆီဆိုင်မှရ', -100000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-08', 'ဆီဆိုင်မှရ', -700000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'မီးပုံးတိုင် စျေးဝယ် ', 250500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'မီးပုံးတိုင် စျေးဝယ် ', 118500, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-12', 'APP မှရ', -188000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'ဆီဆိုင်မှရ', -500000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'APP မှရ', -126000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', 'Redmi tablet ဝယ် ', 880000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: Baht ဝယ်စာရင်း (1)
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('Baht ဝယ်စာရင်း (1)', 1, 0, 0, 1, 1, 29, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -1388343, 123.93222136028345, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', 'D 25ပီပါ=5500li *19.8(108900 baht*127.70)', 108900, 127.70, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', 'baht 200000 ရောင်း', 200000, 127.20, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-21', '(92) 18 ပီပါ = 3960 li * 18.9 baht (74844 baht * 127)', 74844, 127, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-27', '(92) 10 ပီပါ = 2200 li *18.9baht (41580 baht *127.70)', 41580, 127.7, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', '(92) 23 ပီပါ = 5060li * 18.9 baht (95634 baht*127.7)', 95634, 127.7, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', 'PD 12 ပီပါ = 2640 li*20.2 baht (53328baht*127.7)', 53328, 127.7, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-24', 'D 12ပီပါ = 2640li*19.8baht (52272baht *127.7)', 52272, 127.7, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(1093) baht 13000 * 127.00', -13000, 127, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(1094) Baht 237000 * 126.50', -237000, 126.5, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', '(1095) Baht 146000 * 125.80', -146000, 125.8, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 12
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', '(1096) Baht 65000 * 125.50', -65000, 125.5, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 13
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', '(92) 25 ပီပါ = 5500 li * 22.5 (123750 baht * 126.5)', 123750, 126.5, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 14
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'PD 10ပီပါ = 2200 li * 24.3 (53460 baht *126.50) ', 53460, 126.5, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 15
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'D 18 ပီပါ = 3960 li * 24.00 ( 95040 baht * 126.50 ) ', 95040, 126.5, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 16
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-06', 'ဘော D 25 ပီပါ = 5500 li * 24 (132000 baht * 126.5 ) ', 132000, 126.5, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 17
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'UZW + ဆရာငယ် Bkk သုံး ( 5000 baht * 126.5)', 5000, 126.5, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 18
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', '(1097) Baht 81000 * 125.80 ', -81000, 125.8, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 19
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', '(1098) baht 28000*126.5', -28000, 126.5, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 20
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-14', '(1099) baht 98000 *125.8', -98000, 125.8, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 21
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'အစ်စစ်ပုံး (4) ပုံးဖိုးပေး ', 7328, 123, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 22
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', 'ကြွေပြား+ကျောက်မှုန့်ဝယ် ', 44730, 123, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 23
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', '(1100) baht 196000*127.20', -196000, 127.2, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 24
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-17', '(1101) baht 64000 * 127.4)', -64000, 127.4, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: Baht ဝယ်စာရင်း (2) ရုပ်တုဖိုးအပ်ငွေ
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('Baht ဝယ်စာရင်း (2) ရုပ်တုဖိုးအပ်ငွေ', 1, 0, 0, 1, 1, 32, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -250000, 123.3, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-01', 'ရုပ်တုဖိုးပေး Baht 150000 * 123.3', 150000, 123.3, 0, 1, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: TTM Cash (အပ်ငွေ)
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('TTM Cash (အပ်ငွေ)', 0, 0, 0, 1, 1, 30, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-25', 'Initial Balance', -2196410, 0, 0, 3, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 2
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-26', 'TTM ထုတ်', 500000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 3
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-28', 'TTM ထုတ် ', 500000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 4
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', '(5/2025 မှ 2/2026) အထိ PZA  လစာပြန်ရ', -1343200, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 5
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-09', '(5/2025 မှ 2/2026) အထိ CKZ လစာပြန်ရ ', -800000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 6
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'မီးပုံးတိုင် စျေးဝယ် kpay ပြန်ရ ', -250500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 7
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-11', 'မီးပုံးတိုင် စျေးဝယ် kpay ပြန်ရ', -118500, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 8
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-15', 'တရုတ်နှစ်ကူးဘော အန်ပေါင်ပေး', 1050000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 9
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-15', 'တရုတ်နှစ်ကူး ဆီဆိုင် အန်ပေါင်ပေး', 120000, 0, 0, 1, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 10
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-22', 'ရုပ်တု Bkk လေယာဉ်လက်မှတ်ဖိုးပြန်ရ ', -2290000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

-- ---------------------------------------------
-- Transaction 11
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-02-22', 'ခြံ အလုပ်သမား 2 ယောက် လေယာဉ်လက်မှတ်ဖိုး ပြန်ရ', -1260000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;

-- =============================================
-- Initialization Script for Corp: Wave Pay (HP)
-- =============================================
START TRANSACTION;

INSERT INTO corp_data (name, is_foreign, current_balance, current_foreign, start_day, inverse, display_order, soft_delete)
VALUES
('Wave Pay (HP)', 0, 0, 0, 1, 1, 31, 0);

SET @current_corp_id = LAST_INSERT_ID();

-- ---------------------------------------------
-- Transaction 1
-- no local_tree_id provided, using explicit/fallback global_tree_id
-- ---------------------------------------------
INSERT INTO transactions (corp_id, tx_date, description, amount, rate, adjustment, global_tree_id, local_tree_id, employee_id, asset_id, soft_delete, tx_status)
VALUES
(@current_corp_id, '2026-03-03', 'ဆီဆိုင် HP လွှဲငွေ ', -2000000, 0, 0, 2, NULL, NULL, NULL, 0, 1);

COMMIT;



