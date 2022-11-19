import { observer } from "mobx-react-lite";
import React from "react";

const LoadingModal = () => {
  return (
    <div
      className="modal spinnerModal"
      id=""
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header"></div>
          <div className="modal-body d-flex justify-content-center align-content-center">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LoadingModal);
