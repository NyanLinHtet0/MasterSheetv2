-- =========================================
-- SAMPLE CORP DATA
-- =========================================
INSERT INTO corp_data (
    name,
    is_foreign,
    current_balance,
    current_foreign,
    last_verified_date,
    last_verified_balance,
    last_verified_total_foreign,
    start_day,
    inverse,
    `order`,
    corp_category_id,
    soft_delete
) VALUES
(
    'Shwe Moe Hein',
    0,
    12500000.0000,
    0.0000,
    '2026-04-01',
    11850000.0000,
    NULL,
    1,
    0,
    1,
    NULL,
    0
),
(
    'Ayar Trading',
    1,
    4200000.0000,
    1850.0000,
    '2026-04-01',
    3900000.0000,
    1750.0000,
    1,
    0,
    2,
    NULL,
    0
),
(
    'Mya Yee Kyal',
    0,
    -850000.0000,
    0.0000,
    NULL,
    NULL,
    NULL,
    1,
    1,
    3,
    NULL,
    0
),
(
    'Golden Lotus Services',
    0,
    6700000.0000,
    0.0000,
    '2026-04-01',
    6500000.0000,
    NULL,
    5,
    0,
    4,
    NULL,
    0
);