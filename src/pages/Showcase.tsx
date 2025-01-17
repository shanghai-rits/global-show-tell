import React, { useEffect, useRef, useState } from 'react';

interface ShowcaseItem {
  id: number;
  title: string;
  authors: string;
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
    { id: 1, title: 'Title #1', authors: 'Author A' },
    { id: 2, title: 'Title #2', authors: 'Author B' },
    { id: 3, title: 'Title #3', authors: 'Author C' },
    { id: 4, title: 'Title #4', authors: 'Author D' },
    { id: 5, title: 'Title #5', authors: 'Author E' },
    { id: 6, title: 'Title #6', authors: 'Author F' },
    { id: 7, title: 'Title #7', authors: 'Author G' },
    { id: 8, title: 'Title #8', authors: 'Author H' },
  ];

  // Canvas = "map" we can drag around.
  const CANVAS_WIDTH = 1800;
  const CANVAS_HEIGHT = 1000;

  const ITEM_WIDTH = 200;
  const ITEM_HEIGHT = 200;

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
      "x": 361.2581214840093,
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
      "y": 525.9928869502138,
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
      "x": 123.741773541528133,
      "y": 32.98154229677599,
      "id": 7
    },
    {
      "x": 979.3795868985238,
      "y": 318.41769726377214,
      "id": 8
    }
  ]


  useEffect(() => {
    if (outerRef.current) {
      setViewportWidth(outerRef.current.clientWidth);
      setViewportHeight(outerRef.current.clientHeight);
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

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                background: '#f2f2f2',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <img
                src="/showcase-sample-cover.png"
                alt={`${item.title} cover`}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '0em', textAlign: 'center' }}>
                <h4 style={{ margin: '0em 0' }}>{item.title} {item.authors}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Showcase;
