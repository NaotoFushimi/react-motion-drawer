'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _reactHammerjs = require('react-hammerjs');

var _reactHammerjs2 = _interopRequireDefault(_reactHammerjs);

var _extend = require('1-liners/extend');

var _extend2 = _interopRequireDefault(_extend);

var _isFunction = require('1-liners/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _styles2 = require('./styles');

var _styles3 = _interopRequireDefault(_styles2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React$PropTypes = _react2.default.PropTypes,
    bool = _React$PropTypes.bool,
    number = _React$PropTypes.number,
    array = _React$PropTypes.array,
    object = _React$PropTypes.object,
    string = _React$PropTypes.string,
    func = _React$PropTypes.func,
    oneOfType = _React$PropTypes.oneOfType;

var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Drawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentState: 'CLOSED'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Drawer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var open = this.props.open;
      var nextOpen = nextProps.open;


      if (nextOpen !== open) {
        if (nextOpen) this.open();else this.close();
      }
    }
  }, {
    key: 'isState',
    value: function isState(s) {
      return s === this.state.currentState;
    }
  }, {
    key: 'isClosed',
    value: function isClosed() {
      return this.isState('CLOSED');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isState('OPEN');
    }
  }, {
    key: 'isOpening',
    value: function isOpening() {
      return this.isState('IS_OPENING');
    }
  }, {
    key: 'isClosing',
    value: function isClosing() {
      return this.isState('IS_CLOSING');
    }
  }, {
    key: 'onPress',
    value: function onPress(e) {
      if (this.props.noTouchOpen) return;
      e.preventDefault();
      this.peak();
    }
  }, {
    key: 'onPressUp',
    value: function onPressUp(e) {
      e.preventDefault();
      this.close();
    }
  }, {
    key: 'peak',
    value: function peak() {
      var _props = this.props,
          onChange = _props.onChange,
          handleWidth = _props.handleWidth;

      onChange(false);
      return this.setState({ currentState: 'PEAK', x: handleWidth });
    }
  }, {
    key: 'close',
    value: function close() {
      this.props.onChange(false);
      return this.setState({ currentState: 'CLOSED', x: 0 });
    }
  }, {
    key: 'open',
    value: function open() {
      var _props2 = this.props,
          onChange = _props2.onChange,
          width = _props2.width;

      onChange(true);
      return this.setState({ currentState: 'OPEN', x: width });
    }
  }, {
    key: 'isClosingDirection',
    value: function isClosingDirection(direction) {
      var right = this.props.right;

      var isClosing = direction === 2;

      if (right) return !isClosing;else return isClosing;
    }
  }, {
    key: 'closingOrOpening',
    value: function closingOrOpening(direction) {
      return this.isClosingDirection(direction) ? 'IS_CLOSING' : 'IS_OPENING';
    }
  }, {
    key: 'inPanTolerance',
    value: function inPanTolerance(deltaX) {
      var currentState = this.state.currentState;
      var panTolerance = this.props.panTolerance;


      return Math.abs(deltaX) <= panTolerance && currentState === 'OPEN';
    }
  }, {
    key: 'onPan',
    value: function onPan(e) {
      if (this.isClosed() && this.props.noTouchOpen) return;
      if (this.isOpen() && this.props.noTouchClose) return;
      e.preventDefault();

      var isFinal = e.isFinal,
          pointers = e.pointers,
          direction = e.direction,
          deltaX = e.deltaX;

      if (this.inPanTolerance(deltaX)) return;

      if (isFinal) {
        if (this.isOpening()) this.open();else if (this.isClosing()) this.close();
        return;
      }

      var currentState = this.state.currentState;
      var _props3 = this.props,
          right = _props3.right,
          peakingWidth = _props3.peakingWidth,
          width = _props3.width,
          handleWidth = _props3.handleWidth;
      var clientX = pointers[0].clientX;


      var x = right ? document.body.clientWidth - clientX : clientX;

      if (x + peakingWidth >= width) x = width - peakingWidth;

      var closingOrOpening = this.closingOrOpening(direction);
      var nextState = {
        PEAK: closingOrOpening,
        IS_OPENING: closingOrOpening,
        IS_CLOSING: closingOrOpening,
        OPEN: 'IS_CLOSING',
        CLOSED: 'PEAK'
      };

      this.setState({
        currentState: nextState[currentState],
        x: this.isClosed() ? peakingWidth : peakingWidth / 2 + x
      });
    }
  }, {
    key: 'onOverlayTap',
    value: function onOverlayTap(e) {

      if (this.props.onTouchOverlay != null) {
        this.props.onTouchOverlay(e);
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (this.isOpen()) this.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          config = _props4.config,
          drawerStyle = _props4.drawerStyle,
          className = _props4.className,
          overlayClassName = _props4.overlayClassName,
          width = _props4.width,
          children = _props4.children,
          offset = _props4.offset;
      var _state = this.state,
          currentState = _state.currentState,
          x = _state.x;


      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: { myProp: (0, _reactMotion.spring)(x + offset || 0, config) } },
        function (interpolated) {
          var _styles = (0, _styles3.default)(interpolated.myProp, _this2.props),
              drawer = _styles.drawer,
              transform = _styles.transform,
              overlay = _styles.overlay;

          var computedStyle = (0, _extend2.default)(drawer, drawerStyle);
          if (interpolated.myProp > 0) computedStyle.display = 'block';else computedStyle.display = 'none';

          return _react2.default.createElement(
            'div',
            { style: transform },
            _react2.default.createElement(
              _reactHammerjs2.default,
              {
                onPress: _this2.onPress.bind(_this2),
                onPressUp: _this2.onPressUp.bind(_this2),
                onPan: _this2.onPan.bind(_this2), vertical: false },
              _react2.default.createElement(
                'div',
                { className: className, style: computedStyle },
                (0, _isFunction2.default)(children) ? children(interpolated.myProp) : children,
                !_this2.isClosed() && _react2.default.createElement(
                  _reactHammerjs2.default,
                  { style: overlay, className: overlayClassName, onTap: _this2.onOverlayTap.bind(_this2) },
                  _react2.default.createElement('span', null)
                )
              )
            )
          );
        }
      );
    }
  }]);

  return Drawer;
}(_react2.default.Component);

Drawer.propTypes = {
  zIndex: number, // z-index of the drawer default is 10000
  noTouchOpen: bool, // can a user pan to open
  noTouchClose: bool, // can a user pan to close
  onChange: func, // called when the drawer is open
  drawerStyle: object, // additional drawer styles
  className: string, // additional drawer className
  overlayClassName: string, // additional overlay className
  config: array, // configuration of the react-motion animation
  open: bool, // states if the drawer is open
  width: number, // width of the drawer
  height: oneOfType([number, string]), // height of the drawer
  handleWidth: number, // width of the handle
  peakingWidth: number, // width that the drawer peaks on press
  panTolerance: number, // tolerance until the drawer starts to move
  right: bool, // drawer on the right side of the screen
  overlayColor: string, // color of the overlay
  fadeOut: bool, // fade out
  offset: number, // offset
  onTouchOverlay: func
};
Drawer.defaultProps = {
  zIndex: 10000,
  noTouchOpen: false,
  noTouchClose: false,
  onChange: function onChange() {},
  overlayColor: 'rgba(0, 0, 0, 0.45)',
  config: [350, 40],
  open: false,
  width: 300,
  height: '100%',
  handleWidth: 20,
  peakingWidth: 50,
  panTolerance: 50,
  right: false,
  fadeOut: true,
  offset: 0,
  onTouchOverlay: null,
  drawerStyle: {
    background: '#F9F9F9',
    boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px'
  }
};
exports.default = Drawer;