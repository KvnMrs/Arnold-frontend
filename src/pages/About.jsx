import React from 'react';
import NavBar from '../component/NavBar';
import motifb from '../assets/images/motif-05.png';
import { FadeInTwo } from '../services/Animate';

//import photos
import Jeremy from '../assets/photos/Jeremy.jpg';
import Mylene from '../assets/photos/Mylène.png';
import Philippe from '../assets/photos/Philippe.png';

const About = () => {
  return (
    <FadeInTwo>
      <div className="w-screen m-0px p-0 flex flex-col justify-between items-center bg-darkblue ">
        <NavBar />
        <h1 className="font-bold text-5xl text-white pt-28 pb-5 p-0 m-0">
          À propos
        </h1>
        <p className="font-light text-1xl text-white pb-14 w-3/4	text-center p-0 m-0 lg:text-2xl">
          Arnold c&apos;est l&apos;application qui va t&apos;aider à rentrer
          chez toi de manière sécurisée. L&apos;idée vient d&apos;un Stratup
          Week-End Nantais et l&apos;envie de répondre à un vrai problème de
          société : l&apos;insécurité.
        </p>
        <img
          className="inline object-cover w-20 h-20 mr-2 rounded-full p-0 m-0 lg:inline object-cover w-40 h-40 mr-2 rounded-full p-0 m-0"
          src={Jeremy}
          alt="Profileimage"
        />
        <h2 className="font-bold text-2xl text-white  p-0 m-0 pb-5 pt-2">
          Jérémy Bellet
        </h2>
        <img
          className="inline object-cover w-20 h-20 mr-2 rounded-full p-0 m-0 lg:inline object-cover w-40 h-40 mr-2 rounded-full p-0 m-0 "
          src={Philippe}
          alt="Profileimage"
        />
        <h2 className="font-bold text-2xl text-white p-0 m-0 pb-5 pt-2">
          Philippe Gibert
        </h2>
        <img
          className="inline object-cover w-20 h-20 mr-2 rounded-full p-0 m-0 lg:inline object-cover w-40 h-40 mr-2 rounded-full p-0 m-0 "
          src={Mylene}
          alt="Profileimage"
        />
        <h2 className="font-bold text-2xl text-white p-0 m-0 pb-5 pt-2">
          Mylène Correia
        </h2>
        <div className=" w-screen lg:w-sreen flex flex-row">
          <img className="w-screen lg:w-4/12" src={motifb} alt="Bonjour" />
        </div>
      </div>
    </FadeInTwo>
  );
};
export default About;
