import { Route, Switch, Link } from "react-router-dom";
const AdminProfile = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Welcome Administrator</h1>
      </section>
      <section class="section has-background-info">
        <h1 class="title has-text-white">Admin Tools</h1>
        <Link to="/createproduct">
          <h3 className="content has-text-white adminButton">Create Product</h3>
        </Link>
        <Link to="/products">
          <h3 className="content has-text-white adminButton">Edit Product</h3>
        </Link>
        <Link to="/createadminuser">
          <h3 className="content has-text-white adminButton">Create Admin User</h3>
        </Link>
      </section>
    </>
  );
};

export default AdminProfile;
