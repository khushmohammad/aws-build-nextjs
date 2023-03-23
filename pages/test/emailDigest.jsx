import React, { useEffect, useState } from "react";
import Default from "../../layouts/default";
import Accordion from "react-bootstrap/Accordion";
import { Form, Row, Col, Card, Container } from "react-bootstrap";
import {
  getAllEmailDigestNotification,
  updateNotificationCategory,
} from "../../services/basic.service";

const emailDigest = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const [notification, setNotification] = useState([]);
  const [switchVal, setSwitchVal] = useState([]);

  const handleInputChange = async (event, catId, subCatId) => {
    const { name, checked } = event.target;
    // console.log("name", name, "checked", checked);
    setNotifications({ ...notifications, [name]: checked });
    let array = switchVal.map((elem) => {
      if (elem.catId === catId && elem.subCatId === subCatId) {
        return { ...elem, value: Boolean(checked) };
      } else {
        return elem;
      }
    });
    
    setSwitchVal(array);
    const updatedCategory = {
      categoryId: catId,
      subCategoryId: subCatId,
      subCategoryValue: Boolean(checked),
    };
    const res = await updateNotificationCategory(updatedCategory);
  };

  //get all data
  const output = async () => {
    const res = await getAllEmailDigestNotification();
    console.log(res, "<<res>>");
    const subcategory = res.flatMap((elem) =>
      elem.subcategory.map((val) => {
        return { catId: elem._id, subCatId: val._id, value: val.Value };
      })
    );
   
    setSwitchVal(subcategory);

    setNotification(res);
  };
  useEffect(() => {
    output();
  }, []);

  return (
    <Default>
      <Container>
      <div className="card inner-page-bg bg-primary p-4">
                  <div className="justify-content-between align-items-center">
                    <h3 className="text-white">Notifications settings</h3>
                    <p className="text-white">IWL may still send you important notifications about your account and
          content outside of your preferred notification settings.</p>
                  </div>
                </div>
        {/* <h2>
          <strong>Notifications settings</strong>
        </h2>
        <p>
          IWL may still send you important notifications about your account and
          content outside of your preferred notification settings.
        </p> */}
        <h4>
          <strong>What notifications you receive</strong>
        </h4>

        <Card>
          {notification &&
            notification.map((item) => (
              <Accordion key={item._id}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <span className="material-symbols-outlined pe-2">
                            {item.icon}
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <strong>{item.title}</strong>
                          <div>{item.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>{item.description}</p>

                    <h6>{item.subcategoryTitle}</h6>
                    <Form>
                      {item.subcategory &&
                        item.subcategory.map((op) => (
                          <Form.Group
                            as={Row}
                            controlId="formHorizontalPush"
                            key={op._id}
                          >
                            <Form.Label column>
                              <h4>{op.dropdownValue}</h4>
                            </Form.Label>
                            <Col className="text-end">
                              <Form.Check
                                type="switch"
                                label=""
                                size="lg"
                                className="push-checkbox"
                                name={op.dropdownValue.toLowerCase()}
                                checked={
                                  switchVal.find(
                                    (elem) =>
                                      elem.catId === item._id &&
                                      elem.subCatId === op._id
                                  ).value
                                }
                                onChange={(event) => {
                                  handleInputChange(event, item._id, op._id);
                                }}
                              />
                             
                            </Col>
                          </Form.Group>
                        ))}
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
        </Card>
      </Container>
    </Default>
  );
};

export default emailDigest;
