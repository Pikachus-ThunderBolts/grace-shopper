const Confirmation = ({ localCart }) => {
  return (
    <>
      <section class="section">
        <h1 class="title">Confirmed!</h1>
        <h2 class="subtitle">Order #028341 has been placed.</h2>
        <h2>Enjoy your new -</h2>
        {localCart.map((individualProduct) => {
          return (
            <tr>
              <th>{individualProduct.title}</th>
            </tr>
          );
        })}
        <br></br>
        <h2>A copy of this confirmation has been sent to your email! </h2>

        <h1>Thank you!</h1>
      </section>
    </>
  );
};

export default Confirmation;
