import React from "react";
import store2 from "../public/assets/images/user/user-1.jpg";
import {Row, Col, Form, Tab, Nav, Button,Dropdown} from 'react-bootstrap';
const ChatPopup = () => {
  return <div>
  <div className="floatingButtonWrap">
    <div className="chat-new-floating">
    <div className="chat-head">
      <header className="d-flex justify-content-between align-items-center bg-white p-2">
        <div className="d-flex align-items-center">
        
          <div className="avatar chat-user-profile m-0 me-2">
            <img
              loading="lazy"
              src={store2.src}
              alt="avatar"
              className="avatar-40 object-fit-cover rounded-circle"
            />
            {/* <span className="avatar-status">
              <i className="material-symbols-outlined text-success  md-14 filled">
                circle
              </i>
            </span> */}
          </div>
          <div className="chat-header">
            <h5 className="mb-0">Team Discussions</h5>
            <span>Active 5m ago</span>
          </div>
        </div>
        <div className={`chat-user-detail-popup scroller `}>
          <div className="user-profile">
            <Button type="submit" variant=" close-popup p-3">
              <i
                className="material-symbols-outlined md-18"
                onClick={() => setShow2("false")}
              >
                close
              </i>
            </Button>
            <div className="user mb-4  text-center">
              <a className="avatar m-0" href="#">
                <img loading="lazy" src={store2.src} alt="avatar" />
              </a>
              <div className="user-name mt-4">
                <h4>Bni Jordan</h4>
              </div>
              <div className="user-desc">
                <p>Cape Town, RSA</p>
              </div>
            </div>
            <hr />
            <div className="chatuser-detail text-left mt-4">
              <Row>
                <Col md="6" className="col-6  title">
                  Bni Name:
                </Col>
                <Col md="6" className="col-6  text-right">
                  Bni
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md="6" className="col-6 title">
                  Tel:
                </Col>
                <Col md="6" className="col-6 text-right">
                  072 143 9920
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md="6" className="col-6 title">
                  Date Of Birth:
                </Col>
                <Col md="6" className="col-6 text-right">
                  July 12, 1989
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md="6" className="col-6 title">
                  Gender:
                </Col>
                <Col md="6" className="col-6 text-right">
                  Male
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md="6" className="col-6 title">
                  Language:
                </Col>
                <Col md="6" className="col-6 text-right">
                  Engliah
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="chat-header-icons d-flex">
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">phone</i>
          </a>
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">videocam</i>
          </a>
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">remove</i>
          </a>
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">close</i>
          </a>
        </div>
      </header>
    </div>
    <div className="chat-content scroller">
      <div className="chat d-flex other-user">
        <div className="chat-detail">
          <div className="chat-message">
            <p>How can we help? We're here for you! 😄</p>
          </div>
        </div>
      </div>
      <div className="chat chat-left">
      <div className="chat-user">
            <a className="avatar m-0" href="#">
                <img loading="lazy" src={store2.src} alt="avatar" className="avatar-35 rounded-circle"/>
            </a>
        </div>
        <div className="chat-detail">
          <div className="chat-message">
            <p>Hey John, I am looking for the best admin template.</p>
            <p>Could you please help me to find it out? 🤔</p>
          </div>
        </div>
      </div>
      <div className="chat chat d-flex other-user">
        <div className="chat-detail">
          <div className="chat-message">
            <p>Absolutely!</p>
            <p>
              SocialV Dashboard is the responsive bootstrap 5 admin template.
            </p>
          </div>
        </div>
      </div>
      <div className="chat chat-left">
      <div className="chat-user">
            <a className="avatar m-0" href="#">
                <img loading="lazy" src={store2.src} alt="avatar" className="avatar-35 rounded-circle"/>
            </a>
        </div>
        <div className="chat-detail">
          <div className="chat-message">
            <p>Looks clean and fresh UI.</p>
          </div>
        </div>
      </div>
      <div className="chat d-flex other-user">
        <div className="chat-detail">
          <div className="chat-message">
            <p>Thanks, from ThemeForest.</p>
          </div>
        </div>
      </div>
      <div className="chat chat-left">
      <div className="chat-user">
            <a className="avatar m-0" href="#">
                <img loading="lazy" src={store2.src} alt="avatar" className="avatar-35 rounded-circle"/>
            </a>
        </div>
        <div className="chat-detail">
          <div className="chat-message">
            <p>I will purchase it for sure. 👍</p>
          </div>
        </div>
      </div>
      <div className="chat d-flex other-user">
        <div className="chat-detail">
          <div className="chat-message">
            <p>Okay Thanks..</p>
          </div>
        </div>
      </div>
    </div>
    <div className="chat-footer d-flex p-2 bg-white align-items-center">
    <div className="chat-header-icons d-flex">
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">add_circle</i>
          </a>
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">photo_library</i>
          </a>
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">add_reaction</i>
          </a>
          <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">gif_box</i>
          </a>
        </div>
      <div className="position-relative">
      <Form className="d-flex align-items-center " action="#">
        <Form.Control
          type="text"
          className="me-1"
          placeholder="Aa"
        />
      </Form>
      <i className="material-symbols-outlined md-18 text-primary emoji-btn">sentiment_satisfied</i>
      </div>
      <div className="chat-header-icons d-flex">
      <a
            href="#"
            className="chat-icon-phone d-flex justify-content-center align-items-center"
          >
            <i className="material-symbols-outlined md-18">thumb_up</i>
          </a>
      </div>
    </div>
    </div>
    <div className="floatingButtonInner">
      <a href="#" class="floatingButton">
        <i className="material-symbols-outlined">edit_square</i>
      </a>
    </div>
  </div>
</div>;
;
};

export default ChatPopup;
