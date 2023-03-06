export default function ModalAdd(props) {
	return(
        <div className='modal-background' id='ModalAdd' onClick={props.close}>
        <div className='modal'>
          <p className='subtitle'> Nova placa: </p>
          
          <div className='input-align'>
            <input type="text" placeholder={'Digite a placa'} value={props.number} onChange={(e) => props.setNumber(e.target.value)} name="number"></input>
            <input type="text" placeholder={'Digite a cidade'} value={props.city} onChange={(e) => props.setCity(e.target.value)} name="city"></input>
            <input type="text" placeholder={'Digite o modelo'} value={props.model} onChange={(e) => props.setModel(e.target.value)} name="model"></input>
            <input type="text" placeholder={'Digite o fabricante'} value={props.manuf} onChange={(e) => props.setManuf(e.target.value)} name="manufacturer"></input>
            <input type="text" placeholder={'Digite a cor'} value={props.color} onChange={(e) => props.setColor(e.target.value)} name="color"></input>
            <input type="text" placeholder={'Digite o ano'} value={props.year} onChange={(e) => props.setYear(e.target.value)} name="year"></input>
  
            <div className='btns-div'>
              <button className='btn-modal' onClick={props.save}> Salvar </button>
            </div> 
  
          </div>
        </div>
      </div>
  );
}        