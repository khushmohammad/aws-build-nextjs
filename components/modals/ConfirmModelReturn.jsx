import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModelReturn(props) {



    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <h4> {props?.message || "Message"}</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant='success' onClick={() => props.deletecomment("true")}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ConfirmModelReturn
