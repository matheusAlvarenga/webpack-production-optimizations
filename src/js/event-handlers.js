import { renderTodos, clearNewTodoInput, getTodoId } from './ui';
import { getAllTodos, addTodo, removeTodo, updateTodo } from './data';
import { trim } from './helpers'

export function onLoadEventHandler() {
    renderTodos(getAllTodos())
}

export function newTodoEventHandler(event) {
    let text = event.target.value
    text = trim(text)
    addTodo({
        id: Date.now(),
        text: text,
        completed: false
    })
    renderTodos(getAllTodos())
    clearNewTodoInput()
}

export function removeTodoEventHandler(event) {
    const id = getTodoId(event.target)
    removeTodo(id)
    renderTodos(getAllTodos())
}

export function toggleTodoEventListener(event) {
    const id = getTodoId(event.target)
    const isCompleted = event.target.checked
    updateTodo(id, isCompleted)
    renderTodos(getAllTodos())
}
