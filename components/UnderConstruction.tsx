import { MdConstruction } from "react-icons/md";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <MdConstruction className="w-16 h-16 text-gray-800" />
      <h1 className="text-2xl font-bold text-gray-800">
        This page is under construction.
      </h1>
      <p className="text-gray-800">Please check back later!</p>
    </div>
  );
}
