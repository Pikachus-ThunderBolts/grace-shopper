const Cart = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Cart</h1>
        <h2 class="subtitle">This is where the Cart will live.</h2>
        <table className="table is-bordered is-hoverable is-fullwidth">
          <tbody>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            <tr>
              <th>1</th>
              <td>Dummy Item</td>
              <td>0.00</td>
              <td>1</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Dummy Item 2</td>
              <td>0.00</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Cart;
