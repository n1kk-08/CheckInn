import { createContext, useReducer, useEffect } from "react"; 

// const INITIAL_STATE = {
//     city:undefined,
//     dates:[],
//     options:{
//         adult:undefined,
//         children:undefined,
//         room:undefined
//     }
// }

const getInitialState = () => {
    const savedState = localStorage.getItem('searchState');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            // Convert date strings back to Date objects
            if (parsed.dates && parsed.dates.length > 0) {
                parsed.dates = parsed.dates.map(dateRange => ({
                    ...dateRange,
                    startDate: new Date(dateRange.startDate),
                    endDate: new Date(dateRange.endDate)
                }));
            }
            return parsed;
        } catch (error) {
            console.error('Error parsing saved search state:', error);
        }
    }
    
    return {
        city: undefined,
        dates: [],
        options: {
            adult: undefined,
            children: undefined,
            room: undefined
        }
    };
};

const INITIAL_STATE = getInitialState();

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) =>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state;
    }
}

export const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('searchState', JSON.stringify(state));
    }, [state]);

    return (
        <SearchContext.Provider
        value={{city: state.city, dates : state.dates, options: state.options, dispatch}}>
            {children}
        </SearchContext.Provider>
    )
}
