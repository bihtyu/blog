const menu_list = [{
  id: '1',
  menu_name: '设置',
  menu_url: 'setting',
  parent_id: 0
 }, {
  id: '1-1',
  menu_name: '权限设置',
  menu_url: 'setting.permission',
  parent_id: '1'
 }, {
  id: '1-1-1',
  menu_name: '用户管理列表',
  menu_url: 'setting.permission.user_list',
  parent_id: '1-1'
 }, {
  id: '1-1-2',
  menu_name: '用户管理新增',
  menu_url: 'setting.permission.user_add',
  parent_id: '1-1'
 }, {
  id: '1-1-3',
  menu_name: '角色管理列表',
  menu_url: 'setting.permission.role_list',
  parent_id: '1-1'
 }, {
  id: '1-2',
  menu_name: '菜单设置',
  menu_url: 'setting.menu',
  parent_id: '1'
 }, {
  id: '1-2-1',
  menu_name: '菜单列表',
  menu_url: 'setting.menu.menu_list',
  parent_id: '1-2'
 }, {
  id: '1-2-2',
  menu_name: '菜单添加',
  menu_url: 'setting.menu.menu_add',
  parent_id: '1-2'
 }, {
  id: '2',
  menu_name: '订单',
  menu_url: 'order',
  parent_id: 0
 }, {
  id: '2-1',
  menu_name: '报单审核',
  menu_url: 'order.orderreview',
  parent_id: '2'
 }, {
  id: '2-2',
  menu_name: '退款管理',
  menu_url: 'order.refundmanagement',
  parent_id: '2'
 }
]


var source = [{
  id: 1,
  parent_id: 0,
  name: 'body'
}, {
  id: 2,
  parent_id: 1,
  name: 'title'
}, {
  id: 3,
  parent_id: 1,
  name: 'div'
}, {
  id: 4,
  parent_id: 3,
  name: 'span'
}, {
  id: 5,
  parent_id: 3,
  name: 'icon'
}, {
  id: 6,
  parent_id: 4,
  name: 'subspan'
}]

function toTree(data) {
  let result = []
  if(!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children;
  });
  let map = {};
  data.forEach(item => {
    map[item.id] = item;
  });
  data.forEach(item => {
    let parent = map[item.parent_id];
    if(parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

function toTree2(data) {
  const result = []
  if (!Array.isArray(data)) {
    throw new Error('参数异常')
  }

  // data.forEach(item => {
  //   delete item.children
  // })

  const map = {}
  data.forEach(item => {
    map[item.id] = item
  })

  data.forEach(item => {
    const parent = map[item.parent_id]
    if (parent) {
      parent.children = Array.isArray(parent.children) ? [...parent.children, item] : [item]
    } else {
      result.push(item)
    }
  })

  return result
}

function toTree3(list) {
  if (!Array.isArray(list)) throw new Error('参数异常')

  const res = []
  const map = {}

  list.forEach(node => {
    map[node.id] = node
  })

  list.forEach(node => {
    const parent = map[node.parent_id]
    if (parent) {
      parent.children = Array.isArray(parent.children) ? [...parent.children, node] : [node]
    } else {
      res.push(node)
    }
  })

  return res
}

console.log(toTree3(menu_list))
console.log(JSON.stringify(toTree3(menu_list)))