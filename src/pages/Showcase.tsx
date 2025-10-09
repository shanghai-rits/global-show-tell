import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import showcaseSampleCover from '../assets/showcase-sample-cover.png';
import Navbar from '../components/Navbar/Navbar';
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
 * Adjust to fit your actual isOverlap function signature.
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

/**
 * Generates random non-overlapping positions around a center point in "rings".
 * - The first item is at the center.
 * - Then ring by ring, we place items at random angles.
 *
 * @param count Number of items to place
 * @param canvasWidth Overall canvas width
 * @param canvasHeight Overall canvas height
 * @param itemWidth The width of each item (for overlap checks)
 * @param itemHeight The height of each item (for overlap checks)
 * @param spacing Additional space to pad around items (prevents collisions)
 * @returns Array of (x,y) coordinates for each item’s top-left corner
 */
// function generateNonOverlappingPositions(
//   count: number,
//   canvasWidth: number,
//   canvasHeight: number,
//   itemWidth: number,
//   itemHeight: number,
//   spacing: number
// ): Array<{ x: number; y: number }> {
//   const positions: Array<{ x: number; y: number }> = [];
//   if (count <= 0) {
//     return positions;
//   }

//   const indices = Array.from({ length: count }, (_, i) => i);
//   for (let i = indices.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [indices[i], indices[j]] = [indices[j], indices[i]];
//   }

//   // Center of the canvas
//   const centerX = canvasWidth / 2;
//   const centerY = canvasHeight / 2;

//   // Radius increment for each ring
//   const radiusIncrement = 150 + spacing;

//   // Place the first item in the center:
//   positions[indices[0]] = {
//     x: centerX - itemWidth / 2,
//     y: centerY - itemHeight / 2,
//   };

//   // How many items have we successfully placed so far?
//   let placedCount = 1;

//   // Start from ring #1 outward
//   let ringNumber = 1;

//   // For demonstration, let’s say ring 1 can have 3 items, ring 2 can have 5, ring 3 can have 7, etc.
//   // You can make this simpler or more complicated as you see fit.
//   let itemsInThisRing = 4;

//   while (placedCount < count) {
//     // How many items do we still need to place?
//     const itemsRemaining = count - placedCount;

//     // For this ring, we only try to place as many as we still need:
//     const ringSlots = Math.min(itemsInThisRing, itemsRemaining);

//     // Current ring radius
//     const ringRadius = ringNumber * radiusIncrement;

//     let placedThisRing = 0;
//     let attempt = 0;
//     const maxAttempts = 10000; // Just to avoid infinite loops

//     // Keep trying angles until we've placed ringSlots or run out of attempts
//     while (placedThisRing < ringSlots && attempt < maxAttempts) {
//       attempt++;

//       // Pick a random angle for the item in this ring
//       const angle = Math.random() * 2 * Math.PI;

//       // Convert polar -> cartesian (with item offset for top-left)
//       const x = centerX + ringRadius * Math.cos(angle) - itemWidth / 2;
//       const y = centerY + ringRadius * Math.sin(angle) - itemHeight / 2;

//       // Check overlap with already-placed positions
//       let overlapFound = false;
//       for (const pos of positions) {
//         if (isOverlap(pos.x, pos.y, x, y, itemWidth, itemHeight, spacing)) {
//           overlapFound = true;
//           break;
//         }
//       }

//       // If there's no collision, we can place it
//       if (!overlapFound) {
//         const idx = indices[placedCount];
//         positions[idx] = { x, y };
//         placedCount++;
//         placedThisRing++;
//       }
//     }

//     // Move on to the next ring
//     ringNumber++;

//     // If you want each ring to hold 3 more items than the previous ring, do:
//     // itemsInThisRing += 3;
//     // Or if you want a different pattern, just change it here:
//     itemsInThisRing += 2; // Example: ring 1 has 3, ring 2 has 5, ring 3 has 7, etc.
//   }

//   return positions;
// }

// ...existing code...
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
// ...existing code...

const Showcase: React.FC = () => {

  // Details Page
  const navigate = useNavigate();

  // SearchBox
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredShowcaseItems, setFilteredShowcaseItems] = useState<ShowcaseItem[]>([]);

  // Add state for mobile view mode
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'gallery'>('grid');

  // Add state for the tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check if it's mobile and set default view mode
  useEffect(() => {
    const checkMobile = () => {
      const mobileThreshold = 768;
      const isMobileNow = window.innerWidth < mobileThreshold;
      setIsMobile(isMobileNow);
      if (isMobileNow) {
        setViewMode('grid'); // Default to grid on mobile
      }
    };

    window.addEventListener('resize', checkMobile);
    checkMobile(); // Check initial viewport

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleView = () => {
    setViewMode(prev => prev === 'grid' ? 'gallery' : 'grid');
  };


  // Add mouse move handler for tooltip
  const handleTooltipMouseMove = (e: React.MouseEvent) => {
    if (!showTooltip) {
      setShowTooltip(true);
      setTooltipPosition({ x: e.clientX, y: e.clientY });

      // Clear existing timeout
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }

      // Hide tooltip after 5 seconds
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 2500);
    } else {
      // Update position while tooltip is visible
      setTooltipPosition({ x: e.clientX, y: e.clientY });
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

  const MAX_ITEM_WIDTH = 400; // Adjust as needed
  const MAX_ITEM_HEIGHT = 400; // Adjust as needed

  // Extra gap so items don’t overlap
  const SPACING = 40;

  // Positions for each item
  const [positions, setPositions] = useState<{ x: number; y: number; id: number }[]>([]);

  // For dragging the entire canvas
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // We'll measure the viewport size to clamp dragging
  const outerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // 在组件函数中添加：
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(prev => prev + 0.1);
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.1, prev - 0.1));
  };

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
    // setPositions(fixedPositions);
  }, []);

  useEffect(() => {
    document.title = "Showcase - Global Show & Tell";
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const mobileThreshold = 768; // adjust threshold as needed
      if (window.innerWidth < mobileThreshold) {
        setScale(0.5); // use a smaller scale on mobile
      } else {
        setScale(1);
      }
    };

    window.addEventListener('resize', updateScale);
    updateScale(); // check initial viewport

    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // DRAG handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;

    setOffset(prev => {
      // Proposed new offset
      let newX = prev.x + dx;
      let newY = prev.y + dy;

      // Clamp so we don't drag outside - account for scale
      const scaledCanvasWidth = CANVAS_WIDTH * scale;
      const scaledCanvasHeight = CANVAS_HEIGHT * scale;
      const minX = viewportWidth - scaledCanvasWidth;
      const maxX = 0;
      const minY = viewportHeight - scaledCanvasHeight;
      const maxY = 0;

      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;
      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;

      return { x: newX, y: newY };
    });

    setLastPos({ x: e.clientX, y: e.clientY });
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
      setLastPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastPos.x;
    const dy = e.touches[0].clientY - lastPos.y;

    setOffset(prev => {
      // Proposed new offset
      let newX = prev.x + dx;
      let newY = prev.y + dy;

      // Clamp so we don't drag outside - account for scale
      const scaledCanvasWidth = CANVAS_WIDTH * scale;
      const scaledCanvasHeight = CANVAS_HEIGHT * scale;
      const minX = viewportWidth - scaledCanvasWidth;
      const maxX = 0;
      const minY = viewportHeight - scaledCanvasHeight;
      const maxY = 0;

      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;
      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;

      return { x: newX, y: newY };
    });

    setLastPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  // Scroll handlers
  const handleWheel = (e: React.WheelEvent) => {
    setOffset(prev => {
      // Proposed new offset
      let newX = prev.x - e.deltaX;
      let newY = prev.y - e.deltaY;

      // Clamp so we don't drag outside - account for scale
      const scaledCanvasWidth = CANVAS_WIDTH * scale;
      const scaledCanvasHeight = CANVAS_HEIGHT * scale;
      const minX = viewportWidth - scaledCanvasWidth;
      const maxX = 0;
      const minY = viewportHeight - scaledCanvasHeight;
      const maxY = 0;

      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;
      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;

      return { x: newX, y: newY };
    });
  };



  return (
    <div>
      <div style={{ position: 'fixed', zIndex: 999 }}>
        <Navbar />
      </div>
      {/* 添加 SearchBox */}
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
          style={{
            position: 'fixed',
            bottom: '5px',
            left: '15px',
            height: '20px',
            backgroundColor: '#000',
            color: '#EBF4A1',
            padding: '7px 20px 10px 20px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            zIndex: 1000,
            border: 'none',
            fontFamily: 'NYU',
          }}
        >
          {viewMode === 'grid' ? 'Gallery View' : 'Grid View'}
        </div>
      )}

      {(showResults || (isMobile && viewMode === 'grid')) ? (
        filteredShowcaseItems.length === 0 && showResults ? (
          <div
            style={{
              display: 'flex-start',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: '32px',
              color: '#888',
              backgroundColor: '#fff',
              width: '100vw',
            }}
          >
            <div>No results.</div>
            <div>Please try something else :)</div>
          </div>
        ) : (
          // show the filteredShowcaseItems in a grid layout
          <div className="grid-container"
            style={{
              paddingBottom: isMobile ? '80px' : '110px', // Add extra bottom padding on mobile
            }}
          >
            {filteredShowcaseItems.map(item => (
              <div
                key={item.id}
                style={{
                  background: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 0,
                  padding: 0,
                  margin: 0,
                  cursor: item.real ? 'pointer' : 'default',
                }}

                // onClick={() => navigate(`/showcase/${item.id}`)}

                onClick={(e) => {
                  if (!item.real) return; // Only navigate if the item is real
                  e.stopPropagation(); // 防止事件冒泡（可选）
                  const fullUrl = `${window.location.origin}/showcase/${item.id}`;
                  window.open(fullUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <img
                  className="grid-item-image"
                  src={`/showcase/${item.id}/cover.jpg`}
                  alt={`${item.title} cover`}
                  onError={(e) => { e.currentTarget.src = showcaseSampleCover; }}
                  onDragStart={(e) => e.preventDefault()}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: item.size?.width ?? MAX_ITEM_WIDTH,
                    maxHeight: item.size?.height ?? MAX_ITEM_HEIGHT,
                    objectFit: 'cover',
                    margin: 0,
                    padding: 0,
                    boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.2)',
                  }}
                />
                <div className="grid-item-title" style={{ lineHeight: '1', marginTop: '15px', fontFamily: 'NYU', fontSize: '22px', fontWeight: 'unset', color: 'rgba(128, 128, 128, 1)' }}>
                  {item.title}
                </div>
                <div className="grid-item-authors" style={{ marginTop: '5px', marginLeft: '2px', color: 'rgba(128, 128, 128, 1)', fontSize: '15px' }}>
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
          style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'move',
            userSelect: 'none',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={(e) => {
            handleMouseMove(e);
            handleTooltipMouseMove(e);
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        // title="Press & hold left mouse button and drag"
        >
          <div
            style={{
              position: 'absolute',
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            <div
              style={{
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                backgroundColor: '#fff',
                transform: `scale(${scale})`,
                transformOrigin: '0 0',
              }}
            >
              {positions.map(pos => {
                const item = items.find(i => i.id === pos.id);
                if (!item) return null;

                const coverImagePath = `/showcase/${item.id}/cover.jpg`;

                return (
                  <div
                    key={item.id}
                    style={{
                      position: 'absolute',
                      left: pos.x,
                      top: pos.y,
                      background: 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      borderRadius: 0,
                      overflow: 'hidden',
                      padding: 0,
                      margin: 0,
                      cursor: item.real ? 'pointer' : 'default',
                    }}

                    onClick={(e) => {
                      if (!item.real) return; // Only navigate if the item is real
                      e.stopPropagation(); // 防止事件冒泡（可选）
                      const fullUrl = `${window.location.origin}/showcase/${item.id}`;
                      window.open(fullUrl, '_blank', 'noopener,noreferrer');
                    }}

                  >
                    <img
                      src={coverImagePath}
                      alt={`${item.title} cover`}
                      onError={(e) => { e.currentTarget.src = showcaseSampleCover; }}
                      onDragStart={(e) => e.preventDefault()}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: item.size?.width ?? MAX_ITEM_WIDTH,
                        maxHeight: item.size?.height ?? MAX_ITEM_HEIGHT,
                        objectFit: 'cover',
                        margin: 0,
                        padding: 0,
                        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.2)',
                      }}
                    />
                    <div style={{ lineHeight: '1', marginTop: '15px', fontFamily: 'NYU', fontSize: '32px', fontWeight: 'unset', color: 'rgba(128, 128, 128, 1)' }}>
                      {item.title}
                    </div>
                    <div style={{ marginTop: '3px', marginLeft: '2px', color: 'rgba(128, 128, 128, 1)', fontSize: '20px' }}>
                      {item.authors.split('<br/>').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ marginTop: '0px', marginLeft: '2px', color: 'rgba(128, 128, 128, 1)', fontSize: '18px' }}>
                      {item.program.split('<br/>').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='zoom-in-out'>
            <div onClick={handleZoomIn} style={{ cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="37.75" height="37.75" viewBox="0 0 37.75 37.75" fill="none">
                <circle cx="18.25" cy="18.25" r="17.5" stroke="rgba(38, 38, 38, 1)" stroke-width="1.5"   >
                </circle>
                <path fill="rgba(38, 38, 38, 1)" d="M34.3358 37.1642L30.3358 33.1642L33.1642 30.3358L37.1642 34.3358L34.3358 37.1642ZM31.75 28.9216L33.1642 30.3358L30.3358 33.1642L28.9216 31.75L31.75 28.9216ZM35.75 37.75C34.6454 37.75 33.75 36.8546 33.75 35.75C33.75 34.6454 34.6454 33.75 35.75 33.75C36.8546 33.75 37.75 34.6454 37.75 35.75C37.75 36.8546 36.8546 37.75 35.75 37.75Z">
                </path>
                <path stroke="rgba(38, 38, 38, 1)" stroke-width="2.5" d="M7.25 18.2518L29.36 18.3618">
                </path>
                <path stroke="rgba(38, 38, 38, 1)" stroke-width="2.5" d="M18.5 7.25183L18.5 29.3621">
                </path>
              </svg>
            </div>
            <div onClick={handleZoomOut} style={{ cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="37.75" height="37.75" viewBox="0 0 37.75 37.75" fill="none">
                <circle cx="18.25" cy="18.25" r="17.5" stroke="rgba(38, 38, 38, 1)" stroke-width="1.5"   >
                </circle>
                <path fill="rgba(38, 38, 38, 1)" d="M34.3358 37.1642L30.3358 33.1642L33.1642 30.3358L37.1642 34.3358L34.3358 37.1642ZM31.75 28.9216L33.1642 30.3358L30.3358 33.1642L28.9216 31.75L31.75 28.9216ZM35.75 37.75C34.6454 37.75 33.75 36.8546 33.75 35.75C33.75 34.6454 34.6454 33.75 35.75 33.75C36.8546 33.75 37.75 34.6454 37.75 35.75C37.75 36.8546 36.8546 37.75 35.75 37.75Z">
                </path>
                <path stroke="rgba(38, 38, 38, 1)" stroke-width="3" d="M7.25 18.75L29.36 18.86">
                </path>
              </svg>
            </div>
          </div>
          {/* Tooltip */}
          {showTooltip && (
            <div
              className="tooltip-with-blur"
              style={{
                position: 'fixed',
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y + 20,
                backgroundColor: 'rgba(234, 234, 36, 0.95)',
                color: '#000',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                pointerEvents: 'none',
                zIndex: 9999,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                whiteSpace: 'nowrap',
                animation: 'fadeInTooltip 0.3s ease-out',
                boxShadow: `
                  0 0 20px rgba(234, 234, 36, 0.8),
                  0 0 40px rgba(234, 234, 36, 0.6),
                  0 0 60px rgba(234, 234, 36, 0.4),
                  0 2px 8px rgba(0, 0, 0, 0.15)
                `,
              }}
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
