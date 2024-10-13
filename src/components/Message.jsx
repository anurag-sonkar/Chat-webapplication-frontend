import React from 'react'
import { useSelector } from 'react-redux'
import { CiClock2 } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";
import ReactPlayer from "react-player";
import { MdCloudDownload } from 'react-icons/md';
// import { Document, Page } from '@react-pdf/renderer';


/* problem statement  - i want to show message in different ways 
1. simple content message text
2. attachment with text - 3 attachments -> a.audio , b.video , c.images , d. files - .docx,.pdf,.xml
*/
function Message({ chat }) {
    const {user} = useSelector(state => state.auth)
    const { messages , isLoading } = useSelector(state => state.message)
    
    const renderChatMessage = (message , attachment) => {
        // const { name, type, url } = file;
        const {public_id , url , _id} = attachment
        console.log(attachment)

        // Function to download image
        const downloadImage = (url, fileName) => {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = fileName; // Set the file name for download
                    link.click();
                    URL.revokeObjectURL(link.href); // Clean up after download
                })
                .catch(err => console.error("Failed to download image", err));
        };

        // Image preview - written by me
        // if (url.includes("/image/")) {
        //     return <div className='relative'>
        //         <img src={url} alt="attachment" className="w-52 h-auto object-contain" />
        //         {message && <p className='px-1'>{message}</p>}
        //         <button
        //             onClick={() => downloadImage(url, `image_${Date.now()}.jpg`)} // Dynamic filename
        //             className="text-blue-500 underline mt-2 inline-block absolute -right-2 -top-2 "
        //         >
        //             <MdCloudDownload size={25}/>
        //         </button>
        //         <a
        //             href={url}
        //             target='_blank'
        //             download // this will trigger download
        //             className="text-blue-500 underline mt-2 inline-block"
        //         >
        //             Download Image
        //         </a>
        //     </div>
        // }

        // image preview - suggestion implemened through chatGpt
        if (url.includes("/image/")) {
            return (
                <div className='relative'>
                    {/* Wrap the image inside the <a> tag */}
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={url} alt="attachment" className="w-52 h-auto object-contain" />
                    </a>

                    {message && <p className='px-1'>{message}</p>}

                    {/* Download button */}
                    <button
                        onClick={() => downloadImage(url, `image_${Date.now()}.jpg`)} // Dynamic filename
                        className="text-blue-500 underline mt-2 inline-block absolute -right-2 -top-2 "
                    >
                        <MdCloudDownload size={25} />
                    </button>

                    {/* Optional download link (if separate download action is needed) */}
                    <a
                        href={url}
                        download // Triggers direct download
                        className="text-blue-500 underline mt-2 hidden"
                    >
                    </a>
                </div>
            );
        }

        
        // Video + audio preview
        if (url.includes("/video/")) {
            return <div className='text-center'>
                <ReactPlayer url={url} controls width="300px" height="200px" />
            {message && <p className='pt-2'>{message}</p>}

            </div>
        }

        // // Audio preview
        // if (url.includes("/audio/")) {
        //     return <audio controls src={url} width="300px" height="100px"></audio>;
        // }

        // PDF preview
        // if (type === "application/pdf") {
        //     return (
        //         <Document file={url}>
        //             <Page pageNumber={1} />
        //         </Document>
        //     );
        // }
    }
  return (
      <div className={`chat ${chat?.sender?._id === user?._id ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                  <img
                      alt="bubble "
                      src={`${chat?.sender?._id === user?._id ? user.avatar.url : chat.sender.avatar.url}`} />
              </div>
          </div>
          <div className="chat-footer">
              {/* Obi-Wan Kenobi */}
              <time className="text-[10px] font-bold opacity-50 flex items-center gap-1">{new Date(chat?.createdAt).toLocaleTimeString()} {chat?.sender?._id === user?._id && <span>{isLoading ? <CiClock2 /> : <IoCheckmarkOutline />}</span>
              }</time>
          </div>
          {/* 1. only content ,2. only attch, 3. both present */}
          {
              chat.content !== "" && chat.attachments === null && <div className="chat-bubble">{chat?.content}</div>
          }

          {
              chat.attachments !== null && <div className="chat-bubble">
                  {renderChatMessage(chat?.content , chat?.attachments?.[0])}
              </div>
          }
          {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
  )
}

export default Message