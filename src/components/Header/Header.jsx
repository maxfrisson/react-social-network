import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
        <img
          className={style.image} src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"
          alt=""
        />
      </header>
  )
}

export default Header;