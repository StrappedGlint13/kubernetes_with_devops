import { useState, useEffect } from 'react'
import { getCounter, getTimeStamp } from './services/counterService'
import { ALL_TODOS } from './gql/queries'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_TODO } from './gql/mutations'

const App = () => {
  const [timestamp, setTimetamp] = useState('')
  const [name, setName] = useState('')
  const [counter, setCounter] = useState('')
  const [imageData, setImageData] = useState('');

  const [ addTodo ] = useMutation(ADD_TODO, {
    refetchQueries: [ { query: ALL_TODOS } ],
  })

  useEffect(() =>{
      fetch('https://picsum.photos/1200')
          .then(response => response.blob())
          .then(image => {
          const localUrl = URL.createObjectURL(image);
          setImageData(localUrl);
          })
  }, [])
  

  useEffect(() => {
    const initCounter = async () => {
      const fetchedCounter = await getCounter()
      setCounter(fetchedCounter)
      const fetchedTimestamp = await getTimeStamp()
      setTimetamp(fetchedTimestamp)
    }

    initCounter()
  }, [])

  const result = useQuery(ALL_TODOS)

  if (result.loading) {
    return <div>loading...</div>
  }
  const todos = result.data.allTodos

  const submit = async (event) => {
    event.preventDefault()
  
    addTodo({ variables: { name } })

    setName('')
}

  return ( 
    <div>  
      <p> {timestamp} </p>
      <img src={imageData} alt={"img"} width={200} height={200}/>
      <p> Pong: {counter}</p>
      {todos.map((t) => <li key={t.name}> {t.name} </li> )}
      <div>
        <form onSubmit={submit}>
          <div>
            todo:
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <button type='submit'>create todo</button>
        </form>
      </div>
    </div>
  )
}

export default App