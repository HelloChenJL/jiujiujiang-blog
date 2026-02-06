export type WeeklyConfig = {
  slug: string;
  categoryName: string;
  title: string;
  description?: string;
  cover?: string;
};

export const weeklyConfig: WeeklyConfig = {
  slug: 'weekly',
  categoryName: '周刊',
  title: '周刊',
  description: '记录每周值得回顾的技术与生活碎片。',
  cover: '', // '/img/weekly_header.webp',
};
