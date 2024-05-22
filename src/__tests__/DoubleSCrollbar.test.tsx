jest.unmock("../src/DoubleScrollbar");

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom matchers
import DoubleScrollbar from '../DoubleScrollbar';

describe('DoubleScrollbar', () => {
    const wrappedId = "wrappedElement";
    const childWidth = 1500;

    const createComponent = () => {
        const divStyle = { "width": childWidth + "px" };
        return render(
        <DoubleScrollbar>
            <div id={wrappedId} style={divStyle}><p>this is a wide div</p></div>
        </DoubleScrollbar>
        );
    };

    afterEach(cleanup);

    it('renders successfully', () => {
        const { getByTestId } = createComponent();
        const outerDiv = getByTestId('outerDiv');
        const innerDiv = getByTestId('innerDiv');
        const childrenWrapper = getByTestId('childrenWrapper');

        expect(outerDiv).toBeDefined();
        expect(innerDiv).toBeDefined();
        expect(childrenWrapper).toBeDefined();
        expect((childrenWrapper.firstChild as HTMLElement).id).toBe(wrappedId);
        // addEventListener spy
        expect(window.addEventListener).toHaveBeenCalledWith("resize", expect.any(Function));
    });

    it('cleans up on unmount', () => {
        const { unmount } = createComponent();
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    });

    it('handles changes to the inner child width', () => {
        const { getByTestId } = createComponent();
        const childrenWrapper = getByTestId('childrenWrapper');
        // Simulate scrollWidth value
        Object.defineProperty(childrenWrapper, 'scrollWidth', { value: childWidth, writable: true });
        window.dispatchEvent(new Event('resize'));
        expect(childrenWrapper.style.width).toBe(childWidth + "px");
    });

    it('handles changes to size on re-render', () => {
        const { getByTestId, rerender } = createComponent();
        const childrenWrapper = getByTestId('childrenWrapper');
        // Simulate scrollWidth value
        Object.defineProperty(childrenWrapper, 'scrollWidth', { value: childWidth, writable: true });

        rerender(
        <DoubleScrollbar>
            <div id={wrappedId} style={{ width: childWidth + "px" }}><p>this is a wide div</p></div>
        </DoubleScrollbar>
        );

        expect(childrenWrapper.style.width).toBe(childWidth + "px");
    });

    it('does not call setState if the scrollWidth did not change', () => {
        const { getByTestId, rerender } = createComponent();
        const childrenWrapper = getByTestId('childrenWrapper');
        const setStateSpy = jest.spyOn(React.Component.prototype, 'setState');

        // Simulate scrollWidth value
        Object.defineProperty(childrenWrapper, 'scrollWidth', { value: childWidth, writable: true });

        rerender(
        <DoubleScrollbar>
            <div id={wrappedId} style={{ width: childWidth + "px" }}><p>this is a wide div</p></div>
        </DoubleScrollbar>
        );

        // Check if setState was called once
        expect(setStateSpy).toHaveBeenCalledTimes(1);
    });
});