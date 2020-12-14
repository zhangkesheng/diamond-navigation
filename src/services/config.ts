export interface Setting {
  mode?: string;
  theme?: string;
  bgDate?: string;
}

export interface Info {
  title?: string;
}

export interface SearchEngine {
  name: string;
  url: string;
  active?: boolean;
}

export interface Cat {
  cName: string;
  items?: Item[];
}

export interface Item {
  url: string;
  title: string;
  desc?: string;
  click?: number;
}

export interface Hitokoto {
  c: string[];
}

export interface Config {
  setting: Setting;
  info: Info;
  searches: SearchEngine[];
  commons: Item[];
  cats: Cat[];
  hitokoto?: Hitokoto;
}

const config: Config = {
  setting: {
    mode: 'simpler',
    theme: 'dark',
  },
  info: {
    title: '和你的小窝啊',
  },
  searches: [
    {
      name: 'Baidu',
      url: 'https://www.baidu.com/s?wd=',
    },
    {
      name: 'Bing',
      url: 'https://cn.bing.com/search?q=',
      active: true,
    },
    {
      name: 'Magi',
      url: 'https://magi.com/search?q=',
    },
    {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
    },
  ],
  commons: [],
  cats: [
    {
      cName: '博客',
      items: [
        {
          url: 'https://blog.bestzks.com/',
          title: 'Blog',
          desc: '一个有时候想起来也不会更新的blog',
        },
      ],
    },
    {
      cName: '继续学习',
      items: [
        {
          url: 'https://leetcode-cn.com/',
          title: 'LeetCode',
          desc: '码, 不停码题',
        },
      ],
    },
    {
      cName: '开发社区',
      items: [
        {
          url: 'https://github.com',
          title: 'Github',
          desc: '面向开源及私有软件项目的git托管平台',
        },
        {
          url: 'https://gitlab.com/',
          title: 'Gitlab',
          desc:
            'GitLab是一个利用Ruby on Rails开发的开源应用程序，实现一个自托管的Git项目仓库。',
        },
        {
          url: 'https://gitee.com/',
          title: 'Gitee',
          desc: '基于 Git 的代码托管和研发协作平台',
        },
        {
          url: 'https://dashboard.daocloud.io/build-flows',
          title: 'DaoCloud',
          desc: '企业级容器云平台',
        },
        {
          url: 'https://www.yuque.com/dashboard',
          title: '语雀',
          desc: '云端知识库',
        },
      ],
    },
    {
      cName: '参考文档',
      items: [
        {
          url: 'https://cn.vuejs.org/index.html',
          title: 'Vue.js',
          desc: '渐进式JavaScript 框架',
        },
      ],
    },
    {
      cName: '工具',
      items: [
        {
          url: 'https://www.processon.com/',
          title: 'ProcessOn',
          desc: '免费在线作图，实时协作',
        },
        {
          url: 'https://www.json.cn/',
          title: 'JSON在线解析',
          desc: 'JSON在线解析及格式化验证 - JSON.cn',
        },
        {
          url: 'https://www.json2yaml.com/',
          title: 'JSON转YAML',
          desc: 'JSON在线转YAML',
        },
        {
          url: 'http://www.jinaconvert.com/cn/',
          title: '在线图片转化',
          desc:
            '将您的图片转换成多种图片格式。 JPG, PNG, GIF, BMP, TIFF, ICO, SVG和更多图片格式!',
        },
        {
          url: 'https://regexper.com/',
          title: 'Regexper',
          desc: '解析正则表达式并且绘制流程图。',
        },
        {
          url: 'https://www.iconfont.cn/',
          title: 'Iconfont',
          desc: 'Iconfont-阿里巴巴矢量图标库',
        },
        {
          url: 'https://www.ascii-art-generator.org/',
          title: 'Ascii art generator',
          desc:
            '免费在线工具，以创建彩色或单色Ascii艺术。 还包括Ascii Banner选项的文本。',
        },
      ],
    },
  ],
};

export default config;

const ConfigKey = 'nav_config';

export function getLocConfig(): Config {
  return JSON.parse(localStorage.getItem(ConfigKey) || '{}');
}

export function setLocConfig(config: Config) {
  return localStorage.setItem(ConfigKey, JSON.stringify(config));
}
