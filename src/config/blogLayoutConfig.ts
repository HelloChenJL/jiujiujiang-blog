type BlogLayoutConfig = {
  title: string;
  alternate?: string;
  subtitle?: string;
  name: string;
  description?: string;
  avatar?: string;
  showLogo?: boolean;
  author?: string;
  site: string;
  startYear?: number;
  keywords?: string[];
  banner: {
    src: string;
    srcset: string;
    lqipSrc: string;
    alt?: string;
  };
};

type SocialPlatform = {
  url: string;
  label: string;
  iconText: string;
  iconClass?: string; // Font Awesome icon class
  color: string;
};

type SocialConfig = {
  github?: SocialPlatform;
  x?: SocialPlatform;
  email?: SocialPlatform;
};

export const blogLayoutConfig: BlogLayoutConfig = {
  title: '啾啾匠の博客',
  alternate: '',
  subtitle: '你要克服那个瞬间',
  name: '啾啾匠',
  description: '碎碎念 / 喜欢狗 / 又菜又爱玩 / 前端什锦',
  avatar: '/img/avatar.jpg',
  showLogo: true,
  author: '啾啾匠',
  site: 'https://xhblog.top/',
  startYear: 2022,
  keywords: ['啾啾匠', '博客', '个人空间', '技术', '前端'],
  banner: {
    src: '', // '/img/site_header_1920.webp',
    srcset: '', // '/img/site_header_800.webp 800w,/img/site_header_1920.webp 1200w',
    lqipSrc: '', // '/img/site_header_1920.webp',
    alt: 'cover',
  },
};

export const blogSocialConfig: SocialConfig = {
  // github: {
  //   url: 'https://github.com/HelloChenJL',
  //   label: 'GitHub',
  //   iconText: 'GH',
  //   iconClass: 'fa-brands fa-github',
  //   color: '#191717',
  // },
  email: {
    url: 'mailto:480536674@qq.com',
    label: 'Email',
    iconText: 'EM',
    iconClass: 'fa-solid fa-envelope',
    color: '#D44638',
  },
};

const { title, alternate, subtitle } = blogLayoutConfig;

export const blogSeoConfig = {
  title: `${alternate ? alternate + ' = ' : ''}${title}${subtitle ? ' = ' + subtitle : ''}`,
  description: blogLayoutConfig.description,
  keywords: blogLayoutConfig?.keywords?.join(',') ?? '',
  url: blogLayoutConfig.site,
};

export const defaultCoverList: string[] = []; // Array.from({ length: 13 }, (_, index) => index + 1).map((item) => `/img/cover/${item}.webp`);
