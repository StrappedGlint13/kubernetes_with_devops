import { useState, useEffect } from 'react'
import { ALL_TODOS } from './gql/queries'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_TODO } from './gql/mutations'

const App = () => {
  const [name, setName] = useState('')
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
      <img src={imageData} alt={"img"} width={200} height={200}/>
      <div>
        <form onSubmit={submit}>
          <div>
            todo:
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <button type='submit'>create todo</button>
          </div>
        </form>
      </div>
      {todos.map((t) => <li key={t.name}> {t.name} </li> )}
    </div>
  )
}

export default App