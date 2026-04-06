function Navbar() {
  return (
    <div className="flex justify-between bg-gray-500 px-10 py-5 text-white">
      <h1>LOGO</h1>
      <ul className="flex gap-10">
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Register</a>
        </li>
        <li>
          <a href="">Login</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;