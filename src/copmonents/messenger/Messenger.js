import React from 'react';
import { Topbar } from './topbar/Topbar';
import { Conversations } from '../conversations/conversations';
import { Message } from '../message/message';
export const Messenger = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };
    
    return (
        <>
            <Topbar />
            <div className='messenger' >
                <div className='chatmenu'> menu
                    <div>
                        <Conversations />
                    </div>
                </div>
                <div className='chatbox'> box
                    <div>
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            className="chatMessageInput"
                            placeholder="write something..."
                            onChange={(e) => setNewMessage(e.target.value)}
                            value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>



    )
}
