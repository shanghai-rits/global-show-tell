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
function isOverlap(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  w: number,
  h: number,
  spacing: number
): boolean {
  const noOverlap =
    x1 + w + spacing < x2 ||
    x2 + w + spacing < x1 ||
    y1 + h + spacing < y2 ||
    y2 + h + spacing < y1;

  return !noOverlap;
}

// Helper: distance between centers of two items
function centerDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  itemWidth: number,
  itemHeight: number
) {
  // center of item1
  const cx1 = x1 + itemWidth / 2;
  const cy1 = y1 + itemHeight / 2;
  // center of item2
  const cx2 = x2 + itemWidth / 2;
  const cy2 = y2 + itemHeight / 2;

  const dx = cx2 - cx1;
  const dy = cy2 - cy1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Generate random positions for items so that they don’t overlap and
// each new item is within `maxDistance` of at least one placed item.
function generateNonOverlappingPositions(
  count: number,
  canvasWidth: number,
  canvasHeight: number,
  itemWidth: number,
  itemHeight: number,
  spacing: number,
  maxDistance: number
): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];

  // how many times we try to find a valid spot for an item
  const MAX_TRIES = 3000;

  for (let i = 0; i < count; i++) {
    let placed = false;
    let tries = 0;

    while (!placed && tries < MAX_TRIES) {
      // pick a random x,y
      const x = Math.random() * (canvasWidth - itemWidth);
      const y = Math.random() * (canvasHeight - itemHeight);

      // check overlap
      let overlapFound = false;
      for (const pos of positions) {
        if (isOverlap(pos.x, pos.y, x, y, itemWidth, itemHeight, spacing)) {
          overlapFound = true;
          break;
        }
      }

      if (overlapFound) {
        tries++;
        continue;
      }

      // Now check maxDistance condition:
      // If this is the first item, we can skip distance check 
      // (because there's no “existing item” to compare to).
      if (positions.length > 0) {
        // We want the new item to be within `maxDistance` from at least one existing item
        const isWithinDistance = positions.some(pos => {
          const dist = centerDistance(pos.x, pos.y, x, y, itemWidth, itemHeight);
          return dist <= maxDistance;
        });

        if (!isWithinDistance) {
          tries++;
          continue;
        }
      }

      // If we passed overlap + distance checks, we are good
      positions.push({ x, y });
      placed = true;

      tries++;
    }

    // if we fail to find a position within MAX_TRIES,
    // fallback to (0,0) or do something else
    if (!placed) {
      positions.push({ x: 0, y: 0 });
    }
  }

  return positions;
}

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
  const CANVAS_WIDTH = 1800;
  const CANVAS_HEIGHT = 1400;

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
      console.log('Viewport size:', viewportWidth, viewportHeight);

      // Calculate initial offset to center the canvas
      const initialOffsetX = (viewportWidth - CANVAS_WIDTH) / 2;
      const initialOffsetY = (viewportHeight - CANVAS_HEIGHT) / 2;
      setOffset({ x: initialOffsetX, y: initialOffsetY });
      console.log('Initial offset:', initialOffsetX, initialOffsetY);
    }

    // const randomPositions = generateNonOverlappingPositions(
    //   items.length,
    //   CANVAS_WIDTH,
    //   CANVAS_HEIGHT,
    //   ITEM_WIDTH,
    //   ITEM_HEIGHT,
    //   SPACING,
    //   MAX_DISTANCE_BETWEEN_ITEMS
    // );

    // const newPositions = randomPositions.map((pos, idx) => ({
    //   ...pos,
    //   id: items[idx].id,
    // }));

    // setPositions(newPositions);
    // console.log('New positions:', newPositions);
    setPositions(fixedPositions);
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
