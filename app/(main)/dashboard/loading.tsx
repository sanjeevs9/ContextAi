export default function Loading() {
    return (
      <div className="bg-[#0A1628] p-6 space-y-8">
        <div className="container mx-auto py-8 px-4 md:w-3/4">
        {/* <h2 className="text-2xl font-bold text-white">Recent Searches</h2> */}
        
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-4">
            {/* Question and metadata row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-6 w-64 animate-pulse bg-[#1B2B44] rounded" />
                <div className="h-6 w-24 animate-pulse bg-[#1B2B44] rounded px-3" />
              </div>
              <div className="h-5 w-36 animate-pulse bg-[#1B2B44] rounded" />
            </div>
            
            {/* Opinion/Fact and Confidence row */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-[70px] animate-pulse bg-[#1B2B44] rounded" />
                <div className="h-5 w-[120px] animate-pulse bg-[#1B2B44] rounded" />
              </div>
            </div>
            
            {/* Answer text */}
            <div className="h-5 w-full animate-pulse bg-[#1B2B44] rounded" />
            
            {/* References section */}
            <div className="space-y-2">
              <div className="h-5 w-24 animate-pulse bg-[#1B2B44] rounded" />
              <div className="h-5 w-full max-w-2xl animate-pulse bg-[#1B2B44] rounded" />
              <div className="h-5 w-full max-w-2xl animate-pulse bg-[#1B2B44] rounded" />
            </div>
          </div>
        ))}
      </div>
      </div>
    )
  }