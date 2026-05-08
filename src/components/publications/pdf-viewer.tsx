"use client";

import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  src: string;
  title?: string;
}

export function PdfViewer({ src, title = "PDF" }: PdfViewerProps) {
  const embedRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    setPageNumber(1);
    setPageCount(0);
  }, [src]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return undefined;
    }

    const updateWidth = () => {
      setContainerWidth(element.clientWidth);
      setContainerHeight(element.clientHeight);
    };

    updateWidth();

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenActive = document.fullscreenElement === embedRef.current;

      setIsFullscreen(fullscreenActive);

      if (!fullscreenActive && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const pageWidth = containerWidth > 0 ? Math.max(containerWidth - 32, 240) : 0;
  const fullscreenPageHeight =
    isFullscreen && containerHeight > 0
      ? Math.max(containerHeight - 16, 240)
      : 0;
  const stageAspectRatio = 16 / 9;
  const pageProgress =
    pageCount > 1 ? ((pageNumber - 1) / (pageCount - 1)) * 100 : 0;

  const isPreviousDisabled = pageNumber <= 1;
  const isNextDisabled = pageCount === 0 || pageNumber >= pageCount;
  const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleFullscreenToggle = async () => {
    const element = embedRef.current;

    if (!element) {
      return;
    }

    if (document.fullscreenElement === element) {
      await document.exitFullscreen();
      return;
    }

    await element.requestFullscreen();
    blurActiveElement();
  };

  return (
    <div ref={embedRef} className="publication-pdf-embed">
      <div className="publication-pdf-header">
        <div className="publication-pdf-title">{title}</div>
      </div>
      <div ref={containerRef} className="publication-pdf-viewer">
        <Document
          file={src}
          onLoadSuccess={({ numPages }) => {
            setPageCount(numPages);
            setPageNumber((currentPage) => Math.min(currentPage, numPages));
          }}
          loading={<p className="publication-pdf-status">Loading PDF...</p>}
          error={
            <p className="publication-pdf-status">
              PDF could not be rendered. <a href={src}>Open it directly</a>.
            </p>
          }
          noData={<p className="publication-pdf-status">No PDF selected.</p>}
        >
          {pageWidth > 0 && pageCount > 0 ? (
            <div
              className="publication-pdf-stage"
              style={{ aspectRatio: `${stageAspectRatio}` }}
            >
              <div className="publication-pdf-page">
                <Page
                  pageNumber={pageNumber}
                  width={isFullscreen ? undefined : pageWidth}
                  height={isFullscreen ? fullscreenPageHeight : undefined}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  loading={null}
                />
              </div>
              <div className="publication-pdf-progress" aria-hidden="true">
                <div
                  className="publication-pdf-progress-bar"
                  style={{ width: `${pageProgress}%` }}
                />
              </div>
            </div>
          ) : null}
        </Document>
      </div>
      <div className="publication-pdf-controls">
        <div className="publication-pdf-overlay publication-pdf-overlay-left">
          <div
            className="publication-pdf-pagination"
            aria-label="PDF pagination"
          >
            <button
              type="button"
              className="publication-pdf-nav-button"
              aria-label="Previous page"
              title="Previous page"
              onClick={() => {
                setPageNumber((currentPage) => Math.max(currentPage - 1, 1));
                blurActiveElement();
              }}
              disabled={isPreviousDisabled}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="publication-pdf-nav-button"
              aria-label="Next page"
              title="Next page"
              onClick={() => {
                setPageNumber((currentPage) =>
                  Math.min(currentPage + 1, pageCount),
                );
                blurActiveElement();
              }}
              disabled={isNextDisabled}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="publication-pdf-overlay publication-pdf-overlay-right">
          <button
            type="button"
            className="publication-pdf-open-link"
            aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
            title={isFullscreen ? "Exit full screen" : "Full screen"}
            onClick={() => {
              void handleFullscreenToggle();
            }}
          >
            {isFullscreen ? (
              <Minimize2 size={18} aria-hidden="true" />
            ) : (
              <Maximize2 size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
