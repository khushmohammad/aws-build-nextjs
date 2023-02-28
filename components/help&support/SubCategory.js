import React, { useState } from "react";
import { helpService } from "../../services/basic.services";

const SubCategory = (props) => {
  const [subCategory, setSubCategory] = useState(null);

  const getSubCategory = async (helpId) => {
    const res = await helpService(helpId);
    setSubCategory({ subCats: res, parentId: helpId });
  };

  return (
    <>
      {props.subcat.parentId === props?.helpid && (
        <div>
          {props.subcat &&
            props.subcat?.subCats !== 0 &&
            props.subcat?.subCats?.map((sub, index) => (
              <ul key={index}>
                <li>
                  <a className="" onClick={() => getSubCategory(sub?._id)}>
                    {sub?.title}
                  </a>
                </li>
              </ul>
            ))}
        </div>
      )}
    </>
  );
};

export default SubCategory;
