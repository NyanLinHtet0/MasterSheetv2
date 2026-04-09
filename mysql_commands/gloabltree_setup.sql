INSERT INTO global_tree (name, burmese_name, parent_id) VALUES
('Revenue', 'ဝင်ငွေ', NULL),
('Expense', 'သုံးငွေ', NULL),
('Transfer', 'လွှဲပြောင်းမှု', NULL),
('Opening Balance', '	အဖွင့်လက်ကျန်', NULL),

('Sales', 'ရောင်းရ', 1),
('Credit Sales', 'အကြွေးရောင်းရ', 1),
('Collection', 'အကြွေးရ', 1),

('Purchases', 'အဝယ်', 2),
('General', 'အထွေထွေ', 2),
('Regular', 'ပုံမှန်ကုန်ကျ', 2),
('Maintanence', 'ထိန်းသိမ်းမှု', 2),
('Investment', 'ရင်းနှီးမြှုပ်နှံမှု', 2)
;