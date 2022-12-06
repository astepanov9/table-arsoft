const Preloader: React.FC = () => {
  return (
    <div className="p-4 w-full max-h-[338px] space-y-4 rounded-lg border divide-y divide-gray-200 shadow animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Preloader;
