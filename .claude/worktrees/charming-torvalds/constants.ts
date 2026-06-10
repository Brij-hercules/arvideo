
import { ServiceCategory, Provider, UserRequest } from './types';
import { Wrench, Car, Droplets, Battery, Search, ShieldCheck, PaintBucket, Gauge } from 'lucide-react';

export const HK_DISTRICTS = [
  '中西區', '灣仔', '東區', '南區',
  '油尖旺', '深水埗', '九龍城', '黃大仙', '觀塘',
  '葵青', '荃灣', '屯門', '元朗', '北區', '大埔', '沙田', '西貢', '離島'
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'maintenance', name: '定期保養', icon: 'Wrench', description: '更換機油、風格、檢查' },
  { id: 'repair', name: '汽車維修', icon: 'Car', description: '引擎、波箱、冷氣維修' },
  { id: 'detailing', name: '汽車美容', icon: 'Droplets', description: '洗車、打蠟、鍍膜' },
  { id: 'battery', name: '更換電池', icon: 'Battery', description: '上門搭電、更換電池' },
  { id: 'inspection', name: '政府驗車', icon: 'Search', description: '驗車前預檢、代辦驗車' },
  { id: 'insurance', name: '汽車保險', icon: 'ShieldCheck', description: '車保報價、續保' },
  { id: 'bodywork', name: '噴油焗油', icon: 'PaintBucket', description: '車身修復、轉色' },
  { id: 'tuning', name: '改裝升級', icon: 'Gauge', description: '制動、懸掛、動力升級' },
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: '錦田強記車房',
    rating: 4.8,
    reviews: 124,
    location: '元朗',
    categories: ['maintenance', 'repair', 'inspection'],
    badges: ['Toby 認證', '快速回覆'],
    imageUrl: 'https://picsum.photos/200/200?random=1',
    startPrice: 800
  },
  {
    id: 'p2',
    name: 'Top Gear Motors',
    rating: 4.9,
    reviews: 89,
    location: '九龍灣',
    categories: ['detailing', 'bodywork'],
    badges: ['優質商戶', '英語溝通'],
    imageUrl: 'https://picsum.photos/200/200?random=2',
    startPrice: 1500
  },
  {
    id: 'p3',
    name: '順利輪胎電池',
    rating: 4.5,
    reviews: 210,
    location: '土瓜灣',
    categories: ['battery', 'repair'],
    badges: ['24小時救援'],
    imageUrl: 'https://picsum.photos/200/200?random=3',
    startPrice: 500
  },
  {
    id: 'p4',
    name: 'German Auto Expert',
    rating: 4.7,
    reviews: 56,
    location: '荃灣',
    categories: ['maintenance', 'tuning'],
    badges: ['寶馬專家', '原廠電腦'],
    imageUrl: 'https://picsum.photos/200/200?random=4',
    startPrice: 1200
  }
];

export const INITIAL_REQUESTS: UserRequest[] = [
  { id: 'R1001', categoryId: 'maintenance', carModel: 'Toyota Alphard', year: '2019', description: '更換機油及油隔，檢查剎車皮', location: '元朗', urgency: 'low', status: 'pending', timestamp: new Date(Date.now() - 1000 * 60 * 30), userPhone: '9123 4567' },
  { id: 'R1002', categoryId: 'repair', carModel: 'BMW 320i', year: '2015', description: '引擎燈亮起，怠速不穩', location: '九龍灣', urgency: 'high', status: 'quoted', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), userPhone: '6789 0123' },
  { id: 'R1003', categoryId: 'detailing', carModel: 'Tesla Model Y', year: '2023', description: '全車鍍膜報價', location: '荃灣', urgency: 'medium', status: 'completed', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), userPhone: '5566 7788' },
  { id: 'R1004', categoryId: 'battery', carModel: 'Honda Jazz', year: '2014', description: '無法啟動，需要上門搭電', location: '沙田', urgency: 'high', status: 'pending', timestamp: new Date(Date.now() - 1000 * 60 * 5), userPhone: '9876 5432' },
];
