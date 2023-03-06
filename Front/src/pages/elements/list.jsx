import {useEffect, useState} from 'react'

import Item from './listItem'
import ModalEdit from './modalEdit';


export default function List(props) {
  const [getPlates, setPlates] = useState([]);
  const [modalData, SetModalData] = useState({});
  const [plateId, setPlateId] = useState('');
  const [getNumber, setNumber] = useState('');
  const [getCity, setCity] = useState('');
  const [getManuf, setManuf] = useState('');
  const [getModel, setModel] = useState('');
  const [getColor, setColor] = useState('');
  const [getYear, setYear] = useState('');

    
  function FindPlates() {
    if (props.token != null) {
      let url = "http://127.0.0.1:8000/"
      let data = {method: 'GET', 
                  headers: {Authorization: 'Token '+ props.token}}
      fetch(url, data).then(res => res.json())
      .then((data) => {
        setPlates(data['cars'])
        });
    }
  }

  function showModalEdit(data) {
    let modal = document.getElementById("ModalEdit")
    if (modal.style.visibility === 'visible') {
      modal.style.visibility = 'hidden';
    } else {
      modal.style.visibility = 'visible';
      setModalFunc(data)
    }
  }

  function setModalFunc(data) {
    setPlateId(data.id)
    setNumber(data.number)
    setCity(data.city)
    setManuf(data.manufacturer)
    setModel(data.model)
    setColor(data.color)
    setYear(data.year)
  }

  function closeModalClick(event) {
    if (event.target.id === "ModalEdit") {
      showModalEdit();
    }
  }

  function savePlate(id) {
    let url = `http://127.0.0.1:8000/edit=${id}/`
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
                Authorization: 'Token '+ props.token},
                body: JSON.stringify(data)}).then((reponse) => {
      if (reponse.status === 200) {
            showModalEdit();
            FindPlates();
          } else {
            alert("Formulario incorreto")
          }
    })
  }

  function deletePlate(id) {
      let url = `http://127.0.0.1:8000/del=${id}/`
      fetch(url, {method: "GET", headers: {
          Authorization: 'Token '+ props.token}})
      .then ((reponse) => {
        if (reponse.status === 200) {
          showModalEdit()
          FindPlates()
        } else {
          alert("Formulario incorreto")
      }
    })
  }

  useEffect(() => {
    FindPlates()
  }, [props.update]);
  

  return (
    <>
      <div className='list'>
        {getPlates.map((data) => (
          <Item key={data.id} data={data} event={() => showModalEdit(data)}></Item> ))}
      </div>

      <ModalEdit close={closeModalClick} save={savePlate} delete={deletePlate} id={plateId}
      number={getNumber} city={getCity} manuf={getManuf} model={getModel} color={getColor} year={getYear}
      setNumber={setNumber} setCity={setCity} setManuf={setManuf} setModel={setModel} setColor={setColor} setYear={setYear}
      ></ModalEdit>        
    </>       
  );
}