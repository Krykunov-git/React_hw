function ShoppingList({ items }) {

  if (items.length === 0) {
    return <p>Einkaufsliste ist leer</p>
  } else {
    return (
      <ul key={items.id}>{items.map(item => <li>{item}</li>)}</ul>
    )
  }
}
export default ShoppingList;