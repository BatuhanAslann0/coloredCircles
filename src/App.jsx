import React , {useState} from 'react'

const App = () => {

  const [circles,setCircles] = useState([])
  const [undoHistory, setUndoHistory] = useState([]);

  const handleUndo = () => {
  if(circles.length > 0) {
   const removedCircle = circles[circles.length - 1]
   const newCircles = [...circles]
   newCircles.pop()
   setCircles(newCircles)
   setUndoHistory(prevHistory => [...prevHistory, removedCircle])
  }
  }

  const handleRedo = () => {
    if(undoHistory.length > 0) {
      const lastRemovedCircle = undoHistory[undoHistory.length -1]
      const newCircles = [...circles]
      newCircles.push(lastRemovedCircle)
      setCircles(newCircles)
      const newUndoHistory = [...undoHistory]
      newUndoHistory.pop()
      setUndoHistory(newUndoHistory)
    }
   }
   
   const deleteAll = () => {
     setCircles([])
     setUndoHistory([])
   }

   const generateColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
   }

  const handleClick = (e) => {
   setCircles([...circles , {x: e.clientX, y: e.clientY, color:generateColor()}])
  }

  return (
    <div className='app-container'>
      <div className="buttons">    
        {circles.length === 0 ? <button disabled>Undo</button> : <button onClick={handleUndo} >Undo</button>}  
          
        {undoHistory.length === 0 ? <button disabled>Redo</button> : <button onClick={handleRedo}>Redo</button>}
        
        {circles.length === 0 ? <button disabled>Delete All</button> : <button onClick={deleteAll} >Delete All</button>}
      </div>

      <div onClick={handleClick} className="screen">
        {circles.map((circle,idx) => (
          <div
          key={idx}
          className = "circle"
          style={{
            left:`${circle.x - 25 }px`,
            top:`${circle.y - 25 }px`,
            backgroundColor:circle.color
          }}
          >
          </div>
        ))}
      </div>
    </div>
  )
}

export default App