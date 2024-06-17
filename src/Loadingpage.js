import {
    fa0,
  fa3,
  fa6,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Loadingpage() {
  return (
    <>
      <div class="loader">
        <section>
          <p class="icon">
            <FontAwesomeIcon icon={faHandHoldingDollar} beat />
          </p>
          <p class="nameApp">
            Currency{" "}
            <span>
              {" "}
              <FontAwesomeIcon icon={fa3} beat />
              <FontAwesomeIcon icon={fa6} beat />
              <FontAwesomeIcon icon={fa0} beat />
            </span>
          </p>
        </section>
        <p className="underline"></p>
      </div>
    </>
  );
}

export default Loadingpage;
