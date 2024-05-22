import React from 'react';
interface DoubleScrollbarProps {
    children: React.ReactNode;
}
interface DoubleScrollbarState {
    width: string;
}
declare class DoubleScrollbar extends React.Component<DoubleScrollbarProps, DoubleScrollbarState> {
    outerDiv: React.RefObject<HTMLDivElement>;
    innerDiv: React.RefObject<HTMLDivElement>;
    childrenWrapper: React.RefObject<HTMLDivElement>;
    boundCalculateWidth: () => void;
    constructor(props: DoubleScrollbarProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    calculateWidth(): void;
    getChildWrapperWidth(): string | null;
    render(): React.JSX.Element;
}
export default DoubleScrollbar;
