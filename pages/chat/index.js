import React, { useEffect, useState } from "react";
import { Row, Col, Tab,  Button } from "react-bootstrap";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import ChatSidebarComponent from "../../components/chat/ChatSidebar";
import ChatMessagePanel from "../../components/chat/ChatMessagePanel";

const Chat = () => {
  const router = useRouter();
  const chatId = router?.query?.chatId;
 
  const [key, setKey] = useState("start");

  useEffect(() => {
    chatId ? setKey(chatId) : setKey("start");
  }, [chatId]);

  const ChatSidebar = () => {
    document.getElementsByClassName("scroller")[0].classList.add("show");
  };
  const ChatSidebarClose = () => {
    document.getElementsByClassName("scroller")[0].classList.remove("show");
  };

  const changeRoom = (tab) => {
    setKey(tab);
    router.push(`chat?chatId=${tab}`);
  };

  return (
    <>
      <Tab.Container
        id="left-tabs-example"
        activeKey={key}
        onSelect={(k) => changeRoom(k)}
      >
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <Row>
                    <Col lg="3" className="chat-data-left scroller">
                      <ChatSidebarComponent
                        ChatSidebarClose={ChatSidebarClose}
                      />
                    </Col>
                    <Col lg={9} className=" chat-data p-0 chat-data-right">
                      <Tab.Content>
                        <Tab.Pane
                          eventKey="start"
                          className="tab-pane fade show"
                          id="default-block"
                          role="tabpanel"
                        >
                          <div className="chat-start">
                            <span className="iq-start-icon text-primary">
                              <i className="material-symbols-outlined md-42">
                                sms
                              </i>
                            </span>
                            <Button
                              id="chat-start"
                              onClick={ChatSidebar}
                              bsPrefix="btn bg-white mt-3"
                              className=""
                            >
                              Start Conversation!
                            </Button>
                          </div>
                        </Tab.Pane>
                        <ChatMessagePanel
                          ChatSidebar={ChatSidebar}
                          ChatSidebarClose={ChatSidebarClose}
                        />
                      </Tab.Content>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default Chat;
