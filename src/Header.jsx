import logo from './assets/pngwing.png'
function Header() {
  return (
    <header className='app-header'>
      <img src={logo} alt='react-logo' />

      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
