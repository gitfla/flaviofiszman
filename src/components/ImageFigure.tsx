import { useRef, useEffect, useCallback } from "react";

interface ImageFigureProps {
  src: string;
  alt: string;
  caption?: string;
  noLightbox?: boolean;
}

export default function ImageFigure({
  src,
  alt,
  caption,
  noLightbox = false,
}: ImageFigureProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openLightbox = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeLightbox();
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: 8,
    border: "1px solid var(--rule)",
  };

  return (
    <>
      <figure style={{ margin: 0 }}>
        {noLightbox ? (
          <img src={src} alt={alt} style={imgStyle} />
        ) : (
          <button
            ref={triggerRef}
            onClick={openLightbox}
            aria-label={`View full size: ${alt}`}
            style={{
              display: "block",
              width: "100%",
              padding: 0,
              border: "none",
              background: "none",
              cursor: "zoom-in",
              outline: "none",
            }}
          >
            <img src={src} alt={alt} style={imgStyle} />
          </button>
        )}
        {caption && (
          <figcaption
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "var(--ink-3)",
              lineHeight: 1.5,
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>

      {!noLightbox && (
        <dialog
          ref={dialogRef}
          onClick={handleBackdropClick}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            maxWidth: "92vw",
            maxHeight: "90vh",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              display: "block",
              maxWidth: "92vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 8,
            }}
          />
        </dialog>
      )}

      <style>{`
        dialog::backdrop { background: rgba(0, 0, 0, 0.72); }
        @media (prefers-reduced-motion: no-preference) {
          dialog[open] { animation: dlg-in 0.15s ease; }
          @keyframes dlg-in { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        }
      `}</style>
    </>
  );
}
