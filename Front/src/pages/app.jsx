import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'

import './app.css'
import List from './elements/list'
import ModalAdd from './elements/modalAdd'
import Login from './elements/login'

library.add(faMagnifyingGlass, faPlus)


export default function App() {
  const [getToken, setToken] = useState();
  const [update, setUpdate] = useState('');

  const [getNumber, setNumber] = useState('');
  const [getCity, setCity] = useState('');
  const [getManuf, setManuf] = useState('');
  const [getModel, setModel] = useState('');
  const [getColor, setColor] = useState('');
  const [getYear, setYear] = useState('');


  function showModalAdd() {
    let modalAdd = document.getElementById("ModalAdd")
    if (modalAdd.style.visibility == 'visible') {
      modalAdd.style.visibility = 'hidden';
      clearModal()
    } else {
      modalAdd.style.visibility = 'visible';
    }
  }

  function closeModalClick(event) {
    if (event.target.id == "ModalAdd") {
      showModalAdd();
    }
  }

  function clearModal() {
    setNumber('')
    setCity('')
    setManuf('')
    setModel('')
    setColor('')
    setYear('')
  }

  function filterTable(text) {
    let value = text.toUpperCase()
    let item = document.getElementsByClassName("list-item")
     for (let x = 0; x < item.length; x++) {
        let word = item[x].children[0].children[0].innerHTML
        if ( word.indexOf(value) > -1 ) {
            item[x].style.display = "block";
        } else {
            item[x].style.display = "none";
        }
    }
}

  function savePlate() {
    let url = "http://127.0.0.1:8000/add/"
    let data = {
      "number": getNumber,
      "city": getCity,
      "manufacturer": getManuf,
      "model": getModel,
      "color": getColor,
      "year": getYear
    }
    fetch(url, {method: 'POST', 
            headers: {'Content-Type':'application/json',
            Authorization: 'Token '+ getToken},
            body: JSON.stringify(data)}).then((reponse) => {
      if (reponse.status == 200) {
        showModalAdd()
        setUpdate(data['number'])
      } else {
        alert("Formulario incorreto")
      }
    })
  }


  return (
    <>
      <div className='navBar'>

        <div className='align-navbar-items'>
          <div className="align-input">
              <input className='filter' type="text" placeholder="Buscar placa" onChange={ (e) => filterTable(e.target.value) }></input>
          </div>

          <button className='btn' onClick={showModalAdd}> 
            <FontAwesomeIcon icon="fa-solid fa-plus" />  
            <a> Nova placa </a> 
            </button>
        </div>
      </div>

      <Login update={setUpdate} setToken={setToken} getToken={getToken} ></Login>

      <div className='content'>
        <List update={update} token={getToken}></List>
      </div>

      <ModalAdd save={savePlate} close={closeModalClick} 
        number={getNumber} city={getCity} manuf={getManuf} model={getModel} color={getColor} year={getYear}
        setNumber={setNumber} setCity={setCity} setManuf={setManuf} setModel={setModel} setColor={setColor} setYear={setYear}
      ></ModalAdd>
    </>
  )
}
