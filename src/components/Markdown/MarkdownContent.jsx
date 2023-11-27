import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

// Importation du Css
import "./Markdown.css";

const MarkdownContent = ({ markdownContent }) => {
  const [copy, setCopy] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      // Utiliser querySelectorAll pour récupérer toutes les balises <p> contenant le texte '-aler-'
      element.querySelectorAll("p").forEach((paragraph) => {
        if (paragraph.textContent.includes("-alert-")) {
          // Supprimer le texte '-aler-' des balises <p>
          paragraph.textContent = paragraph.textContent.replace("-alert-", "");

          // Ajouter la classe 'alert' aux balises <p> qui ne la possèdent pas déjà
          if (!paragraph.classList.contains("alert")) {
            paragraph.classList.add("alert");
          }
        }
      });
    }
  });

  return (
    <div className="markdown-content" ref={elementRef}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div>
                <div className="code-block-header">
                  <p>
                    Exemple code <span>{className.replace("language-", "")}</span>
                  </p>
                  {copy ? (
                    <button className="btnCopy">
                      <span className="text-base">
                        <FontAwesomeIcon icon={faCheck} size="lg" />
                      </span>
                      Copied !
                    </button>
                  ) : (
                    <button
                      className="btnCopy"
                      onClick={() => {
                        navigator.clipboard.writeText(children);
                        setCopy(true);
                        setTimeout(() => {
                          setCopy(false);
                        }, 3000);
                      }}
                    >
                      <span className="text-base">
                        <FontAwesomeIcon icon={faCopy} size="lg" />
                      </span>
                      Copy code
                    </button>
                  )}
                </div>
                <SyntaxHighlighter
                  style={atomOneDark}
                  language={match[1]}
                  PreTag="div"
                  className="code-block"
                  children={String(children).replace(/\n$/, "")}
                  {...props}
                  wrapLongLines={true}
                />
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
