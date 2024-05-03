interface navButtonsProps {
  handleScroll: (direction: "left" | "right") => void;
}

const NavButtons = ({ handleScroll }: navButtonsProps) => {
  return (
    <div className="flex gap-2 px-3 h-8 w-52 mb-4 absolute top-4 right-0 ">
      <button
        onClick={() => handleScroll("left")}
        className="border-2 w-20 hover:bg-stone-800"
      >
        Left{" "}
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="border-2 w-20 hover:bg-stone-800"
      >
        Right{" "}
      </button>
    </div>
  );
};

export default NavButtons;
