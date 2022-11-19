import { observer } from "mobx-react-lite";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="modal spinnerModal"
      id=""
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="spinner-modal-content"></div>
        <div className="spinner-modal-body">
          <div id="spinnerBG">
            <div id="spinnerBall"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(LoadingSpinner);
