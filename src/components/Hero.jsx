import { Clogo } from '../assets';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={Clogo} alt="sumai_logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() => window.open("https://github.com/SagnikChak/SumAI")}
          className="white_btn items-center"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text slate_gradient">
        Extract Information from Websites with <br className="max-md:hidden" />
        <span className="font-cinzel text-4xl font-extrabold slate_gradient">
          Artificial Intelligence
        </span>
      </h1>

      <h2 className="desc font-fauna">
        Get texts and images with SumAI, an open-source information extracter
        that extracts texts and images from websites, if it is just provided
        with the URL.
      </h2>
    </header>
  );
};

export default Hero;