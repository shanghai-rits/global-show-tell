import React, { useEffect, useLayoutEffect, useRef, useState, useMemo, useCallback } from 'react';
import showcaseSampleCover from '../assets/showcase-sample-cover.png';
import SearchBox from '../components/SearchBox';
import './Showcase.css';


interface ShowcaseItem {
  id: number;
  title: string;
  authors: string;
  program: string;
  size?: { width?: number; height?: number };
  real: boolean;
}
/**
 * Checks if two items (by top-left corner) with the same width/height/spacing overlap.
 */
function isOverlap(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  itemWidth: number,
  itemHeight: number,
  spacing: number
): boolean {
  // Basic bounding-box collision
  return !(
    x1 + itemWidth + spacing < x2 ||
    x2 + itemWidth + spacing < x1 ||
    y1 + itemHeight + spacing < y2 ||
    y2 + itemHeight + spacing < y1
  );
}

function generateNonOverlappingPositions(
  count: number,
  canvasWidth: number,
  canvasHeight: number,
  itemWidth: number,
  itemHeight: number,
  spacing: number
): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  if (count <= 0) {
    return positions;
  }

  // Shuffle item indices so any item can be at the center
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Center of the canvas
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Radius increment for each ring
  const radiusIncrement = 150 + spacing;

  // Place the first (random) item in the center:
  positions[indices[0]] = {
    x: centerX - itemWidth / 2,
    y: centerY - itemHeight / 2,
  };

  let placedCount = 1;
  let ringNumber = 1;
  let itemsInThisRing = 4;

  while (placedCount < count) {
    const itemsRemaining = count - placedCount;
    const ringSlots = Math.min(itemsInThisRing, itemsRemaining);
    const ringRadius = ringNumber * radiusIncrement;

    let placedThisRing = 0;
    let attempt = 0;
    const maxAttempts = 10000;

    while (placedThisRing < ringSlots && attempt < maxAttempts) {
      attempt++;
      const angle = Math.random() * 2 * Math.PI;
      const x = centerX + ringRadius * Math.cos(angle) - itemWidth / 2;
      const y = centerY + ringRadius * Math.sin(angle) - itemHeight / 2;

      let overlapFound = false;
      for (const pos of positions) {
        if (pos && isOverlap(pos.x, pos.y, x, y, itemWidth, itemHeight, spacing)) {
          overlapFound = true;
          break;
        }
      }

      if (!overlapFound) {
        // Find the next available index in the shuffled array
        const idx = indices[placedCount];
        positions[idx] = { x, y };
        placedCount++;
        placedThisRing++;
      }
    }
    ringNumber++;
    itemsInThisRing += 2;
  }

  // Return positions in the shuffled order
  return positions;
}

const items: ShowcaseItem[] = [
    { id: 1, title: 'Live-Diffusion', authors: 'Chenxuan Sun, Jinran Ye', program: "NYU Shanghai IMA ", size: { width: 420 }, real: true },
    { id: 2, title: 'DreamyBot', authors: 'Ruiqi Liu', program: "NYU Shanghai IMA", real: true },
    { id: 3, title: 'KUNST KAPUTT', authors: 'Senaida Ng, Brian Ho, Dadabots', program: "NYU IMA Low Res", real: true },
    { id: 4, title: 'Digital Genesis', authors: 'Yanrui Shao and Jiayue Qiu', program: "NYU Shanghai IMA", real: true },
    { id: 5, title: 'Dear Diary', authors: 'Yingfan Chen', program: "NYU Shanghai IMA", real: true },
    { id: 6, title: 'The Silhouette', authors: 'Lizhemei (Riva) Wang & Chenyi Wang', program: "NYU Tandon ID&M", real: true },
    { id: 7, title: 'A Tale of Two Lives', authors: 'Danni Wang', program: "NYU IMA Low Res", real: true },
    {
      id: 8, title: 'Poespin', authors: `
      Cory Yihua Li, Baiyuan Xin, Cardin An Chung<br/>
      Wendy Li, Jiayi Li, Archy Hongyue Cheng<br/>
      Reraner Yetong Xin, Armon Naeini<br/>`,
      program: `NYU Tisch ITP/IMA, USC Thornton<br/> Universität Freiburg English Literatures and Literary Theory<br/> Harvard GSD`,
      real: true
    },
    { id: 9, title: 'Arrival', authors: 'Jiaqi Yi', program: "NYU Tisch ITP/IMA", real: true },
    { id: 10, title: 'GenLight', authors: 'Tatsan Chen', program: "NYU Tandon ID&M", real: true },
    { id: 11, title: 'Lingo Bud', authors: 'Jiahui(Georgia) Chen, Chenxu (Cathy) Li, Will Park', program: "NYU Tisch ITP/IMA", real: true },
    { id: 12, title: 'The Theater', authors: 'John Luo', program: "NYU Tisch ITP/IMA", real: true },
    { id: 13, title: 'Memourn', authors: 'Jiachen Zhou', program: "NYU Tisch ITP/IMA", real: true },
    { id: 14, title: 'Forgiveness 荒村别墅', authors: 'Liyanbing He', program: "NYU IMA Low Res", real: true },
    { id: 15, title: 'The Red Line', authors: 'Jasmine Nackash', program: "NYU Tisch ITP/IMA", real: true },
    { id: 16, title: 'BABEL 巴别塔', authors: 'Ken Zhixing Zhang', program: "NYU Shanghai IMA", real: true },
    { id: 17, title: 'Unheld', authors: 'Yuzhuo Sun (Zora)', program: "NYU Shanghai IMA", real: true },
    { id: 18, title: "It's Okay to Let Go", authors: 'Wanyu Chen', program: "NYU Shanghai IMA", real: true },
    { id: 19, title: 'Faces in Motion', authors: 'Jingchen Gao', program: "NYU Shanghai IMA", real: true },
    { id: 20, title: 'Sentimental Galaxy', authors: 'Cara Cai', program: "NYU Tisch ITP/IMA", real: true },
    { id: 21, title: 'Input/Output', authors: 'Emy Sainbayar', program: "NYU Shanghai IMA", real: true },
    { id: 22, title: 'Interactive Neural Networks', authors: 'Xiaozao Wang', program: "NYU Shanghai IMA", real: true },
  ];

  // Canvas = "map" we can drag around.
const CANVAS_WIDTH = 3400;
const CANVAS_HEIGHT = 3000;
  // Visible screen-space margins, independent of zoom.
const DRAG_VERTICAL_PADDING = 100;
const DRAG_HORIZONTAL_PADDING = 50;

const MAX_ITEM_WIDTH = 400; // Adjust as needed
const MAX_ITEM_HEIGHT = 400; // Adjust as needed

  // Extra gap so items don’t overlap
const SPACING = 40;


const Showcase: React.FC = () => {


  // SearchBox
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredShowcaseItems, setFilteredShowcaseItems] = useState<ShowcaseItem[]>([]);

  // Add state for mobile view mode
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [viewMode, setViewMode] = useState<'grid' | 'gallery'>('grid');

  // Add state for the tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipPosition = useRef({ x: 0, y: 0 });
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggleView = () => {
    setViewMode(prev => prev === 'grid' ? 'gallery' : 'grid');
  };


  const handleTooltipMouseMove = (e: React.MouseEvent) => {
    tooltipPosition.current = { x: e.clientX + 10, y: e.clientY + 20 };
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${tooltipPosition.current.x}px`;
      tooltipRef.current.style.top = `${tooltipPosition.current.y}px`;
    }
    if (!showTooltip) {
      setShowTooltip(true);
      clearTimeout(tooltipTimeoutRef.current ?? undefined);
      tooltipTimeoutRef.current = setTimeout(() => setShowTooltip(false), 2500);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setShowResults(true);
    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authors.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredShowcaseItems(filteredItems);
    setSearchQuery('');
  };

  const handleBackToAll = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  // Positions for each item
  const [positions, setPositions] = useState<{ x: number; y: number; id: number }[]>([]);

  // For dragging the entire canvas
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  // We'll measure the viewport size to clamp dragging
  const outerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const [scale, setScale] = useState(() => window.innerWidth < 768 ? 0.5 : 1);
  const scaleRef = useRef(scale);

  const clampOffset = useCallback((next: { x: number; y: number }) => {
    if (!viewportWidth || !viewportHeight) return next;
    const oppositeX = viewportWidth - CANVAS_WIDTH * scale - DRAG_HORIZONTAL_PADDING;
    const oppositeY = viewportHeight - CANVAS_HEIGHT * scale - DRAG_VERTICAL_PADDING;
    return {
      x: Math.max(Math.min(DRAG_HORIZONTAL_PADDING, oppositeX), Math.min(Math.max(DRAG_HORIZONTAL_PADDING, oppositeX), next.x)),
      y: Math.max(Math.min(DRAG_VERTICAL_PADDING, oppositeY), Math.min(Math.max(DRAG_VERTICAL_PADDING, oppositeY), next.y)),
    };
  }, [viewportWidth, viewportHeight, scale]);

  useEffect(() => {
    setOffset(prev => {
      const next = clampOffset(prev);
      return next.x === prev.x && next.y === prev.y ? prev : next;
    });
  }, [clampOffset]);

  useEffect(() => {
    const viewport = outerRef.current;
    if (!viewport) return;
    const resize = new ResizeObserver(() => {
      setViewportWidth(viewport.clientWidth);
      setViewportHeight(viewport.clientHeight);
    });
    resize.observe(viewport);
    return () => resize.disconnect();
  }, [showResults, isMobile, viewMode]);


  const zoomBy = useCallback((delta: number) => {
    const previous = scaleRef.current;
    const next = Math.max(0.1, previous + delta);
    const actualDelta = next - previous;
    if (!actualDelta) return;
    scaleRef.current = next;
    setScale(next);
    setOffset(prev => ({
      x: prev.x - (CANVAS_WIDTH / 2) * actualDelta,
      y: prev.y - (CANVAS_HEIGHT / 2) * actualDelta,
    }));
  }, []);
  const handleZoomIn = () => zoomBy(0.1);
  const handleZoomOut = () => zoomBy(-0.1);

  useLayoutEffect(() => {
    setFilteredShowcaseItems(items);
    if (outerRef.current) {
      const viewportWidth = outerRef.current.clientWidth;
      const viewportHeight = outerRef.current.clientHeight;
      setViewportWidth(viewportWidth);
      setViewportHeight(viewportHeight);

      // Calculate initial offset to center the canvas
      const initialOffsetX = (viewportWidth - CANVAS_WIDTH) / 2;
      const initialOffsetY = (viewportHeight - CANVAS_HEIGHT) / 2;
      setOffset({ x: initialOffsetX, y: initialOffsetY });
    }

    const randomPositions = generateNonOverlappingPositions(
      items.length,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      MAX_ITEM_WIDTH + SPACING,
      MAX_ITEM_HEIGHT + SPACING,
      SPACING
    );

    const newPositions = randomPositions.map((pos, idx) => ({
      ...pos,
      id: items[idx].id,
    }));

    setPositions(newPositions);
  }, []);

  useEffect(() => {
    document.title = "Showcase - Global Show & Tell";
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => {
      setIsMobile(media.matches);
      scaleRef.current = media.matches ? 0.5 : 1;
      setScale(scaleRef.current);
      if (media.matches) setViewMode('grid');
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  // DRAG handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    hasDraggedRef.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    hasDraggedRef.current = true;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    setOffset(prev => clampOffset({ x: prev.x + dx, y: prev.y + dy }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseLeave = () => {
    setDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true);
      hasDraggedRef.current = false;
      lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging || e.touches.length !== 1) return;
    hasDraggedRef.current = true;
    const dx = e.touches[0].clientX - lastPos.current.x;
    const dy = e.touches[0].clientY - lastPos.current.y;

    setOffset(prev => clampOffset({ x: prev.x + dx, y: prev.y + dy }));

    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 0.009 : -0.009);
  }, [zoomBy]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel, showResults, isMobile, viewMode]);


  const galleryCards = useMemo(() => (
    positions.map(pos => {
      const item = items.find(i => i.id === pos.id);
      if (!item) return null;

      const coverImagePath = `/showcase/${item.id}/cover.jpg`;

      return (
        <div
          key={item.id}
          className="gallery-card" style={{ left: pos.x, top: pos.y, cursor: item.real ? 'pointer' : 'default' }}

          onClick={(e) => {
            if (hasDraggedRef.current) return; // Prevent click after drag
            if (!item.real) return;
            e.stopPropagation();
            const fullUrl = `${window.location.origin}/showcase/${item.id}`;
            window.open(fullUrl, '_blank', 'noopener,noreferrer');
          }}

        >
          <img
            src={coverImagePath}
            alt={`${item.title} cover`}
            onError={(e) => { e.currentTarget.src = showcaseSampleCover; }}
            onDragStart={(e) => e.preventDefault()}
            className="gallery-cover" style={{ maxWidth: item.size?.width ?? MAX_ITEM_WIDTH, maxHeight: item.size?.height ?? MAX_ITEM_HEIGHT }}
          />
          <div className="gallery-item-title">
            {item.title}
          </div>
          <div className="gallery-item-authors">
            {item.authors.split('<br/>').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          <div className="gallery-item-program">
            {item.program.split('<br/>').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    })
  ), [positions]);


  return (
    <div>
      <SearchBox
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        showResults={showResults}
        handleBackToAll={handleBackToAll}
      />

      {/* Mobile view mode toggle button */}
      {isMobile && (
        <div
          onClick={handleToggleView}
          className="view-mode-toggle">
          {viewMode === 'grid' ? 'Gallery View' : 'Grid View'}
        </div>
      )}

      {(showResults || (isMobile && viewMode === 'grid')) ? (
        filteredShowcaseItems.length === 0 && showResults ? (
          <div
            className="showcase-empty">
            <div>No results.</div>
            <div>Please try something else :)</div>
          </div>
        ) : (
          // show the filteredShowcaseItems in a grid layout
          <div className="grid-container">
            {filteredShowcaseItems.map(item => (
              <div
                key={item.id}
                  className="grid-card" style={{ cursor: item.real ? 'pointer' : 'default' }}


                onClick={(e) => {
                  if (!item.real) return; // Only navigate if the item is real
                  e.stopPropagation(); // 防止事件冒泡（可选）
                  const fullUrl = `${window.location.origin}/showcase/${item.id}`;
                  window.open(fullUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <img
                  className="grid-item-image grid-cover"
                  src={`/showcase/${item.id}/cover.jpg`}
                  alt={`${item.title} cover`}
                  onError={(e) => { e.currentTarget.src = showcaseSampleCover; }}
                  onDragStart={(e) => e.preventDefault()}
                    style={{ maxWidth: item.size?.width ?? MAX_ITEM_WIDTH, maxHeight: item.size?.height ?? MAX_ITEM_HEIGHT }}
                />
                <div className="grid-item-title">
                  {item.title}
                </div>
                <div className="grid-item-authors">
                  {item.authors.split('<br/>').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // Gallery view (draggable canvas)
        <div
          ref={outerRef}
          className="showcase-viewport"
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleTooltipMouseMove(e);
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
              className="showcase-offset" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          >
            <div
              className="showcase-canvas" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, transform: `scale(${scale})` }}
            >
              {galleryCards}
            </div>
          </div>
          <div className='zoom-in-out'>
            <div onClick={handleZoomIn} className="zoom-control">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="37.75" height="37.75" viewBox="0 0 37.75 37.75" fill="none">
                <circle cx="18.25" cy="18.25" r="17.5" stroke="var(--color-heading)" strokeWidth="1.5"   >
                </circle>
                <path fill="var(--color-heading)" d="M34.3358 37.1642L30.3358 33.1642L33.1642 30.3358L37.1642 34.3358L34.3358 37.1642ZM31.75 28.9216L33.1642 30.3358L30.3358 33.1642L28.9216 31.75L31.75 28.9216ZM35.75 37.75C34.6454 37.75 33.75 36.8546 33.75 35.75C33.75 34.6454 34.6454 33.75 35.75 33.75C36.8546 33.75 37.75 34.6454 37.75 35.75C37.75 36.8546 36.8546 37.75 35.75 37.75Z">
                </path>
                <path stroke="var(--color-heading)" strokeWidth="2.5" d="M7.25 18.2518L29.36 18.3618">
                </path>
                <path stroke="var(--color-heading)" strokeWidth="2.5" d="M18.5 7.25183L18.5 29.3621">
                </path>
              </svg>
            </div>
            <div onClick={handleZoomOut} className="zoom-control">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="37.75" height="37.75" viewBox="0 0 37.75 37.75" fill="none">
                <circle cx="18.25" cy="18.25" r="17.5" stroke="var(--color-heading)" strokeWidth="1.5"   >
                </circle>
                <path fill="var(--color-heading)" d="M34.3358 37.1642L30.3358 33.1642L33.1642 30.3358L37.1642 34.3358L34.3358 37.1642ZM31.75 28.9216L33.1642 30.3358L30.3358 33.1642L28.9216 31.75L31.75 28.9216ZM35.75 37.75C34.6454 37.75 33.75 36.8546 33.75 35.75C33.75 34.6454 34.6454 33.75 35.75 33.75C36.8546 33.75 37.75 34.6454 37.75 35.75C37.75 36.8546 36.8546 37.75 35.75 37.75Z">
                </path>
                <path stroke="var(--color-heading)" strokeWidth="3" d="M7.25 18.75L29.36 18.86">
                </path>
              </svg>
            </div>
          </div>
          {/* Tooltip */}
          {showTooltip && (
            <div
              className="tooltip-with-blur showcase-tooltip"
              ref={tooltipRef}
              style={{ left: tooltipPosition.current.x, top: tooltipPosition.current.y }}
            >
              Press and hold to drag
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Showcase;
