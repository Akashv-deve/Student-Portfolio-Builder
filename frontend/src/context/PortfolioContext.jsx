import React, { createContext, useReducer, useContext } from 'react';

// 1. Define the Initial State
const initialState = {
  personalInfo: { firstName: '', lastName: '', role: '', bio: '', email: '' },
  education: [],
  projects: [],
  skills: []
};

// 2. The Reducer: Central hub for all state changes
function portfolioReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return { 
        ...state, 
        personalInfo: { ...state.personalInfo, ...action.payload } 
      };
      
    case 'ADD_PROJECT':
      return { 
        ...state, 
        projects: [...state.projects, action.payload] 
      };
      
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj, index) =>
          index === action.payload.index ? action.payload.data : proj
        )
      };
      
    // We will add more cases (DELETE_PROJECT, ADD_EDUCATION) as we build
    default:
      return state;
  }
}

// 3. Split Contexts for performance
const PortfolioStateContext = createContext();
const PortfolioDispatchContext = createContext();

// 4. The Provider Component
export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  return (
    <PortfolioStateContext.Provider value={state}>
      <PortfolioDispatchContext.Provider value={dispatch}>
        {children}
      </PortfolioDispatchContext.Provider>
    </PortfolioStateContext.Provider>
  );
};

// 5. Custom Hooks for super clean imports in your components
export const usePortfolioState = () => useContext(PortfolioStateContext);
export const usePortfolioDispatch = () => useContext(PortfolioDispatchContext);