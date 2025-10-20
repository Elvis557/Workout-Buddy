import { useState } from "react"
import { useWorkoutsContext } from "../hook/useWorkoutsContext"

const WorkoutForm = () => {
    const [, dispatch] = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        try {
            const response = await fetch('https://workout-buddy-3hq7.onrender.com/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error || 'Failed to create workout')
                setEmptyFields(json.emptyFields || []) 
                return
            }

            // success
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        } catch (err) {
            setError(err.message || 'Network error')
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add a New Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
