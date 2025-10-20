import React from 'react';
import { useWorkoutsContext } from '../hook/useWorkoutsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch('https://workout-buddy-3hq7.onrender.com/api/workouts/' + workout._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json._id });
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addsuffix: true})}</p>

      <span 
        onClick={handleClick} 
        style={{ color: 'red', cursor: 'pointer' , opacity: 0.9}} 
        role="button" 
        aria-label="Delete workout"
      >
        <FontAwesomeIcon icon={faTrash} />
      </span>
    </div>
  );
};

export default WorkoutDetails;
