"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";
import { fetchLiveStreams } from "../services/operations/admin";

function Live() {
  const [liveStreams, setLiveStreams] = useState([]);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetchLiveStreams();
        console.log(response)
        await setLiveStreams(response || []);
      } catch (error) {
        console.error("Error fetching live streams:", error);
      }
    };

    fetchStreams();
  }, []);

  const[count, setCount] =  useState(50000);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 2000);

  
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    {/* <Navbar /> */}

    <div className="mt-20 min-h-screen flex justify-center items-center">
      {liveStreams.length === 0 ? (
        <div className="text-center">
          Currently No Live Streaming Is Available
        </div>
      ) : (
        <div className="grid gap-4">
          {liveStreams.map((stream) => (
            <div key={stream._id} className="bg-white p-4 rounded-lg shadow">

       
              <div className=" flex justify-between"> 
              <h2 className="text-xl font-semibold">{stream.name}</h2>

<p>Watching {count}+</p>
              </div>
              <div className="mt-2">
                {/* Embedded YouTube Video */}
                <iframe
               className=" w-[90vw] h-[80vh]"
                  src={`${stream.url}?autoplay=1`}
                  title={stream.name}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen 
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* <Footer /> */}
  </div>
);
}

export default Live;