const CreateAdminUser = () => {
  return (
    <>
      <section class="section">
        <h1 class="title">Create Admin User</h1>
        <form class="box">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" placeholder="username"></input>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alex@example.com"
              ></input>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="********"
              ></input>
            </div>
          </div>

          <button class="button is-primary">Sign in</button>
        </form>
      </section>
    </>
  );
};

export default CreateAdminUser;
