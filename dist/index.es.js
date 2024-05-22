import React from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var DoubleScrollbar = /** @class */ (function (_super) {
    __extends(DoubleScrollbar, _super);
    function DoubleScrollbar(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            width: "auto"
        };
        _this.outerDiv = React.createRef();
        _this.innerDiv = React.createRef();
        _this.childrenWrapper = React.createRef();
        _this.boundCalculateWidth = _this.calculateWidth.bind(_this);
        return _this;
    }
    DoubleScrollbar.prototype.componentDidMount = function () {
        var outerDiv = this.outerDiv.current;
        var childWrapper = this.childrenWrapper.current;
        // Set initial width
        this.calculateWidth();
        // Update width when window size changes
        window.addEventListener("resize", this.boundCalculateWidth);
        // Associate the scrolls
        if (outerDiv && childWrapper) {
            outerDiv.onscroll = function () {
                childWrapper.scrollLeft = outerDiv.scrollLeft;
            };
            childWrapper.onscroll = function () {
                outerDiv.scrollLeft = childWrapper.scrollLeft;
            };
        }
    };
    DoubleScrollbar.prototype.componentWillUnmount = function () {
        window.removeEventListener("resize", this.boundCalculateWidth);
    };
    DoubleScrollbar.prototype.componentDidUpdate = function () {
        this.calculateWidth();
    };
    DoubleScrollbar.prototype.calculateWidth = function () {
        var width = this.getChildWrapperWidth() || "auto";
        // Set the width of the inner div to the first child's
        if (width !== this.state.width) {
            this.setState({ width: width });
        }
    };
    DoubleScrollbar.prototype.getChildWrapperWidth = function () {
        if (this.childrenWrapper.current) {
            return "".concat(this.childrenWrapper.current.scrollWidth, "px");
        }
        return null;
    };
    DoubleScrollbar.prototype.render = function () {
        var outerDivStyle = { overflowX: "auto", overflowY: "hidden" };
        var innerDivStyle = { paddingTop: "1px", width: this.state.width, height: "0px" };
        var childDivStyle = { overflow: "auto", overflowY: "hidden" };
        return (React.createElement("div", null,
            React.createElement("div", { ref: this.outerDiv, style: outerDivStyle },
                React.createElement("div", { ref: this.innerDiv, style: innerDivStyle }, "\u00A0")),
            React.createElement("div", { ref: this.childrenWrapper, style: childDivStyle }, this.props.children)));
    };
    return DoubleScrollbar;
}(React.Component));

export { DoubleScrollbar as default };
//# sourceMappingURL=index.es.js.map
