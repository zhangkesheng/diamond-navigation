'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
var react_1 = require('react');
require('./box.less');
var antd_1 = require('antd');
var Box = /** @class */ (function(_super) {
  __extends(Box, _super);
  function Box(props) {
    var _this = _super.call(this, props) || this;
    _this.menuHandler = function(_a) {
      var key = _a.key,
        keyPath = _a.keyPath,
        item = _a.item,
        event = _a.event;
    };
    _this.state = {
      activeIdx: _this.props.boxItems[0].category_id,
    };
    return _this;
  }
  Box.prototype.render = function() {
    var boxItems = this.props.boxItems;
    var activeIdx = this.state.activeIdx;
    return react_1['default'].createElement(
      antd_1.Row,
      { gutter: 0, style: { height: '100%' } },
      react_1['default'].createElement(
        antd_1.Col,
        { span: 4 },
        react_1['default'].createElement(
          antd_1.Menu,
          {
            style: { height: '100%' },
            defaultSelectedKeys: [activeIdx],
            onClick: this.menuHandler,
          },
          boxItems.map(function(v, i) {
            return react_1['default'].createElement(
              antd_1.Menu.Item,
              { key: v.category_id },
              react_1['default'].createElement('span', null, v.category),
            );
          }),
        ),
      ),
      react_1['default'].createElement(
        antd_1.Col,
        { span: 20 },
        react_1['default'].createElement(
          antd_1.Layout.Content,
          {
            className: 'box-content',
            style: { height: 500, overflowY: 'scroll' },
          },
          boxItems.map(function(b, idx) {
            return react_1['default'].createElement(
              antd_1.Card,
              {
                key: idx,
                title: react_1['default'].createElement(
                  'span',
                  { id: '#' + b.category_id },
                  b.category,
                ),
                bordered: false,
              },
              react_1['default'].createElement(
                antd_1.Row,
                { gutter: 16 },
                b.items.map(function(item, i) {
                  return react_1['default'].createElement(
                    antd_1.Col,
                    { key: i, span: 8, style: { marginBottom: 16 } },
                    react_1['default'].createElement(
                      'a',
                      { href: item.target, target: '_blank' },
                      react_1['default'].createElement(
                        antd_1.Card,
                        {
                          headStyle: { padding: '0 10px' },
                          bodyStyle: { padding: 10 },
                          type: 'inner',
                          title: item.title,
                        },
                        react_1['default'].createElement(
                          'span',
                          {
                            style: {
                              display: 'inline-block',
                              height: 61,
                              overflowY: 'hidden',
                            },
                          },
                          item.desc,
                        ),
                      ),
                    ),
                  );
                }),
              ),
            );
          }),
        ),
      ),
    );
  };
  return Box;
})(react_1['default'].Component);
exports['default'] = Box;
