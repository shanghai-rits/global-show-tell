import React, { useLayoutEffect, useRef, useState } from 'react';
import showcaseSampleCover from '../assets/showcase-sample-cover.png';

interface ShowcaseItem {
  id: number;
  title: string;
  authors: string;
  size?: { width?: number; height?: number };
}

// Helper: Check overlap between two items
// rect1: (x1, y1, w, h), rect2: (x2, y2, w, h)
// with an additional "spacing" margin so they don’t crowd each other.
// function isOverlap(
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
//   w: number,
//   h: number,
//   spacing: number
// ): boolean {
//   const noOverlap =
//     x1 + w + spacing < x2 ||
//     x2 + w + spacing < x1 ||
//     y1 + h + spacing < y2 ||
//     y2 + h + spacing < y1;

//   return !noOverlap;
// }

// // Generate random positions for items so that they don’t overlap and
// // each new item is within `maxDistance` of at least one placed item.
// function generateNonOverlappingPositions(
//   count: number,
//   canvasWidth: number,
//   canvasHeight: number,
//   itemWidth: number,
//   itemHeight: number,
//   spacing: number
// ): Array<{ x: number; y: number }> {
//   const positions: Array<{ x: number; y: number }> = [];

//   console.log('Generating positions for', count, 'items');

//   // Center of the canvas
//   const centerX = canvasWidth / 2;
//   const centerY = canvasHeight / 2;

//   // Radius increment for each circle layer
//   const radiusIncrement = itemWidth + spacing;

//   // Place the first item at the center
//   positions.push({ x: centerX - itemWidth / 2, y: centerY - itemHeight / 2 });

//   let currentRadius = radiusIncrement;
//   let itemsInCurrentCircle = 3;

//   for (let i = 1; i < count; i++) {
//     console.log('Placing item', i);
//     let placed = false;
//     let tries = 0;

//     while (!placed && tries < 10000) {
//       tries++;
//       // Calculate angle and position for the item
//       const angle = Math.random() * 2 * Math.PI;
//       const x = centerX + currentRadius * Math.cos(angle) - itemWidth / 2;
//       const y = centerY + currentRadius * Math.sin(angle) - itemHeight / 2;

//       // Check overlap
//       let overlapFound = false;
//       for (const pos of positions) {
//         if (isOverlap(pos.x, pos.y, x, y, itemWidth, itemHeight, spacing)) {
//           overlapFound = true;
//           break;
//         }
//       }

//       if (!overlapFound) {
//         positions.push({ x, y });
//         console.log('Placed item', i, 'at', x, y);
//         placed = true;
//       }

//       tries++;
//       // console.log('Tries:', tries);
//     }

//     // if ((i + 1) % itemsInCurrentCircle === 0) {
//     //   currentRadius += radiusIncrement; // Increase radius more often
//     // }

//     // Move to the next circle layer if the current one is filled
//     if (positions.length >= itemsInCurrentCircle) {
//       currentRadius += radiusIncrement;
//       itemsInCurrentCircle += 4;
//       console.log('Moving to next circle layer:', currentRadius, 'Items in current circle:', itemsInCurrentCircle);
//     }

//     console.log('Current positions:', positions);
//   }

//   return positions;
// }

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

  // Center of the canvas
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Radius increment for each ring
  const radiusIncrement = itemWidth + spacing;

  // Place the first item in the center:
  positions.push({
    x: centerX - itemWidth / 2,
    y: centerY - itemHeight / 2,
  });

  // How many items have we successfully placed so far?
  let placedCount = 1;

  // Start from ring #1 outward
  let ringNumber = 1;

  // For demonstration, let’s say ring 1 can have 3 items, ring 2 can have 5, ring 3 can have 7, etc.
  // You can make this simpler or more complicated as you see fit.
  let itemsInThisRing = 6;

  while (placedCount < count) {
    // How many items do we still need to place?
    const itemsRemaining = count - placedCount;

    // For this ring, we only try to place as many as we still need:
    const ringSlots = Math.min(itemsInThisRing, itemsRemaining);

    // Current ring radius
    const ringRadius = ringNumber * radiusIncrement;

    let placedThisRing = 0;
    let attempt = 0;
    const maxAttempts = 1000; // Just to avoid infinite loops

    // Keep trying angles until we've placed ringSlots or run out of attempts
    while (placedThisRing < ringSlots && attempt < maxAttempts) {
      attempt++;

      // Pick a random angle for the item in this ring
      const angle = Math.random() * 2 * Math.PI;

      // Convert polar -> cartesian (with item offset for top-left)
      const x = centerX + ringRadius * Math.cos(angle) - itemWidth / 2;
      const y = centerY + ringRadius * Math.sin(angle) - itemHeight / 2;

      // Check overlap with already-placed positions
      let overlapFound = false;
      for (const pos of positions) {
        if (isOverlap(pos.x, pos.y, x, y, itemWidth, itemHeight, spacing)) {
          overlapFound = true;
          break;
        }
      }

      // If there's no collision, we can place it
      if (!overlapFound) {
        positions.push({ x, y });
        placedCount++;
        placedThisRing++;
      }
    }

    // Move on to the next ring
    ringNumber++;

    // If you want each ring to hold 3 more items than the previous ring, do:
    // itemsInThisRing += 3;
    // Or if you want a different pattern, just change it here:
    itemsInThisRing += 2; // Example: ring 1 has 3, ring 2 has 5, ring 3 has 7, etc.
  }

  return positions;
}

// Usage Example:
const CANVAS_WIDTH = 2800;
const CANVAS_HEIGHT = 2400;
const MAX_ITEM_WIDTH = 350;
const MAX_ITEM_HEIGHT = 300;
const SPACING = 20;

const positions = generateNonOverlappingPositions(
  8, // number of items
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  MAX_ITEM_WIDTH,
  MAX_ITEM_HEIGHT,
  SPACING
);

console.log("Final positions:", positions);


const Showcase: React.FC = () => {
  const items: ShowcaseItem[] = [
    { id: 1, title: 'Live Diffusion', authors: 'Author A, Author B', size: { width: 380 } },
    { id: 2, title: 'Title of the work 2', authors: 'Authors' },
    { id: 3, title: 'Title of the work 3', authors: 'Authors' },
    { id: 4, title: 'Title of the work 4', authors: 'Authors' },
    { id: 5, title: 'Title of the work 5', authors: 'Authors' },
    { id: 6, title: 'Title of the work 6', authors: 'Authors' },
    { id: 7, title: 'Title of the work 7', authors: 'Authors' },
    { id: 8, title: 'Title of the work 8', authors: 'Authors' },
  ];

  // Canvas = "map" we can drag around.
  const CANVAS_WIDTH = 2800;
  const CANVAS_HEIGHT = 2400;

  const MAX_ITEM_WIDTH = 350; // Adjust as needed
  const MAX_ITEM_HEIGHT = 300; // Adjust as needed

  // Extra gap so items don’t overlap
  const SPACING = 20;

  // New param: maximum distance to keep items “not too far” from at least one item
  const MAX_DISTANCE_BETWEEN_ITEMS = 1000; // adjust as needed

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
  const fixedPositions = [
    {
      "x": 411.2581214840093,
      "y": 218.01766202246705,
      "id": 1
    },
    {
      "x": 712.2670939017127,
      "y": 549.7696963522071,
      "id": 2
    },
    {
      "x": 629.3493010496919,
      "y": 296.40964317019785,
      "id": 3
    },
    {
      "x": 180.07582196936465,
      "y": 625.9928869502138,
      "id": 4
    },
    {
      "x": 847.3830424818209,
      "y": 15.734847024023413,
      "id": 5
    },
    {
      "x": 465.34384394703443,
      "y": 736.9221227671995,
      "id": 6
    },
    {
      "x": 23.741773541528133,
      "y": 32.98154229677599,
      "id": 7
    },
    {
      "x": 979.3795868985238,
      "y": 318.41769726377214,
      "id": 8
    }
  ]


  useLayoutEffect(() => {
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
    console.log('New positions:', newPositions);
    // setPositions(fixedPositions);
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

      // Clamp so we don’t drag outside
      const minX = viewportWidth - CANVAS_WIDTH;
      const maxX = 0;
      const minY = viewportHeight - CANVAS_HEIGHT;
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

      // Clamp so we don’t drag outside
      const minX = viewportWidth - CANVAS_WIDTH;
      const maxX = 0;
      const minY = viewportHeight - CANVAS_HEIGHT;
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

      // Clamp so we don’t drag outside
      const minX = viewportWidth - CANVAS_WIDTH;
      const maxX = 0;
      const minY = viewportHeight - CANVAS_HEIGHT;
      const maxY = 0;

      if (newX < minX) newX = minX;
      if (newX > maxX) newX = maxX;
      if (newY < minY) newY = minY;
      if (newY > maxY) newY = maxY;

      return { x: newX, y: newY };
    });
  };

  return (
    <div
      ref={outerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'inherit',
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          position: 'absolute',
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          backgroundColor: '#fff',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
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
                // boxShadow: '0px 1px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                // alignItems: 'center',
                borderRadius: 0,
                overflow: 'hidden',
                padding: 0,
                margin: 0,
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
              <div style={{ lineHeight: '1', marginTop: '15px', fontFamily: 'inter', fontSize: '32px', fontWeight: 'unset', color: 'rgba(128, 128, 128, 1)' }}>
                {item.title}
              </div>
              <div style={{ marginTop: '5px', marginLeft: '2px', color: 'rgba(128, 128, 128, 1)', fontSize: '20px' }}>
                {item.authors}
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
};

export default Showcase;
