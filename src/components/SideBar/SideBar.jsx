import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faStream, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar(props) {
  const [categoryStates, setCategoryStates] = useState({});

  const handleSubmenuToggle = (categoryId) => {
    setCategoryStates((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const renderSubCategories = (category) =>
    category.sub_categories
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((subCategory, index) => (
        <li key={index}>
          <Link
            to={`/${subCategory.parentName.toLowerCase().replace(" ", "_")}/${
              category.id
            }/${subCategory.name.toLowerCase().replace(" ", "_")}/${subCategory.id}`}
          >
            {subCategory.name}
          </Link>
        </li>
      ));

  const renderCategories = (section) =>
    props.categories
      .filter((category) => category.type === section.name)
      .map((category, index) => (
        <li className="categories" key={category.id}>
          <a onClick={() => handleSubmenuToggle(category.id)}>
            <div>
              <FontAwesomeIcon icon={faStream} />
              <h3>{category.name}</h3>
              <span>
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            </div>
          </a>
          <ul className={"list-submenu " + (categoryStates[category.id] ? "show" : "")}>
            {renderSubCategories(category)}
          </ul>
        </li>
      ));

  return (
    <>
      <input type="checkbox" id="check" />
      <label className="button bars" htmlFor="check">
        <FontAwesomeIcon icon={faBars} size="lg" />
      </label>
      <div className="side-bar">
        <div className="title">
          <Link to={`/`}>
            <h1 className={props.brandName.additionalCss}>{props.brandName.name}</h1>
          </Link>
          <label className="button cancel" htmlFor="check">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </label>
        </div>

        <ul>
          {props.nameSections.map((section, index) => (
            <div key={index} className="blockSection">
              <li>
                <div className="title">
                  <h2 className={section.additionalCss}>{section.name}</h2>
                </div>
              </li>
              {renderCategories(section)}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideBar;
