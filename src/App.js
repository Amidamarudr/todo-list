import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/form/form';

function App() {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState(0);
  const [allComplete, setAllComplete] = useState(0);

  // Счёт Complite
  useEffect(() => {
    setAllComplete(todos.filter(todo => todo.done === true).length)
  }, [todos])

  // Добавление Todo
  const putTodo = (value) => {
    if(value) {
      setTodos ([...todos, {id:Date.now(), text: value, done: false}])
      setAllTodos(allTodos + 1)
    } else {
      alert("Введите текст!")
    }
  }

  // Функция изменения Todo(Выполнения)
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        done: !todo.done
      }
    }))
  }

  // Удаление Todo
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
    setAllTodos(allTodos - 1)
  }

  // Удаление всех Todo
  const clearTodos = () => {
    setTodos([]);
    setAllTodos(0)
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <h1 className='title'>TodoList</h1>
        <Form 
            putTodo={putTodo}
        />
        <ul className='todos'>
          {
            todos.map(todo => {
              return (
                <li className={todo.done ? "todo done" : "todo"} key={todo.id} onClick={ e => toggleTodo(todo.id)}>
                  {todo.text}
                  <img src='./close.png' alt='close' className='close' onClick={ e => {
                    e.stopPropagation();
                    removeTodo(todo.id);
                  }}/>
                </li>
              )
            })
          }
        <div className='info'>
          <span>All todos: {allTodos}</span>
          <span>Complete: {allComplete}</span>
        </div>
        <button className='btn' onClick={clearTodos}>Clear all</button>
        </ul>
      </div>
    </div>
  );
}

export default App;
