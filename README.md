## Overview
A simple react component that adds a second scrollbar to the table. This is useful when you have a table with a lot of columns and you want to keep the header in view while scrolling the body. Originally forked from [react-double-scrollbar](https://github.com/umchee/react-double-scrollbar/). But I have made some changes to the code to make it work with typescript, also added some new features and removed outdated/deprecated code.

## Install
```bash
npm i react-ts-double-scrollbar --save
```

## Usage
```jsx
import DoubleScrollbar from 'react-ts-double-scrollbar';

const App = () => {

  return (
    <DoubleScrollbar>
        <table style={{ width: '2000px', height: '2000px' }}>
        ...
        </table>
    </DoubleScrollbar>
    );
}
```
