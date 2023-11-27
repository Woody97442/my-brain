import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MarkdownContent from "../components/Markdown/MarkdownContent";
import { fetchSubCategory } from "../features/SubCategorySlice";

function SubPage() {
  let { subId } = useParams();
  const dispatch = useDispatch();
  const subCategory = useSelector((state) => state.dataSubCat.subCategory);
  const [markdown, setMarkdown] = useState(null);

  useEffect(() => {
    dispatch(fetchSubCategory(subId));
    setMarkdown(subCategory.container);
  }, [subCategory.container, subId]);

  return (
    <>
      {/* Afficher le contenu converti en HTML */}
      <MarkdownContent markdownContent={markdown} />
    </>
  );
}

export default SubPage;
