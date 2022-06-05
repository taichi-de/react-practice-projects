import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = lacalStorage.getItem('list')
  if(list) {
    return JSON.parse(localStrage.getItem('item'))
  }else{
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState({});
  const [alert, setAlert] = useState({show:false, msg:'', type:''});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      setAlert(true,'plaese enter value','danger')

    }else if(name && isEditing) {
      setList(list.map((item) => {
        if(item.id === editID){
          return {...item, title: name}
        }
        return item;
      }))
      setName('')
      setEditID(null);
      setIsEditing(false);
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('')
    }
  }

  const showAlert = (show=false,type="",msg="") => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSumbit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g.eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="sumbit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-center">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  )
}

export default App
