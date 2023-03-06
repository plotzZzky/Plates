export default function ModalEdit(props) {
	return(
    <div className='modal-background' id='ModalEdit' onClick={props.close}>   
      <div className='modal'>
        <p className='subtitle'> Editar placa: </p>
        <div className='input-align'>
        <input type="text" placeholder={'Digite a placa'} value={props.number} onChange={(e) => props.setNumber(e.target.value)}></input>
        <input type="text" placeholder={'Digite a cidade'} value={props.city} onChange={(e) => props.setCity(e.target.value)}></input>
        <input type="text" placeholder={'Digite o modelo'} value={props.model} onChange={(e) => props.setModel(e.target.value)}></input>
        <input type="text" placeholder={'Digite o fabricante'} value={props.manuf} onChange={(e) => props.setManuf(e.target.value)}></input>
        <input type="text" placeholder={'Digite a cor'} value={props.color} onChange={(e) => props.setColor(e.target.value)}></input>
        <input type="text" placeholder={'Digite o ano'} value={props.year} onChange={(e) => props.setYear(e.target.value)}></input>
        <div className='btns-div'>
            <button className='btn-modal' onClick={() => props.save(props.id)}> Salvar </button>
            <button className='btn-modal' onClick={() => props.delete(props.id)} style={{backgroundColor: 'rgb(202, 51, 51)'}}> Apagar  </button>
        </div>
        </div>
      </div>
    </div>
  );
}        