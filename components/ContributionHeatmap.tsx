"use client";

import { useEffect, useState } from "react";

const LETTERS = {
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
};

const GITHUB_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

const CELL_SIZE = 10;
const CELL_GAP = 2;
const COLORS = [
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#e94560",
  "#ff6b6b",
  "#feca57",
  "#48dbfb",
  "#1dd1a1",
  "#5f27cd",
  "#ff9ff3",
];

export default function ContributionHeatmap() {
  const [_displayText, setDisplayText] = useState("");
  const [cells, setCells] = useState<
    {
      x: number;
      y: number;
      color: string;
      targetColor: string;
      delay: number;
    }[]
  >([]);
  const [_isAnimating, _setIsAnimating] = useState(true);

  useEffect(() => {
    const text = "ASHWIN";
    let currentIndex = 0;

    const letterWidths = text
      .split("")
      .map((letter) => LETTERS[letter as keyof typeof LETTERS][0].length);
    const totalWidth = letterWidths.reduce((a, b) => a + b + 1, 0) - 1;
    const startX = Math.floor((53 - totalWidth) / 2);
    const gridHeight = 7;
    const startY = Math.floor((7 - gridHeight) / 2) + 1;

    const newCells: {
      x: number;
      y: number;
      color: string;
      targetColor: string;
      delay: number;
    }[] = [];

    let xOffset = startX;

    const animateLetter = () => {
      if (currentIndex >= text.length) {
        setTimeout(() => {
          setDisplayText("");
          currentIndex = 0;
          xOffset = startX;
          newCells.length = 0;
        }, 3000);
        return;
      }

      const letter = text[currentIndex];
      const pattern = LETTERS[letter as keyof typeof LETTERS];

      pattern.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 1) {
            const randomColor =
              COLORS[Math.floor(Math.random() * COLORS.length)];
            const delay = newCells.length * 15;

            newCells.push({
              x: xOffset + colIndex,
              y: startY + rowIndex,
              color: randomColor,
              targetColor: randomColor,
              delay: delay,
            });
          }
        });
      });

      xOffset += letterWidths[currentIndex] + 1;
      currentIndex++;

      setCells([...newCells]);

      setTimeout(animateLetter, 600);
    };

    setTimeout(animateLetter, 500);

    const interval = setInterval(() => {
      setCells((prev) =>
        prev.map((cell) => {
          const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
          return { ...cell, color: randomColor, targetColor: randomColor };
        }),
      );
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mb-12 scale-90 md:scale-100 mx-auto flex flex-col items-center justify-center">
      <div className="bg-background rounded-lg p-2 border border-border/40 w-full">
        <div
          className="relative"
          style={{
            width: `${52 * (CELL_SIZE + CELL_GAP)}px`,
            height: `${7 * (CELL_SIZE + CELL_GAP)}px`,
          }}
        >
          {/* Month labels */}
          {/* <div className="absolute -top-6 left-0 flex text-xs text-neutral-600">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month, i) => (
              <span
                key={month}
                style={{
                  marginLeft:
                    i === 0
                      ? 0
                      : i <= 1
                        ? `${4 * (CELL_SIZE + CELL_GAP)}px`
                        : `${4 * (CELL_SIZE + CELL_GAP)}px`,
                }}
                className="whitespace-nowrap"
              >
                {month}
              </span>
            ))}
          </div>

 
          <div className="absolute -left-8 top-0 flex flex-col text-xs text-neutral-600 h-full">
            <span style={{ height: `${(CELL_SIZE + CELL_GAP) * 2}px` }}></span>
            <span style={{ height: `${(CELL_SIZE + CELL_GAP) * 4}px` }}>
              Wed
            </span>
          </div> */}

          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(50, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
              gap: `${CELL_GAP}px`,
            }}
          >
            {Array.from({ length: 7 * 52 }).map((_, i) => {
              const x = i % 52;
              const y = Math.floor(i / 52);
              const cell = cells.find((c) => c.x === x && c.y === y);
              const cellKey = `${x}-${y}`;

              return (
                <div
                  key={cellKey}
                  className="rounded-sm transition-all  duration-300 ease-out"
                  style={{
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                    backgroundColor: cell ? cell.color : "#242424",
                    gridColumn: x + 1,
                    gridRow: y + 1,
                    opacity: cell ? 1 : 0.3,
                    transform: cell ? "scale(1)" : "scale(0.8)",
                    boxShadow: cell
                      ? `0 0 ${Math.random() * 8 + 4}px ${cell.color}40`
                      : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      {/* <div className="flex items-center gap-2 mt-4 text-xs text-neutral-600">
        <span>Less</span>
        <div className="flex gap-1">
          {GITHUB_COLORS.map((color) => (
            <div
              key={color}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span>More</span>
      </div> */}
    </div>
  );
}