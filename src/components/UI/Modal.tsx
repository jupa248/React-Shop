import React from "react";
import ReactDOM from "react-dom";

const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay: React.FC<{ children: any }> = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays") as HTMLDivElement;

const Modal: React.FC<{ onClose: () => void; children: any }> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
