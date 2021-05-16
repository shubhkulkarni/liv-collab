import React from "react";
import { classes } from "./classes";
import logo from "../../assets/logo.svg";
import codeImg from "../../assets/code2.gif";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className={classes.home}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" className={classes.logoImg} />
      </div>
      <div className={classes.hero}>
        <div className={classes.heroDesc}>
          <div className="xl:text-7xl lg:text-6xl md:text-6xl text-4xl  leading-tight font-bold">
            Live Sharing
          </div>
          <div className="lg:text-6xl md:5xl text-4xl  ">your code</div>
          <div className="lg:text-6xl md:5xl text-4xl leading-tight">
            made easy !
          </div>
          <div className="lg:text-3xl text-xl lg:mt-10 mt-4 text-gray-400">
            write code online
          </div>
          <div className="lg:text-3xl text-xl text-gray-400">
            share with peers real-time
          </div>
          <div className={classes.btnCtr}>
            <Link to="/confirm/create">
              <button className={classes.btn}>Create room</button>
            </Link>
          </div>
        </div>
        <div className={classes.heroImg}>
          {" "}
          <img src={codeImg} alt="logo" className={classes.codeImg} />
        </div>
      </div>

      <div className={classes.joinCtr}>
        <Link to="/confirm/join">
          {" "}
          <button className={classes.joinBtn}>Join</button>{" "}
        </Link>
        <div className={classes.joinDesc}>
          Join existing room created by others
        </div>
      </div>

      <div className={classes.cardCtr}>
        <div className={classes.card}>
          <div className={classes.cardBadge}>Development</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nulla
          ullam quaerat assumenda. Id quasi explicabo ratione tenetur eligendi
          quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
          nulla ullam quaerat assumenda.
        </div>
        <div className={classes.card}>
          <div className={classes.cardBadge}>Teams</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nulla
          ullam quaerat assumenda. Id quasi explicabo ratione tenetur eligendi
          quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
          nulla ullam quaerat assumenda.
        </div>
      </div>

      <footer className={classes.footer}>
        <div className={classes.footerTitle}>
          <div className={classes.title}>
            Available on mobiles and desktops as PWA
          </div>
          <button className={classes.btn + classes.footerBtn}>
            Learn more
          </button>
        </div>
        <div className={classes.end}>Made with ❤️ by Shubham Kulkarni</div>
      </footer>
    </div>
  );
}

export default Home;
