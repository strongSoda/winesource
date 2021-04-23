import { faPaperPlane, faTimes, faWineGlassAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from 'global/constants/api';
import ENDPOINTS from 'global/constants/endpoints';
import METHODS from 'global/constants/restMethods';
import { useAppSelector } from 'hooks/storeHooks';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { ChatWrapper, MessageWrapper } from './Chat.styles';
import { useInterval } from 'hooks/useInterval';

declare interface IChatProps {
  owner: any,
  showChat: (value: React.SetStateAction<boolean>) => void,
  sender: string,
  ownerType: string,
}

const Chat: React.FC<IChatProps> = (props: IChatProps) => {
  const [chat, setChat] = useState<any []>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)
  const token = useAppSelector(state => state.user.token)
  const [newMsg, setNewMsg] = useState<string>('')  
  
  const endpoint = (() => {
      if (props.ownerType === "order") {
        return ENDPOINTS.ORDERS_CHAT
      } else {
        return ENDPOINTS.CHAT
      }
    })()

  const queryParamKey = (() => {
      if (props.ownerType === "order") {
        return 'order_id'
      } else {
        return 'custom_request_id'
      }
  })()
  
  async function getChat() {
    setLoading(true)

    const response = await fetch(API + endpoint + '?' + queryParamKey + '=' + props.owner.id, {
      method: METHODS.GET,
      headers: {
        Authorization: 'Bearer ' + token
        },
    })


    const result = await response.json()
    // console.log(JSON.stringify(chat), JSON.stringify(result.body.chat));
      if (JSON.stringify(chat) !==  JSON.stringify(result.body.chat)) {
        setChat(result.body.chat)
        // console.log(chat);
        
    }
    setLoading(false)
  }
  
  // useEffect(() => {
  //   console.log('hello');
  // }, [props.custom_request])
  
  useInterval(() => {
    // put your interval code here.
    getChat()
  }, 1000);
  
  const send = async () => {
    if(!newMsg) return
    setSending(true)

    if (props.ownerType === 'order') {
      const response = await fetch(API + endpoint, {
        method: METHODS.POST,
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({'order_id': props.owner.id, msg: newMsg, sender: props.sender})
      })
      const result = await response.json()
      console.log(result);
      setChat(result.body.chat)
    } else {
            const response = await fetch(API + endpoint, {
        method: METHODS.POST,
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({'custom_request_id': props.owner.id, msg: newMsg, sender: props.sender})
      })
      const result = await response.json()
      console.log(result);
      setChat(result.body.chat)
    }

    setSending(false)
    setNewMsg('')
  }
  
  return (
    <ChatWrapper data-testid="Chat" sending={sending}>
      <header>
        <FontAwesomeIcon className="icon__close" icon={faTimes} onClick={() => props.showChat(false)}/>
        {/* <img src={props.custom_request.request_img_url} alt={props.custom_request.name}/> */}
        {props.ownerType==='order'? <p>{props.owner.product_name}</p> : <p>{props.owner.name}</p>}
      </header>
        {/* {!loading ? */}
        <section className="chat">
          {chat.length ? 
            <>
              {
                chat.map(message => (
                  <div key={message.id}>
                  <MessageWrapper sender={message.sender} id={message.id}>
                    <div className="message">
                      <p>{message.msg}</p>
                      <span>{moment(message.date_created).format('DD MMM hh:mm a')}</span>
                    </div>
                  </MessageWrapper>
                  </div>
              ))}
            </>
            :
          <FontAwesomeIcon className="icon__wine" icon={faWineGlassAlt}/>    
          }
        </section>
        {/* : 'loading...'} */}
      <section className="chat__input">
        {sending && <p className="sending">Sending...</p>}
        <input type="text" placeholder="Type a message here" value={newMsg} onChange={(e) => setNewMsg(e.target.value)}/>
        <FontAwesomeIcon className="icon__send" icon={faPaperPlane} onClick={() => send()}/>
      </section>
    </ChatWrapper>
  )
};

export default Chat;
