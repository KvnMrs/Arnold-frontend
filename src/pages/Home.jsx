import React from 'react';
import logo from '../assets/images/logo.png';
import motifh from '../assets/images/motif-04.png';
import motifb from '../assets/images/motif-05.png';
import { Link } from 'react-router-dom';
import { FadeInTwo } from '../services/Animate';

const Home = () => {
  return (
    <FadeInTwo>
      <div className=" w-screen h-screen m-0px p-0 flex flex-col justify-between items-center bg-darkblue lg: w-screen h-screen flex">
        <div className=" w-screen lg:w-sreen flex flex-row-reverse ">
          <img
            className=" w-screen lg:w-4/12 flex flex-row-reverse justify-end items-end"
            src={motifh}
            alt="Bonjour"
          />
        </div>
        <img
          className=" mamax-w-screen-sm	w-6/12 lg:w-2/12 "
          src={logo}
          alt="Bonjour"
        />
        <h1 className="font-bold text-6xl text-white pb-2">Arnold</h1>
        <h2 className="font-light italic text-2xl text-white pb-1">
          Tu me ramènes ?
        </h2>
        <Link to="/Login" className="link">
          <button className="bg-orangedark hover:bg-orangedark text-white  py-2 px-4 rounded-full">
            C&apos;est parti !
          </button>
        </Link>
        <div className=" w-screen lg:w-sreen flex flex-row">
          <img
            className=" w-screen lg:w-4/12 flex flex-row-reverse justify-end items-end"
            src={motifb}
            alt="Bonjour"
          />
        </div>
      </div>
    </FadeInTwo>
  );
};

export default Home;
