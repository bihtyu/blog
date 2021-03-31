// 将 async/await 转换成 ES5 代码后需要这个运行时库来支持
import 'regenerator-runtime/runtime'

const routes = {
  // import 返回 promise
  '/foo': () => import('./views/foo'),
  '/bar.do': () => import('./views/bar.do')
};

class Router {
  start() {
    // 点击浏览器后退或前进按钮时会触发 window.onpopstate 事件，
    // 我们在这时切换到相应页面
    window.addEventListener('popstate', () => {
      this.load(location.pathname);
    });

    this.load(location.pathname);
  }

  go(path) {
    history.pushState({}, '', path);
    this.load(path);
  }

  // 加载 path 路径的页面
  // 使用 async/wait 语法
  async load(path) {
    if (path === '/') {
      path = '/foo';
    }
    // 动态加载页面
    const View = (await routes[path]()).default
    // 创建页面实例
    const view = new View()

    // 调用页面方法，把页面加载到 document.body 中
    view.mount(document.body)
  }
}

export default new Router();