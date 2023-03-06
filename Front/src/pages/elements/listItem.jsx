
export default function Item(props) {
	return(
	<div className="list-item" onClick={props.event}>
		<div className="list-item-top">
			<a> {props.data.number} </a>
			<a> {props.data.city} </a>
		</div>
		<div className="list-item-bottom">
			<div className="aling-model">
				<a> {props.data.manufacturer} {props.data.model} </a>
			</div>
			<a> {props.data.color} </a>
			<a> {props.data.year} </a>
		</div>
	</div>
	);
}