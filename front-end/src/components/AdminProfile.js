import { Route, Switch, Link } from "react-router-dom";
const AdminProfile = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Profile</h1>
        <h2 class="subtitle">Username:</h2>
        <h2 class="subtitle">Email:</h2>
      </section>
      <section class="section has-background-info">
        <h1 class="title has-text-white">Admin Tools</h1>
        <Link to="/createproduct">
          <h3 className="content has-text-white">Create Product</h3>
        </Link>
        <Link to="/products">
          <h3 className="content has-text-white">Edit Product</h3>
        </Link>
        <Link to="/createadminuser">
          <h3 className="content has-text-white">Create Admin User</h3>
        </Link>
      </section>
    </>
  );
};

export default AdminProfile;
