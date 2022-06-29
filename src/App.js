import {useState, useEffect} from 'react'
import "./App.css"
import TaskCreator from './components/TaskCreator';
import { TaskTable } from './components/TaskTable';
import { VisibilityControl } from './components/VisibilityControl';
import { Container } from './components/Container';

function App() {



  const [taskItems, setTaskItems] = useState([])

  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName){
    if(!taskItems.find(task => task.name === taskName))
    {
      setTaskItems([...taskItems, {name: taskName, done:false}])
    }
  }

  const toggleTask = task => {
    setTaskItems(

      taskItems.map(t => (t.name === task.name) ? {...t, done: !t. done}: t)
    )
  }



  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if(data)
    {
      setTaskItems(JSON.parse(data))
    }
  }, [])

  const cleanTask = () => {
    setTaskItems(taskItems.filter(task => !task.done))
    setShowCompleted(false)
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  },[taskItems])

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask}></TaskCreator>
        <TaskTable tasks={taskItems} toggleTask={toggleTask}></TaskTable>

        <VisibilityControl
          isChecked = {showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTask = {cleanTask}
        />

        {
          showCompleted === true && (
            <TaskTable
              tasks={taskItems} 
              toggleTask={toggleTask} 
              showCompleted={showCompleted}>
            </TaskTable>
          )
        }
      </Container>

    </main>
  );
}



export default App;
