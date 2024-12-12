import React, { useEffect, useState } from "react";
import { fetchLiveStreams } from "../../services/operations/admin";
import { CgMediaLive } from "react-icons/cg";
import LiveTv from "../../test/LiveTv";

function LiveSection() {
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetchLiveStreams();
        console.log(response);
        await setLiveStreams(response || []);
      } catch (error) {
        console.error("Error fetching live streams:", error);
      }
    };

    fetchStreams();
  }, []);
  return (
    <div className=" w-full">
      <div className=" flex justify-center mt- gap-3 w-full">
        <p className=" flex gap-1 items-center text-[16px] bg-[#730101] animate-blink p-1 rounded-md text-white font-semibold px-3">
          Live <CgMediaLive />
        </p>
      </div>
      {/* <LiveTv /> */}

      <div className=" w-full ">
        {liveStreams.length === 0 ? (
          <div className="text-center">
            Currently No Live Streaming Is Available
          </div>
        ) : (
          <div className=" gap-4">
            {liveStreams.map((stream) => (
              <div key={stream._id} className="bg-white p-4 rounded-lg shadow">
                <div className=" flex justify-between">
                  <h2 className="text-xl font-semibold">{stream.name}</h2>
                </div>
                <div className="mt-2">
                  {/* Embedded YouTube Video */}
                  <iframe
                    className="w-full min-h-[270px] "
                    src={`${stream.url}?autoplay=1`}
                    title={stream.name}
                    frameBorder="0"
                    allow="autoplay; encrypted-media "
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveSection;
