import React from 'react';
import { Cat } from '@/services/config';
import { Tree, Button } from 'antd';

export interface MenuEditProps {
  menus: Cat[];
  onMenuChange: (m: Cat[]) => void;
}

interface MenuEditState {
  menus: Cat[];
  keys: string[];
}

const menuToTree = (menus: Cat[]) => {
  let tree: any[] = [];
  menus.forEach((m, i) => {
    let children: any[] = [];
    m.items?.forEach((item, idx) => {
      if (!item) {
        return;
      }
      children.push({
        title: item.title,
        key: `${i}-${idx}`,
      });
    });
    tree.push({
      title: m.cName,
      key: i,
      children: children,
    });
  });
  return tree;
};

const treeToMenu = (menu: Cat[], tree: any[]) => {
  let result: Cat[] = [];
  tree.forEach(f => {
    let cat: Cat = {
      cName: menu[f.key].cName,
      items: [],
    };
    f.children.forEach((c: any) => {
      if (!c) {
        return;
      }
      let [fIdx, cIdx] = c.key.split('-');
      cat.items?.push(menu[fIdx].items[cIdx]);
    });
    result.push(cat);
  });
  return result;
};

export default class Edit extends React.Component<
  MenuEditProps,
  MenuEditState
> {
  constructor(props: MenuEditProps) {
    super(props);
    this.state = {
      menus: props.menus,
      keys: [],
    };
  }

  // componentWillReceiveProps(nextProps: MenuEditProps) {
  //   this.setState({
  //     menus: nextProps.menus
  //   })
  // }

  loop = (
    data: any[],
    key: string,
    callback: (item: any, idx: number, date: any[]) => void,
  ) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        this.loop(data[i].children, key, callback);
      }
    }
  };

  onDrop = (info: any) => {
    const { onMenuChange } = this.props;
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const { menus } = this.state;
    const data = [...menuToTree(menus)];

    // Find dragObject
    let dragObj: any;
    this.loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      if (!data[dropKey]) {
        return;
      }
      this.loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      this.loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      if (data[dropKey]) {
        return;
      }
      let ar: any[] = [];
      let i = 0;
      this.loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    const newMenu = treeToMenu(menus, data);
    this.setState(
      {
        menus: newMenu,
      },
      () => {
        onMenuChange(newMenu);
      },
    );
  };

  deleteMenu = () => {
    const { onMenuChange } = this.props;
    const { menus, keys } = this.state;
    const tree = [...menuToTree(menus)];
    keys.map(k => {
      this.loop(tree, k, (item, index, arr) => {
        arr.splice(index, 1);
      });
    });
    const newMenu = treeToMenu(menus, tree);
    this.setState(
      {
        menus: newMenu,
        keys: [],
      },
      () => {
        onMenuChange(newMenu);
      },
    );
  };

  render() {
    const { menus, keys } = this.state;
    return (
      <>
        <Tree
          checkable
          draggable
          blockNode
          treeData={menuToTree(menus)}
          onDrop={this.onDrop}
          onCheck={(keys, info) => {
            this.setState({
              keys: keys || [],
            });
          }}
        />
        {keys.length > 0 && (
          <Button type="link" danger onClick={this.deleteMenu}>
            删除
          </Button>
        )}
      </>
    );
  }
}
