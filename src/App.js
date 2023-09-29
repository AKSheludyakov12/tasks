import React,{useState, useEffect} from 'react';
import './App.css';
import uuid from 'react-uuid';
import randomColor from 'randomcolor';
import Draggable from 'react-draggable';

function App() {  

  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )
    
  useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () =>{
    if(item.trim() !== ""){
      const newItem ={
        id: uuid(),
        item: item,
        color:randomColor({
          luminosity: 'light',
        }),
        defaultPos:{
          x: 500,
          y: -500
        }
      }
      setItems((items)=>[...items, newItem])
      setItem('')
    }else {
      alert('Enter something... ')
      setItem('')
    }
  }

  const deleteNode = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePos = (data, index) =>{
    let newArray = [...items]
    newArray[index].defaultPos = {x:data.x, y:data.y}
    setItems(newArray)
  }

  const keyPress = (e) =>{
    const code = e.keycode || e.which 
    if ( code === 13)
    {
      newItem()
    }
  }

  return (
    <div className="App">
      <div className='wrapper'>
        <input
        value={item}
        onChange={(e) => setItem(e.target.value) }
        onKeyPress={(e)=> keyPress(e)}
        type="text"
        placeholder='Enter something...'/>
        
        <button className='enter' onClick={newItem}>Enter</button>
      </div>
      {
        items.map((item,index)=>{
          return (
          <Draggable
            onStop={(e, data)=> {
              updatePos(data, index)
            }}
            key={index}
            defaultPosition={item.defaultPos}
            >
              <div className='todo__item' style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button className='delete'
                onClick={()=> deleteNode(item.id)}>
                  X
                </button>
              </div>
          </Draggable>)
        })
      }
    </div>
  );
}

export default App;
