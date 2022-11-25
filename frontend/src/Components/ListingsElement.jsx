function ListingsElement(props) {
  const item = props.item;
  return (
    <div className="Listings-Element">
      <div className="Listings-Element-Container">
        {[[item.year, item.make, item.model].join(" "), item.miles, item.condition, item.price].map(value => <div>{value}</div>)}
      </div>
    </div>
  );
}

export default ListingsElement;