const Dashboard = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 h-full overflow-hidden rounded-2xl">
        <div className="flex flex-col gap-5 h-full">
          <div className="bg-white p-4 rounded-xl h-[50%]">
            <div className="flex bg-blue-700 h-[1.5px] w-full"></div>
          </div>

          <div className="bg-white p-4 rounded-xl h-[50%]"></div>
        </div>

        <div className="bg-white p-4 rounded-xl"></div>

        {/* <div className="bg-white p-4 rounded-md"></div> */}
      </div>
    </div>
  );
};

export default Dashboard;
