import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider');
    }

    // support both provider shapes:
    // - array: [workouts, dispatch]
    // - object: { workouts, dispatch }
    if (Array.isArray(context)) {
        return context;
    }

    if (typeof context === 'object' && context !== null) {
        return [context.workouts, context.dispatch];
    }

    throw Error('Unexpected WorkoutsContext value');
}