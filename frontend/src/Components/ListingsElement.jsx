function ListingsElement(props) {
  const item = props.item;
  return (
    <div className="Listings-Element">
      <div className="Listings-Element-Container">
        <div>
          <b>{[item.year, item.make, item.model].join(" ")}</b>
          <br />
          <img className="Listings-Element-Image" src={item.imageUrl} alt={item.imageUrl} />
        </div>
        <div>
          <div style={{ justifySelf: "end" }}>{item.miles.toLocaleString()} miles</div>
          <div style={{ justifySelf: "end" }}>Starting Price: ${item.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default ListingsElement;