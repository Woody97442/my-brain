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
  const iframeRefs = useRef([]);

  const createDynamicAlert = (element) => {
    if (element) {
      element.querySelectorAll("p").forEach((paragraph) => {
        paragraph.removeAttribute("class");
        // Vérifier si le texte contient le texte '-alert-'
        if (paragraph.textContent.includes("-alert-")) {
          // Supprimer le texte '-alert-' des balises <p>
          paragraph.textContent = paragraph.textContent.replace("-alert-", "");

          // Ajouter la classe 'alert' aux balises <p> qui ne la possèdent pas déjà
          if (!paragraph.classList.contains("alert")) {
            paragraph.classList.add("alert");
          }
        }
      });
    }
  };

  const createDynamicIframes = (element) => {
    if (element) {
      element.querySelectorAll("p").forEach((paragraph) => {
        if (paragraph.textContent.includes("-codePen-")) {
          paragraph.removeAttribute("class");
          paragraph.textContent = paragraph.textContent.replace("-codePen-", "");
          const param = JSON.parse(paragraph.textContent);
          paragraph.classList.add("codePen");

          if (param && param.src) {
            const iframeElement = document.createElement("iframe");
            iframeElement.height = param.height;
            iframeElement.src = param.src;
            iframeElement.classList.add("codePenIframe");

            iframeRefs.current.push(iframeElement);
            paragraph.insertAdjacentElement("afterend", iframeElement);
          }
        }
      });
    }
  };

  const cleanupDynamicIframes = () => {
    iframeRefs.current.forEach((iframe) => {
      console.log("Cleanup", iframe.parentElement);
      if (iframe.parentElement) {
        iframe.parentElement.removeChild(iframe);
      }
    });
  };

  useEffect(() => {
    const element = elementRef.current;
    createDynamicAlert(element);
    createDynamicIframes(element);

    return cleanupDynamicIframes;
  }, [markdownContent]);

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
