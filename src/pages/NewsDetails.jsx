"use client"
import React, { useEffect, useState } from "react";
import { FaRegEye, FaThumbsUp } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
import { getSingleNews } from "../services/operations/admin";
import {
  addCommentMain,
  addLikeMain,
  removeLikeMain,
} from "../services/operations/user";
import Navbar from "../components/comman/Navbar";
import Footer from "../components/comman/Footer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import AuthModal from "../components/core/Login/Modal";
import Link from "next/link";

function NewsDetails({id}) {
  const [product, setProduct] = useState({});
  const [realted, setRelated] = useState([]);
  const [commentText, setCommentText] = useState("");
// console.log(id)
  const [isLiked, setIsLiked] = useState(false);
  const { token, user } = useSelector((state) => state.auth); // Assuming user data is stored in Redux state
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await getSingleNews(id);
        setProduct(response);
        setRelated(response?.category?.news);

        // Check if current user has already liked the post

        if (response.likedBy.includes(user?._id)) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
      setLoading(false);
    };
    fetchNews();
  }, [id]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  useEffect(() => {
    if (token) {
      setLogin(false);
    }
  }, [token]);
  const handleLike = async () => {
    if (!token) {
      return setLogin(true);
      // return Swal.fire({
      //   title: "Cannot Comment Please Login",
      //   text: "Login Please",
      //   icon: "error",
      // });
    }
    try {
      if (isLiked) {
        await removeLikeMain({ id: product._id }, token);
        setProduct((prevProduct) => ({
          ...prevProduct,
          likes: prevProduct.likes - 1,
          likedBy: prevProduct.likedBy.filter((userId) => userId !== user?._id), // Remove user ID from likedBy array
        }));
      } else {
        await addLikeMain({ id: product._id }, token);
        setProduct((prevProduct) => ({
          ...prevProduct,
          likes: prevProduct.likes + 1,
          likedBy: [...prevProduct.likedBy, user?._id], // Add user ID to likedBy array
        }));
      }
      setIsLiked(!isLiked); // Toggle like state
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleComment = async () => {
    if (!token) {
      return setLogin(true);

      // return Swal.fire({
      //   title: "Cannot Comment Please Login",
      //   text: "Login Please",
      //   icon: "error",
      // });
    }
    try {
      const response = await addCommentMain(
        { id: product._id, content: commentText },
        token
      );
      setProduct(response);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v");
    } else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    return videoId;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const openModal = () => {
    setLogin(true);
  };

  const closeModal = () => {
    setLogin(false);
  };

  const dateFormate = (dateString) => {
    const date = new Date(dateString);

    // Format options
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // second: '2-digit',
      hour12: true,
      // timeZoneName: 'short',
    };

    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };

  const [youtubeLoaded, setYoutubeLoaded] = useState(false);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setYoutubeLoaded(true);
    };
  }, []);

  const playVideo = () => {
    if (youtubeLoaded && product?.youtubeurl) {
      const player = new window.YT.Player("youtube-player", {
        events: {
          onReady: () => {
            player.playVideo();
          },
        },
      });
    }
  };
  const handleVideoError = (event) => {
    console.error("Error loading YouTube video:", event.target);
    // Show error message or fallback content
  };

  return (
    <>
      {/* <Navbar /> */}

      {login && <AuthModal isOpen={login} onClose={closeModal} />}
      {!product || loading ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center mt-[20px]">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="mt-32 flex flex-wrap w-full overflow-x-hidden">
          <div className="p-4 bg-gray-100 min-h-screen lg:w-[70%] w-full">
            {product?.category && product?.subcategory && (
              <div className="flex sm:flex-row items-center h-[20px] gap-2 mb-4 lg:w-[80%] w-full mx-auto flex-wrap">
                <h2 className="text-2xl font-bold text-gray-800">
                  {product?.category.name}
                </h2>
                /
                <h2 className="text-sm text-gray-500">
                  {product?.subcategory?.name}
                </h2>
              </div>
            )}
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="w-full flex mb-6 justify-end items-center gap-1">
                <FaRegEye /> {200+product?.view}{"+"}
              </div>
              <div className="lg:w-[80%] mx-auto">
                <h3 className="text-3xl font-semibold mb-2 text-gray-900 text-center">
                  {product?.title}
                </h3>
                <h4 className="text-lg font-light mb-4 text-gray-700 text-center">
                  {product?.subtitle}
                </h4>
              </div>
              <div>
                {product?.images && product?.images.length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-1">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image?.url}
                          alt={`${product.title} image ${index + 1}`}
                          className="w-screen h-auto rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div></div>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
              {product?.youtubeurl && (
                <div className="mb-6">
                  <iframe
                    id="youtube-player"
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${getYoutubeEmbedUrl(
                      product?.youtubeurl
                    )}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={handleVideoError}
                  ></iframe>
                </div>
              )}
              <div className="flex items-center justify-between text-gray-500">
                <span>{product?.location}</span>
                <span>{product?.expireDate}</span>
              </div>
              <div className="mt-6 flex justify-between">
                <div>
                  <p className=" font-semibold italic">
                    By:-{product?.author?.name}
                  </p>

                  <div>
                    <p className=" font-semibold italic text-[12px]">
                      {" "}
                      {dateFormate(product?.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 text-gray-500 ${
                      isLiked ? "text-red-500" : ""
                    }`}
                  >
                    <FaThumbsUp />
                    <span>{`${product?.likes + 1300}`}</span>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <textarea
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
                  placeholder="Add your comment..."
                ></textarea>
                <button
                  onClick={handleComment}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Comment
                </button>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Comments</h4>
                {product?.comments && product.comments.length > 0 ? (
                  <ul>
                    {product.comments
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((comment, index) => (
                        <li key={index} className="mb-2">
                          <span className="font-bold">
                            {comment?.author?.name}
                          </span>
                          : {comment?.content}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-[28%] w-full border-0 lg:border-2 min-h-screen max-h-screen overflow-scroll">
            <div className="bg-blue-500 p-2 text-white">
              <h3>Related News</h3>
            </div>
            <div className="flex gap-3 grid-cols-1 max-h-[40px] mt-8 p-2 flex-col">
              {realted?.map((currElem, index) => (
                <Link href={`/${currElem?.slug}`} key={currElem._id}>
                  <div className="flex gap-3">
                    <img
                      src={currElem?.images[0]?.url}
                      alt=""
                      className="w-[100px]"
                    />
                    <p className="text-wrap mt-2 text-sm">
                      {truncateText(currElem.title, 20)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </>
  );
}

export default NewsDetails;
