import React from "react";
import renderHTML from "react-render-html";

function ProjectContentFormat(props) {
  return (
    <blockquote className="blockquote mb-0">
      <div className="resume-item">
        <h3 className={props.title ? "resume-title" : "resume-no-title"}>
          {props.title}
        </h3>
        <p>
          <em>{props.date}</em>
        </p>
        <ul>
          {props.content ? (
            props.content.map((value, index) => (
              <li key={index}> ‣ {renderHTML(value.description)}</li>
            ))
          ) : (
            <p></p>
          )}
        </ul>
      </div>
    </blockquote>
  );
}

export default ProjectContentFormat;
