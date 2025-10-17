import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const WorkoutsContext = WorkoutContext;

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    case "CREATE_WORKOUT":
      return { ...state, workouts: [action.payload, ...(state.workouts || [])] };
    case "DELETE_WORKOUT":
      return { ...state, workouts: state.workouts.filter(w => w._id !== action.payload) };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: [] });

 
  return (
    <WorkoutContext.Provider value={[state.workouts, dispatch]}>
      {children}
    </WorkoutContext.Provider>
  );
};