// Home / BlogIndex Config
export const homePageProfile = {
  name: '啾啾匠',
  tagline: '“你要克服那个瞬间”',
  avatarUrl: '/img/avatar.jpg',
  avatarAlt: 'User Avatar',
  backgroundUrl: '', // 背景图可以留空，或者放一个你喜欢的图片链接
  footerText: '© jiujiujiang\'s blog - 2022-2026',
};

export const homePageLinks = {
  githubUrl: 'https://github.com/HelloChenJL',
};

export async function getHomePageProfile() {
  const { getBackgroundImages } = await import('@lib/backgrounds');
  const backgroundImages = await getBackgroundImages();
  const backgroundUrl = backgroundImages.length
    ? backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
    : homePageProfile.backgroundUrl;

  return { ...homePageProfile, backgroundUrl };
}
