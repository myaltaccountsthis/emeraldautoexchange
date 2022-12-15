function ListingsElement(props) {
  const item = props.item;
  return (
    <div className="Listings-Element">
      <div className="Listings-Element-Container">
        <b>{[item.year, item.make, item.model].join(" ")}</b>
        <div>{item.miles.toLocaleString()} miles</div>
        <div>Starting Price: ${item.price.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default ListingsElement;