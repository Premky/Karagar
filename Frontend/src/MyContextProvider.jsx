import React, { createContext, useContext } from 'react';

// Create Context
const MyContext = createContext();

// Custom hook to use the context
const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
};

// Context Provider Component
const MyContextProvider = ({ children }) => {
    const value = { basename: 'example' }; // Your context value
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// Component consuming the context
const MyComponent = () => {
    const { basename } = useMyContext();
    return <div>{basename}</div>;
};

// App Component
const App = () => (
    <MyContextProvider>
        <MyComponent />
    </MyContextProvider>
);

export default App;
