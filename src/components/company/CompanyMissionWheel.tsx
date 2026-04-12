import { useState, type KeyboardEvent } from "react";
import type { CompanyMissionValue } from "@/content/company";

type CompanyMissionWheelProps = {
  values: CompanyMissionValue[];
  centerLabel: string;
  ariaLabel?: string;
};

const CX = 320;
const CY = 300;
const RI = 113;
const RD = 193;
const RA = 263;
const RLBL = 250;
const RICO = 172;
const RICR = 19;
const GAP = 0.038;

const polar = (radius: number, angle: number): [number, number] => [
  CX + radius * Math.cos(angle),
  CY + radius * Math.sin(angle),
];

const formatCoord = (value: number) => value.toFixed(2);

const buildPath = (index: number, isActive: boolean, segmentAngle: number, startAngle: number) => {
  const outerRadius = isActive ? RA : RD;
  const angleStart = startAngle + index * segmentAngle + GAP;
  const angleEnd = startAngle + (index + 1) * segmentAngle - GAP;
  const largeArc = angleEnd - angleStart > Math.PI ? 1 : 0;
  const [innerStartX, innerStartY] = polar(RI, angleStart);
  const [outerStartX, outerStartY] = polar(outerRadius, angleStart);
  const [outerEndX, outerEndY] = polar(outerRadius, angleEnd);
  const [innerEndX, innerEndY] = polar(RI, angleEnd);

  return [
    "M",
    `${formatCoord(innerStartX)},${formatCoord(innerStartY)}`,
    "L",
    `${formatCoord(outerStartX)},${formatCoord(outerStartY)}`,
    "A",
    `${outerRadius},${outerRadius} 0 ${largeArc},1 ${formatCoord(outerEndX)},${formatCoord(outerEndY)}`,
    "L",
    `${formatCoord(innerEndX)},${formatCoord(innerEndY)}`,
    "A",
    `${RI},${RI} 0 ${largeArc},0 ${formatCoord(innerStartX)},${formatCoord(innerStartY)}Z`,
  ].join(" ");
};

const CompanyMissionWheel = ({
  values,
  centerLabel,
  ariaLabel = "Interactive values wheel",
}: CompanyMissionWheelProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const segmentCount = values.length;
  const segmentAngle = (Math.PI * 2) / segmentCount;
  const startAngle = -Math.PI / 2 - segmentAngle / 2;

  const toggleValue = (index: number) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, index: number) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      toggleValue(index);
    }
  };

  return (
    <svg
      className="company-mission-wheel"
      viewBox="0 0 640 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <g>
        {values.map((value, index) => {
          const isActive = index === activeIndex;
          const midAngle = startAngle + (index + 0.5) * segmentAngle;
          const [labelX, labelY] = polar(RLBL, midAngle);
          const [iconX, iconY] = polar(RICO, midAngle);
          const cos = Math.cos(midAngle);
          const textAnchor = cos > 0.28 ? "start" : cos < -0.28 ? "end" : "middle";
          const labelBaseY = labelY - (value.labelLines.length - 1) * 8.5;

          return (
            <g
              key={value.id}
              className={`company-mission-segment${isActive ? " is-active" : ""}`}
              role="button"
              tabIndex={0}
              focusable="true"
              aria-label={value.labelLines.join(" ")}
              aria-pressed={isActive}
              onClick={() => toggleValue(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <path
                d={buildPath(index, isActive, segmentAngle, startAngle)}
                fill={isActive ? value.activeColor : value.inactiveColor}
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <g aria-hidden="true">
                {value.labelLines.map((line, lineIndex) => (
                  <text
                    key={`${value.id}-${line}`}
                    className="company-mission-wheel-label"
                    x={formatCoord(labelX)}
                    y={formatCoord(labelBaseY + lineIndex * 17)}
                    textAnchor={textAnchor}
                    fill={isActive ? "#ffffff" : "rgba(255,255,255,.76)"}
                  >
                    {line}
                  </text>
                ))}
              </g>

              <g aria-hidden="true">
                <circle
                  cx={formatCoord(iconX)}
                  cy={formatCoord(iconY)}
                  r={RICR}
                  fill={isActive ? "#ffffff" : value.iconColor}
                  stroke={isActive ? value.activeColor : "none"}
                  strokeWidth="1.5"
                />
                <text
                  className="company-mission-wheel-icon"
                  x={formatCoord(iconX)}
                  y={formatCoord(iconY)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isActive ? value.activeColor : "#ffffff"}
                >
                  {isActive ? "\u00d7" : "+"}
                </text>
              </g>
            </g>
          );
        })}
      </g>

      <circle
        cx={CX}
        cy={CY}
        r={RI}
        className="company-mission-center-ring"
        fill="#f6f6f6"
        stroke="rgba(27,42,74,.18)"
        strokeWidth="2"
      />

      {activeIndex === -1 ? (
        <g aria-hidden="true">
          <text
            className="company-mission-center-wordmark"
            x={CX}
            y={CY + 8}
            textAnchor="middle"
          >
            {centerLabel}
          </text>
        </g>
      ) : (
        <g aria-hidden="true">
          <text className="company-mission-center-description" x={CX} textAnchor="middle">
            {values[activeIndex].descriptionLines.map((line, index) => (
              <tspan
                key={`${values[activeIndex].id}-${line}`}
                x={CX}
                y={CY - ((values[activeIndex].descriptionLines.length - 1) * 18) / 2 + index * 18}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      )}
    </svg>
  );
};

export default CompanyMissionWheel;
