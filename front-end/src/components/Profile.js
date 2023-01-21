const Profile = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Profile</h1>
        <h2 class="subtitle">Username:</h2>
        <h2 class="subtitle">Email:</h2>
      </section>
      <section class="section has-background-info">
        <h1 class="title has-text-white">My Orders</h1>
        <table className="table is-bordered is-hoverable is-fullwidth has-background-info">
          <tbody>
            <tr>
              <th className="has-text-white">Order #</th>
              <th className="has-text-white">Total</th>
            </tr>
            <tr>
              <th className="has-text-white">001001</th>
              <td className="has-text-white">0.00</td>
            </tr>
            <tr>
              <th className="has-text-white">110110</th>
              <td className="has-text-white">0.00</td>
            </tr>
          </tbody>
        </table>
        <h2 class="subtitle"></h2>
      </section>
      <section class="section">
        <h1 class="title">My Reviews</h1>
        <h2 class="subtitle"></h2>
        <br></br>
        <h2 class="subtitle">Review Title</h2>
        <p classname="content">This is where users will leave reviews. </p>
      </section>
    </>
  );
};

export default Profile;
