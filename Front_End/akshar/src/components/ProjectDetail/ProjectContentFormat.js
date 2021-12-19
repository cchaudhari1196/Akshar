import React from "react";

function ProjectContentFormat(props) {
  return (
    <div className="resume-item">
      <h5 className={props.title ? "resume-title" : "resume-no-title"}>
        {props.title}
      </h5>
      <p>
        <em>{props.date}</em>
      </p>
      <ul>
        {props.content ? (
          props.content.map((value, index) => <li key={index}> ‣ {value}</li>)
        ) : (
          <p></p>
        )}
      </ul>
    </div>
  );
}

export default ProjectContentFormat;
