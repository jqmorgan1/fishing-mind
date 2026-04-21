export default {
  pages: [
    'pages/home/index',
    'pages/publish/index',
    'pages/ranking/index',
    'pages/pond/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#001529',
    navigationBarTitleText: '钓鱼脑',
    navigationBarTextStyle: 'white',
    backgroundColor: '#f5f5f5'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1890ff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/ranking/index',
        text: '排行',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/publish/index',
        text: '发布',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/pond/index',
        text: '鱼塘',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: '',
        selectedIconPath: ''
      }
    ]
  },
  style: 'v2',
  sitemapLocation: 'sitemap.json',
  lazyCodeLoading: 'requiredComponents'
};
