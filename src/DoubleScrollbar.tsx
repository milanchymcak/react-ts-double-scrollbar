import React from 'react';

interface DoubleScrollbarProps {
    children: React.ReactNode;
}

interface DoubleScrollbarState {
    width: string;
}

class DoubleScrollbar extends React.Component<DoubleScrollbarProps, DoubleScrollbarState> {
    outerDiv: React.RefObject<HTMLDivElement>;
    innerDiv: React.RefObject<HTMLDivElement>;
    childrenWrapper: React.RefObject<HTMLDivElement>;
    boundCalculateWidth: () => void;

    constructor(props: DoubleScrollbarProps) {
        super(props);
        this.state = {
            width: "auto"
        };

        this.outerDiv = React.createRef();
        this.innerDiv = React.createRef();
        this.childrenWrapper = React.createRef();

        this.boundCalculateWidth = this.calculateWidth.bind(this);
    }

    componentDidMount() {
        const outerDiv = this.outerDiv.current;
        const childWrapper = this.childrenWrapper.current;

        // Set initial width
        this.calculateWidth();

        // Update width when window size changes
        window.addEventListener("resize", this.boundCalculateWidth);

        // Associate the scrolls
        if (outerDiv && childWrapper) {
            outerDiv.onscroll = () => {
                childWrapper.scrollLeft = outerDiv.scrollLeft;
            };

            childWrapper.onscroll = () => {
                outerDiv.scrollLeft = childWrapper.scrollLeft;
            };
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.boundCalculateWidth);
    }

    componentDidUpdate() {
        this.calculateWidth();
    }

    calculateWidth() {
        const width = this.getChildWrapperWidth() || "auto";

        // Set the width of the inner div to the first child's
        if (width !== this.state.width) {
            this.setState({ width });
        }
    }

    getChildWrapperWidth() {
        if (this.childrenWrapper.current) {
            return `${this.childrenWrapper.current.scrollWidth}px`;
        }
        return null;
    }

    render() {
        const outerDivStyle: React.CSSProperties = { overflowX: "auto", overflowY: "hidden" };
        const innerDivStyle: React.CSSProperties = { paddingTop: "1px", width: this.state.width, height: "0px" };
        const childDivStyle: React.CSSProperties = { overflow: "auto", overflowY: "hidden" };

        return (
            <div>
                <div ref={this.outerDiv} style={outerDivStyle}>
                    <div ref={this.innerDiv} style={innerDivStyle}>&nbsp;</div>
                </div>
                <div ref={this.childrenWrapper} style={childDivStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DoubleScrollbar;