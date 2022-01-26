import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FaEdit, FaCode } from "react-icons/fa";
import Fade from "react-reveal/Fade";

import "./SingleProject.css";
import { UserContext } from "./../../../contexts/UserContext";

function SingleProject({ id, name, desc, owner, code, demo, image, theme }) {
  const user = useContext(UserContext);

  const useStyles = makeStyles((t) => ({
    iconBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: 50,
      border: `2px solid ${theme.tertiary}`,
      color: theme.tertiary,
      transition: "all 0.2s",
      "&:hover": {
        backgroundColor: theme.secondary,
        color: theme.primary,
        transform: "scale(1.1)",
        border: `2px solid ${theme.secondary}`,
      },
    },
    icon: {
      fontSize: "1.1rem",
      transition: "all 0.2s",
      "&:hover": {},
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  console.log(user);
  return (
    <Fade bottom>
      <div
        key={id}
        className="singleProject"
        onClick={() => {
          history.push(`/project/${id}`);
        }}
      >
        <div className="projectContent">
          <h2 style={{ color: theme.tertiary }}>{name}</h2>
          <img src={image} alt={name} />
          <div className="project--showcaseBtn">
            {user.authorities.includes("ADMIN") && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/projectForm/${id}`);
                }}
                className={classes.iconBtn}
              >
                <FaEdit className={classes.icon} />
              </div>
            )}
            <a
              href={code}
              target="_blank"
              rel="noreferrer"
              className={classes.iconBtn}
            >
              <FaCode className={classes.icon} />
            </a>
          </div>
        </div>
        <p
          className="project--desc"
          style={{ background: theme.secondary, color: theme.tertiary }}
        >
          {desc}
        </p>
        <div
          className="project--lang"
          style={{ background: theme.secondary, color: theme.tertiary80 }}
        >
          <span>{owner}</span>
        </div>
      </div>
    </Fade>
  );
}

export default SingleProject;
