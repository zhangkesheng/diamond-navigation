export default {
  title: '和你的小窝',
  beian: '皖ICP备18001287号-2',
  gaBeian: '',
  gaBeiantarget: '',
  searchEngine: [
    {
      name: '百度',
      url: 'https://www.baidu.com/s?wd=',
      icon: '#baidu',
    },
    {
      name: 'Bing',
      url: 'https://cn.bing.com/search?q=',
      icon: '#Bing',
    },
    {
      name: 'Magi',
      url: 'https://magi.com/search?q=',
      icon: '',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      icon: '#google',
    },
  ],
  boxes: [
    {
      category: '博客',
      category_id: 'blog',
      icon: '#Blog',
      items: [
        {
          target: 'https://blog.bestzks.com/',
          title: 'Blog',
          desc: '一个有时候想起来也不会更新的blog',
        },
      ],
    },
    {
      category: '继续学习',
      category_id: 'study',
      icon: '#study',
      items: [
        {
          icon:
            'https://static.leetcode-cn.com/cn-assets/icons/favicon-16x16.png',
          target: 'https://leetcode-cn.com/',
          title: 'LeetCode',
          desc: '码, 不停码题',
        },
      ],
    },
    {
      category: '开发社区',
      category_id: 'developerCommunity',
      icon: '#developerCommunity',
      items: [
        {
          icon: '#github',
          target: 'https://github.com',
          title: 'Github',
          desc: '面向开源及私有软件项目的git托管平台',
        },
        {
          icon: '#gitlab',
          target: 'https://gitlab.com/',
          title: 'Gitlab',
          desc:
            'GitLab是一个利用Ruby on Rails开发的开源应用程序，实现一个自托管的Git项目仓库。',
        },
        {
          icon: '#gitee',
          target: 'https://gitee.com/',
          title: 'Gitee',
          desc: '基于 Git 的代码托管和研发协作平台',
        },
        {
          target: 'https://dashboard.daocloud.io/build-flows',
          title: 'DaoCloud',
          desc: '企业级容器云平台',
        },
        {
          target: 'https://www.yuque.com/dashboard',
          title: '语雀',
          desc: '云端知识库',
        },
      ],
    },
    {
      category: '参考文档',
      category_id: 'document',
      icon: '#document',
      items: [
        {
          icon: '#vuejs',
          target: 'https://cn.vuejs.org/index.html',
          title: 'Vue.js',
          desc: '渐进式JavaScript 框架',
        },
      ],
    },
    {
      category: '工具',
      category_id: 'tools',
      icon: '#tools',
      items: [
        {
          target: 'https://www.processon.com/',
          title: 'ProcessOn',
          desc: '免费在线作图，实时协作',
        },
        {
          target: 'https://www.json.cn/',
          title: 'JSON在线解析',
          desc: 'JSON在线解析及格式化验证 - JSON.cn',
        },
        {
          icon: '#jsontoyaml',
          target: 'https://www.json2yaml.com/',
          title: 'JSON转YAML',
          desc: 'JSON在线转YAML',
        },
        {
          icon: '#jinaconvert-icon',
          target: 'http://www.jinaconvert.com/cn/',
          title: '在线图片转化',
          desc:
            '将您的图片转换成多种图片格式。 JPG, PNG, GIF, BMP, TIFF, ICO, SVG和更多图片格式!',
        },
        {
          icon: '#regexper-icon',
          target: 'https://regexper.com/',
          title: 'Regexper',
          desc: '解析正则表达式并且绘制流程图。',
        },
        {
          icon: '#iconfont',
          target: 'https://www.iconfont.cn/',
          title: 'Iconfont',
          desc: 'Iconfont-阿里巴巴矢量图标库',
        },
        {
          icon: '#ascii-art-generator',
          target: 'https://www.ascii-art-generator.org/',
          title: 'Ascii art generator',
          desc:
            '免费在线工具，以创建彩色或单色Ascii艺术。 还包括Ascii Banner选项的文本。',
        },
      ],
    },
  ],
};
