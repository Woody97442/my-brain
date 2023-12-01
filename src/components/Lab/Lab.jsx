import React from "react";
import CodePen from "../CodePen/CodePen";

// Importation du Css
import "./Lab.css";

function Lab({ active }) {
  return (
    <>
      {active ? (
        <div className="lab">
          <CodePen
            src={{
              display:
                "https://codepen.io/Woody97442/embed/preview/yLEjOeQ?default-tab=html%2Cresult&editable=true",
              ref: "yLEjOeQ",
            }}
            settings={{
              height: "300",
              style: { borderRadius: "6px" },
              loading: "lazy",
            }}
          />
        </div>
      ) : null}
    </>
  );
}

export default Lab;
