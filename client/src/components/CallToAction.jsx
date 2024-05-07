import { Button } from "flowbite-react";


export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex flex-col flex-1 justify-center gap-1">
        <h2 className="text-2xl">Want to learn more about javascript?</h2>
        <p className="text-gray-500 my-2">Checkout these resource with 100 Javascript projects</p>
        <Button
          gradientDuoTone={"purpleToPink"}
          className=" rounded-tl-xl rounded-bl-none"
        >
          <a href="#" target="_blank">
            100 Javascript Projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBDL2_IZSrXJ-TJzZdd4yqFExnd8MCaGXkgQAgbiXRxw&s"
          alt="image calltoaction"
        />
      </div>
    </div>
  );
}
