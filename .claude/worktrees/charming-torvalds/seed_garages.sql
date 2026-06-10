-- Clear old mock data if any
DELETE FROM garages;

-- Insert realistic HK garages
INSERT INTO garages (registration_number, name, name_en, district, phone, services, service_tags, rating, review_count, imageUrl) 
VALUES 
('RN1001', '錦田強記車房', 'Keung Kee Garage', '元朗', '2477 1234', '定期保養, 汽車維修, 政府驗車', ARRAY['maintenance', 'repair', 'inspection'], 4.8, 124, 'https://images.unsplash.com/photo-1486006920555-c77dcf18193b?auto=format&fit=crop&w=800&q=80'),
('RN1002', 'Top Gear Motors', 'Top Gear Motors', '九龍灣', '2345 6789', '汽車美容, 噴油焗油', ARRAY['detailing', 'bodywork'], 4.9, 89, 'https://images.unsplash.com/photo-1563720223185-11003d516905?auto=format&fit=crop&w=800&q=80'),
('RN1003', '順利輪胎電池', 'Shun Lee Battery', '土瓜灣', '2711 0000', '更換電池, 汽車維修', ARRAY['battery', 'repair'], 4.5, 210, 'https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&w=800&q=80'),
('RN1004', 'German Auto Expert', 'German Auto Expert', '荃灣', '2611 2233', '定期保養, 改裝升級', ARRAY['maintenance', 'tuning'], 4.7, 56, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80'),
('RN1005', '大埔發達車房', 'Tai Po Fat Tat', '大埔', '2666 8888', '定期保養, 引擎維修', ARRAY['maintenance', 'repair'], 4.6, 42, 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=800&q=80'),
('RN1006', '沙田及時雨', 'Sha Tin Urgent Help', '沙田', '2699 1111', '上門搭電, 道路救援', ARRAY['battery', 'emergency'], 4.4, 15, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80');
